<template>
  <div class="w-full main-card">
    <div class="header w-full flex flex-col md:flex-row  md:items-center justify-between">
      <h1 class="text-gray-800 dark:text-white font-extrabold text-2xl ">نوع گزارشات: {{ props.reportTitle }}</h1>
      <div v-if="shopsList.shops" class="w-auto mt-4 md:mt-0">
        <div class=" mb-5 flex flex-col md:flex-row justify-start items-center w-full">
          <span class="text-md dark:text-white ml-1 w-full">ترتیب بر اساس فروشگاه :</span>
          <v-select
              v-model="selectedShopId"
              :clearable="true"
              :options="shopsList?.shops"
              :reduce="(shopName) => shopName.shopId"
              class="w-full min-w-[14rem]"
              label="shopName">
          </v-select>
        </div>
      </div>
    </div>
    <hr class="my-3">
    <div v-if="reportsList.reports && reportsList.reports.length > 0" class="w-full  grid grid-cols-12 gap-2">
      <report-card v-for="report in reportsList.reports" :type="report"></report-card>
      <Pagination :activePage="pageNumber" :totalPages="totalPages.value" class=""
                  @PageChanged="changePage($event)"></Pagination>
    </div>
    <div v-else class="w-full min-h-[20rem] flex items-center justify-center">
      <h2 class="text-gray-800 dark:text-white font-extrabold text-xl">
        گزارشی موجود نیست!
      </h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ReportCard from "@/components/main/ReportCard.vue";
import {inject, onMounted, reactive, ref, watch} from "vue";
import {useAppStore} from "@/stores/app";
import {useAuthStore} from "@/stores/auth";
import {useRoute} from "vue-router";
import Pagination from "@/components/utilities/Pagination.vue";

// variables
const api: any = inject('repositories')
const toast: any = inject('toast')
const route = useRoute();
const appStore = useAppStore()
const authStore: any = useAuthStore()
const pageNumber = ref(1);
const count = ref(10);
const selectedShopId = ref(null);
const searchCommand = ref(null);
const reportsList = reactive({reports: null})
const shopsList = reactive({shops: null})
let totalPages = ref([]);

// getShopsByUserId
onMounted(() => {
  getAllReportsForUser()
  getAllUserShops()
})


watch(selectedShopId, async (val) => {
  await getAllReportsForUser()
});

// Functions
function changePage(id: any) {
  pageNumber.value = id
  getAllReportsForUser()
}

async function getAllUserShops() {
  try {
    appStore.showOverlay = true
    const res = await api.getShopsByUserId.setParams({pageNumber: 0, count: 0})
    shopsList.shops = res.data.shops

  } catch (error) {
    console.error(error)
    toast.error({content: 'خطایی رخ داده است'})

  } finally {
    appStore.showOverlay = false
  }
}

async function getAllReportsForUser() {
  try {
    // utilityRequest.type = selectedUtility.value.type
    appStore.showOverlay = true;
    const res = await api.getAllReportForUser.setParams({
      pageNumber: pageNumber.value,
      count: count.value,
      type: props.reportType,
      shopId: selectedShopId.value ? selectedShopId.value : '',
      searchCommand: searchCommand.value
    })

    const result = Math.ceil(res.data.count / count.value)
    for (let i = 1; i <= result; i++) {
      // @ts-ignore-next-line
      totalPages.push(i);
    }
    reportsList.reports = res.data.reports
  } catch (e) {
    console.log(e)
    toast.error({content: 'خطایی رخ داده است'})
  } finally {
    appStore.showOverlay = false
  }
}

// Props
const props = defineProps({
  reportType: {
    type: String,
    required: true
  },
  reportTitle: {
    type: String,
    required: true,
  }
})
</script>

<style scoped>

</style>
