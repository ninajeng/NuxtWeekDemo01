<script setup>
definePageMeta({
  layout: 'account'
})
const route = useRoute();

if(route.fullPath === '/account'){
  await navigateTo('/account/login');
}
</script>

<template>
  <NuxtPage />
</template>

<style scoped></style>