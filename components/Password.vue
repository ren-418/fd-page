<template>
    <div class="flex flex-col w-full p-10 gap-10">
        <div class="flex flex-row w-full gap-2 border border-color-1 rounded-md p-5">
            <div class="flex w-full flex-col justify-between gap-5 md:flex-row">
                <div class="flex w-full flex-col gap-2 md:w-[45%]">
                    <label class="text-[14px]">Username <span class="text-[#dc3545]">&nbsp;*</span></label>
                    <input type="text"
                        class="py-3 px-4 block w-full border-gray-200 bg-white outline-none rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                        placeholder="John.doe.1234" />
                </div>
                <div class="flex w-full flex-col gap-2 md:w-[45%]">
                    <label class="text-[14px]">Current Password <span class="text-[#dc3545]">&nbsp;*</span></label>
                    <input type="text"
                        class="py-3 px-4 block w-full border-gray-200 bg-white outline-none rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                        placeholder="Current Password" />
                </div>
                <div class="flex w-full flex-col gap-2 md:w-[45%]">
                    <label class="text-[14px]">New Password<span class="text-[#dc3545]">&nbsp;*</span></label>
                    <input type="text"
                        class="py-3 px-4 block w-full border-gray-200 bg-white outline-none rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                        placeholder="New Password" />
                </div>
                <div class="flex w-full flex-col gap-2 md:w-[45%]">
                    <label class="text-[14px]">Confirm Password <span class="text-[#dc3545]">&nbsp;*</span></label>
                    <input type="text"
                        class="py-3 px-4 block w-full border-gray-200 bg-white outline-none rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                        placeholder="Confirm Password" />
                </div>
            </div>
        </div>
        <div class="flex flex-row w-full gap-10 justify-center items-center">
            <div class="flex btn bg-[gray] text-white py-[7px] px-4 rounded-md cursor-pointer">Cancel
            </div>
            <div class="flex btn btn-active" style="padding: 7px 15px;">Update</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Icon from "./Icon.vue";
</script>

<style lang="scss" scoped></style>