<script setup lang="ts">
import type { TRestaurantResult } from '@/types';

type TProps = {
  restaurantList: TRestaurantResult[] | null
}
defineProps<TProps>()

const formateOpenDay = (diningTime: string) => diningTime.split(' ')[0]
const formateOpenTime = (diningTime: string) => diningTime.split(' ')[1]
</script>

<template>
  <section class="delicacy position-relative py-20 py-md-30 bg-primary-10">
    <div class="container">
      <div class="d-flex align-items-center gap-10 mb-10 mb-md-20">
        <h2 class="mb-0 fs-1 fw-bold text-primary-100">
          佳餚<br>美饌
        </h2>
        <div class="deco-line" />
      </div>
      <AppErrorMessage v-if="restaurantList === null" />
      <div class="row flex-nowrap overflow-x-auto" v-else>
        <div class="col-10 col-md-6 col-xl-4" v-for="restaurant in restaurantList" :key="restaurant._id">
          <div class="card position-relative border-0 rounded-3">
            <img class="w-100 rounded-3" :src="restaurant.image" :alt="restaurant.title">
            <div class="card-body position-absolute bottom-0 p-4 p-md-6 rounded-bottom-3  text-neutral-0">
              <div class="d-flex justify-content-between align-items-center mb-4 mb-md-6">
                <h5 class="card-title mb-0 fw-bold">
                  {{ restaurant.title }}
                </h5>
                <div class="d-flex justify-content-between gap-4 text-neutral-40 fs-8 fs-md-7">
                  <span class="fw-bold">{{ formateOpenDay(restaurant.diningTime) }}</span>
                  <span class="fw-bold">{{ formateOpenTime(restaurant.diningTime) }}</span>
                </div>
              </div>
              <p class="card-text fs-8 fs-md-7">
                {{ restaurant.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/stylesheets/page/breakpoints";

.delicacy::before {
  @include media-breakpoint-up(lg) {
    position: absolute;
    top: -40px;
    right: 80px;
    content: '';
    width: 200px;
    height: 200px;
    background-image: url('@/assets/images/deco-dot-group.svg');
  }
}

.delicacy::after {
  @include media-breakpoint-up(xxxl) {
    position: absolute;
    top: 55px;
    left: 40px;
    content: '';
    width: 187px;
    height: 1068px;
    background-image: url('@/assets/images/deco-line-group-vertical.svg');
  }
}

.delicacy .deco-line {
  width: 200px;

  @include media-breakpoint-up(md) {
    width: 167px;
  }
}

.delicacy .card-body {
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #140F0A 77.6%);
  backdrop-filter: blur(10px);
}
</style>