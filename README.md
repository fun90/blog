# Fun90 Notes — Astro 个人博客 + 常用工具精选

基于 **Astro 7 + Tailwind CSS v4 + MDX** 搭建，聚焦 AI Agent 实战、软件开发分享与常用工具精选，部署于 **Cloudflare Pages**。

## 特性一览

- **MDX 增强写作**：支持 `<Callout>` 提示框、`<ToolCard>` 工具卡片与自定义图表组件。
- **常用工具精选**：内置 `/tools` 工具精选页，按「效率与创意 / 资源与下载 / 在线影视 / 网络与隐私 / 实用小工具」分类筛选。
- **X (Twitter) 卡片优化**：构建时自动生成 `1200×630` 动态 OG / X Card 封面图（`/og/<slug>.png`）。
- **开箱即用的 SEO & 体验**：自动 Sitemap、RSS 订阅、代码块双主题高亮、文章目录、深浅色主题切换。

## 快速开始

需要 Node.js 22.23.4 或更高版本。

```bash
pnpm install
pnpm dev
```

## 上线前只需修改 2 处配置

1. 打开 `src/config.ts`，将 `twitterHandle`、`twitterUrl`、`githubUrl`、`email` 替换为你的真实信息。
2. 打开 `astro.config.mjs` 与 `public/robots.txt`，确认 `site` 域名为你的正式博客域名（如 `https://fun90.com` 或 `https://blog.fun90.com`）。

## 日常写作

在 `src/content/blog/` 下新建 `.md` 或 `.mdx` 文件即可自动发布，支持 Frontmatter：

```yaml
---
title: '文章标题'
description: '一句话摘要（用于 SEO 和 X 分享卡片）'
pubDate: 2026-11-24
category: '工具经验' # 可选：工具经验 | 软件开发 | AI 工作流 | 折腾笔记
tags: ['标签1', '标签2']
featured: false
draft: false
---
```

## 部署到 Cloudflare Pages

1. 将本仓库推送到 GitHub。
2. 登录 Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**。
3. 构建配置填写：
   - **Framework preset**: `Astro`
   - **Build command**: `pnpm check && pnpm build`
   - **Build output directory**: `dist`
4. 在 **Custom domains** 中绑定你的域名即可自动签发 HTTPS 证书并上线。
