// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    baseURL: "/",
    head: {
      htmlAttrs: {
        lang: "zh-Hant-TW",
      },
      title: "享樂酒店｜Enjoyment Luxury Hotel",
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
    },
  },
  css: ["~/assets/stylesheets/all.scss"],
  typescript: {
    typeCheck: true,
  },
});
