<template>
  <router-link class="featured" :to="`/article/${article.id}`">
    <div class="meta">
      <span>{{ badge }}</span
      ><time>{{ article.date }}</time>
    </div>
    <h2>{{ article.title }}</h2>
    <p>{{ article.summary }}</p>
  </router-link>
</template>
<script setup>
defineProps({
  article: { type: Object, required: true },
  badge: { type: String, default: 'TIN NỔI BẬT' },
})
</script>
<style scoped>
.featured {
  position: relative;
  min-height: 210px;
  padding: 14px;
  background: var(--tina-blue-dark);
  color: white;
  border-radius: 6px;
  box-shadow: 0 4px 14px rgba(10, 26, 46, 0.12);
  overflow: hidden;
  display: block;
  text-decoration: none;
}
.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.meta span {
  padding: 5px 12px;
  border-radius: 4px;
  background: var(--tina-red);
  font-size: 11px;
  font-weight: 700;
}
.meta time {
  font-size: 11px;
  color: #c7e5ff;
}
.featured h2 {
  font-size: 24px;
  line-height: 29px;
  margin: 12px 0 6px;
}
.featured p {
  color: #d1e5ff;
  font-size: 14px;
  line-height: 20px;
  margin: 0;
}
</style>
