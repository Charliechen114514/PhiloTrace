# PhiloTrace · 哲思留痕

> 记录哲学学习、对话与思想生成痕迹的开放式哲学学习站。

基于 VitePress 构建。内容按门类放在 [`content/`](./content)，站点配置在 [`site/.vitepress`](./site/.vitepress)。

## 门类

| 目录 | 内容 |
| --- | --- |
| `content/passages` | 随笔 |
| `content/dialogues` | 脱敏对话整理（用 `<DialogueTurn>` / `<OrganizerNote>`） |
| `content/concepts` | 概念解释（用 `<ConceptCard>`） |
| `content/notes` | 学习笔记 |
| `content/maps` | 图谱（Mermaid） |
| `content/reflections` | 阶段反思 |
| `content/ideas` | 短想法 |

## 本地开发

```bash
pnpm install
pnpm dev      # 本地预览
pnpm build    # 产出静态站到 site/.vitepress/dist
pnpm preview  # 预览构建产物
```

## 约定速记

- **写作就在 `content/<门类>/` 里加 `.md`**，侧栏与导航自动生成（按数字前缀排序，标题取 frontmatter `title` 或首个 `#`）。
- 想进首页"最近更新"流的门类是 `passages / ideas / dialogues / reflections`（在 `site/.vitepress/data/posts.data.ts` 配置），且文章 frontmatter 要有 `date`。
- `date` 一律用引号包起来：`date: "2026-06-13"`，避免 YAML 把它解析成 Date 对象。
- 草稿：frontmatter 加 `draft: true`，不会出现在"最近更新"。
- Mermaid：直接写 ` ```mermaid ` 围栏，客户端按需渲染；国内若 CDN 失败会自动降级为源码。

## 部署

构建产物是纯静态，可发到 GitHub Pages / Cloudflare Pages / Netlify。

- GitHub Pages 项目站需把 `site/.vitepress/config/index.ts` 里的 `base` 改成 `'/PhiloTrace/'`。
- 国内访问：GitHub Pages / Cloudflare Pages 免费层在大陆都不稳，建议自定义域名 + CDN 镜像或 ICP 备案。

## 授权

- 代码：MIT
- 内容：CC BY-SA 4.0
