<template>
  <ion-tab-bar slot="bottom" class="bottom-nav">
    <ion-tab-button
      v-for="tab in tabs"
      :key="tab.name"
      :tab="tab.name"
      :href="tab.path"
      @click="handleTabClick($event, tab)"
    >
      <span class="indicator"></span>
      <span class="icon-wrap"><ion-icon :icon="tab.icon" /></span>
      <ion-label>{{ tab.label }}</ion-label>
    </ion-tab-button>
  </ion-tab-bar>
</template>

<script setup>
import { IonIcon, IonLabel, IonTabBar, IonTabButton } from '@ionic/vue'
import {
  barChartOutline,
  flameOutline,
  headsetOutline,
  homeOutline,
  newspaperOutline,
  personOutline,
} from 'ionicons/icons'
import { useAppState } from '../composables/useAppState'

const { state } = useAppState()
const tabs = [
  { name: 'home', path: '/home', label: 'Trang chủ', icon: homeOutline },
  { name: 'latest', path: '/latest', label: 'Tin mới', icon: newspaperOutline },
  { name: 'featured', path: '/featured', label: 'Tin nổi bật', icon: flameOutline },
  { name: 'audio', path: '/audio', label: 'Tin audio', icon: headsetOutline },
  { name: 'analysis', path: '/analysis', label: 'Phân tích', icon: barChartOutline },
  { name: 'profile', path: '/profile', label: 'Cá nhân', icon: personOutline },
]

function handleTabClick(event, tab) {
  if (tab.name === 'profile') {
    event.preventDefault()
    event.stopPropagation()
    state.accountOpen = true
  }
}
</script>

<style scoped>
.bottom-nav {
  height: calc(var(--tina-tab-bar-height) + env(safe-area-inset-bottom));
  padding: 0 4px env(safe-area-inset-bottom);
  background: #fff;
  border-top: 1px solid var(--tina-border);
  box-shadow: 0 -2px 10px rgba(10, 23, 41, 0.08);
}

ion-tab-button {
  --background: transparent;
  --background-focused: transparent;
  --color: #788395;
  --color-selected: var(--tina-blue);
  --padding-end: 0;
  --padding-start: 0;
  flex: 1 1 0;
  min-width: 0;
  max-width: none;
  position: relative;
  height: 66px;
  border-radius: 4px;
}

ion-tab-button::part(native) {
  padding-inline: 0;
}
ion-tab-button.tab-selected {
  --background: rgba(18, 102, 165, 0.05);
}
.indicator {
  position: absolute;
  top: 0;
  left: 50%;
  width: 58px;
  height: 3px;
  margin: 0;
  border-radius: 0 0 2px 2px;
  transform: translateX(-50%);
}
ion-tab-button.tab-selected .indicator {
  background: var(--tina-blue);
}
.icon-wrap {
  position: relative;
  height: 22px;
  font-size: 22px;
}

ion-label {
  display: block;
  width: 100%;
  max-width: none;
  margin-top: 4px;
  overflow: visible;
  font-size: 10px;
  line-height: 14px;
  white-space: nowrap;
  text-align: center;
  text-overflow: clip;
}

@media (max-width: 370px) {
  ion-label {
    font-size: 9px;
    letter-spacing: -0.1px;
  }
}
</style>
