<template>
  <ion-button
    class="breaking"
    fill="clear"
    expand="block"
    router-link="/latest"
    router-direction="forward"
    aria-label="Mở bản tin mới nhất"
  >
    <span class="breaking-content">
      <span class="badge">MỚI</span>
      <strong>{{ text }}</strong>
      <ion-icon :icon="chevronForwardOutline" aria-hidden="true" />
    </span>
  </ion-button>
</template>
<script setup>
import { IonButton, IonIcon } from '@ionic/vue'
import { chevronForwardOutline } from 'ionicons/icons'
defineProps({ text: { type: String, required: true } })
</script>
<style scoped>
.breaking {
  --background: #fff;
  --background-activated: #f0f5fa;
  --background-focused: #f5f8fb;
  --border-radius: 0;
  --box-shadow: none;
  --color: var(--ion-text-color);
  --padding-start: 16px;
  --padding-end: 16px;
  width: 100%;
  height: 34px;
  margin: 0;
  border-bottom: 1px solid #d9e2eb;
  text-transform: none;
}
.breaking-content {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;
}
.breaking .badge {
  flex: 0 0 auto;
  background: var(--tina-red);
  color: #fff;
  padding: 3px 8px;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 700;
}
.breaking strong {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 500;
}
.breaking ion-icon {
  flex: 0 0 auto;
  color: var(--tina-muted);
  transition: transform 160ms ease;
}
.breaking:active ion-icon {
  transform: translateX(3px);
}
</style>
