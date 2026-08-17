<template>
  <ion-page>
    <ion-tabs
      :class="{
        'has-mini-player': state.current && state.miniPlayerVisible,
        'has-floating-queue': state.current && !state.miniPlayerVisible,
      }"
    >
      <ion-router-outlet />
      <MiniAudioPlayer />
      <FloatingAudioQueueButton />
      <BottomNavigation />
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import { IonPage, IonRouterOutlet, IonTabs } from '@ionic/vue'
import BottomNavigation from '../components/BottomNavigation.vue'
import MiniAudioPlayer from '../components/MiniAudioPlayer.vue'
import FloatingAudioQueueButton from '../components/FloatingAudioQueueButton.vue'
import { useAppState } from '../composables/useAppState'

const { state } = useAppState()
</script>
