<template>
  <article class="audio-card" :class="{ active: isCurrent }">
    <button :class="episode.tone" :aria-label="buttonLabel" @click="handlePlayback">
      <ion-icon :icon="isCurrent && state.playing ? pauseIcon : playIcon" />
    </button>

    <div class="copy">
      <div class="meta">
        <strong>{{ episode.category }}</strong>
        <time>{{ episode.durationLabel }}</time>
      </div>

      <h3>{{ episode.title }}</h3>
      <p>{{ episode.summary || episode.date }}</p>

      <div v-if="isCurrent" class="card-progress">
        <span :style="{ width: `${currentProgress * 100}%` }"></span>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { IonIcon } from '@ionic/vue'
import { pause as pauseIcon, play as playIcon } from 'ionicons/icons'
import { useAppState } from '../composables/useAppState'

const props = defineProps({
  episode: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['play'])
const { state, currentProgress, toggle } = useAppState()

const isCurrent = computed(() => state.current?.id === props.episode.id)
const buttonLabel = computed(() => {
  if (isCurrent.value && state.playing) return `Tạm dừng ${props.episode.title}`
  return `Phát ${props.episode.title}`
})

function handlePlayback() {
  if (isCurrent.value) {
    toggle()
    return
  }

  emit('play', props.episode)
}
</script>

<style scoped>
.audio-card {
  width: 100%;
  min-height: 102px;
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px 0;
  background: #fff;
}

.audio-card.active {
  background: var(--tina-blue-light);
}

.audio-card > button {
  width: 92px;
  min-height: 76px;
  align-self: stretch;
  flex: 0 0 92px;
  border: 0;
  border-radius: 6px;
  background: #0c73b9;
  color: #fff;
  font-size: 24px;
}

.audio-card > button.red {
  background: #f03d3d;
}

.copy {
  min-width: 0;
  flex: 1;
  padding: 1px 0;
}

.meta {
  display: flex;
  justify-content: space-between;
}

.meta strong {
  color: var(--tina-red);
  font-size: 10px;
}

.meta time {
  color: var(--tina-muted);
  font-size: 10px;
}

h3 {
  margin: 6px 0 4px;
  font-size: 15px;
  line-height: 19px;
}

p {
  margin: 0;
  color: var(--tina-muted);
  font-size: 11px;
  line-height: 15px;
}

.card-progress {
  height: 3px;
  margin-top: 8px;
  overflow: hidden;
  border-radius: 2px;
  background: #dbe5ed;
}

.card-progress span {
  display: block;
  height: 100%;
  background: var(--tina-gold);
}

@media (max-width: 370px) {
  .audio-card {
    gap: 10px;
  }

  .audio-card > button {
    width: 82px;
    flex-basis: 82px;
  }
}
</style>
