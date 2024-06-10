<template>
  <div class="w-full grid grid-cols-12 gap-3 ">
    <div class="col-span-12 xl:col-span-3 mb-5">
      <VInput v-model="debouncedSearch" :dataType="'text'" :placeHolder="'جستجو...'"
              class="col-span-12"></VInput>
    </div>
    <slot name="filters"></slot>
    <div class="grid grid-cols-12 col-span-12 rounded-xl border border-gray-200 dark:border-gray-500 gap-3 mb-5">
      <slot name="main"></slot>
    </div>
    <div class="col-span-12 w-full flex xl:flex-row flex-col xl:items-center justify-between">
      <div class="mb-5 xl:flex block justify-start  md:justify-start items-center px-3">
        <v-select
            v-model="pageCount"
            :clearable="false"
            :options="pageCountItems"
            :reduce="(name) => name.value"
            class="md:w-1/3 min-w-[8rem]"
            label="name">
        </v-select>
      </div>

      <div v-if="props.totalPages?.length > 1" class="flex flex-row xl:justify-center items-center">
        <Pagination :activePage="selectedPageId" :totalPages="props.totalPages"
                    @PageChanged="changePage($event)"></Pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VInput from "@/components/utilities/VInput.vue";
import {computed, onMounted, reactive, ref, watch} from "vue";
import Pagination from "@/components/utilities/Pagination.vue";

const emits = defineEmits(['setSearch', 'setPageCount', 'setNewPage'])
const props = defineProps({
      totalPages: {
        type: Array
      },
    }
)


let searchCommand = ref<string>('')
let timeout = ref<any>(null)
let selectedPageId = ref<number>(1);

let pageCountItems = reactive([
  {name: '10', value: 10}, {name: '20', value: 20}, {name: '30', value: 30}, {name: '40', value: 40}, {
    name: '50',
    value: 50
  }
])
let pageCount = ref<number>(10);

let debouncedSearch = computed({
  get() {
    return searchCommand.value;
  },
  // setter
  set(val) {
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    timeout.value = setTimeout(() => {
      searchCommand.value = val;
    }, 600);
  },
})
watch(searchCommand, () => {
  emits('setSearch', searchCommand.value)
})
watch(pageCount, () => {
  emits('setPageCount', pageCount.value)
})

function changePage(pageId: number) {
  selectedPageId.value = pageId
  emits('setNewPage', selectedPageId.value)

}
</script>

<style scoped>

</style>