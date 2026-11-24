export const SITE = {
  title: 'Fun90 Notes',
  tagline: 'Agent 实战 · 软件开发 · 精选工具',
  description: '记录 AI Agent 终端工作流、软件开发工程实践与高频精选工具。',
  url: 'https://fun90.com',
  author: 'Fun90',
  lang: 'zh-CN',
  twitterHandle: '@fun90x',
  twitterUrl: 'https://x.com/fun90x',
  githubUrl: 'https://github.com/fun90',
  email: 'hello@fun90.com',
} as const;

export const NAV_LINKS = [
  { label: '首页', href: '/' },
  { label: '文章', href: '/blog' },
  { label: '工具精选', href: '/tools' },
  { label: '关于', href: '/about' },
] as const;

// 评论系统（Giscus）：后续去 https://giscus.app/zh-CN 获取配置填入，enabled 改为 true 即可启用
export const GISCUS = {
  enabled: false,
  repo: 'fun90/blog',
  repoId: '',
  category: 'Announcements',
  categoryId: '',
} as const;
