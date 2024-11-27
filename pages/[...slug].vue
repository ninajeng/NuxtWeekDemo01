<script setup>
const route = useRoute();
const page = ref(route.fullPath);

const event = useRequestEvent();
setResponseStatus(event, 404);
</script>

<template>
  <div class="not-found">
    <h1>404 - 找不到頁面</h1>
    <p>抱歉，您所尋找的 "{{ page }}"" 頁面不存在。</p>
    <NuxtLink class="btn btn-primary-100 px-8 py-4 text-white fw-bold border-0 rounded-3" to="/">返回首頁</NuxtLink>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.not-found h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.not-found p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}
</style>