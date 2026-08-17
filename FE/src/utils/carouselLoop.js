export function createLoopSlides(items) {
  if (items.length <= 1) {
    return items.map((article, index) => ({
      article,
      key: `slide-${article.id ?? index}`,
      logicalIndex: index,
      clone: false,
    }))
  }

  const originals = items.map((article, index) => ({
    article,
    key: `slide-${article.id ?? index}`,
    logicalIndex: index,
    clone: false,
  }))

  return [
    {
      article: items.at(-1),
      key: `clone-last-${items.at(-1)?.id ?? items.length - 1}`,
      logicalIndex: items.length - 1,
      clone: true,
    },
    ...originals,
    {
      article: items[0],
      key: `clone-first-${items[0]?.id ?? 0}`,
      logicalIndex: 0,
      clone: true,
    },
  ]
}

export function logicalIndexFromRendered(renderedIndex, itemCount) {
  if (itemCount <= 1) return 0
  if (renderedIndex <= 0) return itemCount - 1
  if (renderedIndex >= itemCount + 1) return 0
  return renderedIndex - 1
}

export function canonicalRenderedIndex(renderedIndex, itemCount) {
  if (itemCount <= 1) return 0
  if (renderedIndex <= 0) return itemCount
  if (renderedIndex >= itemCount + 1) return 1
  return renderedIndex
}
