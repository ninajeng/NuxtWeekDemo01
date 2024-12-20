<script setup lang="ts">
import type { TNewsResult } from '@/types';

type TProps = {
  newsList: TNewsResult[] | null,
}
defineProps<TProps>()

</script>

<template>
  <section class="news bg-primary-10 py-20 py-md-30">
    <div class="container position-relative">
      <div class="row">
        <div class="col-12 col-md-2">
          <div class="mb-10 mb-md-0">
            <h2 class="mb-6 mb-md-10 fs-1 fw-bold text-primary-100">
              最新<br>消息
            </h2>
            <div class="deco-line" />
          </div>
        </div>
        <div class="col-12 col-md-10 d-flex flex-column gap-10">
          <AppErrorMessage v-if="newsList === null" />
          <template v-else>
            <div class="card bg-transparent border-0" v-for="news in newsList" :key="news._id">
              <div class="d-flex flex-column flex-md-row align-items-center gap-6">
                <img :src="news.image" class="rounded-3" :alt="news.title">
                <div class="card-body p-0">
                  <h3 class="card-title mb-2 mb-md-6 fw-bold">
                    {{ news.title }}
                  </h3>
                  <p class="card-text text-neutral-80 fs-8 fs-md-7 fw-medium">
                    {{ news.description }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/stylesheets/page/index/button";

.news .deco-line {
  width: 140px;
}

.news picture {
  --parent-witdh: 1076;
  --width: 474;
  --percent-width: calc(var(--width) / var(--parent-witdh) * 100%);
  width: var(--percent-width);
  flex-shrink: 0;

  @include media-breakpoint-down(md) {
    width: 100%;
  }
}

.news .container::before {
  background-image: url('@/assets/images/deco-dot-group.svg');
  content: '';
  display: block;
  position: absolute;
  top: -20px;
  right: -120px;
  width: 200px;
  height: 200px;

  @include media-breakpoint-down(md) {
    background-image: url('@/assets/images/deco-dot-group-sm.svg');
    width: 100px;
    height: 100px;
    top: -40px;
    right: 24px;
  }
}

.news .container::after {
  background-image: url('@/assets/images/deco-dot-group.svg');
  content: '';
  display: block;
  position: absolute;
  bottom: -200px;
  left: -100px;
  width: 200px;
  height: 200px;

  @include media-breakpoint-down(md) {
    background-image: url('@/assets/images/deco-dot-group-sm.svg');
    width: 100px;
    height: 100px;
    bottom: -140px;
    left: 24px;
  }
}
</style>