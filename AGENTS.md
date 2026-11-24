# AGENTS.md

面向「AI Agent 实战 + 软件开发 + 常用工具精选」的个人站点，基于 Astro 7 纯静态输出，部署于 Cloudflare Pages。所有文案与注释使用简体中文。

## 定位与边界

- **静态优先**：保持 `output: 'static'`，直接输出 `dist/` 给 Cloudflare Pages 托管；动态后端能力留给独立服务器子域名，在本站仅作静态集成。
- **常用工具精选**：全站工具统一维护在 `src/data/tools.ts` 并在 `/tools` 展示，不再依赖外部导航站。
- **X 引流与封面图**：每篇文章自动生成 `1200×630` 动态 OG / X Card；工具外链统一带 `rel="noopener noreferrer sponsored"`。

## 上下文指针

- **撰写或改写文章**：遵循 `.agents/skills/blog-writing/SKILL.md`（写作与排版标准）与 `src/content.config.ts`（frontmatter schema）；文章内复用 `src/components/mdx/`（`Callout`、`ToolCard`、图表组件）。
- **修改站点信息、X 账号、Giscus 评论**：改 `src/config.ts`；若变更正式域名，同步更新 `astro.config.mjs` 的 `site` 与 `public/robots.txt` 的 `Sitemap`。
- **增删精选工具**：改 `src/data/tools.ts`。
- **调整动态 OG 封面图**：改 `src/utils/og.ts` 与 `src/pages/og/[...slug].png.ts`。

## 已知约束与坑

- **pnpm 11 配置位置**：构建白名单（`allowBuilds`）和依赖覆盖（`overrides`）统一写在 `pnpm-workspace.yaml`，pnpm 11 会忽略 `package.json` 中的 `pnpm` 字段。
- **`style-to-js` 覆盖**：保留 `pnpm-workspace.yaml` 中的 `overrides.style-to-js: ^1.1.16`——Node 26 下 `@astrojs/mdx` 若解析到 `style-to-js@1.0.0`，构建会因 `styleToJs is not a function` 失败。
- **中文字体与 OG 容错**：`src/utils/og.ts` 按当前页面字符子集实时向 Google Fonts 拉取 Noto Sans SC TTF，保持仓库轻量（不提交完整中文字体文件）；修改 OG 逻辑时保留请求失败时的 SVG 回退路径，确保离线构建也能通过。

## 完成判据

代码、配置或 MDX 改动后，执行 `pnpm check && pnpm build`，确认 `astro check` 为 0 error、`dist/` 与 `dist/og/*.png` 全部生成后才算完成。
