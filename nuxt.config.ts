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
   "nuxt-socket-io",
   "dayjs-nuxt"
 ],
 
 io: {
  // Default socket.io server configuration
  sockets: [
    {
      name: 'iotControl',  // Optional, the default name for this socket
      url: 'http://localhost:8080',  // Replace with your WebSocket server URL
      default: true,  // Automatically used as default socket connection
      namespaces: {},  // Optional, specify different namespaces
      // Options specific to socket.io-client
      options: {
        reconnection: true,  // Enable reconnection
        reconnectionAttempts: 5,  // Number of attempts before giving up
        transports: ['websocket'],  // Specify WebSocket as the transport protocol
      },
    },
    // You can add more socket connections if needed
  ],
},

})