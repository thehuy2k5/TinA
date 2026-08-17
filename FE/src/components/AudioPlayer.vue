<template>
  <div class="player">
    <div>
      <small>{{ playing ? 'ĐANG PHÁT' : 'SẴN SÀNG' }}</small>
      <h3>{{ episode.title }}</h3>
      <p>{{ episode.category }} • {{ episode.durationLabel }} • {{ episode.date }}</p>
    </div>
    <div class="progress"><i :style="{ width: `${progress * 100}%` }"></i></div>
    <div class="time">
      <span>{{ elapsed }} / {{ episode.durationLabel }}</span
      ><button :aria-label="playing ? 'Tạm dừng' : 'Phát'" @click="$emit('toggle')">
        <ion-icon :icon="playing ? pause : play" />
      </button>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { IonIcon } from '@ionic/vue'
import { pause, play } from 'ionicons/icons'
const props = defineProps({
  episode: { type: Object, required: true },
  playing: { type: Boolean, required: true },
  progress: { type: Number, required: true },
})
defineEmits(['toggle'])
const elapsed = computed(() => {
  const s = Math.round(props.episode.duration * props.progress)
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
})
</script>
<style scoped>
.player {
  padding: 16px;
  background: var(--tina-blue);
  color: #fff;
  border-radius: 6px;
}
.player small {
  background: var(--tina-red);
  padding: 5px 10px;
  border-radius: 3px;
  font-weight: 700;
}
.player h3 {
  font-size: 20px;
  line-height: 25px;
  margin: 12px 0 5px;
}
.player p {
  font-size: 12px;
  color: #d1e5f7;
}
.progress {
  height: 4px;
  background: #5994c2;
  border-radius: 2px;
  margin-top: 18px;
}
.progress i {
  display: block;
  height: 100%;
  background: #ffc214;
}
.time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
}
.time button {
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  font-size: 18px;
}
</style>
