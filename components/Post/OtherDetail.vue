<template>
    <div class="flex w-full">
        <div class="flex flex-row w-full justify-between items-center px-[100px] gap-5">
            <div class="flex flex-col w-full gap-2">
                <div class="flex flex-col w-full gap-2">
                    <label class="text-[14px]">
                        Post subject or title <span class="text-[#dc3545]">&nbsp;*</span>
                    </label>
                    <input type="text"
                        class="py-3 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                        placeholder="Enter post subject" />
                </div>
                <div class="flex flex-col w-full gap-2">
                    <label class="text-[14px]">
                        Post subject or title <span class="text-[#dc3545]">&nbsp;*</span>
                    </label>
                    <div class="flex flex-row gap-2 justify-between">
                        <input type="text"
                            class="py-3 px-4 w-[80%] block outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                            placeholder="Enter post subject" />
                        <div class="flex btn btn-active items-center justify-center text-center">+ Add</div>
                    </div>
                </div>
            </div>
            <div class="flex w-full flex-col gap-2">
                <label class="text-[14px]">
                    Open hours
                </label>
                <textarea
                    class="py-3 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1 min-h-[200px]"
                    placeholder="Enter open hours">
                </textarea>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped></style>