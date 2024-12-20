<script setup lang="ts">
type TProps = {
  heroImages: string[]
}
defineProps<TProps>()
</script>

<template>
  <HeroSwiper :heroImages="heroImages">
    <div
      class="hero-wrapper d-flex flex-column justify-content-center align-items-center flex-md-row justify-content-md-between gap-md-10 w-100 px-md-20 position-absolute z-2">
      <div class="d-flex flex-column align-items-center text-center d-md-block text-md-start">
        <div class="mt-10 mb-5 mt-md-0 mb-md-10 text-primary-100 fw-bold">
          <h2>
            享樂酒店
          </h2>
          <h5 class="mb-0 fs-7 fs-md-5">
            Enjoyment Luxury Hotel
          </h5>
        </div>
        <div class="deco-line" />
      </div>
      <div class="hero__intro position-relative">
        <div class="hero__intro-content">
          <h1 class="mb-6 text-white fw-bold text-nowrap">
            高雄<br>豪華住宿之選
          </h1>
          <p class="text-neutral-40 fw-semibold">
            我們致力於為您提供無與倫比的奢華體驗與優質服務
          </p>
          <RouterLink to="/rooms"
            class="btn btn-neutral-0 d-flex justify-content-end align-items-center gap-3 w-100 text-end text-neutral-100 fs-5 fw-semibold border-0">
            立即訂房
            <div class="cta-deco" />
          </RouterLink>
        </div>
      </div>
    </div>
  </HeroSwiper>
</template>

<style lang="scss" scoped>
@import "@/assets/stylesheets/page/breakpoints";
@import "@/assets/stylesheets/page/index/button";

.hero-wrapper {
  inset: 0;
}

.hero__intro {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: clamp(291px, 48vw, 924px);
  max-height: min(62vh, 672px);
  padding: 5.5%;
  background-image: linear-gradient(to bottom, #FFFFFF00, #FFFFFF4D);
  border-width: 1px 1px 0px 0px;
  border-style: solid;
  border-color: #F5F7F9;
  border-radius: 80px;
  backdrop-filter: blur(6px);

  @include media-breakpoint-down(md) {
    transform: translateX(10%);
    height: 420px;
  }
}

.hero__intro-content {
  max-width: 39vw;
  transform: translateX(-18%);

  @include media-breakpoint-down(md) {
    max-width: none;
    transform: translateX(-11%);
  }
}

.hero__intro-content h1 {
  font-size: clamp(3rem, 5.2vw, 6.25rem);
}

.hero__intro-content p {
  font-size: clamp(1rem, 1.7vw, 2rem);
  margin-bottom: min(5vh, 3.75rem);
  white-space: nowrap;

  @include media-breakpoint-down(md) {
    white-space: normal;
  }
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
</style>