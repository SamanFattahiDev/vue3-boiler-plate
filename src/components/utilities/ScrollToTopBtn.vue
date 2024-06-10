<template>
<div v-if="pageScroll>=300" @click="scrollTop" class="w-12 h-12  z-[99] fixed cursor-pointer hover:bg-primary border-none hover:text-white transition-all xl:bottom-5 bottom-20 right-5 rounded-full bg-white shadow-lg border flex items-center justify-center">
  <i class="ri ri-arrow-up-line "></i>
</div>
</template>

<script setup>
import {onMounted, ref} from "vue";

let pageScroll = ref(0)
onMounted(()=>{
  window.addEventListener('scroll',setScroll)
})
function setScroll(){
  pageScroll.value = window.scrollY
}
function scrollTop(){
  window.scrollTo({top:0,behavior:'smooth'})
}
</script>

<style scoped>

</style>