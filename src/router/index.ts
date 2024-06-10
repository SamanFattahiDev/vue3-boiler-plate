import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "@/stores/auth";
import {useSideBarStore} from "@/stores/sideBar";
// import auth from "@/middlewares/auth";
const Doc: any = document;
// @ts-ignore
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "index",
            meta: {
                title: " | ورود",
            },
            component: () => import("../views/index.vue"),
        },
        {
            path: "/akbar",
            name: "akbar",
            meta: {
                title: " | درباره ما",
            },
            component: () => import("../views/about-us.vue"),
        },
    ],
});
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    if (to?.meta?.title) {
        Doc.title = to?.meta?.title;
    }
    if (to?.meta?.auth) {
        if (authStore.isLogged) {
            next();
        } else {
            next({name: "index"});
        }
    } else {
        next();
    }
    const sideBarStore = useSideBarStore();
    if (sideBarStore.showSideBar) {
        sideBarStore.showSideBar = false;
    }
});
export default router;
