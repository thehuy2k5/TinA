<template>
  <ion-modal
    :is-open="state.accountOpen"
    :initial-breakpoint="0.58"
    :breakpoints="[0, 0.58, 0.9]"
    @did-dismiss="state.accountOpen = false"
    ><div class="account-sheet">
      <header>
        <h2>Tài khoản</h2>
        <button aria-label="Đóng tài khoản" @click="state.accountOpen = false">
          <ion-icon :icon="closeOutline" />
        </button>
      </header>
      <button class="user-row" @click="openProfile">
        <span><ion-icon :icon="personOutline" /></span>
        <div>
          <strong>{{ currentUser.name }}</strong
          ><small>{{ currentUser.roleLabel }} • Đang hoạt động</small>
        </div>
        <ion-icon :icon="chevronForwardOutline" /></button
      ><button v-for="item in menu" :key="item.label" class="menu-row" @click="handle(item.action)">
        <ion-icon :icon="item.icon" /><strong>{{ item.label }}</strong
        ><ion-icon :icon="chevronForwardOutline" />
      </button>
      <p class="version">TIN A • Phiên bản 1.0</p>
    </div></ion-modal
  >
</template>
<script setup>
import { alertController, IonIcon, IonModal, toastController } from '@ionic/vue'
import {
  closeOutline,
  personOutline,
  gridOutline,
  lockClosedOutline,
  logOutOutline,
  chevronForwardOutline,
} from 'ionicons/icons'
import { useRouter } from 'vue-router'
import { currentUser } from '../services/contentService'
import { useAppState } from '../composables/useAppState'
const { state } = useAppState()
const router = useRouter()
const menu = [
  { label: 'Quản Trị Viên 1', icon: personOutline, action: 'profile' },
  { label: 'Quản lý ứng dụng', icon: gridOutline, action: 'placeholder' },
  { label: 'Đổi mật khẩu', icon: lockClosedOutline, action: 'placeholder' },
  { label: 'Đăng xuất', icon: logOutOutline, action: 'logout' },
]
const openProfile = () => {
  state.accountOpen = false
  router.push('/profile')
}
const handle = async (action) => {
  if (action === 'profile') return openProfile()
  if (action === 'logout') {
    const alert = await alertController.create({
      header: 'Xác nhận đăng xuất',
      message: 'Bạn có chắc muốn đăng xuất khỏi TIN A?',
      buttons: [
        'Hủy',
        { text: 'Đăng xuất', role: 'destructive', handler: () => (state.accountOpen = false) },
      ],
    })
    return alert.present()
  }
  const toast = await toastController.create({
    message: 'Chức năng đang được kết nối với hệ thống quản trị.',
    duration: 1800,
    position: 'bottom',
  })
  toast.present()
}
</script>
<style scoped>
.account-sheet {
  min-height: 100%;
  background: #fff;
  padding: 14px 16px 24px;
}
.account-sheet header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--tina-border);
}
h2 {
  font-size: 20px;
  margin: 0;
}
header button {
  width: 44px;
  height: 44px;
  border: 0;
  background: transparent;
  color: var(--tina-muted);
  font-size: 25px;
}
.user-row,
.menu-row {
  width: 100%;
  min-height: 61px;
  border: 0;
  border-bottom: 1px solid var(--tina-border);
  background: #fff;
  display: flex;
  align-items: center;
  gap: 14px;
  text-align: left;
  color: #1a2636;
}
.user-row {
  background: #eef5ff;
  margin-inline: -16px;
  width: calc(100% + 32px);
  padding: 12px 16px;
}
.user-row > span {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #603093;
  color: #fff;
  font-size: 24px;
}
.user-row > div,
.menu-row strong {
  flex: 1;
}
.user-row strong,
.user-row small {
  display: block;
}
.user-row small {
  color: var(--tina-muted);
  margin-top: 4px;
}
.menu-row > ion-icon:first-child {
  color: var(--tina-blue);
  font-size: 20px;
}
.menu-row:last-of-type {
  color: #e33;
}
.version {
  text-align: center;
  color: var(--tina-muted);
  font-size: 12px;
  margin-top: 95px;
}
</style>
