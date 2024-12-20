<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const modules = ref([Autoplay, Navigation, Pagination]);

type TProps = {
  heroImages: string[]
}
defineProps<TProps>();
</script>

<template>
  <section class="hero position-relative">
    <swiper :modules="modules" :slides-per-view="1" :pagination="true" :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
    }">
      <template v-if="!heroImages?.length">
        <swiper-slide v-for="(num, index) in 5" :key="index">
          <picture>
            <source srcset="@/assets/images/home-hero.png" media="(min-width:576px)">
            <img class="hero-img" src="@/assets/images/home-hero-sm.png" alt="hero banner">
          </picture>
        </swiper-slide>
      </template>
      <template v-else>
        <swiper-slide v-for="(roomUrl, index) in heroImages" :key="index">
          <img class="hero-img" :src="roomUrl" alt="hero banner">
        </swiper-slide>
      </template>
    </swiper>

    <slot />

  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/stylesheets/swiper/base';

.hero img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  filter: brightness(40%);
}

.hero .swiper :deep(.swiper-pagination) {
  bottom: 32px;
}
</style>