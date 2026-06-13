import type { DefaultTheme } from 'vitepress'
import { readdirSync, statSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'

type SidebarItem = DefaultTheme.SidebarItem

// 内容根：srcDir 指向仓库根的 content/，sidebar.ts 位于
// site/.vitepress/config/，所以 ../../../content 才到内容目录。
const DOCS_ROOT = join(import.meta.dirname, '../../../content')

// 门类与 content/ 下的目录一一对应；顺序即侧栏顺序。
// link 前缀即 URL 前缀；label 是侧栏分组标题。
const CATEGORIES: { dir: string; prefix: string; label: string }[] = [
  { dir: 'passages', prefix: '/passages', label: '随笔 · Passages' },
  { dir: 'dialogues', prefix: '/dialogues', label: '对话 · Dialogues' },
  { dir: 'concepts', prefix: '/concepts', label: '概念 · Concepts' },
  { dir: 'notes', prefix: '/notes', label: '笔记 · Notes' },
  { dir: 'maps', prefix: '/maps', label: '图谱 · Maps' },
  { dir: 'reflections', prefix: '/reflections', label: '反思 · Reflections' },
  { dir: 'ideas', prefix: '/ideas', label: '短想法 · Ideas' },
]

function extractTitle(filePath: string): string | null {
  try {
    const content = readFileSync(filePath, 'utf-8')
    const fmMatch = content.match(/^---[\s\S]*?^title:\s*['"]?(.+?)['"]?\s*$/m)
    if (fmMatch) return fmMatch[1]
    const h1 = content.match(/^#\s+(.+)$/m)
    if (h1) return h1[1].replace(/\{.*?\}/g, '').trim()
  } catch { /* ignore */ }
  return null
}

function humanize(name: string): string {
  return name
    .replace(/^\d+[-_]?/, '')
    .replace(/[-_]/g, ' ')
    .trim()
}

// 数字前缀（01-、02-）优先排序，否则按中文 localeCompare。
function sortEntries(a: string, b: string): number {
  const na = a.match(/^(\d+)/)?.[1]
  const nb = b.match(/^(\d+)/)?.[1]
  if (na && nb) return parseInt(na) - parseInt(nb)
  if (na) return -1
  if (nb) return 1
  return a.localeCompare(b, 'zh-CN')
}

function scanDir(dir: string, urlPrefix: string, depth = 0): SidebarItem[] {
  if (depth > 5) return []

  let entries: string[]
  try {
    entries = readdirSync(dir).filter(e =>
      !e.startsWith('.') && e !== 'public' && e !== 'images',
    )
  } catch { return [] }

  entries.sort(sortEntries)
  const items: SidebarItem[] = []

  for (const name of entries) {
    const fullPath = join(dir, name)
    if (!statSync(fullPath).isDirectory() && !name.endsWith('.md')) continue

    if (statSync(fullPath).isDirectory()) {
      const subItems = scanDir(fullPath, `${urlPrefix}/${name}`, depth + 1)
      const indexPath = join(fullPath, 'index.md')
      const title = extractTitle(indexPath) || humanize(name)

      if (subItems.length > 0) {
        items.push({
          text: title,
          link: existsSync(indexPath) ? `${urlPrefix}/${name}/` : undefined,
          items: subItems,
          collapsed: depth > 0,
        })
      } else if (existsSync(indexPath)) {
        items.push({ text: title, link: `${urlPrefix}/${name}/` })
      }
    } else if (name !== 'index.md') {
      const title = extractTitle(fullPath) || humanize(name.replace(/\.md$/, ''))
      items.push({ text: title, link: `${urlPrefix}/${name.replace(/\.md$/, '')}` })
    }
  }

  return items
}

export function buildSidebar(): DefaultTheme.Sidebar {
  const sidebar: DefaultTheme.Sidebar = {}

  for (const { dir, prefix, label } of CATEGORIES) {
    const dirPath = join(DOCS_ROOT, dir)
    const items = scanDir(dirPath, prefix)
    if (items.length > 0) {
      sidebar[`${prefix}/`] = [{ text: label, items, collapsed: false }]
    }
  }

  return sidebar
}
