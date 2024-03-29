import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,

    experimental: {
        componentIslands: true,
    },

    nitro: {
        compressPublicAssets: true,
        prerender: {
            // crawlLinks: true,
        },
    },

    runtimeConfig: {
        // Keys within public, will be also exposed to the client-side
        public: {
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://example.com",
            gtag: process.env.NUXT_PUBLIC_GTAG || "",
            googleKey: process.env.NUXT_PUBLIC_GOOGLE_KEY || "",
            sentryDsn: process.env.NUXT_PUBLIC_SENTRY_DSN || "",
        },
    },

    app: {
        head: {
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1",
        },
    },

    /*
    routeRules: {
        // Homepage pre-rendered at build time
        "/": { prerender: true },
        // Product page generated on-demand, revalidates in background
        "/products/**": { swr: true },
        // Blog post generated on-demand once until next deploy
        "/blog/**": { isr: true },
        // Admin dashboard renders only on client-side
        "/admin/**": { ssr: false },
        // Add cors headers on API routes
        "/api/**": { cors: true },
        // Redirects legacy urls
        "/old-page": { redirect: "/new-page" },
    },
    */

    modules: [
        "@nuxtjs/web-vitals",
        "@nuxt/image-edge",
        "@vueuse/nuxt",
        "@nuxtjs/tailwindcss",
        "@nuxt/content",
        "@pinia/nuxt",
        "@nuxtjs/sitemap",
        "nuxt-simple-robots",
        "@nuxtjs/eslint-module",
        "nuxt-icon",
        "@nuxtjs/i18n",
        "@nuxtjs/google-fonts",
        "@nuxtjs/fontaine",
        "@kevinmarrec/nuxt-pwa",
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
        viewer: false,
    },

    googleFonts: {
        prefetch: true,
        preconnect: true,
        families: {
            Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        },
    },

    pwa: {
        workbox: {
            enabled: process.env.NODE_ENV === "production",
        },
    },

    postcss: {
        plugins: {
            "postcss-import": {},
            "tailwindcss/nesting": "postcss-nested",
            tailwindcss: {},
            autoprefixer: {},
            "postcss-preset-env": {
                features: { "nesting-rules": false },
            },
            ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
        },
    },
});
