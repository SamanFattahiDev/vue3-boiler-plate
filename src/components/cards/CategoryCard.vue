<template>
  <div class="collapse  rounded-xl !shadow bg-yellow-400 collapse-arrow shadow" dir="rtl">

    <input name="my-accordion-2" type="checkbox"/>
    <div class="collapse-title px-3 text-xl text-black  font-medium">
      {{ props.item.title }}
    </div>
    <div class="collapse-content  pt-2 ">
      <div class="w-full grid gap-3 gap-x-5 grid-cols-6">
        <div class="col-span-6 flex justify-between items-center" dir="rtl">
          <div class="flex items-center">
            <input v-model="searchChildren"
                   class="form-control  w-full border-l- rounded-l-none rounded-xl shadow bg-white  p-2"
                   placeholder="جستجو"
                   type="search">
            <button
                class="p-3 rounded-l-xl  fill-yellow-400  bg-white shadow border-r-0 transition-all  rounded-r-none  text-white">
              <svg class="w-4 h-4 " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.8675 18 18 14.8675 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18ZM19.4853 18.0711L22.3137 20.8995L20.8995 22.3137L18.0711 19.4853L19.4853 18.0711Z"></path>
              </svg>
            </button>
          </div>
          <div class="flex items-center gap-1">
            <i :class="{'!text-white dark:!text-black':selectedGrid===2}" class="ri-layout-grid-line cursor-pointer  text-xl"
               @click="selectedGrid=2"></i>
            <i :class="{'!text-white dark:!text-black':selectedGrid===3}" class="ri-align-justify cursor-pointer text-xl"
               @click="selectedGrid=3"></i>
          </div>
        </div>
        <div v-for="(child,idx) in filteredChildren" :class="getColumns" class=" flex   items-center justify-between">
          <span class="dark:text-black">{{ child.title }}</span>
          <input v-model="child.quantity" class="form-control shadow dark:text-black rounded-xl w-16 h-10" dir="ltr" type="number">
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>


import {computed, inject, ref} from "vue";
import {useAppStore} from "@/stores/app";
let availableColumns = ref({
  2: ' col-span-3 ',
  3: ' col-span-6 ',
})
let selectedGrid = ref(3)
let searchChildren = ref('')
const props = defineProps({
  children: {
    type: Array
  },
  item: {
    type: Object
  }
})
let getColumns = computed(() => {
  return availableColumns.value[selectedGrid.value]
})
let api: any = inject('repositories')
let appStore = useAppStore()


let filteredChildren = computed(() => {
  if (props.children) {
    return props.children.filter(e => e.title.includes(searchChildren.value) && e.isAvailable)
  }
})


</script>

<style scoped>
.collapse-title::after {
  display: none;
}
</style>
