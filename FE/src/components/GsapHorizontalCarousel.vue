<template>
  <section class="content-carousel" role="region" :aria-label="label">
    <div class="carousel-controls">
      <button
        type="button"
        :disabled="activeIndex === 0"
        :aria-label="`Xem ${label} trước`"
        @click="previous"
      >
        <ion-icon :icon="chevronBackOutline" />
      </button>
      <span>{{ activeIndex + 1 }}/{{ lastIndex + 1 }}</span>
      <button
        type="button"
        :disabled="activeIndex >= lastIndex"
        :aria-label="`Xem ${label} tiếp theo`"
        @click="next"
      >
        <ion-icon :icon="chevronForwardOutline" />
      </button>
    </div>

    <div
      ref="track"
      class="content-track"
      :style="{ '--cards-per-view': perView }"
      tabindex="0"
      @scroll.passive="handleScroll"
      @keydown.left.prevent="previous"
      @keydown.right.prevent="next"
    >
      <div v-for="(item, index) in items" :key="item.id ?? item" class="content-slide">
        <slot :item="item" :index="index" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { IonIcon } from '@ionic/vue'
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons'
import { gsap } from 'gsap'

const props = defineProps({
  items: { type: Array, required: true },
  label: { type: String, required: true },
  perView: { type: Number, default: 2 },
})

const track = ref(null)
const activeIndex = ref(0)
const lastIndex = computed(() => Math.max(props.items.length - props.perView, 0))
let animationFrame = 0

function getStep() {
  const firstSlide = track.value?.querySelector('.content-slide')
  if (!firstSlide || !track.value) return 0
  const styles = window.getComputedStyle(track.value)
  const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0
  return firstSlide.getBoundingClientRect().width + gap
}

function updateActiveIndex() {
  animationFrame = 0
  const step = getStep()
  if (!step || !track.value) return
  activeIndex.value = Math.min(
    Math.max(Math.round(track.value.scrollLeft / step), 0),
    lastIndex.value,
  )
}

function handleScroll() {
  if (!animationFrame) animationFrame = window.requestAnimationFrame(updateActiveIndex)
}

function goTo(index) {
  const step = getStep()
  if (!step || !track.value) return
  const target = Math.min(Math.max(index, 0), lastIndex.value)
  const reduceMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  activeIndex.value = target
  gsap.to(track.value, {
    scrollLeft: target * step,
    duration: reduceMotion ? 0 : 0.48,
    ease: 'power3.out',
    overwrite: true,
    onStart: () => animateVisibleCard(target),
  })
}

function animateVisibleCard(index) {
  if (!track.value) return
  const card = track.value.children[index]
  if (!card) return
  gsap.fromTo(
    card,
    { autoAlpha: 0.76, y: 8, scale: 0.98 },
    { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out', overwrite: true },
  )
}

function previous() {
  goTo(activeIndex.value - 1)
}

function next() {
  goTo(activeIndex.value + 1)
}

onBeforeUnmount(() => {
  if (animationFrame) window.cancelAnimationFrame(animationFrame)
  if (track.value) {
    gsap.killTweensOf(track.value)
    gsap.killTweensOf(track.value.children)
  }
})
</script>

<style scoped>
.content-carousel {
  position: relative;
}

.carousel-controls {
  position: absolute;
  top: -46px;
  right: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 5px;
}

.carousel-controls button {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border: 1px solid #d6e1ec;
  border-radius: 11px;
  background: #fff;
  color: var(--tina-blue);
  font-size: 17px;
  box-shadow: 0 2px 7px rgba(20, 55, 86, 0.07);
}

.carousel-controls button:disabled {
  color: #aebbc8;
  background: #f2f5f8;
  box-shadow: none;
}

.carousel-controls button:not(:disabled):active {
  transform: scale(0.94);
}

.carousel-controls span {
  min-width: 29px;
  color: var(--tina-muted);
  font-size: 10px;
  text-align: center;
}

.content-track {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  overscroll-behavior-inline: contain;
  -webkit-overflow-scrolling: touch;
}

.content-track::-webkit-scrollbar {
  display: none;
}

.content-track:focus-visible {
  outline: 2px solid var(--tina-gold);
  outline-offset: 3px;
  border-radius: 8px;
}

.content-slide {
  min-width: 0;
  flex: 0 0 calc((100% - (var(--cards-per-view) - 1) * 8px) / var(--cards-per-view));
  scroll-snap-align: start;
  will-change: transform, opacity;
}
</style>
