<template>
  <router-link class="news-card" :to="`/article/${article.id}`">
    <div class="thumb" :class="article.tone"><span></span><i></i></div>
    <div class="copy">
      <div class="meta">
        <strong>{{ article.category }}</strong
        ><time>{{ article.time || article.date }}</time>
      </div>
      <h3>{{ article.title }}</h3>
      <p>{{ article.summary }}</p>
      <small v-if="article.readTime"
        >{{ article.readTime }} phút đọc<span v-if="article.author">
          • {{ article.author }}</span
        ></small
      >
    </div>
  </router-link>
</template>
<script setup>
defineProps({ article: { type: Object, required: true } })
</script>
<style scoped>
.news-card {
  width: 100%;
  min-height: 102px;
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px 0;
  background: #fff;
  color: inherit;
  text-decoration: none;
}
.thumb {
  width: 92px;
  min-width: 92px;
  height: 76px;
  border-radius: 6px;
  background: #0c73b9;
  position: relative;
  overflow: hidden;
}
.thumb.red {
  background: #f03d3d;
}
.thumb span {
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  top: 17px;
  left: 37px;
}
.thumb i {
  position: absolute;
  width: 34px;
  height: 3px;
  bottom: 9px;
  left: 29px;
  background: var(--tina-gold);
}
.copy {
  min-width: 0;
  flex: 1;
}
.meta {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}
.meta strong {
  font-size: 10px;
  color: var(--tina-red);
}
.meta time {
  font-size: 10px;
  color: var(--tina-muted);
}
h3 {
  font-size: 15px;
  line-height: 18px;
  margin: 5px 0 3px;
}
p,
small {
  display: block;
  margin: 0;
  color: var(--tina-muted);
  font-size: 11px;
  line-height: 14px;
}

@media (max-width: 370px) {
  .news-card {
    gap: 10px;
  }

  .thumb {
    width: 82px;
    min-width: 82px;
  }

  .thumb span {
    left: 32px;
  }

  .thumb i {
    left: 24px;
  }
}
</style>
