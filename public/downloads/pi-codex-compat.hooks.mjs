// magpie 异步钩子插件：让 Pi 里走 openai-responses 的 codex/* 模型保持延迟加载开关。
// 只写 providers.magpie.modelOverrides（magpie 重写 models.json 时会保留它），从不修改请求。
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const FLAGS = ["supportsToolSearch", "supportsMidConvoSystemMessages"];

const modelsFile = () =>
  path.join(process.env.PI_CODING_AGENT_DIR || path.join(os.homedir(), ".pi", "agent"), "models.json");

// 原地修改配置对象，返回是否有变化。用户显式写的值（如 false）不覆盖。
export function patch(data) {
  const p = data?.providers?.magpie;
  if (!Array.isArray(p?.models)) return false;
  let changed = false;
  for (const m of p.models) {
    if (!m?.id?.startsWith("codex/")) continue;
    if ((m.api ?? p.api) === "openai-responses") {
      const compat = (((p.modelOverrides ??= {})[m.id] ??= {}).compat ??= {});
      for (const f of FLAGS) {
        if (compat[f] === undefined) {
          compat[f] = true;
          changed = true;
        }
      }
    } else {
      // 协议换掉后撤回开关：supportsMidConvoSystemMessages 对 anthropic-messages 也生效
      const compat = p.modelOverrides?.[m.id]?.compat;
      for (const f of FLAGS) {
        if (compat?.[f] === true) {
          delete compat[f];
          changed = true;
        }
      }
    }
  }
  return changed;
}

let seen = "";

export function sync(file = modelsFile()) {
  let tmp;
  try {
    const before = fs.statSync(file);
    const stamp = `${file}:${before.mtimeMs}:${before.size}`;
    if (stamp === seen) return false;
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    if (!patch(data)) {
      seen = stamp;
      return false;
    }
    // 解析符号链接，避免改名时把链接换成普通文件
    const target = fs.realpathSync(file);
    tmp = `${target}.${process.pid}.tmp`;
    fs.writeFileSync(tmp, `${JSON.stringify(data, null, 2)}\n`, { mode: 0o600 });
    fs.chmodSync(tmp, before.mode & 0o777);
    // 读取之后文件又被改过就放弃，下次再处理
    const now = fs.statSync(file);
    if (now.mtimeMs !== before.mtimeMs || now.size !== before.size) return false;
    fs.renameSync(tmp, target);
    return true;
  } catch {
    // 文件不存在、写了一半或被占用：下次触发时重试；错误文本可能含配置内容，不外传
    return false;
  } finally {
    if (tmp) fs.rmSync(tmp, { force: true });
  }
}

sync();
// 插件宿主存活期间，magpie 一重写就补上
fs.watchFile(modelsFile(), { interval: 2000, persistent: false }, () => sync());

export async function onRequest() {
  sync();
}
