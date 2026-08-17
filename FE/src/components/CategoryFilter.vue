<template>
  <div ref="filterBar" class="filters horizontal-scroll" role="tablist" aria-label="Lọc chuyên mục">
    <button
      v-for="item in items"
      :key="item.id"
      :class="{ active: modelValue === item.id }"
      role="tab"
      :aria-selected="modelValue === item.id"
      @click="selectCategory(item.id, $event)"
    >
      {{ item.name }}
    </button>
    <span ref="activeIndicator" class="active-indicator" aria-hidden="true" />
  </div>
</template>
<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  items: { type: Array, required: true },
  modelValue: { type: String, required: true },
})
const emit = defineEmits(['update:modelValue'])
const filterBar = ref(null)
const activeIndicator = ref(null)

function selectCategory(id, event) {
  emit('update:modelValue', id)
  event.currentTarget.scrollIntoView?.({ behavior: 'smooth', block: 'nearest', inline: 'center' })
}

function moveIndicator(animate = true) {
  const activeButton = filterBar.value?.querySelector('[aria-selected="true"]')
  if (!activeButton || !activeIndicator.value) return

  const reduceMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  gsap.to(activeIndicator.value, {
    x: activeButton.offsetLeft,
    width: activeButton.offsetWidth,
    duration: animate && !reduceMotion ? 0.34 : 0,
    ease: 'power3.out',
    overwrite: true,
  })
}

function handleResize() {
  moveIndicator(false)
}

watch(
  () => props.modelValue,
  async () => {
    await nextTick()
    moveIndicator(true)
  },
)

onMounted(() => {
  nextTick(() => moveIndicator(false))
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (activeIndicator.value) gsap.killTweensOf(activeIndicator.value)
})
</script>
<style scoped>
.filters {
  position: relative;
  margin: 10px 0;
  gap: 0;
  border-bottom: 1px solid var(--tina-red);
  background: #fff;
}
.filters button {
  position: relative;
  flex: 1 0 max-content;
  min-height: 44px;
  padding: 0 12px;
  border: 0;
  background: transparent;
  border-radius: 0;
  color: #273a4c;
  font-size: 11px;
  font-weight: 600;
  transition:
    color 180ms ease,
    transform 160ms ease;
}
.filters button + button::before {
  content: '';
  position: absolute;
  left: 0;
  top: 13px;
  width: 1px;
  height: 18px;
  background: #dde4eb;
}
.filters button.active {
  color: var(--tina-blue-dark);
  font-weight: 700;
}
.filters button:active {
  transform: translateY(1px);
}
.filters button:focus-visible {
  outline: 2px solid rgba(22, 95, 160, 0.32);
  outline-offset: -3px;
}
.active-indicator {
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 0;
  height: 3px;
  background: var(--tina-blue);
  pointer-events: none;
  will-change: transform, width;
}
</style>
