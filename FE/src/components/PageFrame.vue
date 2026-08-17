<template>
  <ion-page>
    <AppHeader />
    <BreakingNewsBar v-if="showBreaking" :text="breaking" />

    <ion-content class="page-content">
      <div v-if="contentLoading" class="api-status">Đang tải dữ liệu…</div>

      <div v-else-if="contentError" class="api-status error">
        <span>{{ contentError }}</span>
        <button type="button" @click="refreshContent">Thử lại</button>
      </div>

      <slot />
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonContent, IonPage } from '@ionic/vue'
import AppHeader from './AppHeader.vue'
import BreakingNewsBar from './BreakingNewsBar.vue'
import { contentError, contentLoading, refreshContent } from '../services/contentService'

defineProps({
  breaking: {
    type: String,
    default: 'Ngoại giao Việt Nam: chủ động, toàn diện, hiện đại',
  },
  showBreaking: {
    type: Boolean,
    default: true,
  },
})
</script>

<style scoped>
.api-status {
  width: min(calc(100% - 32px), 398px);
  margin: 10px auto 0;
  padding: 10px 12px;
  border-radius: 4px;
  background: #e8f5ff;
  color: var(--tina-blue);
  font-size: 13px;
}

.api-status.error {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: #fff0f0;
  color: #9f2424;
}

.api-status button {
  min-height: 36px;
  border: 0;
  border-radius: 4px;
  padding: 0 12px;
  background: var(--tina-red);
  color: #fff;
}
</style>
