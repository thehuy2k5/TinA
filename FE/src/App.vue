<template>
  <ion-app>
    <ion-router-outlet />
    <AccountSheet />
    <ListeningQueueSheet />
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import AccountSheet from './components/AccountSheet.vue'
import ListeningQueueSheet from './components/ListeningQueueSheet.vue'
</script>
