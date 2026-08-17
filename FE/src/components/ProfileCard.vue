<template>
  <article class="profile-card">
    <div class="avatar"><ion-icon :icon="personOutline" /></div>
    <div>
      <h2>{{ user.name }}</h2>
      <span>{{ user.roleLabel }}</span>
    </div>
    <hr />
    <strong>{{ user.department }}</strong
    ><small>Trạng thái: {{ user.active ? 'Đang hoạt động' : 'Không hoạt động' }}</small>
  </article>
</template>
<script setup>
import { IonIcon } from '@ionic/vue'
import { personOutline } from 'ionicons/icons'
defineProps({ user: { type: Object, required: true } })
</script>
<style scoped>
.profile-card {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 16px;
  padding: 18px;
  background: #fff;
  border: 1px solid var(--tina-border);
  border-radius: 6px;
  box-shadow: var(--tina-shadow);
}
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #603093;
  color: white;
  display: grid;
  place-items: center;
  font-size: 30px;
}
h2 {
  margin: 4px 0 6px;
  font-size: 20px;
}
.profile-card span {
  display: inline-block;
  padding: 5px 12px;
  background: #eaf4ff;
  color: var(--tina-blue);
  font-size: 12px;
  font-weight: 700;
  border-radius: 4px;
}
.profile-card hr {
  grid-column: 1/-1;
  width: 100%;
  border: 0;
  border-top: 1px solid var(--tina-border);
  margin: 3px 0;
}
.profile-card strong,
.profile-card small {
  grid-column: 1/-1;
}
.profile-card small {
  color: var(--tina-muted);
}
</style>
