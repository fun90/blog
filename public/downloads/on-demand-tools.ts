import type { ExtensionAPI, ExtensionContext } from '@earendil-works/pi-coding-agent';
import { Type } from 'typebox';

const STATE = 'otc:on-demand-tools';
// ask_user_question 不在此列：其扩展每轮按 ctx.hasUI 自行增删，外部收起无效。
// 浏览器高级工具（agent_browser_action 等）为 deferred，由 Pi 内置 tool_search 发现，不在此列。
const GROUPS = {
  browser: ['agent_browser'],
  agents: ['agent_spawn', 'agent_send', 'agent_wait', 'agent_status', 'agent_stop'],
  mcp: ['mcp'],
} as const;
const GROUP_NAMES = Object.keys(GROUPS).join('、');
type Group = keyof typeof GROUPS;
const SECTION_GROUPS: Record<string, Group> = {
  agent_browser: 'browser',
  'pi-agents': 'agents',
};

function groupOf(name: string): Group | undefined {
  if (name.startsWith('agent_browser')) return 'browser';
  return (Object.keys(GROUPS) as Group[]).find((group) =>
    (GROUPS[group] as readonly string[]).includes(name));
}

export default function onDemandTools(pi: ExtensionAPI) {
  let enabled = new Set<Group>();
  let warned = false;

  const availableTools = (groups: Iterable<Group>) => {
    const available = new Set(pi.getAllTools()
      .filter((tool) => tool.exposure !== 'hidden')
      .map((tool) => tool.name));
    return Array.from(groups).flatMap((group) => GROUPS[group].filter((name) => available.has(name)));
  };

  pi.registerTool({
    name: 'load_tools',
    label: '按需加载工具',
    description: '启用专项工具：browser（网页、浏览器），agents（子代理），mcp（IDE、外部服务）。启用后再调用对应工具。',
    promptSnippet: '按需启用浏览器、子代理或 MCP',
    promptGuidelines: ['任务需要浏览器、子代理或 MCP 且工具尚不可用时，先调用 load_tools。'],
    parameters: Type.Object({
      groups: Type.Array(Type.String({ enum: Object.keys(GROUPS) }),
        { minItems: 1, maxItems: Object.keys(GROUPS).length }),
    }),
    executionMode: 'sequential',
    async execute(_id, params) {
      const requested = [...new Set(params.groups)];
      if (requested.some((group) => !Object.hasOwn(GROUPS, group))) {
        throw new Error(`未知工具组，可选：${GROUP_NAMES}`);
      }
      const added = availableTools(requested as Group[]);
      pi.setActiveTools([...new Set([...pi.getActiveTools(), ...added])]);
      const active = pi.getActiveTools();
      const loaded = (requested as Group[]).filter((group) =>
        GROUPS[group].some((name) => active.includes(name)));
      for (const group of loaded) enabled.add(group);
      pi.appendEntry(STATE, { groups: [...enabled] });
      const unavailable = requested.filter((group) => !loaded.includes(group as Group));
      return {
        content: [{ type: 'text', text: `已启用：${loaded.join('、') || '无'}。${unavailable.length ? `不可用：${unavailable.join('、')}。` : ''}下一次请求即可调用已启用工具。` }],
        details: { loaded, unavailable },
      };
    },
  });

  const restore = (ctx: ExtensionContext) => {
    enabled = new Set();
    for (const entry of ctx.sessionManager.getBranch()) {
      if (entry.type === 'custom' && entry.customType === STATE) {
        const groups = (entry.data as { groups?: unknown })?.groups;
        if (Array.isArray(groups)) {
          enabled = new Set(groups.filter((group): group is Group =>
            typeof group === 'string' && Object.hasOwn(GROUPS, group)));
        }
      }
    }
    const active = pi.getActiveTools().filter((name) => {
      const group = groupOf(name);
      return !group || enabled.has(group);
    });
    pi.setActiveTools([...new Set([...active, ...availableTools(enabled)])]);
  };
  // 工具名为固定清单；上游改名后新名字会变为常驻，因此缺失时提示一次。
  const checkNames = (ctx: ExtensionContext) => {
    if (warned) return;
    warned = true;
    const all = new Set(pi.getAllTools().map((tool) => tool.name));
    const missing = Object.values(GROUPS).flat().filter((name) => !all.has(name));
    if (missing.length === 0) return;
    const text = `on-demand-tools：未找到 ${missing.join('、')}。若上游扩展已改名，请更新工具组清单，否则新名称的工具将常驻。`;
    if (ctx.hasUI) ctx.ui.notify(text, 'warning');
    else console.warn(text);
  };
  pi.on('session_start', (_event, ctx) => {
    restore(ctx);
    checkNames(ctx);
  });
  pi.on('session_tree', (_event, ctx) => restore(ctx));

  // 原扩展继续生成并保存完整规则；仅在请求投影中移除未启用组的 section。
  // 每次请求都检查实际工具状态，load_tools 后同一轮立即恢复原文。
  // 不依赖 before_agent_start 的扩展顺序，也不改动用户指令或工具声明。
  pi.on('context_with_system', (event) => {
    const active = pi.getActiveTools();
    const omitted = Object.entries(SECTION_GROUPS)
      .filter(([, group]) => !active.some((name) => groupOf(name) === group))
      .map(([section]) => section);
    let changed = false;
    const messages = event.messages.map((message) => {
      if (message.role !== 'system' || !message.sections ||
          !omitted.some((section) => Object.hasOwn(message.sections!, section))) return message;
      const sections = { ...message.sections };
      for (const section of omitted) delete sections[section];
      changed = true;
      return { ...message, sections };
    });
    return changed ? { messages } : undefined;
  });
}
