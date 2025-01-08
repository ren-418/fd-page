<template>
    <div class="flex flex-col max-w-[250px] gap-3">
        <div class="flex flex-col justify-center items-center gap-5 bg-[#f5f5f5] pt-5 px-4  min-h-[190px]">
            <img v-if="image_url" :src="business.image_url" alt="image">
            <p class="text-[12px]">{{ business.content }}</p>
        </div>
        <div class="flex flex-row w-full border border-color-1 px-2 py-1.5 rounded-md justify-start items-center gap-3">
            <div class="flex w-[20px] h-[20px] bg-[#3f48cc] rounded-xl justify-center items-center">
                <p class="text-white">
                    +
                </p>
            </div>
            <div class="w-auto h-auto rounded-md">
                <p class="text-[#3f48cc] text-[14px]"> {{ business.btn_content }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Icon from "~/components/Icon.vue";

const business = defineProps<{
    image_url: string;
    content: string;
    btn_content: string
}>();

</script>

<style scoped></style>