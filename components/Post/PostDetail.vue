<template>
    <div class="flex w-full">
        <div class="flex flex-col w-full justify-center items-center gap-10">
            <div class="flex flex-col w-full gap-2 px-[20px] md:px-[100px]">
                <label class="text-[14px]">
                    Post subject or title <span class="text-[#dc3545]">&nbsp;*</span>
                </label>
                <!-- Remove :value and rely on v-model for two-way binding -->
                <input type="text" v-model="PostTitle"
                    class="py-3 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                    placeholder="Enter post subject" />
            </div>
            <div class="flex flex-col w-full gap-2 px-[20px] md:px-[100px]">
                <label class="text-[14px]">
                    Description
                </label>
                <!-- Remove :value and rely on v-model for two-way binding -->
                <textarea v-model="PostDescription"
                    class="py-3 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1 min-h-[200px]"
                    placeholder="Enter post details">
                </textarea>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, watch, ref } from "vue";

const props = defineProps<{
    postTitle: string | null;
    postDescription: string | null;
}>();

const emit = defineEmits<{
    (event: 'updatePostData', data: { title: string | null, description: string | null }): void;
}>();

const PostTitle = ref<string | null>(props.postTitle);
const PostDescription = ref<string | null>(props.postDescription);

watch([PostTitle, PostDescription], ([newTitle, newDescription]) => {
    if (newTitle !== props.postTitle || newDescription !== props.postDescription) {
        emit('updatePostData', { title: newTitle, description: newDescription });
    }
}, { immediate: true });

</script>

<style lang="scss" scoped></style>
