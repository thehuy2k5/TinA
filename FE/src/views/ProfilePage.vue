<template>
  <PageFrame
    ><main class="screen">
      <div class="page-heading">
        <div>
          <h1>TÀI KHOẢN</h1>
          <p>Thông tin cá nhân và thiết lập quản trị</p>
        </div>
      </div>
      <ProfileCard :user="currentUser" /><SectionHeading title="QUẢN LÝ TÀI KHOẢN" />
      <section class="settings">
        <button v-for="item in items" :key="item.label">
          <ion-icon :icon="item.icon" /><strong>{{ item.label }}</strong
          ><ion-icon :icon="chevronForwardOutline" />
        </button>
      </section>
      <p class="last-login">Đăng nhập gần nhất: 08:42 • 13/08/2026</p>
    </main></PageFrame
  >
</template>
<script setup>
import { IonIcon } from '@ionic/vue'
import {
  personOutline,
  gridOutline,
  lockClosedOutline,
  logOutOutline,
  chevronForwardOutline,
} from 'ionicons/icons'
import PageFrame from '../components/PageFrame.vue'
import ProfileCard from '../components/ProfileCard.vue'
import SectionHeading from '../components/SectionHeading.vue'
import { currentUser } from '../services/contentService'
const items = [
  { label: 'Thông tin cá nhân', icon: personOutline },
  { label: 'Quản lý ứng dụng', icon: gridOutline },
  { label: 'Đổi mật khẩu', icon: lockClosedOutline },
  { label: 'Đăng xuất', icon: logOutOutline },
]
</script>
<style scoped>
.settings {
  background: #fff;
  border: 1px solid var(--tina-border);
  border-radius: 6px;
  box-shadow: var(--tina-shadow);
  overflow: hidden;
}
.settings button {
  width: 100%;
  height: 56px;
  padding: 0 16px;
  border: 0;
  border-bottom: 1px solid var(--tina-border);
  background: #fff;
  display: flex;
  align-items: center;
  gap: 16px;
  color: #1a2636;
}
.settings button:last-child {
  border: 0;
  color: #e33;
}
.settings button ion-icon:first-child {
  color: var(--tina-blue);
  font-size: 20px;
}
.settings button strong {
  flex: 1;
  text-align: left;
}
.last-login {
  text-align: center;
  color: var(--tina-muted);
  font-size: 12px;
  margin: 28px 0;
}
</style>
