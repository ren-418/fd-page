<template>
  <div v-show="isVisible" class="w-full h-full fixed top-0 left-0 bg-[#00000078] flex justify-center items-center modal">
    <div class="flex flex-col max-w-[500px] bg-white rounded-md border-color-1 border-solid border relative z-10">
      <!-- Close Button -->
      <p
        class="text-[22px] text-black absolute top-4 right-4 z-1 cursor-pointer"
        @click="handleReportClick"
      >
        <Icon name="close-1" class="w-5" />
      </p>
      <div class="flex w-full justify-center items-center py-4 border-b border-color-1">
        <p class="text-[22px]">Report Us</p>
    </div>
      <div class="flex flex-col gap-4 w-full p-4">
        <div class="flex flex-col w-full gap-2">
          <label class="text-[14px]">
            Post ID <span class="text-[#dc3545]">&nbsp;*</span>
          </label>
          <input
            v-if="detail_data"
            type="text"
            class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
            :placeholder="detail_data.id"
            disabled="true"
          />
        </div>
        <div class="flex flex-row w-full gap-2 justify-between">
          <div class="flex w-[45%] flex-col gap-2">
            <label class="text-[14px]">Name <span class="text-[#dc3545]">&nbsp;*</span></label>
            <input
              type="text"
              class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
              placeholder="Enter Full Name"
            />
          </div>
          <div class="flex w-[45%] flex-col gap-2">
            <label class="text-[14px]">Email <span class="text-[#dc3545]">&nbsp;*</span></label>
            <input
              type="text"
              class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
              placeholder="Enter Email Address"
            />
          </div>
        </div>
        <div class="flex flex-col w-full gap-2">
          <label class="text-[14px]">Message <span class="text-[#dc3545]">&nbsp;*</span></label>
          <textarea
            class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none min-h-[135px] border border-color-1"
            rows="3"
            placeholder="Enter Short Message"
          ></textarea>
        </div>
        <div class="flex w-full justify-center items-center">
          <button class="btn btn-active">
            <p class="px-4">SUBMIT</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from "vue";
import { useRoute } from "vue-router";
import Icon from "~/components/Icon.vue";

const route = useRoute();
const id = ref();
const detail_data = ref<any>();

// Modal visibility state
defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const handleReportClick = () => {
  emit("close"); // Notify the parent to hide the modal
};

onMounted(async () => {
  try {
    id.value = route.params.id;
    const { detail } = await useSelectedDetail(id.value);
    detail_data.value = detail.value;
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped>
.modal {
  -webkit-overflow-scrolling: touch;
}
</style>
