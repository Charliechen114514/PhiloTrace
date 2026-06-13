import { createContentLoader } from 'vitepress'

/**
 * 内容流：聚合"会持续产出、带日期"的门类，按日期倒序，供首页"最近更新"使用。
 *
 * glob 模式相对 srcDir（= 仓库根 content/）。
 * 想加门类就在花括号里加；纯文档类（notes/concepts/maps）不放进"最近更新"流。
 *
 * frontmatter 约定（必须）：
 *   date: "2026-06-13"   ← 引号包起来，避免 YAML 自动解析成 Date 对象
 *   draft: true          ← 草稿不会出现在列表里
 */
export default createContentLoader('{passages,ideas,dialogues,reflections}/*.md', {
  includeSrc: false,
  render: false,
  excerpt: false,
  transform(raw) {
    return raw
      .filter((p) => p.frontmatter.draft !== true && p.frontmatter.date)
      .sort((a, b) => {
        const da = new Date(a.frontmatter.date as string).getTime()
        const db = new Date(b.frontmatter.date as string).getTime()
        return db - da
      })
  },
})
