<template>
    <div class="flex w-full">
        <div class="flex flex-col w-full justify-center items-center gap-10">
            <div class="flex flex-col w-full gap-2 px-[100px]">
                <label class="text-[14px]">
                    Post subject or title <span class="text-[#dc3545]">&nbsp;*</span>
                </label>
                <input type="text"
                    class="py-3 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                    placeholder="Enter post subject" />
            </div>
            <div class="flex flex-col w-full gap-2 px-[100px]">
                <label class="text-[14px]">
                    Description
                </label>
                <textarea type="text"
                    class="py-3 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1 min-h-[200px]"
                    placeholder="Enter post details">
                </textarea>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

</script>

<style lang="scss" scoped></style>