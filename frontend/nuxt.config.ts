// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || "http://localhost:3001",
    },
  },
  ssr: false, // Отключаем SSR для работы с Chart.js
});
