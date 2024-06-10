<template>
  <div class="main-card grid grid-cols-12">
    <div class="col-span-12 z-[1] grid grid-cols-12">
      <div class="col-span-12 mb-5">
        <h1 class="text-gray-800 dark:text-white font-extrabold text-2xl">لیست گزارشات</h1>
      </div>
      <div class="col-span-12 grid grid-cols-12">
        <div class="xl:col-span-4 col-span-12 mb-5">
          <VInput v-model="debouncedSearch" :dataType="'text'" :placeHolder="'جستجو...'"
                  class="col-span-12"></VInput>
        </div>
        <div v-if="shops" class="col-span-12 xl:col-span-5 mb-5 flex justify-start items-center md:px-5">
          <span class="text-md dark:text-white ml-1">فروشگاه :</span>
          <v-select
              v-model="selectedShopId"
              :options="shops"
              :reduce="(shopName) => shopName.shopId"
              class="md:w-2/3 min-w-[8rem]"
              label="shopName"
          >
          </v-select>
        </div>

        <div class="col-span-12 xl:col-span-5 mb-5 flex justify-start items-center md:px-5">
          <span class="text-md dark:text-white ml-1"> تعداد در هر صفحه :</span>
          <v-select
              v-model="pageCount"
              :clearable="false"
              :options="pageCountItems"
              :reduce="(name) => name.value"
              class="md:w-1/3 min-w-[8rem]"
              label="name">
          </v-select>
        </div>
        <div class="col-span-12 xl:col-span-6 mb-5 flex justify-start items-center md:px-5">
          <span class="text-md dark:text-white ml-1"> بر اساس نوع گزارش :</span>
          <v-select
              v-model="type"
              :clearable="false"
              :options="typeItems"
              :reduce="(name) => name.value"
              class="md:w-1/3 min-w-[8rem]"
              label="name">
          </v-select>
        </div>
      </div>

      <div class="grid grid-cols-12 col-span-12 rounded-xl border border-gray-200 dark:border-gray-500 gap-3 mb-5">
        <div class="overflow-x-auto w-full rounded-xl col-span-12">
          <Table
              :fields="requestFields"
              :items="reports"
              class="text-gray-700 dark:text-gray-300"
              emptyText="موردی یافت نشد"
          >
            <template #createDate="data">
              <span>
              {{
                  new Date(data.items.createDate).toLocaleTimeString('fa-IR', {
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                }}
              -
              {{ createJalaliDate(data.items.createDate.slice(0, 10)) }}
              </span>
            </template>
            <template #type="data">
              <span v-if="data.items.type === 1" class="">اعتراض</span>
              <span v-if="data.items.type === 2" class="">گزارش فصلی</span>
              <span v-if="data.items.type === 3" class="">ابلاغیه ها</span>
              <span v-if="data.items.type === 4" class="">اظهارنامه ارزش افزوده</span>
              <span v-if="data.items.type === 5" class="">اظهارنامه عملکرد</span>
              <span v-if="data.items.type === 6" class="">مدارک سامانه مالیاتی</span>
              <span v-if="data.items.type === 7" class="">پرداخت قبض</span>
            </template>
            <template #mediaInfo="data">
              <label class="btn bg-primary border-none text-white" for="showMedia"
                     @click="selectMedia(data.items)">نمایش فایل</label>
            </template>
            <template #actions="data">
              <div class="flex justify-center items-center">
                <label for="deleteRequest" @click="selectedToDelete = data.items.reportId">
                  <i class="ri-delete-bin-line text-xl text-red-500 cursor-pointer" title="حذف"></i>
                </label>
              </div>
            </template>
          </Table>
        </div>
      </div>
      <div v-if="totalPages.value?.length > 1" class="col-span-12 flex flex-row justify-center items-center">
        <Pagination :activePage="selectedPageId" :totalPages="totalPages.value"
                    @PageChanged="changePage($event)"></Pagination>
      </div>
    </div>

    <!--  Delete Modal  -->
    <Modal :id="'deleteRequest'" :closeModalTitle="'بستن'" :has-body="false" :okModalTitle="'حذف'" :title="'آیا از انجام این عملیات اطمینان دارید؟'"
           @ok="deleteReport"></Modal>

    <!--  Show Modal  -->
    <Modal v-if="showModal" :id="'showMedia'" :closeModalTitle="'بستن'" :title="'فایل پیوست گزارش'"
           @closeModal="closeModal">
      <template #modalBody>
        <div class="w-full grid grid-cols-1 p-3">
          <div v-if="selectedMedia" class="col-span-2">
            <div v-if="selectedMedia.mediaInfo?.type === 4">
              <img :src="helper.baseUrl + selectedMedia.mediaInfo.filePath" class="w-full h-full object-contain"/>
            </div>
            <div v-if="selectedMedia.mediaInfo?.type === 5">
              <a :href="helper.baseUrl + selectedMedia.mediaInfo.filePath" class="w-full btn bg-primary border-none text-white"
                 target="_blank">دانلود فایل</a>
            </div>
            <div v-if="selectedMedia.mediaInfo?.type === 6">
              <video :src="helper.baseUrl + selectedMedia.mediaInfo.filePath" class="w-full h-full" controls></video>
            </div>
            <div v-if="selectedMedia.mediaInfo?.type === 7">
              <audio :src="helper.baseUrl + selectedMedia.mediaInfo.filePath" class="w-full h-full" controls
                     crossorigin></audio>
            </div>
            <div v-if="selectedMedia.link" class="my-2">
              <a :href="`https://payments.tax.gov.ir/nasim/${selectedMedia.link}`" class="w-full btn bg-primary border-none text-white"
                 target="_blank">مشاهده لینک پرداخت</a>
            </div>
            <div v-if="selectedMedia.description" class="flex mt-6 flex-col">
              <small class="text-gray-400">توضیحات</small>
              <p class="dark:text-white" style="overflow-wrap: anywhere">{{ selectedMedia.description }}</p>
            </div>


          </div>
          <div v-else class="text-center text-gray-800 dark:text-white">گزارش انتخاب شده حاوی فایل نمیباشد</div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import {computed, inject, onMounted, reactive, ref, watch} from "vue";
import {useAppStore} from "@/stores/app";
import Pagination from "../../components/utilities/Pagination.vue";
import Table from "@/components/utilities/Table.vue";
import VInput from "@/components/utilities/VInput.vue";
import Modal from "@/components/utilities/Modal.vue";
import {useRoute} from "vue-router";

let appStore = useAppStore()
const helper = inject('helper')
let api = inject('repositories')
let reports = reactive([])
let pageCountItems = reactive([
  {name: '10', value: 10}, {name: '20', value: 20}, {name: '30', value: 30}, {name: '40', value: 40}, {
    name: '50',
    value: 50
  }
])
let typeItems = reactive([
  {name: 'همه', value: null},
  {name: 'اعتراض', value: 1},
  {name: 'گزارش فصلی', value: 2},
  {name: 'ابلاغیه ها', value: 3},
  {name: 'اظهارنامه ارزش افزوده', value: 4},
  {name: 'اظهارنامه عملکرد', value: 5},
  {name: 'مدارک سامانه مالیاتی', value: 6},
  {name: 'پرداخت قبض', value: 7},
])
let toast = inject('toast')
let type = ref(null);
let selectedToChangeStatus = ref(null);
let selectedToDelete = ref(null);
let statusToChange = ref(null);
let pageCount = ref(10);
let searchCommand = ref('');
let selectedShopId = ref(null)
let selectedUserId = ref(null)
let users = ref(null)
let requestFields = ref([
  {
    key: 'reportId',
    label: 'شناسه گزارش'
  },
  {
    key: 'title',
    label: 'عنوان'
  },
  {
    key: 'type',
    label: 'نوع گزارش'
  },
  {
    key: 'createDate',
    label: 'تاریخ ثبت'
  },
  // {
  //   key: 'description',
  //   label: 'توضیحات'
  // },
  {
    key: 'mediaInfo',
    label: 'فایل پیوست'
  },
  {
    key: 'actions',
    label: 'عملیات'
  },
])
let selectedPageId = ref(1)
let selectedMedia = reactive(null);
let totalPages = ref([]);
let showModal = ref(false);
let shops = ref(null)
let timeout = ref(null)
let route = useRoute()

function selectMedia(data) {
  selectedMedia = data;
  showModal.value = true
}

function closeModal() {
  selectedMedia = null;
  showModal.value = false
}

  watch(selectedUserId, async () => {
    await getAllReports()
  }, {deep: true})
watch(selectedShopId, async () => {
  await getAllReports()
}, {deep: true})

watch(pageCount, async () => {
  await getAllReports()
}, {deep: true})

watch(type, async () => {
  await getAllReports()
}, {deep: true})

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


watch(searchCommand, async () => {
  await getAllReports()
}, {deep: true})

onMounted(() => {
  getAllReports(),
      getAllShops(),
      getAllUsers()
})

async function getAllUsers() {
  try {
    appStore.showOverlay = true
    const res = await api.getAllUsers.setParams({
      pageNumber: 0,
      count: 0,
    })
    users.value = res.data.users
  } catch (e) {
    console.log(e)
  } finally {
    appStore.showOverlay = false

  }
}

async function getAllShops() {
  try {
    appStore.showOverlay = true
    const res = await api.getAllShop.setParams({
      pageNumber: 0,
      count: 0,
      userId: route.params.id
    })
    shops.value = res.data.shops
  } catch (e) {
    console.log(e)
  } finally {
    appStore.showOverlay = false

  }
}

function changePage(id) {
  selectedPageId.value = id
  getAllReports()
}

function createJalaliDate(param) {
  return new Date(param).toLocaleDateString("fa-IR",);
}

async function getAllReports() {
  try {
    appStore.showOverlay = true
    const res = await api.getAllReport.setParams({
      pageNumber: selectedPageId.value,
      count: pageCount.value,
      shopId: selectedShopId.value,
      type: type.value,
      userId: route.params.id,
      searchCommand: searchCommand.value
    })
    totalPages.value = []
    const result = Math.ceil(res.data.count / pageCount.value)
    for (let i = 1; i <= result; i++) {
      totalPages.value.push(i);
    }
    reports = res.data.reports;
  } catch (e) {
    console.log(e)
  } finally {
    appStore.showOverlay = false
  }
}

async function deleteReport() {
  try {
    appStore.showOverlay = true
    const res = await api.deleteReport.setParams({
      id: selectedToDelete.value
    })
    toast.success({content: `گزارش مورد نظر حذف شد.`});
    selectedToDelete.value = null;
    getAllReports();
  } catch (e) {
    console.log(e)
  } finally {
    appStore.showOverlay = false
  }
}

</script>

<style scoped>

</style>
