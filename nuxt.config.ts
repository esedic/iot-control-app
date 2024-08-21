// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { 
    enabled: true 
  },
  nitro: {
    experimental: {
      websocket: true
    },
 },
  modules: [ 
    "@nuxt/ui", 
    "nuxt-socket-io"],
  io: {
      server: false,
      sockets: [ // Required
        { // At least one entry is required
          name: 'iot-control',
          url: 'http://localhost:8080/rest/status'
        }
      ]
    }
})