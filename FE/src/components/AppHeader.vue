<template>
  <header class="app-header">
    <div class="brandbar">
      <button
        class="icon-button menu"
        type="button"
        aria-label="Mở menu"
        aria-haspopup="dialog"
        :aria-expanded="menuOpen"
        @click="menuOpen = true"
      >
        <ion-icon :icon="menuOutline" />
      </button>
      <div class="brand-mark" aria-label="Biểu trưng TIN A"><img :src="brandMark" alt="" /></div>
      <div class="brand" style="color: antiquewhite;">
        <strong>TIN A</strong><b>BỘ NGOẠI GIAO</b>
      </div>
      <div class="actions"><img :src="headerActions" alt="Tìm kiếm và thông báo" /></div>
    </div>
    <NavigationMenu :open="menuOpen" @close="menuOpen = false" />
  </header>
</template>
<script setup>
import { ref } from 'vue'
import { IonIcon } from '@ionic/vue'
import { menuOutline } from 'ionicons/icons'
import NavigationMenu from './NavigationMenu.vue'
import brandMark from '../assets/figma/tina-brand.svg'
import headerActions from '../assets/figma/header-actions.svg'
const menuOpen = ref(false)
</script>
<style scoped>
.app-header {
  background: var(--tina-blue);
  color: #fff;
  padding-top: env(safe-area-inset-top);
}
.brandbar {
  height: 84px;
  display: flex;
  align-items: center;
  padding: 0 16px 0 8px;
  gap: 8px;
}
.brand-mark {
  width: 44px;
  height: 40px;
  flex: 0 0 44px;
}
.brand-mark img {
  width: 44px;
  height: 40px;
}
.brand {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  white-space: nowrap;
}
.brand strong {
  font-size: 22px;
  line-height: 24px;
}
.brand b {
  font-size: 14px;
  line-height: 16px;
}
.brand small {
  color: #d1e8fa;
  font-size: 10px;
  line-height: 12px;
}
.icon-button {
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: white;
  font-size: 26px;
  transition:
    background 160ms ease,
    transform 160ms ease;
}
.icon-button:active {
  transform: scale(0.94);
  background: rgba(255, 255, 255, 0.12);
}
.icon-button:focus-visible {
  outline: 3px solid rgba(255, 255, 255, 0.42);
  outline-offset: -3px;
}
.actions {
  width: 56px;
  height: 28px;
  flex: 0 0 56px;
}
.actions img {
  width: 56px;
  height: 28px;
}
@media (max-width: 370px) {
  .brandbar {
    gap: 5px;
    padding-right: 10px;
  }
  .brand small {
    font-size: 9px;
  }
}
</style>
