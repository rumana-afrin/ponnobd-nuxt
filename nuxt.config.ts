export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  vite: {
    build: {
      minify: 'esbuild', // default, fast minifier 
    }
  },

  app: {
    baseURL: '/', 
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css",
          integrity: "sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer"
        },
        { rel: "stylesheet", href: "/css/bootstrap.min.css" },
        { rel: "stylesheet", href: "/css/magiczoom.css" },
        { rel: "stylesheet", href: "/css/main.css" },
      ],
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js",
          integrity: "sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer",
          tagPosition: 'bodyClose'
        },
        {
          src: "/js/bootstrap.bundle.min.js",
          tagPosition: 'bodyClose',
          type: "text/javascript"
        },
        {
          src: "/js/magiczoom.js",
          tagPosition: 'bodyClose',
          type: "text/javascript"
        },
        {
          src: "/js/main.js",
          tagPosition: 'bodyClose',
          type: "text/javascript"
        }
      ]
    }
  }
});
