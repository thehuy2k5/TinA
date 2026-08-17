<template>
  <ion-modal
    :is-open="state.queueOpen"
    :initial-breakpoint="0.72"
    :breakpoints="[0, 0.72, 1]"
    handle-behavior="cycle"
    @did-dismiss="state.queueOpen = false"
    ><div class="sheet">
      <header>
        <div>
          <h2>DANH SÁCH ĐANG NGHE</h2>
          <p>{{ history.length }} audio</p>
        </div>
        <button aria-label="Đóng danh sách" @click="state.queueOpen = false">
          <ion-icon :icon="closeOutline" />
        </button>
      </header>
      <template v-if="state.current"
        ><SectionHeading title="ĐANG NGHE" /><AudioPlayer
          :episode="state.current"
          :playing="state.playing"
          :progress="currentProgress"
          @toggle="toggle" /></template
      ><SectionHeading title="ĐÃ NGHE GẦN ĐÂY"><!-- heading --></SectionHeading>
      <div class="history-actions">
        <button v-if="history.length" @click="clear">Xóa tất cả</button>
      </div>
      <div v-if="history.length" class="history">
        <article v-for="item in history" :key="item.episode.id">
          <button
            class="replay"
            :aria-label="`Phát lại ${item.episode.title}`"
            @click="play(item.episode)"
          >
            <ion-icon :icon="playIcon" />
          </button>
          <div>
            <strong>{{ item.episode.title }}</strong
            ><small>{{ item.episode.category }} • {{ item.episode.durationLabel }}</small>
          </div>
          <span>Đã nghe {{ Math.round(item.progress * 100) }}%</span
          ><button
            class="delete"
            :aria-label="`Xóa ${item.episode.title}`"
            @click="remove(item.episode.id)"
          >
            <ion-icon :icon="trashOutline" />
          </button>
        </article>
      </div>
      <p v-else class="empty-state">Chưa có lịch sử nghe.</p>
      <footer>Lịch sử nghe được lưu trên thiết bị của bạn.</footer>
    </div></ion-modal
  >
</template>
<script setup>
import { computed } from 'vue'
import { IonModal, IonIcon } from '@ionic/vue'
import { closeOutline, play as playIcon, trashOutline } from 'ionicons/icons'
import { useAppState } from '../composables/useAppState'
import SectionHeading from './SectionHeading.vue'
import AudioPlayer from './AudioPlayer.vue'
const { state, play, toggle, remove, clear } = useAppState()
const history = computed(() => state.history)
const currentProgress = computed(
  () => state.history.find((i) => i.episode.id === state.current?.id)?.progress ?? 0.18,
)
</script>
<style scoped>
.sheet {
  min-height: 100%;
  padding: 18px 16px 32px;
  background: #fff;
}
.sheet > header {
  display: flex;
  justify-content: space-between;
  align-items: start;
}
.sheet h2 {
  margin: 0;
  color: var(--tina-blue);
  font-size: 22px;
}
.sheet header p {
  margin: 2px 0;
  color: var(--tina-muted);
}
.sheet header button,
.history-actions button {
  min-width: 44px;
  min-height: 44px;
  border: 0;
  background: transparent;
  color: var(--tina-muted);
  font-size: 24px;
}
.history-actions {
  height: 0;
  position: relative;
}
.history-actions button {
  position: absolute;
  right: 0;
  top: -55px;
  color: var(--tina-red);
  font-size: 13px;
}
.history {
  display: grid;
  gap: 10px;
}
.history article {
  position: relative;
  min-height: 92px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 34px 11px 11px;
  border: 1px solid var(--tina-border);
  border-radius: 6px;
  box-shadow: var(--tina-shadow);
}
.replay {
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  border: 0;
  border-radius: 50%;
  background: var(--tina-blue);
  color: #fff;
}
.history article > div {
  flex: 1;
  min-width: 0;
}
.history strong {
  font-size: 14px;
  line-height: 18px;
  display: block;
}
.history small {
  display: block;
  color: var(--tina-muted);
  margin-top: 8px;
}
.history span {
  align-self: end;
  color: var(--tina-blue);
  font-size: 10px;
  white-space: nowrap;
}
.delete {
  position: absolute;
  right: 6px;
  top: 6px;
  width: 32px;
  height: 32px;
  border: 0;
  background: transparent;
  color: var(--tina-muted);
}
footer {
  text-align: center;
  color: var(--tina-muted);
  font-size: 12px;
  margin-top: 22px;
}
</style>
