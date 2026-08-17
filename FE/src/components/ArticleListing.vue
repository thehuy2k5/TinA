<template>
  <main ref="listingScreen" class="screen">
    <div class="page-heading">
      <div>
        <h1>{{ title }}</h1>
        <p>{{ subtitle }}</p>
      </div>
      <span class="count-badge">{{ countLabel }}</span>
    </div>
    <label v-if="variant !== 'latest'" class="search-box"
      ><ion-icon :icon="searchOutline" /><input
        v-model="query"
        :placeholder="searchPlaceholder" /><ion-icon :icon="filterOutline" /></label
    ><CategoryFilter
      v-model="category"
      :items="filters"
      :class="{ 'home-style-filter': variant === 'latest' }"
    /><SectionHeading class="latest-today-heading" :title="heroHeading" /><FeaturedArticleCard
      class="latest-featured"
      :article="heroArticle"
      :badge="heroBadge"
    />
    <div v-if="variant === 'latest' && todayArticles.length" class="news-list today-list">
      <NewsCard v-for="item in todayArticles" :key="item.id" :article="item" />
    </div>
    <SectionHeading
      v-if="variant !== 'latest' || listArticles.length"
      class="latest-older-heading"
      :title="listHeading"
    />
    <div v-if="listArticles.length" class="news-list older-list">
      <NewsCard v-for="item in displayedArticles" :key="item.id" :article="item" />
    </div>
    <p v-else-if="!todayArticles.length" class="empty-state">Không tìm thấy bài viết phù hợp.</p>
    <SectionHeading :title="topicsHeading" />
    <div class="topic-grid">
      <div v-for="topic in topics" :key="topic" class="topic">
        <strong>{{ topic }}</strong
        ><small>{{ analysis ? '6 bài phân tích' : '8 bài mới' }}</small>
      </div>
    </div>
    <button v-if="hasMore" class="load-more" type="button" @click="showMore">
      {{ loadMore }}
    </button>
  </main>
</template>
<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { IonIcon } from '@ionic/vue'
import { gsap } from 'gsap'
import { filterOutline, searchOutline } from 'ionicons/icons'
import { articles, categories } from '../services/contentService'
import CategoryFilter from './CategoryFilter.vue'
import SectionHeading from './SectionHeading.vue'
import FeaturedArticleCard from './FeaturedArticleCard.vue'
import NewsCard from './NewsCard.vue'
import { filterArticlesByCategory } from '../utils/articleFilters'
const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  countLabel: { type: String, required: true },
  variant: { type: String, default: 'latest' },
})
const query = ref(''),
  category = ref('all')
const listingScreen = ref(null)
let animationContext
const analysis = props.variant === 'analysis'
const filters = computed(() =>
  analysis
    ? [
        { id: 'all', name: 'Tất cả' },
        { id: 'politics', name: 'Chính trị' },
        ...categories.filter((c) => ['foreign', 'economy', 'security'].includes(c.id)),
      ]
    : categories.slice(0, 5),
)
const source = computed(() =>
  analysis
    ? articles.map((a, i) => ({
        ...a,
        readTime: a.readTime ?? 6 + i,
        author: a.author ?? 'Ban Phân tích',
      }))
    : articles,
)
const newestArticle = computed(
  () => [...articles].sort((a, b) => articleTimestamp(b) - articleTimestamp(a))[0],
)
const heroArticle = computed(() =>
  analysis
    ? {
        ...articles[0],
        title: 'Cục diện hợp tác quốc tế trong bối cảnh cạnh tranh chiến lược',
        summary: 'Phân tích xu hướng, tác động và những lựa chọn chính sách đối với Việt Nam.',
      }
    : props.variant === 'featured'
      ? { ...articles[0], title: 'Việt Nam khẳng định vai trò chủ động trong hợp tác quốc tế' }
      : newestArticle.value,
)
const visibleCount = ref(3)
const filtered = computed(() => {
  const withoutHero = source.value.filter((article) => article.id !== heroArticle.value.id)
  const byCategory = filterArticlesByCategory(withoutHero, categories, category.value)
  return byCategory.filter(
    (article) => !query.value || article.title.toLowerCase().includes(query.value.toLowerCase()),
  )
})
const todayDate = computed(() => heroArticle.value.date)
const todayArticles = computed(() => {
  if (props.variant !== 'latest') return []
  return filtered.value
    .filter((article) => article.date === todayDate.value)
    .sort((a, b) => articleTimestamp(b) - articleTimestamp(a))
})
const listArticles = computed(() => {
  if (props.variant !== 'latest') return filtered.value
  return filtered.value
    .filter((article) => article.date !== todayDate.value)
    .sort((a, b) => articleTimestamp(b) - articleTimestamp(a))
})
const displayedArticles = computed(() => listArticles.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < listArticles.value.length)

function articleTimestamp(article) {
  const [day, month, year] = article.date.split('/').map(Number)
  const [hour = 0, minute = 0] = (article.time || '').split(':').map(Number)
  return new Date(year, month - 1, day, hour, minute).getTime()
}

watch([query, category], async () => {
  visibleCount.value = 3
  await nextTick()
  animateLatestContent()
})

async function showMore() {
  const previousCount = displayedArticles.value.length
  visibleCount.value += 3
  await nextTick()

  if (!canAnimateLatest()) return
  const newCards = Array.from(
    listingScreen.value?.querySelectorAll('.older-list .news-card') || [],
  ).slice(previousCount)
  gsap.fromTo(
    newCards,
    { autoAlpha: 0, y: 14 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.38,
      stagger: 0.06,
      ease: 'power2.out',
      clearProps: 'transform,opacity,visibility',
    },
  )
}

function canAnimateLatest() {
  const reduceMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return props.variant === 'latest' && listingScreen.value && !reduceMotion
}

function animateLatestContent() {
  if (!canAnimateLatest()) return
  const cards = listingScreen.value.querySelectorAll('.news-list .news-card')
  gsap.killTweensOf(cards)
  gsap.fromTo(
    cards,
    { autoAlpha: 0, y: 12 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.36,
      stagger: 0.045,
      ease: 'power2.out',
      clearProps: 'transform,opacity,visibility',
    },
  )
}

onMounted(async () => {
  await nextTick()
  if (!canAnimateLatest()) return

  animationContext = gsap.context(() => {
    gsap.from('.page-heading > *, .home-style-filter', {
      autoAlpha: 0,
      y: 8,
      duration: 0.4,
      stagger: 0.07,
      ease: 'power2.out',
    })
    gsap.from('.latest-today-heading, .latest-featured', {
      autoAlpha: 0,
      y: 14,
      duration: 0.48,
      stagger: 0.08,
      ease: 'power3.out',
      delay: 0.08,
    })
    animateLatestContent()
  }, listingScreen.value)
})

onBeforeUnmount(() => {
  animationContext?.revert()
})
const searchPlaceholder = analysis
  ? 'Lọc trong bài phân tích'
  : props.variant === 'featured'
    ? 'Lọc danh sách nổi bật'
    : 'Lọc trong danh sách tin mới'
const heroHeading = computed(() =>
  analysis
    ? 'HỒ SƠ PHÂN TÍCH'
    : props.variant === 'featured'
      ? 'TIÊU ĐIỂM LÃNH ĐẠO'
      : `HÔM NAY • ${todayDate.value}`,
)
const heroBadge = analysis
  ? 'PHÂN TÍCH'
  : props.variant === 'featured'
    ? 'TIN TIÊU ĐIỂM'
    : 'MỚI CẬP NHẬT'
const listHeading = computed(() =>
  analysis
    ? 'NGHIÊN CỨU MỚI'
    : props.variant === 'featured'
      ? 'TIN NỔI BẬT KHÁC'
      : `HÔM QUA • ${listArticles.value[0]?.date || ''}`,
)
const topicsHeading = analysis ? 'HỒ SƠ CHỦ ĐỀ' : 'KHÁM PHÁ CHUYÊN MỤC'
const topics = analysis
  ? ['Địa chính trị', 'Quan hệ', 'Kinh tế']
  : props.variant === 'featured'
    ? ['Lãnh đạo', 'Đối ngoại', 'Kinh tế']
    : ['Chính trị', 'An ninh', 'Kinh tế']
const loadMore = analysis
  ? 'Xem thêm bài phân tích'
  : props.variant === 'featured'
    ? 'Xem thêm tin nổi bật'
    : 'Xem thêm tin'
</script>
<style scoped>
.screen {
  --listing-gutter: 16px;
}

.news-list {
  width: auto;
  margin-inline: calc(var(--listing-gutter) * -1);
  padding-inline: var(--listing-gutter);
  overflow: hidden;
  background: #fff;
}

.news-list :deep(.news-card + .news-card) {
  border-top: 1px solid var(--tina-border);
}

.today-list {
  margin-top: -4px;
}

.home-style-filter {
  width: auto;
  margin-inline: calc(var(--listing-gutter) * -1);
}

.load-more {
  min-height: 40px;
  margin-top: 16px;
  border: 1px solid var(--tina-border);
  border-radius: 6px;
  background: #fff;
  color: var(--tina-blue-dark);
  font-size: 11px;
  font-weight: 700;
}

@media (max-width: 370px) {
  .screen {
    --listing-gutter: 10px;
  }
}
</style>
