<template>
    <div v-show="isVisible"
        class="w-full h-full fixed top-0 left-0 bg-[#00000078] flex justify-center items-center modal">
        <div class="flex flex-col max-w-[500px] w-full bg-white rounded-md border-color-1 border-solid border relative z-10">
            <!-- Close Button -->
            <p class="text-[22px] text-black absolute top-4 right-4 z-1 cursor-pointer" @click="handleLinkClick">
                <Icon name="close-1" class="w-5" />
            </p>
            <!-- <div class="flex w-full justify-center items-center text-center py-4 border-b border-color-1">
                <p class="text-[22px]">Share Link</p>
            </div> -->
            <div class="flex w-full justify-center items-center py-4 border-b border-color-1">
                <p class="text-[22px]">Share Link</p>
            </div>
            <div class="flex flex-col gap-4 w-full p-4">
                <div class="flex flex-col w-full gap-5">
                    <label class="text-[14px]">
                        Share this link via
                    </label>
                    <div class="flex flex-row flex-wrap gap-10">
                        <div class="flex flex-col gap-2 items-center justify-center cursor-pointer">
                            <span class="flex w-[48px] h-[48px] rounded-md items-center justify-center">
                                <img src="../assets//images//download.png" width="100%" height="100%" />
                            </span>
                            <p class="w-full flex text-center items-center justify-center text-gray-400 text-[14px]">FlickerPage</p>
                        </div>
                        <div class="flex flex-col gap-2 items-center justify-center cursor-pointer">
                            <span class="flex w-[48px] h-[48px] bg-[#25d366] rounded-md items-center justify-center">
                                <Icon name="whatsapp" class="w-6" />
                            </span>
                            <p class="w-full flex text-center items-center justify-center text-gray-400 text-[14px]">Whatsapp</p>
                        </div>
                        <div class="flex flex-col gap-2 items-center justify-center cursor-pointer">
                            <span class="flex w-[48px] h-[48px] bg-[#3a76f0] rounded-md items-center justify-center">
                                <Icon name="sms" class="w-6" />
                            </span>
                            <p class="w-full flex text-center items-center justify-center text-gray-400 text-[14px]">SMS</p>
                        </div>
                        <div class="flex flex-col gap-2 items-center justify-center cursor-pointer">
                            <span class="flex w-[48px] h-[48px] bg-[#c3c3c3] rounded-md items-center justify-center">
                                <Icon name="gmail" class="w-6" />
                            </span>
                            <p class="w-full flex text-center items-center justify-center text-gray-400 text-[14px]">Gmail</p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col w-full gap-2">
                    <label class="text-[14px]">
                        Or copy link
                    </label>
                    <div class="flex flex-row bg-[#0080805c] justify-between rounded-md p-1">
                        <input ref="urlInput" type="text" class="py-2 px-4 rounded w-full max-w-[355px] bg-transparent" :value="url"
                            readonly />

                        <!-- Copy Button -->
                        <button class="btn btn-active"
                            @click="copyToClipboard">
                            <p class="px-3">Copy</p>
                        </button>
                    </div>
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

const url = computed(() => `https://flickerpage.com/ads/detail/${id.value}`);

// Function to copy text to clipboard
const copyToClipboard = () => {
    // Use navigator.clipboard to copy the text
    navigator.clipboard
        .writeText(url.value)
        .then(() => {
            alert("URL copied to clipboard!");
            emit("close");
        })
        .catch((err) => {
            console.error("Failed to copy: ", err);
        });
};

// Modal visibility state
defineProps({
    isVisible: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(["close"]);

const handleLinkClick = () => {
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