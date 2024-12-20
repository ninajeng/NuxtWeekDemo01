<script setup lang="ts">
import { getRoomList } from '@/api/roomList';

import RoomCard from '@/components/rooms/RoomCard.vue';
import HeroSwiper from '@/components/global/HeroSwiper.vue';

const heroImages = ref<string[]>([])
const { data: roomList } = await getRoomList()
if (roomList.value) {
  roomList.value.forEach(room => {
    heroImages.value.push(room.imageUrl)
  })
}

</script>

<template>
  <main>
    <HeroSwiper :heroImages="heroImages">
      <div
        class="hero-wrapper d-flex flex-column justify-content-center align-items-center flex-md-row gap-10 gap-md-20 w-100 position-absolute z-2">
        <div class="d-flex flex-column align-items-center text-center d-md-block text-md-start">
          <div class="mt-10 mb-5 mt-md-0 mb-md-10 text-primary-100 fw-bold">
            <h2 class="fw-semibold">
              享樂酒店
            </h2>
            <h5 class="fs-7 fs-md-5 fw-semibold">
              Enjoyment Luxury Hotel
            </h5>
          </div>
          <div class="deco-line" />
        </div>
        <h1 class="mb-0 text-neutral-0 fw-bold">
          客房旅宿
        </h1>
      </div>
    </HeroSwiper>

    <section class="rooms py-10 py-md-30 bg-primary-10">
      <div class="container mb-md-12">
        <h4 class="mb-2 mb-md-4 fs-8 fs-md-6 fw-bold text-neutral-80">
          房型選擇
        </h4>
        <AppErrorMessage v-if="roomList === null" />
        <template v-else>
          <h2 class="mb-10 mb-md-20 fs-1 fw-bold text-primary-100">
            各種房型，任您挑選
          </h2>
          <ul class="d-flex flex-column gap-6 gap-md-12 list-unstyled">
            <RoomCard :room="room" v-for="room in roomList" :key="room._id" />
          </ul>
        </template>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@import "@/assets/stylesheets/page/breakpoints";
@import '@/assets/stylesheets/swiper/base';

.hero-wrapper {
  inset: 0;
}

.deco-line {
  width: 33vw;
  height: 2px;
  background-image: linear-gradient(to right, #BE9C7C, #FFFFFF);
}

.hero .deco-line {
  @include media-breakpoint-down(md) {
    width: 2px;
    height: 83px;
    z-index: 1;
    background-image: linear-gradient(to bottom, #BE9C7C, #FFF);
    margin-bottom: 2.5rem;
  }
}

.rooms {
  min-height: 100vh;
}
</style>