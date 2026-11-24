---
name: blog-writing
description: 撰写、改写或排版博客文章（src/content/blog/*.mdx）时使用。规范文章结构、图文表格、精简表达与构建验收。
---

# 博客写作与排版规范

## 结构与排版

- **开篇定调**：前 2-3 句话直接点明背景与核心结论，不铺陈空话。
- **图文表格优先**：能用架构图、流程图或对照表格说清的内容，不写大段无序列表；技术栈或工具对比使用 Markdown 表格，复杂分层使用独立图表组件（如 `src/components/mdx/PiMagpieDiagram.astro`）。
- **文字精炼**：删掉「首先、其次、总而言之」等过渡废话；每段不超过 3-4 行，确保 30 秒内可扫读完重点。
- **组件复用**：提示与避坑用 `src/components/mdx/Callout.astro`，外链推荐用 `src/components/mdx/ToolCard.astro`。

## Frontmatter 与隐私

- 严格匹配 `src/content.config.ts`：`category` 仅限 `'工具经验' | '软件开发' | 'AI 工作流' | '折腾笔记'`。
- 不贴冗长的原始配置文件；只保留最小必要片段。
- 严禁写入私有凭据、Token、真实内网地址或端口，示例配置统一使用占位符（如 `<port>`）。

## 完成判据

改动后执行 `pnpm check && pnpm build`，确认 0 error，且新文章 HTML 与 `dist/og/<slug>.png` 均已生成。
