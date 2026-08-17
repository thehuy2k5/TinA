<template>
  <section
    v-if="state.current && state.miniPlayerVisible"
    class="mini-player"
    aria-label="Trình phát audio"
  >
    <button
      class="play-button"
      :aria-label="state.playing ? 'Tạm dừng' : 'Tiếp tục phát'"
      @click="toggle"
    >
      <ion-icon :icon="state.playing ? pauseIcon : playIcon" />
    </button>

    <button class="episode-copy" type="button" @click="state.queueOpen = true">
      <strong>{{ state.current.title }}</strong>
      <small>{{ state.current.category }}</small>
    </button>

    <button class="close-button" type="button" aria-label="Đóng trình phát" @click="closePlayer">
      <ion-icon :icon="closeOutline" />
    </button>

    <span class="time">{{ formatTime(state.currentTime) }}</span>
    <input
      class="progress"
      type="range"
      min="0"
      :max="state.duration || 1"
      step="1"
      :value="state.currentTime"
      aria-label="Tiến trình audio"
      @input="seek($event.target.value)"
    />
    <span class="time total">{{ formatTime(state.duration) }}</span>

    <label class="volume-control">
      <ion-icon :icon="state.volume === 0 ? volumeMuteOutline : volumeHighOutline" />
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        :value="state.volume"
        aria-label="Âm lượng"
        @input="setVolume($event.target.value)"
      />
    </label>
  </section>
</template>

<script setup>
import { IonIcon } from '@ionic/vue'
import {
  closeOutline,
  pause as pauseIcon,
  play as playIcon,
  volumeHighOutline,
  volumeMuteOutline,
} from 'ionicons/icons'
import { useAppState } from '../composables/useAppState'

const { state, toggle, seek, setVolume, closePlayer } = useAppState()

function formatTime(value) {
  const seconds = Math.max(0, Math.floor(Number(value) || 0))
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}
</script>

<style scoped>
.mini-player {
  position: fixed;
  z-index: 30;
  bottom: -1px;
  left: 50%;
  width: min(100%, 430px);
  min-height: 86px;
  padding: 10px 12px 9px;
  display: grid;
  grid-template-columns: 46px minmax(0, 1fr) 44px;
  grid-template-rows: 40px 26px;
  align-items: center;
  column-gap: 10px;
  background: #f0f3f7;
  border-top: 1px solid var(--tina-border);
  border-bottom: 1px solid var(--tina-border);
  box-shadow: 0 -4px 14px rgba(10, 23, 41, 0.12);
  transform: translateX(-50%);
}
.play-button,
.close-button {
  width: 44px;
  height: 44px;
  border: 0;
  display: grid;
  place-items: center;
}
.play-button {
  grid-row: 1;
  border-radius: 50%;
  background: var(--tina-blue);
  color: #fff;
  font-size: 19px;
  box-shadow: 0 0 0 5px rgba(22, 95, 160, 0.18);
}
.close-button {
  grid-column: 3;
  grid-row: 1;
  background: transparent;
  color: var(--tina-muted);
  font-size: 22px;
}
.episode-copy {
  min-width: 0;
  height: 44px;
  border: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: transparent;
  color: #1a2636;
  text-align: left;
}
.episode-copy strong {
  width: 100%;
  overflow: hidden;
  font-size: 14px;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.episode-copy small {
  margin-top: 2px;
  color: var(--tina-muted);
  font-size: 11px;
}
.time {
  grid-column: 1;
  grid-row: 2;
  color: var(--tina-muted);
  font-size: 10px;
}
.time.total {
  display: none;
}
.progress {
  grid-column: 2;
  grid-row: 2;
  width: 100%;
  accent-color: var(--tina-blue);
}
.volume-control {
  grid-column: 3;
  grid-row: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--tina-blue);
  font-size: 18px;
}
.volume-control input {
  display: none;
}
@media (min-width: 420px) {
  .mini-player {
    grid-template-columns: 46px minmax(0, 1fr) 38px 44px;
  }
  .close-button {
    grid-column: 4;
  }
  .progress {
    grid-column: 2;
  }
  .time.total {
    display: block;
    grid-column: 3;
    grid-row: 2;
  }
  .volume-control {
    grid-column: 4;
  }
}
</style>
