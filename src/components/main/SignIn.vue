<template>
  <div
      class="col-span-12 md:col-span-5 xl:col-span-4 bg-yellow-400 p-10 space-y-8 flex flex-col justify-center"
  >
    <Modal
        :id="'optionsModal'"
        :closeModalTitle="'بستن'"
        :okModalTitle="'ارسال'"
        :title="'فراموشی رمز عبور'"
        @ok="forgetPassword"
    >
      <template #modalBody>
        <div class="w-full p-3">
          <div>
            <div class="mb-2">
              <label class="text-black dark:text-white" for="email-address"
              >آدرس ایمیل یا شماره تلفن خود را وارد کنید</label
              >
            </div>
            <VInput
                v-model="loginData.mail"
                :dataType="'text'"
                :error="emailNotValid"
                :errorMessage="'ایمیل وارد شده معتبر نیست'"
                :placeHolder="'example@example.com'"
                class=""
            ></VInput>
          </div>
        </div>
      </template>
    </Modal>
    <div class="bg-white rounded-xl relative lg:left-48 shadow-xl p-5">
      <h1 class=" text-[2rem] flex items-center justify-center  sm:text-[3rem] mb-3">
        <!--         {{ appName }}-->
        <img alt="" class="object-cover" src="/logo.jpeg">
      </h1>
      <!--      <div class="w-full h-10 flex flex-row justify-between items-center">-->
      <!--        <div-->
      <!--            @click="changeDTOtype(1)"-->
      <!--            :class="[loginData.type === 1 ? 'bg-violet' : 'bg-gray-600']"-->
      <!--            class="w-full h-full rounded-lg flex flex-row justify-center items-center transition-all cursor-pointer"-->
      <!--        >-->
      <!--          <i class="ri-smartphone-line ml-2 text-white"></i>-->
      <!--          <span class="text-white">موبایل</span>-->
      <!--        </div>-->
      <!--        <span class="h-full w-[1px] border border-gray-200 mx-4"></span>-->
      <!--        <div-->
      <!--            @click="changeDTOtype(2)"-->
      <!--            :class="[loginData.type === 2 ? 'bg-violet' : 'bg-gray-600']"-->
      <!--            class="w-full h-full rounded-lg flex flex-row justify-center items-center transition-all cursor-pointer"-->
      <!--        >-->
      <!--          <i class="ri-mail-send-line ml-2 text-white"></i>-->
      <!--          <span class="text-white">ایمیل</span>-->
      <!--        </div>-->
      <!--      </div>-->
      <form action="/" class="space-y-6" method="POST" @submit.prevent>
        <input name="remember" type="hidden" value="true"/>
        <div class="space-y-4 rounded-md shadow-sm">
          <div>
            <VInput
                v-if="loginData.type === 1"
                v-model="loginData.mobile"
                :dataType="'text'"
                :error="mobileNotValid"
                :errorMessage="'شماره تلفن وارد شده معتبر نیست'"
                :placeHolder="'موبایل'"
            ></VInput>
            <VInput
                v-else-if="loginData.type === 2"
                v-model="loginData.mail"
                :dataType="'email'"
                :error="emailNotValid"
                :errorMessage="'ایمیل وارد شده معتبر نیست'"
                :placeHolder="'ایمیل'"
            ></VInput>
          </div>
          <div>
            <VInput
                v-model="loginData.password"
                :dataType="'password'"
                :placeHolder="'رمز عبور'"
            ></VInput>
          </div>
        </div>
        <div>
          <button
              class="group bg-violet relative flex w-full justify-center rounded-md py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
              @click="login"
          >
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockIcon
                v-if="
                (loginData.type === 1 && mobileNotValid !== false) ||
                (loginData.type === 2 && emailNotValid !== false)
              "
                class="fill-white"
            ></LockIcon>
          </span>
            ورود
          </button>
          <!--        <button-->
          <!--          v-else-->
          <!--          type="submit"-->
          <!--          class="group bg-gray-400 relative flex w-full justify-center rounded-md py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"-->
          <!--        >-->
          <!--          <span class="absolute inset-y-0 left-0 flex items-center pl-3">-->
          <!--            <LockIcon-->
          <!--              v-if="-->
          <!--                (loginData.type === 1 && mobileNotValid !== false) ||-->
          <!--                (loginData.type === 2 && emailNotValid !== false)-->
          <!--              "-->
          <!--              class="fill-white"-->
          <!--            ></LockIcon>-->
          <!--          </span>-->

          <!--          غیر فعال-->
          <!--        </button>-->
        </div>
        <div class="flex items-center justify-center">
          <div class="text-sm">
          <span
              class="text-center dark:text-white text-xs  font-bold tracking-tight cursor-pointer"
          >آیا حساب کاربری ندارید ؟</span
          >

            <label
                class="font-medium cursor-pointer text-xs text-indigo-600 dark:text-white transition-all hover:!text-primary"
                @click="changeActiveComponent"
            >
              ثبت نام کنید
            </label>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <div class="text-sm">
          <span
              class="text-center dark:text-white text-xs  font-bold tracking-tight cursor-pointer"
          >رمز عبور خود را فراموش کرده اید؟</span
          >

            <label
                class="font-medium cursor-pointer text-xs text-indigo-600 dark:text-white transition-all hover:!text-primary"
                for="optionsModal"
            >
              فراموشی رمز عبور
            </label>
          </div>
        </div>
      </form>
    </div>

  </div>
</template>

<script lang="ts" setup>
import type {signDto} from "@/models/signModel";
import {computed, inject, onMounted, reactive} from "vue";
import LockIcon from "@/components/icons/LockIcon.vue";
import VInput from "@/components/utilities/VInput.vue";
import {useAppStore} from "@/stores/app";
import {useToastStore} from "@/stores/toast";
import {useAuthStore} from "@/stores/auth";
import {useRouter} from "vue-router";
import errorHandler from "@/plugins/errorHandler";
import Modal from "@/components/utilities/Modal.vue";
import {VueCookies} from "vue-cookies";

const $cookies: any = inject<VueCookies>('$cookies');
const appStore = useAppStore();
const toastStore = useToastStore();
const toast: any = inject("toast");
const authStore: any = useAuthStore();
const router = useRouter();
const api: any = inject("repositories");

const helper: any = inject("helper");
const appName = helper.appName;
const repositories: any = inject('repositories')

let loginData = reactive<signDto>({
  mobile: "",
  mail: "",
  firstName: "",
  lastName: "",
  password: "",
  verifyCode: "",
  encryptedMail: "string",
  type: 1,
  userName: "",
});

onMounted(async () => {
  if ($cookies.get('token')) {
    if (!authStore.loggedIn) {
      authStore.setToken($cookies.get('token'))
      const res = await repositories.getUserByToken.setTag()
      authStore.setUserFromCookie(res.data)
    }
    await router.push("/order/create");
  }
})

const mobileNotValid: any = computed(() => {
  let resolve = null;
  if (loginData.mobile !== undefined) {
    if (loginData.mobile === "") {
      resolve = null;
    } else resolve = loginData.mobile.length < 11;
    return resolve;
  }
});
const emailNotValid: any = computed(() => {
  let resolve = null;
  if (loginData.mail !== undefined) {
    if (loginData.mail === "") {
      resolve = null;
    } else if (loginData.mail.includes("@")) {
      resolve = false;
    } else if (!loginData.mail.includes("@")) {
      resolve = true;
    }
  }
  return resolve;
});

function changeDTOtype(t: number) {
  switch (t) {
    case 1:
      loginData.type = 1;
      break;
    case 2:
      loginData.type = 2;
      break;
  }
}

async function login() {
  if (loginData.type === 1 && mobileNotValid.value === true) {
    return toast.error({content: "شماره تلفن وارد شده معتبر نیست"});
  }
  if (loginData.type === 2 && emailNotValid.value === true) {
    return toast.error({content: "ایمیل وارد شده معتبر نیست"});
  }
  try {
    appStore.showOverlay = true;
    const res = await api.signIn.setPayload(loginData);
    if (res.data.data.data === "") {
      errorHandler(res.data.data.status);
    } else {
      if (res.data.data.status === 7) {
        $cookies.set('token', res.data.data.data.token, '1d')
        authStore.setUser(res.data.data.data);
        await router.push("/order/create");
      } else {
        return errorHandler(res.data.data.status);
      }
    }
  } catch (e) {
    console.log(e);
  } finally {
    appStore.showOverlay = false;
  }
  appStore.showOverlay = false;
}

async function forgetPassword() {
  if (mobileNotValid.value === false) {
    try {
      appStore.showOverlay = true;
      const res = await api.forgetPassword.setParams({
        type: 1,
        PhoneOrEmail: loginData.mobile,
      });
      if (res.data.data.status === 7) {
        toast.success({content: "پسوورد شما به شماره موبایل شما ارسال شد"});
      } else {
        errorHandler(res.data.data.status);
      }
      loginData.mail = "";
    } catch (e) {
      console.log(e);
    } finally {
      appStore.showOverlay = false;
    }
  } else {
    toast.error({content: "شماره تلفن وارد شده معتبر نیست"});
  }
}

const emits = defineEmits(["changeActiveSlug"]);

function changeActiveComponent() {
  emits("changeActiveSlug", "SignUp");
}
</script>

<style scoped></style>
