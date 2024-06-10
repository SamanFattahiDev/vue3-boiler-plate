<template>
  <div class="overflow-x-auto col-span-12">

    <table class="w-full   !overflow-x-scroll">
      <!-- head -->
      <thead class="bg-gray-600 text-white h-[3.5rem] text-xs md:text-base">
      <tr>
        <th class="min-w-[5rem]" v-for="(item,idx) in props.fields" :key="idx">{{ item['label'] }}</th>
      </tr>
      </thead>
      <tbody class="text-xs md:text-base">
        <tr  class="!h-10 leading-10" v-for="(row,idx) in props.items" :key="idx"   :class="computedColors(+idx,row)">
          <td v-for="(td,idx) in props.fields"  :key="idx">
            <slot :items="row" :name="td?.key">
              <span class="print:text-black print:font-bold" v-if="row[td?.key]">{{ row[td?.key] }}</span>
              <span v-else>-</span>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script setup lang="ts">
import helper from "@/plugins/helper";
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
const route = useRoute()
const props = defineProps({
  items: Object,
  fields: Object,
  emptyText: String
})
let queryFilters = ref({
  'sparliocne': {
    english: 'salon',
    persian: 'سالن'
  },
  'sphroipce': {
    english: 'shop',
    persian: 'مغازه'
  },
  'apgreincte': {
    english: 'agent',
    persian: 'نماینده'
  },
  'sperlilceer': {
    english: 'seller',
    persian: 'تک فروشی'
  },
})
function  computedColors(idx:number,row){
  if(idx%2===0){
    return 'bg-white  dark:bg-gray-800'
  }else{
    return 'bg-gray-100 dark:bg-gray-700'
  }
}



</script>
<style scoped>
table {
  vertical-align: center;
  text-align: center;
}
table td {
  line-height: 3rem!important;
}
table thead th {
  @apply dark:bg-dark-muted;
  @apply dark:text-white;
}

table tbody td {
  line-height: 3.5rem!important;
  vertical-align: center!important;
  horiz-align: center!important;

  @apply dark:text-white;
}

</style>
