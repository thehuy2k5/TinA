<template>
  <PageFrame
    ><main class="screen">
      <section ref="leadCluster" class="lead-cluster" aria-label="Điều hướng và tin nổi bật">
        <CategoryFilter v-model="filter" :items="homeCategories" />
        <FeaturedArticleCarousel :items="featuredArticles" />
      </section>
      <SectionHeading :title="sectionTitle" :meta="`${filteredArticles.length} tin`" />
      <div v-if="visibleArticles.length" ref="articleList" class="news-list">
        <NewsCard v-for="item in visibleArticles" :key="item.id" :article="item" />
      </div>
      <div v-else class="empty-state">Chưa có bài viết trong chuyên mục này.</div>
      <router-link class="load-more all-news-link" to="/latest">Xem tất cả tin mới</router-link>
      <SectionHeading title="TIN NỔI BẬT" action="Xem tất cả" to="/featured" />
      <div class="horizontal-scroll">
        <article v-for="item in filteredArticles.slice(0, 3)" :key="item.id" class="mini-feature">
          <div :class="item.tone"></div>
          <strong>{{ item.title }}</strong
          ><small>{{ item.time }} • {{ item.date }}</small>
        </article>
      </div>
      <SectionHeading title="KHÁM PHÁ CHỦ ĐỀ" />
      <GsapHorizontalCarousel :items="topics" label="chủ đề" :per-view="3">
        <template #default="{ item }">
          <article class="topic-card">
            <strong>{{ item.name }}</strong>
            <small>{{ item.count }} tin nổi bật</small>
          </article>
        </template>
      </GsapHorizontalCarousel>
      <SectionHeading title="NGHE TIN AUDIO" action="Xem tất cả" to="/audio" />
      <div class="audio-feed compact">
        <AudioCard
          v-for="episode in audioEpisodes.slice(0, 2)"
          :key="episode.id"
          :episode="episode"
          @play="play"
        />
      </div>
      <SectionHeading title="VIDEO MỚI" />
      <GsapHorizontalCarousel :items="videos" label="video mới" :per-view="2">
        <template #default="{ item }">
          <article class="video-card">
            <div class="video-cover" :class="item.tone">
              <ion-icon :icon="playCircleOutline" />
              <span>{{ item.duration }}</span>
            </div>
            <div class="video-copy">
              <small>{{ item.category }}</small>
              <strong>{{ item.title }}</strong>
            </div>
          </article>
        </template>
      </GsapHorizontalCarousel>
    </main></PageFrame
  >
</template>
<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { IonIcon } from '@ionic/vue'
import { playCircleOutline } from 'ionicons/icons'
import { RouterLink } from 'vue-router'
import PageFrame from '../components/PageFrame.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import FeaturedArticleCarousel from '../components/FeaturedArticleCarousel.vue'
import SectionHeading from '../components/SectionHeading.vue'
import NewsCard from '../components/NewsCard.vue'
import AudioCard from '../components/AudioCard.vue'
import GsapHorizontalCarousel from '../components/GsapHorizontalCarousel.vue'
import { articles, audioEpisodes, categories } from '../services/contentService'
import { useAppState } from '../composables/useAppState'
import { filterArticlesByCategory } from '../utils/articleFilters'
const filter = ref('all')
const visibleCount = ref(3)
const articleList = ref(null)
const leadCluster = ref(null)
const homeCategories = computed(() => [
  { id: 'all', name: 'Nổi bật' },
  ...categories.filter((item) => item.id !== 'all').slice(1),
])

const filteredArticles = computed(() =>
  filterArticlesByCategory(articles, categories, filter.value),
)

const featuredArticles = computed(() =>
  filteredArticles.value
    .filter((article) => article.featured)
    .concat(filteredArticles.value.filter((article) => !article.featured).slice(0, 3)),
)
const visibleArticles = computed(() => filteredArticles.value.slice(0, visibleCount.value))
const sectionTitle = computed(() => {
  const selected = homeCategories.value.find((item) => item.id === filter.value)
  return filter.value === 'all' ? 'TIN MỚI NHẤT' : selected?.name.toUpperCase() || 'TIN MỚI NHẤT'
})

watch(filter, () => {
  visibleCount.value = 3
})

function animateArticleList() {
  const cards = articleList.value?.children
  if (!cards?.length) return
  const reduceMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) return

  gsap.killTweensOf(cards)
  gsap.fromTo(
    cards,
    { autoAlpha: 0, y: 14 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.38,
      stagger: 0.055,
      ease: 'power2.out',
      clearProps: 'transform,opacity,visibility',
    },
  )
}

watch(
  [filter, visibleCount],
  async () => {
    await nextTick()
    animateArticleList()
  },
  { flush: 'post' },
)

onMounted(async () => {
  await nextTick()
  animateArticleList()

  const reduceMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduceMotion && leadCluster.value) {
    const clusterParts = leadCluster.value.querySelectorAll('.filters, .featured-carousel')
    gsap.fromTo(
      clusterParts,
      { autoAlpha: 0, y: 8 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.42,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform,opacity,visibility',
      },
    )
  }
})

onBeforeUnmount(() => {
  if (articleList.value) gsap.killTweensOf(articleList.value.children)
  if (leadCluster.value)
    gsap.killTweensOf(leadCluster.value.querySelectorAll('.filters, .featured-carousel'))
})
const topics = [
  { id: 'vietnam', name: 'Việt Nam', count: 24 },
  { id: 'east-sea', name: 'Biển Đông', count: 18 },
  { id: 'southeast-asia', name: 'Đông Nam Á', count: 15 },
  { id: 'europe', name: 'Châu Âu', count: 12 },
  { id: 'americas', name: 'Châu Mỹ', count: 9 },
  { id: 'middle-east', name: 'Trung Đông', count: 11 },
]
const videos = [
  {
    id: 'v1',
    title: 'Thông điệp của Chủ tịch nước Lương Cường',
    category: 'Đối ngoại',
    duration: '03:24',
    tone: 'blue',
  },
  {
    id: 'v2',
    title: 'Vietnam Today chính thức phát sóng',
    category: 'Điểm tin',
    duration: '05:18',
    tone: 'red',
  },
  {
    id: 'v3',
    title: 'Dấu ấn ngoại giao Việt Nam trong tuần',
    category: 'Chuyên đề',
    duration: '06:42',
    tone: 'navy',
  },
  {
    id: 'v4',
    title: 'Hợp tác Việt Nam và các đối tác quốc tế',
    category: 'Quốc tế',
    duration: '04:10',
    tone: 'blue',
  },
]
const { play } = useAppState()
</script>
<style scoped>
.screen {
  --home-gutter: 16px;
  padding-top: 0;
}
.lead-cluster {
  margin-inline: calc(var(--home-gutter) * -1);
  padding: 0 0 9px;
  border-bottom: 1px solid #dbe4ed;
  background: #fff;
}
.lead-cluster :deep(.filters) {
  margin: 0 0 8px;
}
.lead-cluster :deep(.featured) {
  border-radius: 4px;
  box-shadow: none;
}
.lead-cluster :deep(.carousel-progress) {
  margin-top: 8px;
}

.lead-cluster :deep(.featured-carousel) {
  margin-inline: 8px;
}
.load-more {
  margin-top: 12px;
}
.all-news-link {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.news-list {
  width: auto;
  margin-inline: calc(var(--home-gutter) * -1);
  padding-inline: var(--home-gutter);
  overflow: hidden;
  background: #fff;
}

.news-list :deep(.news-card + .news-card) {
  border-top: 1px solid var(--tina-border);
}
.mini-feature {
  flex: 0 0 244px;
  min-height: 168px;
  background: #fff;
  border: 1px solid var(--tina-border);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: var(--tina-shadow);
}
.mini-feature > div {
  height: 88px;
  background: linear-gradient(135deg, #165fa0, #6d99c7);
}
.mini-feature > div.red {
  background: linear-gradient(135deg, #c8403c, #6f191f);
}
.mini-feature strong,
.mini-feature small {
  display: block;
  padding: 8px 12px 0;
}
.mini-feature small {
  color: var(--tina-muted);
  font-size: 12px;
}
.audio-feed {
  width: auto;
  margin-inline: calc(var(--home-gutter) * -1);
  padding-inline: var(--home-gutter);
  overflow: hidden;
  background: #fff;
}

.audio-feed :deep(.audio-card + .audio-card) {
  border-top: 1px solid var(--tina-border);
}
.topic-card {
  min-height: 88px;
  padding: 12px 10px;
  border: 1px solid var(--tina-gold);
  border-radius: 12px;
  background: #ffedb4;
  box-shadow: 0 4px 12px rgba(148, 99, 20, 0.08);
}
.topic-card strong,
.topic-card small {
  display: block;
}
.topic-card strong {
  font-size: 13px;
  line-height: 16px;
}
.topic-card small {
  margin-top: 5px;
  color: #946314;
  font-size: 10px;
  line-height: 13px;
}
.video-card {
  min-height: 154px;
  background: #fff;
  border: 1px solid var(--tina-border);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--tina-shadow);
}
.video-cover {
  position: relative;
  height: 92px;
  background: #0c73b9;
  display: grid;
  place-items: center;
  color: #fff;
}
.video-cover.red {
  background: #f03d3d;
}
.video-cover.navy {
  background: var(--tina-blue-dark);
}
.video-cover ion-icon {
  font-size: 34px;
  opacity: 0.78;
}
.video-cover span {
  position: absolute;
  right: 7px;
  bottom: 7px;
  padding: 3px 6px;
  border-radius: 6px;
  background: rgba(5, 20, 34, 0.72);
  font-size: 9px;
}
.video-copy {
  display: block;
  padding: 10px;
}
.video-copy small {
  display: block;
  margin-bottom: 4px;
  color: var(--tina-red);
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
}
.video-copy strong {
  display: block;
  font-size: 12px;
  line-height: 16px;
}
@media (max-width: 370px) {
  .screen {
    --home-gutter: 10px;
  }
}
</style>
