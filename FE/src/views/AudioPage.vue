<template>
  <PageFrame :show-breaking="false">
    <main ref="audioScreen" class="audio-screen">
      <header class="page-heading audio-heading">
        <div>
          <h1>TIN AUDIO</h1>
          <p>Bản tin âm thanh chính thức từ các đơn vị</p>
        </div>
        <span class="count-badge">12 bản tin</span>
      </header>

      <section class="audio-section" aria-labelledby="featured-audio">
        <div class="section-title with-icon">
          <img :src="audioStar" alt="" />
          <h2 id="featured-audio">AUDIO NỔI BẬT</h2>
        </div>
        <div class="section-rule"></div>
        <article class="featured-audio">
          <span class="category-badge">ĐỐI NGOẠI</span>
          <h3>
            <router-link :to="`/article/${episodes[0].id}`">{{ episodes[0].title }}</router-link>
          </h3>
          <p class="featured-meta">Đối ngoại · 14/08/2026 · 05:32</p>
          <p class="featured-summary">
            Tổng hợp diễn biến đối ngoại và các hoạt động chính thức đáng chú ý trong ngày.
          </p>
          <div class="featured-actions">
            <button type="button" @click="playEpisode(episodes[0])">
              <img :src="audioPlay" alt="" /> Nghe bản tin
            </button>
            <router-link to="/article/a1">Bản chữ</router-link>
          </div>
          <div class="trust-note">
            <img :src="audioTranscript" alt="" />
            <span
              ><strong>Có bản chữ / Transcript</strong
              ><small>Nguồn: Phòng Tin tức · Cập nhật 08:15</small></span
            >
          </div>
        </article>
      </section>

      <section class="audio-section" aria-labelledby="latest-audio">
        <div class="section-title">
          <h2 id="latest-audio">AUDIO MỚI NHẤT</h2>
          <button type="button">Xem tất cả</button>
        </div>
        <div class="audio-list">
          <AudioCard
            v-for="episode in episodes.slice(1)"
            :key="episode.id"
            :episode="episode"
            @play="playEpisode"
          />
        </div>
      </section>

      <section class="audio-section" aria-labelledby="recent-audio">
        <div class="section-title"><h2 id="recent-audio">CÁC TẬP GẦN ĐÂY</h2></div>
        <div class="audio-list">
          <AudioCard
            v-for="episode in recentEpisodes"
            :key="episode.id"
            :episode="episode"
            @play="playEpisode"
          />
        </div>
      </section>

      <section class="audio-section" aria-labelledby="programs-audio">
        <div class="section-title"><h2 id="programs-audio">CHƯƠNG TRÌNH AUDIO</h2></div>
        <div class="program-grid">
          <article
            v-for="(program, index) in programs"
            :key="program.name"
            :class="{ active: index === 0 }"
          >
            <span></span>
            <h3>{{ program.name }}</h3>
            <p>{{ program.description }}</p>
            <small>{{ program.count }} tập</small>
          </article>
        </div>
      </section>
      <button class="audio-load-more" type="button">Xem thêm tin audio</button>
    </main>
  </PageFrame>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import PageFrame from '../components/PageFrame.vue'
import AudioCard from '../components/AudioCard.vue'
import { useAppState } from '../composables/useAppState'
import audioStar from '../assets/figma/audio-star.svg'
import audioPlay from '../assets/figma/audio-play.svg'
import audioTranscript from '../assets/figma/audio-transcript.svg'

const episodes = [
  {
    id: 'audio-featured',
    category: 'ĐỐI NGOẠI',
    title: 'Bản tin ngoại giao sáng: Việt Nam chủ động hội nhập',
    date: '14/08/2026',
    duration: 332,
    durationLabel: '05:32',
    audioUrl: '',
  },
  {
    id: 'audio-2',
    category: 'ĐIỂM TIN',
    title: 'Điểm tin quốc tế ngày 14/08/2026',
    date: '14/08/2026',
    duration: 288,
    durationLabel: '04:48',
    audioUrl: '',
  },
  {
    id: 'audio-3',
    category: 'ĐỐI NGOẠI',
    title: 'Hoạt động đối ngoại Việt Nam tuần qua',
    date: '13/08/2026',
    duration: 375,
    durationLabel: '06:15',
    audioUrl: '',
  },
  {
    id: 'audio-4',
    category: 'AN NINH',
    title: 'Bảo hộ công dân: Những điều cần biết',
    date: '13/08/2026',
    duration: 306,
    durationLabel: '05:06',
    audioUrl: '',
  },
  {
    id: 'audio-5',
    category: 'VĂN HÓA',
    title: 'Câu chuyện ngoại giao văn hóa Việt Nam',
    date: '12/08/2026',
    duration: 440,
    durationLabel: '07:20',
    audioUrl: '',
  },
]
const recentEpisodes = [
  {
    id: 'audio-6',
    category: 'Đối ngoại',
    title: 'Việt Nam và các đối tác: Tuần qua',
    date: '11/08/2026',
    duration: 490,
    durationLabel: '08:10',
    audioUrl: '',
  },
  {
    id: 'audio-7',
    category: 'Chuyên đề',
    title: 'Giải thích chính sách đối ngoại',
    date: '09/08/2026',
    duration: 402,
    durationLabel: '06:42',
    audioUrl: '',
  },
]
const programs = [
  { name: 'ĐIỂM TIN', description: 'Tin tổng hợp mỗi ngày', count: 24 },
  { name: 'ĐỐI NGOẠI', description: 'Hoạt động chính thức', count: 18 },
  { name: 'CHUYÊN ĐỀ', description: 'Phân tích và chính sách', count: 12 },
]
const audioScreen = ref(null)
let revealObserver
let animationContext
const { state, play, toggle } = useAppState()
function playEpisode(episode) {
  state.current?.id === episode.id ? toggle() : play(episode)
}

onMounted(async () => {
  await nextTick()
  if (!audioScreen.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  animationContext = gsap.context(() => {
    gsap.from('.audio-heading > *', {
      y: 14,
      autoAlpha: 0,
      duration: 0.48,
      stagger: 0.08,
      ease: 'power2.out',
    })

    const sections = gsap.utils.toArray('.audio-section')
    gsap.set(sections, { y: 24, autoAlpha: 0 })
    gsap.set('.audio-load-more', { y: 16, autoAlpha: 0 })

    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const section = entry.target
          gsap.to(section, {
            y: 0,
            autoAlpha: 1,
            duration: 0.58,
            ease: 'power3.out',
            clearProps: 'transform',
          })
          const cards = section.querySelectorAll('.audio-card, .program-grid article')
          if (cards.length) {
            gsap.fromTo(
              cards,
              { y: 12, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.4,
                stagger: 0.065,
                ease: 'power2.out',
                delay: 0.08,
                clearProps: 'transform',
              },
            )
          }
          revealObserver.unobserve(section)
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -28px' },
    )

    sections.forEach((section) => revealObserver.observe(section))
    const loadMore = audioScreen.value.querySelector('.audio-load-more')
    if (loadMore) revealObserver.observe(loadMore)
  }, audioScreen.value)
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
  animationContext?.revert()
})
</script>

<style scoped>
.audio-screen {
  --audio-gutter: 5px;
  width: min(100%, 390px);
  min-height: 1610px;
  margin: 0 auto;
  padding: 5px var(--audio-gutter) 254px;
  background: #f7f8fa;
}
.audio-heading {
  margin: 0 0 16px;
  align-items: center;
}
.audio-heading h1 {
  font-size: 24px;
  line-height: 28px;
}
.audio-heading p {
  margin-top: 3px;
  color: #878a99;
}
.audio-heading .count-badge {
  padding: 4px 8px;
  background: #ebf5fc;
  font-size: 12px;
}
.audio-section {
  margin-bottom: 20px;
}
.section-title {
  min-height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.section-title.with-icon {
  justify-content: flex-start;
}
.section-title > img {
  width: 16px;
  height: 16px;
}
.section-title h2 {
  margin: 0;
  color: #165fa0;
  font-size: 16px;
  line-height: 20px;
}
.section-title button {
  border: 0;
  padding: 4px;
  background: transparent;
  color: #165fa0;
  font-size: 12px;
}
.section-rule {
  height: 1px;
  margin: 5px 0 10px;
  background: rgba(22, 95, 160, 0.35);
}
.featured-audio {
  min-height: 260px;
  padding: 14px;
  overflow: hidden;
  border: 1px solid #165fa0;
  border-radius: 6px;
  background: #093052;
  color: white;
  transition:
    box-shadow 0.25s ease,
    transform 0.25s ease;
}
.featured-audio:hover {
  box-shadow: 0 10px 24px rgba(9, 48, 82, 0.16);
  transform: translateY(-2px);
}
.category-badge {
  display: inline-flex;
  padding: 3px 7px;
  border-radius: 3px;
  background: #c8403c;
  font-size: 11px;
  font-weight: 700;
}
.featured-audio h3 {
  margin: 7px 0;
  font-size: 20px;
  line-height: 24px;
}
.featured-audio h3 a {
  color: inherit;
  text-decoration: none;
}
.featured-meta {
  margin: 0;
  color: #c7e3f7;
  font-size: 12px;
  font-weight: 500;
}
.featured-summary {
  margin: 7px 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 13px;
  line-height: 17px;
}
.featured-actions {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.featured-actions button,
.featured-actions a {
  min-height: 32px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 13px;
  text-decoration: none;
}
.featured-actions img {
  width: 16px;
  height: 16px;
}
.featured-actions button {
  border: 0;
  background: white;
  color: #165fa0;
}
.featured-actions a {
  border: 1px solid white;
  color: white;
}
.trust-note {
  min-height: 44px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.96);
  color: #165fa0;
}
.trust-note > img {
  width: 18px;
  height: 18px;
}
.trust-note span {
  display: flex;
  flex-direction: column;
}
.trust-note strong {
  font-size: 12px;
}
.trust-note small {
  color: #878a99;
  font-size: 11px;
}
.audio-list {
  width: auto;
  margin-top: 8px;
  margin-inline: calc(var(--audio-gutter) * -1);
  padding-inline: var(--audio-gutter);
  overflow: hidden;
  background: white;
}

.audio-list :deep(.audio-card + .audio-card) {
  border-top: 1px solid var(--tina-border);
}
.featured-audio h3 a:focus-visible {
  outline: 2px solid var(--tina-blue);
  outline-offset: 2px;
}
.program-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 10px;
}
.program-grid article {
  min-height: 126px;
  padding: 12px 10px;
  border: 1px solid #d1d9e3;
  border-radius: 4px;
  background: white;
}
.program-grid article.active {
  border-color: #165fa0;
  background: #f0f7fe;
}
.program-grid span {
  display: block;
  width: 28px;
  height: 3px;
  border-radius: 2px;
  background: #165fa0;
}
.program-grid h3 {
  margin: 8px 0 7px;
  color: #165fa0;
  font-size: 13px;
}
.program-grid p {
  min-height: 32px;
  margin: 0 0 7px;
  color: #212529;
  font-size: 12px;
  line-height: 16px;
}
.program-grid small {
  color: #878a99;
  font-size: 11px;
}
.audio-load-more {
  width: 100%;
  min-height: 42px;
  border: 1px solid #165fa0;
  border-radius: 4px;
  background: white;
  color: #165fa0;
  font-size: 13px;
  font-weight: 500;
}
@media (max-width: 370px) {
  .audio-screen {
    --audio-gutter: 10px;
  }
  .program-grid {
    gap: 5px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .featured-audio {
    transition: none;
  }
  .featured-audio:hover {
    transform: none;
  }
}
</style>
