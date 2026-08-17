export function normalizeCategory(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
}

export function filterArticlesByCategory(articles, categories, selectedId) {
  if (selectedId === 'all') return articles

  const selected = categories.find((item) => item.id === selectedId)
  if (!selected) return articles

  const selectedName = normalizeCategory(selected.name)
  return articles.filter((article) => normalizeCategory(article.category).includes(selectedName))
}
