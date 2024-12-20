<script setup lang="ts">

import { Icon } from '@iconify/vue';
</script>

<template>
  <div class="text-gray text-center my-5">
    <Icon class="fs-4 mb-3" icon="ic:baseline-warning" />
    <p class="fs-5">資料無法載入，請稍後再試！</p>
  </div>
</template>

<style scoped>
.text-gray {
  color: rgb(128, 128, 128);
}
</style>