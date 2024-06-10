<template>
  <div class=" md:col-span-6 xl:col-span-4 col-span-12 dark:text-white  p-3 rounded-xl dark:bg-dark bg-white shadow ">
    <div class="w-full flex border-b pb-3 items-center justify-between">
      <strong> {{ props.type.title }}
      </strong>
<!--      <div class="flex items-center justify-center gap-2">-->
<!--        <span class="p-2 border border-green-500 text-green-500 rounded-xl shadow">پرداخت شده</span>-->
<!--      </div>-->
    </div>
    <div class="w-full flex pt-3 flex-col items-start">
      <p style="overflow-wrap: anywhere" class="flex-wrap dark:text-white text-gray-500">
        {{ props.type.description }}
      </p>
    </div>
<!--    <div class="w-full border-b pb-3 flex items-center justify-end">-->
<!--      <small class="text-gray-400 ">{{ new Date(props.type.createDate).toLocaleDateString('fa-IR') }}</small>-->
<!--    </div>-->
    <div class="w-full pt-3 flex flex-col items-start min-h-[8rem] max-h-[8rem] h-full">
      <!--      <div class="flex w-full items-center justify-between">-->
      <!--        <span class="text-gray-400">مبلغ محاسبه شده</span>-->
      <!--        <strong>120,000 تومان</strong>-->
      <!--      </div>-->
      <div class="w-full mt-3  flex flex-col ali gap-1 h-full">
        <label for="showMedia"
               @click="selectMedia"
               class=" w-full btn bg-violet border-none text-white"
               v-if="props.type.mediaInfo"
        >
          مشاهده فایل پیوست
        </label>

        <a :href="`https://payments.tax.gov.ir/nasim/${props.type.link}`" target="_blank" class="w-full btn bg-green-500 border-none text-white mt-auto"
           v-if="props.type.type == reportTypes.PayBill">پرداخت</a>
      </div>
    </div>
    <!--  Show Modal  -->
    <Modal v-if="showModal" @closeModal="closeModal" :id="'showMedia'" :closeModalTitle="'بستن'"
           :title="'فایل پیوست گزارش'">
      <template #modalBody>
        <div class="w-full grid grid-cols-1 p-3">
          <div v-if="selectedMedia !== null" class="col-span-2">
            <div v-if="selectedMedia.type === 4">
              <img class="w-full h-full object-contain" :src="helper.baseUrl + selectedMedia.filePath"/>
            </div>
            <div v-if="selectedMedia.type === 5">
              <a class="w-full btn bg-primary border-none text-white" target="_blank" :href="helper.baseUrl + selectedMedia.filePath">دانلود
                فایل</a>
            </div>
            <div v-if="selectedMedia.type === 6">
              <video controls class="w-full h-full" :src="helper.baseUrl + selectedMedia.filePath"></video>
            </div>
            <div v-if="selectedMedia.type === 7">
              <audio controls crossorigin class="w-full h-full" :src="helper.baseUrl + selectedMedia.filePath"></audio>
            </div>
          </div>
          <div class="text-center text-gray-800" v-else>گزارش انتخاب شده حاوی فایل نمیباشد</div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import {inject, onMounted, reactive, ref} from "vue";
import {reportModel} from "@/models/reportModel"
import {reportTypes} from "@/models/enums/reportTypes";
import Modal from "@/components/utilities/Modal.vue";

const helper = inject('helper')



const typeItems = reactive([
  {name: 'همه', value: null},
  {name: 'اعتراض', value: 1},
  {name: 'گزارش فصلی', value: 2},
  {name: 'ابلاغیه ها', value: 3},
  {name: 'اظهارنامه ارزش افزوده', value: 4},
  {name: 'اظهارنامه عملکرد', value: 5},
  {name: 'مدارک سامانه مالیاتی', value: 6},
  {name: 'پرداخت قبض', value: 7},
])
let showModal = ref(false);
// @ts-ignore-next-line
let selectedMedia = reactive(null);


function selectMedia() {
// @ts-ignore-next-line
  selectedMedia = props.type.mediaInfo;
  showModal.value = true
}

function closeModal() {
// @ts-ignore-next-line
  selectedMedia = null;
  showModal.value = false
}

const props = defineProps<{
  type: reportModel
}>()

import EyeIcon from "@/components/icons/EyeIcon.vue";
</script>

<style scoped>

</style>
