<script setup lang="ts">
import HeroSection from '@/components/index/HeroSection.vue';
import NewsSection from '@/components/index/NewsSection.vue';
import AboutSection from '@/components/index/AboutSection.vue';
import RoomIntroSection from '@/components/index/RoomIntroSection.vue';
import DelicacySection from '@/components/index/DelicacySection.vue';
import TransportationSection from '@/components/index/TransportationSection.vue';

import { getNewsList } from '@/api/newsList';
import { getRoomList } from '@/api/roomList';
import { getRestaurantList } from '@/api/restaurantList';

import type { TNewsResult, TRoomResult, TRestaurantResult } from '@/types';

const newsList = ref<TNewsResult[] | null>(null);
const roomInfo = ref<TRoomResult | null>(null);
const heroImages = ref<string[]>([])
const restaurantList = ref<TRestaurantResult[] | null>(null);

const [newsResponse, roomResponse, restaurantResponse] = await Promise.allSettled([getNewsList(), getRoomList(), getRestaurantList()])
if (newsResponse.status === 'fulfilled') {
  newsList.value = newsResponse.value.data.value;
}
if (roomResponse.status === 'fulfilled' && roomResponse.value.data.value) {
  const roomList = roomResponse.value.data.value;
  roomInfo.value = roomList[0];
  roomList.forEach(room => {
    heroImages.value.push(room.imageUrl)
  })
}
if (restaurantResponse.status === 'fulfilled') {
  restaurantList.value = restaurantResponse.value.data.value;
}

</script>

<template>
  <main class="overflow-hidden">
    <HeroSection :heroImages="heroImages" />
    <NewsSection :newsList="newsList" />
    <AboutSection />
    <RoomIntroSection :roomInfo="roomInfo" />
    <DelicacySection :restaurantList="restaurantList" />
    <TransportationSection />
  </main>
</template>

<style lang="scss" scoped></style>