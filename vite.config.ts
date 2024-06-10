import {fileURLToPath, URL} from "node:url";
import {VitePWA} from 'vite-plugin-pwa'
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";

const path = require("path");
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), VitePWA({
        registerType: 'autoUpdate', devOptions: {
            enabled: true
        },
        workbox: {
            clientsClaim: true,
            skipWaiting: true,
            cleanupOutdatedCaches: true,
        },
        manifest: {
            "name": "Rn Order",
            "short_name": "Rn Order",
            "description": "Order App",
            "background_color": "#ffffff",
            "theme_color": "#facc15",
            "dir": "rtl",
            "lang": "fa",
            "display": "standalone",
            "start_url": "/",
            "icons": [
                {
                    "src": "/img/icons/android-chrome-192x192.png",
                    "sizes": "192x192",
                    "type": "image/png"
                },
                {
                    "src": "/img/icons/android-chrome-512x512.png",
                    "sizes": "512x512",
                    "type": "image/png"
                },
                {
                    "src": "/img/icons/favicon-16x16.png",
                    "sizes": "16x16",
                    "type": "image/png"
                },
                {
                    "src": "/img/icons/apple-touch-icon.png",
                    "sizes": "180x180",
                    "type": "image/png"
                },
                {
                    "src": "/img/icons/favicon-32x32.png",
                    "sizes": "32x32",
                    "type": "image/png"
                },
                {
                    "src": "/img/icons/favicon.ico",
                    "sizes": "16x16",
                    "type": "image/ico"
                }
            ]
        }

    })],
    base: "/",
    resolve: {
        mainFields: ["browser", "module", "main", "jsnext:main", "jsnext"],
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
