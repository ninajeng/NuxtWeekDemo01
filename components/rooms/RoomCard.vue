<script setup>
import { Icon } from '@iconify/vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const { formatNumber } = useFormatNumber()

const modules = ref([Autoplay, Navigation, Pagination]);

defineProps({
  room: Object
})
</script>

<template>
  <li class="card flex-lg-row border-0 rounded-3xl overflow-hidden">
    <div class="row">
      <div class="col-12 col-lg-7">
        <swiper :modules="modules" :slides-per-view="1" navigation :pagination="{ clickable: true }" :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }" class="h-100">
          <swiper-slide v-for="(imageUrl, index) in room.images" :key="`roomImage-${index}`">
            <img class="w-100 h-100 object-fit-cover" :src="imageUrl" loading="lazy" :alt="`${room.name}-${index}`">
          </swiper-slide>
        </swiper>
      </div>
      <div class="col-12 col-lg-5">
        <div class="card-body pe-md-10 py-md-10">
          <h3 class="card-title fs-2 fw-bold text-neutral-100">
            {{ room.name }}
          </h3>
          <p class="card-text mb-6 mb-md-10 fs-8 fs-md-7 fw-medium text-neutral-80">
            {{ room.description }}
          </p>
          <ul class="d-flex gap-4 mb-6 mb-md-10 list-unstyled">
            <li class="card-info px-4 py-5 border border-primary-40 rounded-3">
              <Icon class="mb-2 fs-5 text-primary-100" icon="fluent:slide-size-24-filled" />
              <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
                {{ room.areaInfo }}
              </p>
            </li>
            <li class="card-info px-4 py-5 border border-primary-40 rounded-3">
              <Icon class="mb-2 fs-5 text-primary-100" icon="material-symbols:king-bed" />
              <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
                {{ room.bedInfo }}
              </p>
            </li>
            <li class="card-info px-4 py-5 border border-primary-40 rounded-3">
              <Icon class="mb-2 fs-5 text-primary-100" icon="ic:baseline-person" />
              <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
                {{ `2-${room.maxPeople} 人` }}
              </p>
            </li>
          </ul>
          <div class="deco-line w-100 mb-6 mb-md-10" />
          <div class="d-flex justify-content-between align-items-center fs-7 fs-md-5 text-primary-100">
            <p class="mb-0 fw-bold">
              {{ `NT$ ${formatNumber(room.price)}` }}
            </p>
            <NuxtLink :to="{
              name: 'rooms-roomId',
              params: {
                roomId: room._id
              }
            }" class="icon-link icon-link-hover text-primary-100">
              <Icon class="bi  fs-5" icon="mdi:arrow-right" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<style lang="scss" scoped>
@import "@/assets/stylesheets/swiper/base";
@import "@/assets/stylesheets/page/breakpoints";

.swiper :deep(.swiper-button-prev),
.swiper :deep(.swiper-button-next) {
  width: 56px;
  height: 56px;
  background-color: #ffffff;
  color: #4b4b4b;
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

.swiper {
  display: grid;
}

.swiper :deep(.swiper-wrapper) {
  min-width: 0;
}

.card-info {
  width: 97px;
  height: 97px;
}

.deco-line {
  width: 33vw;
  height: 2px;
  background-image: linear-gradient(to right, #be9c7c, #ffffff);
}

.rounded-3xl {
  border-radius: 1.25rem;
}
</style>