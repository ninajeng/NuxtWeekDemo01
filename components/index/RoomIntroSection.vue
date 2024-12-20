<script setup lang="ts">
import { Icon } from '@iconify/vue';

import type { TRoomResult } from '@/types';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const { formatNumber } = useFormatNumber()

const modules = ref([Autoplay, Navigation, Pagination]);

const roomSwiper = ref<null | Ref>(null);

const slidePrev = () => {
  roomSwiper.value.$el.swiper.slidePrev();
}

const slideNext = () => {
  roomSwiper.value.$el.swiper.slideNext();
}

type TProps = {
  roomInfo: TRoomResult | null
}

const Props = defineProps<TProps>()

const roomImages = computed(() => {
  let images: string[] = []
  if (Props.roomInfo !== null) {
    images = [Props.roomInfo.imageUrl, ...Props.roomInfo.imageUrlList]
  }
  return images
})
</script>

<template>
  <section v-if="roomInfo === null">
    <AppErrorMessage />
  </section>
  <section class="room-intro position-relative px-3 py-20 px-md-0 py-md-30 bg-neutral-120" v-else>
    <div
      class="d-flex flex-column flex-md-row justify-content-center align-items-center justify-content-md-start align-items-md-end gap-6 gap-md-20">
      <swiper ref="roomSwiper" :modules="modules" :slides-per-view="1" :pagination="true" :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }" :loop="true">
        <swiper-slide v-for="(imgUrl, index) in roomImages" :key="index">
          <img class="w-100" :src="imgUrl" :alt="`${roomInfo.name}照片`">
        </swiper-slide>
      </swiper>
      <div class="room-intro-content text-neutral-0">
        <h2 class="mb-2 mb-md-4 fw-bold">
          {{ roomInfo.name }}
        </h2>
        <p class="mb-6 mb-md-10 fs-8 fs-md-7">
          {{ roomInfo.description }}
        </p>
        <div class="mb-6 mb-md-10 fs-3 fw-bold">
          {{ `NT$ ${formatNumber(roomInfo.price)}` }}
        </div>
        <RouterLink to="/rooms"
          class="btn btn-neutral-0 d-flex justify-content-end align-items-center gap-3 w-100 p-5 p-md-10 mb-6 mb-md-10 text-end text-neutral-100 fs-7 fs-md-5 fw-bold border-0">
          查看更多
          <div class="cta-deco" />
        </RouterLink>
        <div class="d-flex justify-content-end">
          <button class="bg-transparent text-primary-100 icon-link icon-link-hover border-0" type="button"
            @click="slidePrev">
            <Icon icon="mdi:arrow-left" class="bi m-4"
              style="font-size: 1.5rem; --bs-icon-link-transform: translateX(-0.25em);" />
          </button>
          <button class="bg-transparent text-primary-100 icon-link icon-link-hover border-0" type="button"
            @click="slideNext">
            <Icon icon="mdi:arrow-right" class="bi m-4" style="font-size: 1.5rem;" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/stylesheets/page/index/button";
@import "@/assets/stylesheets/swiper/base";

.room-intro::before {
  position: absolute;
  top: -24px;
  right: -80px;
  z-index: 2;
  content: '';
  width: 375px;
  height: 84px;
  background-image: url('@/assets/images/deco-line-group-horizontal-sm.svg');
  background-repeat: no-repeat;

  @include media-breakpoint-up(md) {
    background-image: url('@/assets/images/deco-line-group-horizontal.svg');
    width: 1060px;
    height: 187px;
    top: -50px;
    left: 430px;
    right: auto;
  }

  @include media-breakpoint-up(lg) {
    top: 0px;
    left: 430px;
  }

  @include media-breakpoint-up(xl) {
    top: 130px;
    left: 630px;
  }

  @include media-breakpoint-up(xxxl) {
    top: 180px;
    left: 860px;
  }
}

.room-intro::after {
  position: absolute;
  z-index: -1;
  bottom: 265px;
  right: 0;
  content: '';
  width: 375px;
  height: 132px;
  background-image: url('@/assets/images/deco-wave-bg-sm.svg');
  background-repeat: no-repeat;

  @include media-breakpoint-up(md) {
    background-image: url('@/assets/images/deco-wave-bg.svg');
    width: 1920px;
    height: 86%;
    bottom: 0;
    left: -280px;
    right: auto;
  }

  @include media-breakpoint-up(lg) {
    height: 80%;
  }

  @include media-breakpoint-up(xl) {
    height: 62.5%;
    left: -100px;
  }

  @include media-breakpoint-up(xxxl) {
    height: 677px;
    bottom: 0;
    left: 0;
  }
}

.room-intro .swiper {
  --origin-width: 900;
  --container-width: 1920;
  --percent-width: calc(var(--origin-width) / var(--container-width) * 100vw);
  max-width: var(--percent-width);
  margin: 0;

  @include media-breakpoint-down(md) {
    max-width: 100%;
  }
}

.room-intro-content {
  max-width: 628px;

  @include media-breakpoint-up(xxxl) {
    flex-grow: 1;
  }
}

.swiper :deep(.swiper-button-prev),
.swiper :deep(.swiper-button-next) {
  width: 56px;
  height: 56px;
  background-color: #FFFFFF;
  color: #4B4B4B;
  border-radius: 100px;

  @include media-breakpoint-down(md) {
    display: none;
  }
}

.swiper :deep(.swiper-button-prev::after),
.swiper :deep(.swiper-button-next::after) {
  font-size: 40px;
}

.swiper :deep(.swiper-button-prev::after) {
  display: inline-block;
  width: 1em;
  height: 1em;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z'/%3E%3C/svg%3E");
  background-color: currentColor;
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}

.swiper :deep(.swiper-button-next::after) {
  display: inline-block;
  width: 1em;
  height: 1em;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z'/%3E%3C/svg%3E");
  background-color: currentColor;
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}
</style>