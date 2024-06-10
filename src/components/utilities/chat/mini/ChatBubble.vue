<template>
  <div
    class="chat chat-start"
    :class="{
      '!chat-end': props.message['creatorUserId'] === 1,
    }"
  >
    <div class="chat-header"></div>
    <div
      class="chat-bubble text-white"
      :class="{
        '!bg-violet !rounded-xl':
          props.message['creatorUserId'] === 1,
      }"
    >
      <img
        @click="emitSelectedMedia(props.message['chatMedia'])"
        v-if="
          props.message['chatMedia'] &&
          (props.message['chatMedia'].includes('.jpg') ||
            props.message['chatMedia'].includes('.png'))
        "
        class="w-full h-40"
        :src="
          helper.baseUrl +
          'media/gallery/ChatMedia/' +
          props.message['chatMedia']
        "
        alt=""
      />
      <audio
        v-else-if="
          props.message['chatMedia'] &&
          props.message['chatMedia'].includes('.mp3')
        "
        :src="
          helper.baseUrl +
          'media/gallery/ChatMedia/' +
          props.message['chatMedia']
        "
        controls
      ></audio>
      <template v-else-if="props.message['chatMedia']">
        <a
          class="flex items-center gap-x-1 underline"
          download
          :href="
            helper.baseUrl +
            'media/gallery/ChatMedia/' +
            props.message['chatMedia']
          "
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
            />
          </svg>

          {{ message["messageBody"] }}
        </a>
      </template>
      <template v-else>
        {{ message["messageBody"] }}
      </template>
    </div>
    <div class="chat-footer mt-1">
      <time class="text-xs">
        {{ helper.detailedParsedDate(props.message["createDate"]) }}
      </time>
      <template
        v-if="props.message['creatorUserId'] ===1"
      >
        <i
          v-if="props.message.isDelivered"
          class="ri-check-fill relative left-2.5"
        ></i>
        <i v-if="props.message.isRead" class="ri-check-fill"></i>
      </template>
    </div>
  </div>
</template>
<script setup>
import { inject } from "vue";
import CheckIcon from "@/components/icons/CheckIcon.vue";
import { useAuthStore } from "@/stores/auth";

const emits = defineEmits(["emitSelectedMedia"]);
const helper = inject("helper");
const authStore = useAuthStore();

function emitSelectedMedia(media) {
  window.open(
    helper.baseUrl + "media/gallery/ChatMedia/" + props.message["chatMedia"],
    "_blank"
  );
  // emits("emitSelectedMedia", media);
}

const props = defineProps({
  chatDirection: {
    type: String,
    required: true,
    validator(value) {
      return ["start", "end"].includes(value);
    },
    default: "start",
  },
  message: {
    type: Object,
  },
  chatMessage: {
    type: String,
  },
  isDelivered: {
    type: Boolean,
  },
  isRead: {
    type: Boolean,
  },
  createDate: {
    required: false,
  },
});
</script>
