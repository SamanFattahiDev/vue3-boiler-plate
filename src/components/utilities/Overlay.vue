<template>
  <div v-if="showLoadingOverlay" class="z-[99999] w-full fixed min-h-full flex items-center justify-center" style="background: rgba(0,0,0,0.5)">
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import {useAppStore} from "@/stores/app";
const appStore = useAppStore()
const showLoadingOverlay = computed(()=>{
  return appStore.getOverlayState
})
</script>

<style scoped>
.code-loader {
  color: #fff;
  font-family: Consolas, Menlo, Monaco, monospace;
  font-weight: bold;
  font-size: 100px;
  opacity: 0.8;
}

.code-loader span {
  display: inline-block;
  animation: pulse_414 0.4s alternate infinite ease-in-out;
}

.code-loader span:nth-child(odd) {
  animation-delay: 0.4s;
}

@keyframes pulse_414 {
  to {
    transform: scale(0.8);
    opacity: 0.5;
  }
}

 .lds-roller {
   display: inline-block;
   position: relative;
   width: 80px;
   height: 80px;
 }
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fff;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>