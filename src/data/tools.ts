export interface ToolItem {
  name: string;
  tagline: string;
  description: string;
  url: string;
  category: '效率与创意' | '资源与下载' | '在线影视' | '网络与隐私' | '实用小工具';
  pricing: '免费' | '免费增值' | '开源';
  tags: string[];
  featured?: boolean;
  /** 如有相关评测文章，填写文章 slug */
  articleSlug?: string;
}

export const TOOLS: ToolItem[] = [
  // 效率与创意
  {
    name: 'Excalidraw',
    tagline: '打开浏览器就能画的手绘风流程图与架构图白板',
    description: '免登录直接使用的在线白板，适合画系统架构图、产品草图和团队实时协作，支持导出 PNG/SVG。',
    url: 'https://excalidraw.com/',
    category: '效率与创意',
    pricing: '开源',
    tags: ['白板', '架构图'],
    featured: true,
  },
  {
    name: 'Moodist',
    tagline: '免费无广告的白噪音与环境音混音网站',
    description: '提供雨声、咖啡馆、森林、键盘声等几十种环境音，可自由调节音量混搭，写代码或学习时用来屏蔽干扰。',
    url: 'https://moodist.app/',
    category: '效率与创意',
    pricing: '开源',
    tags: ['白噪音', '专注'],
    featured: true,
  },
  {
    name: 'vectorCraftr',
    tagline: '免费可下载的扁平风矢量插画素材库',
    description: '收录大量现代感扁平插画，可直接下载 SVG 或 PNG，适合用来做博客配图、PPT 或网页装饰。',
    url: 'https://vectorcraftr.com/',
    category: '效率与创意',
    pricing: '免费',
    tags: ['SVG', '插画素材'],
  },
  {
    name: 'AlternativeTo',
    tagline: '帮你找某款软件的免费平替或开源替代品',
    description: '输入你觉得太贵或不好用的软件名称，就能按平台、免费/开源条件找出用户评分最高的替代软件。',
    url: 'https://alternativeto.net/',
    category: '效率与创意',
    pricing: '免费',
    tags: ['软件平替', '开源检索'],
  },

  // 资源与下载
  {
    name: 'Z-Library',
    tagline: '全球最大的电子书与学术文献免费搜索下载站',
    description: '按书名、作者或 ISBN 搜索中英文电子书，支持 EPUB、PDF、MOBI 等格式直接下载。',
    url: 'https://z-lib.id/',
    category: '资源与下载',
    pricing: '免费',
    tags: ['电子书', '文献'],
  },
  {
    name: 'cobalt',
    tagline: '粘贴链接即可下载各平台视频与音频（无广告）',
    description: '支持 YouTube、B站、TikTok、Instagram 等主流网站，粘贴链接即可无水印保存视频或提取纯音频。',
    url: 'https://cobalt.tools/',
    category: '资源与下载',
    pricing: '开源',
    tags: ['视频下载', '音频提取'],
  },
  {
    name: 'XDownloader',
    tagline: '在线下载 X (Twitter) 推文里的高清视频和 GIF',
    description: '把带视频的推文链接粘贴进去，就能选择清晰度并直接保存 MP4 视频或 GIF 动图。',
    url: 'https://x-downloader.com/',
    category: '资源与下载',
    pricing: '免费',
    tags: ['X', '视频下载'],
  },
  {
    name: 'Kedou视频解析',
    tagline: '常见短视频与网页视频在线去水印下载',
    description: '粘贴短视频分享链接即可解析出无水印视频源文件，不用装 App 就能直接保存到本地。',
    url: 'https://m.kedou.life/',
    category: '资源与下载',
    pricing: '免费',
    tags: ['去水印', '视频解析'],
  },
  {
    name: 'ipsw',
    tagline: '查询并下载 iPhone、iPad、Mac 官方系统固件',
    description: '列出苹果全系设备的历史 iOS / iPadOS / macOS 固件版本，实时显示官方是否还开放刷机验证。',
    url: 'https://ipsw.me/',
    category: '资源与下载',
    pricing: '免费',
    tags: ['Apple', '系统固件'],
  },
  {
    name: 'SubHD',
    tagline: '搜电影、美剧与纪录片的中文字幕文件',
    description: '下载无字幕外语片时必备的字幕站，输入片名即可下载 SRT / ASS 格式的中英双语字幕。',
    url: 'https://subhd.tv/',
    category: '资源与下载',
    pricing: '免费',
    tags: ['中文字幕', '外语片'],
  },

  // 在线影视
  {
    name: '寻找类似电影',
    tagline: '输入一部喜欢的电影，按口味推荐同类型片单',
    description: '不知道看什么的时候，输入你喜欢的某部电影，网站会按题材、风格和口碑列出最相近的片单。',
    url: 'https://leisidianying.com/',
    category: '在线影视',
    pricing: '免费',
    tags: ['找片推荐', '片单'],
    featured: true,
  },
  {
    name: '短剧狗',
    tagline: '热门短剧在线搜索与免费播放',
    description: '专门找短剧和微短剧的网站，支持按剧名搜索、按热度筛选，点开就能直接看全集。',
    url: 'https://duanjugou.top/',
    category: '在线影视',
    pricing: '免费',
    tags: ['短剧', '在线观看'],
    featured: true,
  },
  {
    name: '爱壹帆',
    tagline: '海外华人常用的综合在线影视点播站',
    description: '覆盖国产剧、美剧、韩剧、电影、综艺和动漫，更新速度快，适合直接在线追剧。',
    url: 'https://www.iyf.tv/',
    category: '在线影视',
    pricing: '免费',
    tags: ['剧集', '综艺动漫'],
  },
  {
    name: '欧乐影院',
    tagline: '支持多线路切换的免费高清电影与剧集站',
    description: '片库涵盖院线新片和热播剧集，卡顿时可切换多条播放线路，提供较高清晰度播放。',
    url: 'https://www.olevod.com/',
    category: '在线影视',
    pricing: '免费',
    tags: ['电影', '多线路'],
  },
  {
    name: '4k影视',
    tagline: '主打 4K 高画质的电影与美剧在线观看站',
    description: '专注高码率电影和热门美剧在线播放，画质明显优于普通免费站，适合电脑或电视大屏看片。',
    url: 'https://www.4kvm.org/',
    category: '在线影视',
    pricing: '免费',
    tags: ['4K', '美剧电影'],
  },
  {
    name: '影猫',
    tagline: '聚合各大影视站与豆瓣高分榜的找片导航',
    description: '整合了豆瓣高分片单和多个可播放片源入口，方便按评分、年份和地区找片并跳转观看。',
    url: 'https://www.mvcat.com/',
    category: '在线影视',
    pricing: '免费',
    tags: ['豆瓣榜单', '影视导航'],
  },

  // 网络与隐私
  {
    name: 'ping0',
    tagline: '检测当前 IP 的风控评分与家宽/机房属性',
    description: '一眼看出你用的 IP 是住宅宽带还是云服务器机房、是否被标记为高风险代理，注册海外账号前常用来排查。',
    url: 'https://ping0.cc/',
    category: '网络与隐私',
    pricing: '免费',
    tags: ['IP 纯净度', '风控检测'],
  },
  {
    name: 'IP 数据查询',
    tagline: '查询任意 IP 的归属地、ASN 运营商与代理标记',
    description: '输入任意 IPv4/IPv6 地址，查看其所属国家城市、ASN 编号、运营商名称以及是否为托管机房或 VPN。',
    url: 'https://ipinfo.io/',
    category: '网络与隐私',
    pricing: '免费增值',
    tags: ['IP 归属', 'ASN'],
  },
  {
    name: 'Geo Data Tool',
    tagline: '快速查看 IP 的地理位置、邮编与地图坐标',
    description: '打开即显示当前出口 IP 所在国家、城市、时区、经纬度和运营商，也可输入指定 IP 查询。',
    url: 'https://www.geodatatool.com/',
    category: '网络与隐私',
    pricing: '免费',
    tags: ['GeoIP', '地理位置'],
  },
  {
    name: 'Net.Coffee',
    tagline: '极简测当前出口 IP 与网络连通延迟',
    description: '页面干净无多余信息，打开就能看到本机公网 IPv4/IPv6 地址和基础网络延迟。',
    url: 'https://ip.net.coffee/',
    category: '网络与隐私',
    pricing: '免费',
    tags: ['出口 IP', '延迟测试'],
  },
  {
    name: 'ipleak',
    tagline: '检测代理或 VPN 是否泄露了真实 IP 与 DNS',
    description: '一次性排查 IPv4、IPv6、DNS 请求和浏览器 WebRTC，确认当前网络环境没有暴露本机真实地址。',
    url: 'https://ipleak.net',
    category: '网络与隐私',
    pricing: '免费',
    tags: ['DNS 泄露', 'WebRTC'],
  },
  {
    name: 'browserleaks',
    tagline: '全面检测浏览器指纹与暴露的系统信息',
    description: '测试浏览器对外暴露的 Canvas、WebGL、字体列表、时区和硬件指纹，用来检查隐私隔离是否生效。',
    url: 'https://browserleaks.com',
    category: '网络与隐私',
    pricing: '免费',
    tags: ['浏览器指纹', '隐私检测'],
  },

  // 实用小工具
  {
    name: 'Google S2',
    tagline: '通过网址直接获取任意网站的 Favicon 图标',
    description: 'Google 提供的免费图标接口，把网址里的 url= 参数换成目标域名，就能拿到 64×64 清晰网站图标。',
    url: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=64&url=https://google.com/',
    category: '实用小工具',
    pricing: '免费',
    tags: ['Favicon', '图标接口'],
  },
  {
    name: 'Car Choice',
    tagline: '算一算买纯电车还是燃油车更省钱',
    description: '填入购车预算、年行驶里程、油价电价和保值率，自动对比几年内的总用车成本。',
    url: 'https://car-choice.pages.dev/',
    category: '实用小工具',
    pricing: '免费',
    tags: ['购车计算器', '电车油车'],
  },
  {
    name: '美国地址生成器',
    tagline: '一键生成格式规范的美国免税州测试地址',
    description: '生成包含姓名、街道、城市、邮编和电话的完整美国地址（支持免税州），适合软件测试或表单联调。',
    url: 'https://usaddressgen.com/',
    category: '实用小工具',
    pricing: '免费',
    tags: ['测试数据', '地址生成'],
  },
];

export const TOOL_CATEGORIES = [
  '全部',
  '效率与创意',
  '资源与下载',
  '在线影视',
  '网络与隐私',
  '实用小工具',
] as const;
