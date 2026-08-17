<template>
  <div class="heading">
    <i></i>
    <h2>{{ title }}</h2>
    <span v-if="meta" class="meta">{{ meta }}</span>
    <router-link v-if="action && to" class="action" :to="to">{{ action }}</router-link>
    <button v-else-if="action" class="action" type="button" @click="$emit('action')">
      {{ action }}
    </button>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  title: { type: String, required: true },
  action: { type: String, default: '' },
  to: { type: String, default: '' },
  meta: { type: String, default: '' },
})
defineEmits(['action'])
</script>
<style scoped>
.heading {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 24px;
  margin: 18px 0 10px;
}
.heading i {
  width: 3px;
  height: 18px;
  background: var(--tina-red);
}
.heading h2 {
  flex: 1;
  margin: 0;
  color: var(--tina-blue);
  font-size: 17px;
  line-height: 22px;
}
.heading .action {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  border: 0;
  background: transparent;
  color: var(--tina-blue);
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
}
.heading .meta {
  color: var(--tina-blue);
  font-size: 11px;
  font-weight: 600;
}
.heading .action:active {
  opacity: 0.65;
}
</style>
