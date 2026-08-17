<template>
  <button
    v-if="showButton"
    class="queue-button"
    type="button"
    aria-label="Mở danh sách audio đang nghe"
    @click="state.queueOpen = true"
  >
    <ion-icon :icon="headset" />
    <ion-badge>{{ badgeCount }}</ion-badge>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { IonBadge, IonIcon } from '@ionic/vue'
import { headset } from 'ionicons/icons'
import { useAppState } from '../composables/useAppState'

const { state, badgeCount } = useAppState()

const showButton = computed(
  () => Boolean(state.current) && !state.miniPlayerVisible && badgeCount.value > 0,
)
</script>

<style scoped>
.queue-button {
  position: fixed;
  z-index: 29;
  right: 16px;
  bottom: 14px;
  width: 64px;
  height: 64px;
  border: 0;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--tina-blue);
  color: #fff;
  font-size: 25px;
  box-shadow: 0 5px 14px rgba(10, 23, 41, 0.2);
}

ion-badge {
  position: absolute;
  top: -7px;
  right: -5px;
  min-width: 27px;
  height: 27px;
  padding: 0 7px;
  --background: #f45a43;
  border: 2px solid #fff;
  border-radius: 14px;
  font-size: 13px;
  line-height: 23px;
}

@media (min-width: 431px) {
  .queue-button {
    right: calc((100vw - 430px) / 2 + 16px);
  }
}
</style>
