<template>
  <section
    class="featured-carousel"
    role="region"
    aria-roledescription="carousel"
    aria-label="Tin nổi bật"
  >
    <div
      ref="track"
      class="carousel-track"
      tabindex="0"
      @scroll.passive="handleScroll"
      @keydown.left.prevent="previous"
      @keydown.right.prevent="next"
    >
      <div
        v-for="slide in loopSlides"
        :key="slide.key"
        class="carousel-slide"
        role="group"
        aria-roledescription="slide"
        :aria-label="`${slide.logicalIndex + 1} / ${items.length}`"
        :aria-hidden="slide.clone"
      >
        <FeaturedArticleCard :article="slide.article" />
      </div>
    </div>

    <div v-if="items.length > 1" class="carousel-progress" aria-hidden="true">
      <span ref="progressIndicator" :style="progressStyle"></span>
    </div>

    <p class="sr-only" aria-live="polite">
      Đang xem tin {{ activeIndex + 1 }} trên {{ items.length }}
    </p>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { gsap } from 'gsap'
import FeaturedArticleCard from './FeaturedArticleCard.vue'
import {
  canonicalRenderedIndex,
  createLoopSlides,
  logicalIndexFromRendered,
} from '../utils/carouselLoop'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const track = ref(null)
const progressIndicator = ref(null)
const activeIndex = ref(0)
const loopSlides = computed(() => createLoopSlides(props.items))
let animationFrame = 0
let settleTimer = 0
let lastAnimatedIndex = -1

const progressStyle = computed(() => ({
  width: `${100 / Math.max(props.items.length, 1)}%`,
}))

function allowsMotion() {
  return (
    typeof window.matchMedia !== 'function' ||
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function animateActiveSlide(renderedIndex) {
  if (!allowsMotion() || !track.value) return
  const slides = track.value.querySelectorAll('.carousel-slide')
  const activeSlide = slides[renderedIndex]
  if (!activeSlide) return

  gsap.killTweensOf(slides)
  gsap.set(slides, { clearProps: 'transform,opacity' })
  gsap.fromTo(
    activeSlide,
    { autoAlpha: 0.82, scale: 0.975, y: 8 },
    { autoAlpha: 1, scale: 1, y: 0, duration: 0.42, ease: 'power3.out', overwrite: true },
  )
}

function getStep() {
  const firstSlide = track.value?.querySelector('.carousel-slide')
  if (!firstSlide || !track.value) return 0

  const styles = window.getComputedStyle(track.value)
  const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0

  return firstSlide.getBoundingClientRect().width + gap
}

function syncActiveIndex() {
  animationFrame = 0
  const step = getStep()
  if (!step || !track.value) return

  const renderedIndex = Math.round(track.value.scrollLeft / step)
  const logicalIndex = logicalIndexFromRendered(renderedIndex, props.items.length)
  activeIndex.value = logicalIndex
  if (lastAnimatedIndex !== logicalIndex) {
    lastAnimatedIndex = logicalIndex
    animateActiveSlide(renderedIndex)
  }
}

function handleScroll() {
  if (!animationFrame) animationFrame = window.requestAnimationFrame(syncActiveIndex)
  window.clearTimeout(settleTimer)
  settleTimer = window.setTimeout(settleLoopPosition, 90)
}

function goToRendered(renderedIndex, behavior = 'smooth') {
  const step = getStep()
  if (!step || !track.value) return

  track.value.scrollTo({
    left: step * renderedIndex,
    behavior,
  })
}

function previous() {
  if (props.items.length <= 1) return
  goToRendered(activeIndex.value)
}

function next() {
  if (props.items.length <= 1) return
  goToRendered(activeIndex.value + 2)
}

function settleLoopPosition() {
  settleTimer = 0
  const step = getStep()
  if (!step || !track.value || props.items.length <= 1) return

  const renderedIndex = Math.round(track.value.scrollLeft / step)
  const canonicalIndex = canonicalRenderedIndex(renderedIndex, props.items.length)
  if (canonicalIndex === renderedIndex) return

  track.value.classList.add('is-jumping')
  track.value.scrollLeft = canonicalIndex * step
  activeIndex.value = logicalIndexFromRendered(canonicalIndex, props.items.length)
  window.requestAnimationFrame(() => track.value?.classList.remove('is-jumping'))
}

async function initializeLoop() {
  activeIndex.value = 0
  lastAnimatedIndex = -1
  await nextTick()
  if (!track.value) return

  track.value.classList.add('is-jumping')
  const initialRenderedIndex = props.items.length > 1 ? 1 : 0
  goToRendered(initialRenderedIndex, 'auto')
  animateActiveSlide(initialRenderedIndex)
  lastAnimatedIndex = 0
  window.requestAnimationFrame(() => track.value?.classList.remove('is-jumping'))
}

onMounted(initializeLoop)

watch(
  () => props.items,
  () => initializeLoop(),
)

watch(activeIndex, (index) => {
  if (!progressIndicator.value) return
  gsap.to(progressIndicator.value, {
    xPercent: index * 100,
    duration: allowsMotion() ? 0.38 : 0,
    ease: 'power2.out',
    overwrite: true,
  })
})

onBeforeUnmount(() => {
  if (animationFrame) window.cancelAnimationFrame(animationFrame)
  if (settleTimer) window.clearTimeout(settleTimer)
  if (track.value) gsap.killTweensOf(track.value.querySelectorAll('.carousel-slide'))
  if (progressIndicator.value) gsap.killTweensOf(progressIndicator.value)
})
</script>

<style scoped>
.featured-carousel {
  position: relative;
}

.carousel-track {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  overscroll-behavior-inline: contain;
  -webkit-overflow-scrolling: touch;
}

.carousel-track.is-jumping {
  scroll-behavior: auto;
  scroll-snap-type: none;
}

.carousel-track::-webkit-scrollbar {
  display: none;
}

.carousel-track:focus-visible {
  outline: 2px solid var(--tina-gold);
  outline-offset: 3px;
  border-radius: 8px;
}

.carousel-slide {
  display: flex;
  flex: 0 0 100%;
  min-width: 0;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.carousel-slide :deep(.featured) {
  flex: 1;
}

.carousel-progress {
  width: 96px;
  height: 4px;
  margin: 10px auto 0;
  overflow: hidden;
  border-radius: 999px;
  background: #d5e0eb;
}

.carousel-progress span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--tina-gold);
  will-change: transform;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (prefers-reduced-motion: reduce) {
  .carousel-track {
    scroll-behavior: auto;
  }
}
</style>
