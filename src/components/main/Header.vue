<template>
  <div
    v-if="route.name !== 'conversation'"
    class="bg-white mb-3 sticky print:hidden  z-50 dark:bg-dark-muted rounded-xl flex items-center justify-between w-1/2 shadow gap-3 p-5"
  >
    <div @click="openSideBar" class="hidden hover:fill-primary">
      <MenuIcon class="fill-black dark:fill-white"></MenuIcon>
    </div>
    <div class="flex items-center z-50 relative justify-center">
      <small class="dark:text-white">{{
        authStore?.getUser?.name + " " + authStore?.getUser?.familyName
      }}</small>
    </div>
    <div class="flex items-center">
      <div class="flex cursor-pointer items-center">
        <div class="relative flex justify-start">
          <transition name="rotate">
            <MoonIcon
              v-if="appStore.getSiteTheme"
              @click="toggleSiteTheme"
              class="fill-black dark:fill-white absolute -top-3 xl:left-0 left-4"
            ></MoonIcon>
          </transition>
          <transition name="rotate">
            <SunIcon
              v-if="!appStore.getSiteTheme"
              @click="toggleSiteTheme"
              class="fill-black dark:fill-white absolute -top-3 xl:left-0 left-4"
            ></SunIcon>
          </transition>
        </div>
      </div>
      <div class="flex items-center z-50 relative justify-center">
        <label
            for="logoutModal"
            class="text-black md:hidden dark:text-white fill-black dark:fill-white"
        >
          <PowerIcon class="w-5 h-5 fill-red-500"></PowerIcon>
        </label>
      </div>

    </div>

    <!--  Delete Modal  -->
    <Modal
      :id="'logoutModal'"
      @ok="logout"
      :closeModalTitle="'خیر'"
      :okModalTitle="'بله'"
      :has-body="false"
      :title="'آیا میخواهید از حساب کاربری خود خارج شوید'"
    ></Modal>
  </div>
</template>

<script setup>
import { useAppStore } from "@/stores/app";
import MenuIcon from "@/components/icons/MenuIcon.vue";
import { useSideBarStore } from "@/stores/sideBar";
import MoonIcon from "@/components/icons/MoonIcon.vue";
import SunIcon from "@/components/icons/SunIcon.vue";
import {inject, ref, watch} from "vue";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";
import DoorIcon from "@/components/icons/DoorIcon.vue";
import PowerIcon from "@/components/icons/PowerIcon.vue";
import Modal from "@/components/utilities/Modal.vue";
import { useRoute } from "vue-router";
const $cookies = inject('$cookies')
const sideBar = useSideBarStore();
const appStore = useAppStore();
const authStore = useAuthStore();
const route = useRoute();
function toggleSiteTheme() {
  appStore.toggleSiteTheme();
}
function logout() {
  authStore.logout();
  router.push("/");
  $cookies.remove('token')

}
const myVar = ref('')

function openSideBar() {
  sideBar.showSideBar = !sideBar.showSideBar;
}
</script>

<style scoped></style>
