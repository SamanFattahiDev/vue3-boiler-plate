<template>
  <div class="overflow-x-auto col-span-12">
    <table class="w-full border !overflow-x-scroll">
      <!-- head -->
      <thead class="bg-gray-600 text-white h-[3.5rem] text-xs md:text-base">
      <tr>
        <th v-for="(item, idx) in props.fields" :key="idx" class="min-w-[5rem]">{{ item['label'] }}</th>
      </tr>
      </thead>
      <tbody class="text-xs md:text-base">
      <tr v-for="(row, idx) in props.items" :key="idx" :class="[computedColors(+idx, row), computedConditions(row)]"
          class="!h-4 border-2">
        <td v-for="(td, idx) in props.fields" :key="idx" class="border-2">
          <slot :items="row" :name="td?.key">
            <span v-if="row[td?.key]" class="print:text-black print:font-bold">{{ row[td?.key] }}</span>
            <span v-else>-</span>
          </slot>
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import html2canvas from 'html2canvas';

const route = useRoute();
const props = defineProps({
  items: Object,
  fields: Object,
  emptyText: String
});

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
});

function computedColors(idx: number, row) {
  if (idx % 2 === 0) {
    return 'bg-white dark:bg-gray-800';
  } else {
    return 'bg-gray-100 dark:bg-gray-700';
  }
}

function computedConditions(row) {
  if (route.query.type) {
    let selectedType = queryFilters.value[route.query.type].english;
    if (row.isExtension !== undefined && row.isExtension) {
      return '!bg-purple-400';
    } else if (row[`${selectedType}PriceDiscount`]) {
      return '!bg-red-500';
    }
  } else {
    return '';
  }
}


</script>

<style scoped>
table {
  vertical-align: center;
  text-align: center;
}

table td {
  line-height: 1rem !important;
}

table thead th {
  @apply dark:bg-dark-muted;
  @apply dark:text-white;
}

table tbody td {
  line-height: 2rem !important;
  vertical-align: center !important;
  horiz-align: center !important;

  @apply dark:text-white;
}
</style>
