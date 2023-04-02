import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        // Keys within public, will be also exposed to the client-side
        public: {
            gtag: process.env.NUXT_PUBLIC_GTAG || "",
            googleKey: process.env.NUXT_PUBLIC_GOOGLE_KEY || "",
            contentfulSpace: process.env.NUXT_PUBLIC_CONTENTFUL_SPACE || "",
            contentfulAccessToken:
                process.env.NUXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
            sentryDsn: process.env.NUXT_PUBLIC_SENTRY_DSN || "",
        },
    },

    app: {
        head: {
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1",
        },
    },

    modules: [
        "@nuxtjs/web-vitals",
        "@nuxt/image-edge",
        "@vueuse/nuxt",
        "@nuxtjs/tailwindcss",
        "@nuxt/content",
        "@pinia/nuxt",
        "nuxt-simple-sitemap",
        "@nuxtjs/eslint-module",
        "nuxt-icon",
        "@nuxtjs/i18n",
        "@nuxtjs/google-fonts",
        "@nuxtjs/fontaine",
    ],

    i18n: {
        locales: [
            {
                code: "de",
                file: "de.js",
            },
            {
                code: "en",
                file: "en.js",
            },
        ],
        lazy: true,
        langDir: "lang",
        defaultLocale: "de",
        vueI18n: {
            legacy: false,
            fallbackLocale: "en",
        },
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: "i18n_redirected",
            redirectOn: "root", // recommended
        },
    },

    eslint: {
        /* module options */
    },

    image: {
        // The screen sizes predefined by `@nuxt/image`:
        screens: {
            xs: 320,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1536,
            "2xl": 2536,
        },

        domains: [
            "tailwindui.com",
            "images.unsplash.com",
            "images.ctfassets.net",
        ],

        alias: {
            unsplash: "https://images.unsplash.com",
            tailwind: "https://tailwindui.com",
            contentful: "https://images.ctfassets.net",
        },

        presets: {
            hero: {
                modifiers: {
                    format: "webp",
                    quality: "80",
                },
            },

            card: {
                modifiers: {
                    format: "webp",
                    quality: "80",
                },
            },
        },
    },

    tailwindcss: {
        cssPath: "~/assets/css/app.pcss",
    },

    googleFonts: {
        prefetch: true,
        preconnect: true,
        families: {
            Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        },
    },
});
