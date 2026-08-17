<template>
  <PageFrame :show-breaking="false"
    ><ArticleListing
      title="TIN MỚI NHẤT"
      subtitle="Cập nhật liên tục theo thời gian"
      count-label="24 tin mới"
  /></PageFrame>
</template>
<script setup>
import PageFrame from '../components/PageFrame.vue'
import ArticleListing from '../components/ArticleListing.vue'
</script>
