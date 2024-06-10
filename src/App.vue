<template>
  <div class="min-h-screen w-full">
    <ScrollToTopBtn></ScrollToTopBtn>
    <Overlay></Overlay>
    <Toast></Toast>
    <Header></Header>
    <!--  sidebar  -->
    <!--  main content  -->
      <router-view v-slot="{ Component }">
        <transition appear mode="out-in" name="fade">
          <component :is="Component"/>
        </transition>
      </router-view>


  </div>
</template>

<script lang="ts" setup>
import {computed, inject, onMounted, ref} from "vue";
import {RouterView, useRoute, useRouter} from "vue-router";
import Toast from "@/components/utilities/Toast.vue";
import Overlay from "@/components/utilities/Overlay.vue";
import {useAppStore} from "@/stores/app";
import {useAuthStore} from "@/stores/auth";
import ScrollToTopBtn from "@/components/utilities/ScrollToTopBtn.vue";
import Header from "@/components/main/Header.vue";

const appStore = useAppStore();
const route: any = useRoute();
const router: any = useRouter();
const authStore: any = useAuthStore()
onMounted(async () => {

  const body: any = document.querySelector("body");
  // Set theme
  if (appStore.getSiteTheme) {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }

  // Set RTL
  const isRTL = appStore.isRTL;
  if (isRTL) body.style.direction = "rtl";
});
</script>

<style scoped></style>
