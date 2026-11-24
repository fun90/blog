import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { SITE } from '../config';

const fontCache = new Map<string, ArrayBuffer>();

/**
 * 按当前文本动态从 Google Fonts 拉取 Noto Sans SC TTF 子集（仅几 KB），
 * 无需往 Git 仓库提交十几 MB 的中文字体文件。
 */
async function loadGoogleFont(text: string): Promise<ArrayBuffer | null> {
  const uniqueChars = Array.from(new Set(text.replace(/\s+/g, ' '))).join('');
  if (fontCache.has(uniqueChars)) {
    return fontCache.get(uniqueChars)!;
  }

  const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@700&text=${encodeURIComponent(uniqueChars)}`;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const cssRes = await fetch(url, {
        headers: {
          // 经典 Safari UA 会让 Google Fonts 稳定返回 TTF 格式（Satori 原生支持）
          'User-Agent':
            'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
        },
        signal: AbortSignal.timeout(8000),
      });
      if (!cssRes.ok) continue;
      const css = await cssRes.text();
      const match = css.match(/src:\s*url\(([^)]+)\)\s*format\(['"](?:opentype|truetype|woff)['"]\)/);
      if (!match?.[1]) continue;

      const fontRes = await fetch(match[1], { signal: AbortSignal.timeout(8000) });
      if (!fontRes.ok) continue;
      const buffer = await fontRes.arrayBuffer();
      fontCache.set(uniqueChars, buffer);
      return buffer;
    } catch {
      // retry once
    }
  }

  return null;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildFallbackSvg(title: string, subtitle: string, domain: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#09090b"/>
        <stop offset="60%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#172554"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <text x="64" y="110" fill="#7dd3fc" font-size="26" font-family="sans-serif" font-weight="700">${escapeXml(SITE.title)}</text>
    <text x="64" y="300" fill="#ffffff" font-size="50" font-family="sans-serif" font-weight="700">${escapeXml(title.slice(0, 28))}</text>
    <text x="64" y="370" fill="#cbd5e1" font-size="26" font-family="sans-serif">${escapeXml(subtitle.slice(0, 48))}</text>
    <line x1="64" y1="530" x2="1136" y2="530" stroke="rgba(148,163,184,0.3)" stroke-width="1"/>
    <text x="64" y="575" fill="#94a3b8" font-size="22" font-family="sans-serif">${escapeXml(domain)}</text>
    <text x="980" y="575" fill="#38bdf8" font-size="22" font-family="sans-serif">${escapeXml(SITE.twitterHandle)}</text>
  </svg>`;
}

export async function generateOgImage(options: {
  title: string;
  subtitle?: string;
  category?: string;
}): Promise<Uint8Array> {
  const { title, subtitle = SITE.tagline, category = 'Fun90 Notes' } = options;
  const domain = SITE.url.replace(/^https?:\/\//, '');
  const fullText = `${title}${subtitle}${category}${domain}${SITE.title}${SITE.twitterHandle}`;
  const fontData = await loadGoogleFont(fullText);

  let svg: string;

  if (fontData) {
    svg = await satori(
      {
        type: 'div',
        props: {
          style: {
            width: '1200px',
            height: '630px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '64px',
            background: 'linear-gradient(135deg, #09090b 0%, #0f172a 60%, #172554 100%)',
            color: '#f8fafc',
            fontFamily: '"Noto Sans SC", sans-serif',
          },
          children: [
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 18px',
                        borderRadius: '999px',
                        backgroundColor: 'rgba(56, 189, 248, 0.16)',
                        border: '1px solid rgba(56, 189, 248, 0.35)',
                        color: '#7dd3fc',
                        fontSize: '22px',
                        fontWeight: 700,
                      },
                      children: category,
                    },
                  },
                  {
                    type: 'div',
                    props: {
                      style: {
                        color: '#94a3b8',
                        fontSize: '24px',
                        fontWeight: 700,
                      },
                      children: SITE.title,
                    },
                  },
                ],
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: {
                        fontSize: title.length > 26 ? '48px' : '58px',
                        fontWeight: 700,
                        lineHeight: 1.25,
                        color: '#ffffff',
                      },
                      children: title,
                    },
                  },
                  {
                    type: 'div',
                    props: {
                      style: {
                        fontSize: '26px',
                        color: '#cbd5e1',
                        lineHeight: 1.4,
                      },
                      children: subtitle,
                    },
                  },
                ],
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(148, 163, 184, 0.25)',
                  paddingTop: '24px',
                  fontSize: '22px',
                  color: '#94a3b8',
                },
                children: [
                  { type: 'span', props: { children: domain } },
                  { type: 'span', props: { style: { color: '#38bdf8' }, children: SITE.twitterHandle } },
                ],
              },
            },
          ],
        },
      } as any,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Noto Sans SC',
            data: fontData,
            weight: 700,
            style: 'normal',
          },
        ],
      }
    );
  } else {
    svg = buildFallbackSvg(title, subtitle, domain);
  }

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  return resvg.render().asPng();
}
