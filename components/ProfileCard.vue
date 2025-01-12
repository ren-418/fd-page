<template>
    <div class="flex flex-col gap-10 w-full">
        <div class="flex flex-col gap-10 bg-white rounded-lg p-4 w-full">
            <p class="text-base font-bold border-b-2 border-black pb-2 w-fit">Basic Details</p>
            <div class="flex flex-col gap-3 w-full">
                <div class="flex flex-col justify-between gap-5 sm:flex-row">
                    <div class="flex w-full flex-col gap-2 sm:w-[45%]">
                        <label class="text-[14px]">Username <span class="text-[#dc3545]">&nbsp;*</span></label>
                        <input type="text"
                            class="py-3 px-4 block w-full border-gray-200 bg-white outline-none rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                            placeholder="Enter Username" />
                    </div>
                    <div class="flex w-full flex-col gap-2 sm:w-[45%]">
                        <label class="text-[14px]">First Name <span class="text-[#dc3545]">&nbsp;*</span></label>
                        <input type="text"
                            class="py-3 px-4 block w-full border-gray-200 bg-white outline-none rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                            placeholder="Enter First Name" />
                    </div>
                    <div class="flex w-full flex-col gap-2 sm:w-[45%]">
                        <label class="text-[14px]">Last Name <span class="text-[#dc3545]">&nbsp;*</span></label>
                        <input type="text"
                            class="py-3 px-4 block w-full border-gray-200 bg-white outline-none rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                            placeholder="Enter Last Name" />
                    </div>
                </div>
                <div class="flex flex-col justify-between gap-5 sm:flex-row">
                    <div class="flex w-full flex-col gap-2 sm:w-[45%]">
                        <label class="text-[14px]">Email <span class="text-[#dc3545]">&nbsp;*</span></label>
                        <input type="text"
                            class="py-3 px-4 block w-full border-gray-200 bg-white outline-none rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                            placeholder="Enter Email Address" />
                    </div>
                    <div class="flex w-full flex-col gap-2 sm:w-[45%]">
                        <label class="text-[14px]">Phone Number <span class="text-[#dc3545]">&nbsp;*</span></label>
                        <div class="phone-number-input has-info">
                            <PhoneNumber v-model="phoneNumberObj" :placeholder="'Phone Number'" />
                        </div>
                    </div>
                    <div class="flex w-full flex-col gap-2 sm:w-[45%]">
                        <label class="text-[14px]">Occupation <span class="text-[#dc3545]">&nbsp;*</span></label>
                        <input type="text"
                            class="py-3 px-4 block w-full border-gray-200 bg-white outline-none rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                            placeholder="Enter Last Name" />
                    </div>
                </div>
            </div>
            <p class="text-base font-bold border-b-2 border-black pb-2 w-fit">Address Details</p>
            <div class="flex flex-col gap-3">
                <div class="flex flex-col justify-evenly gap-5 w-full md:flex-row">
                    <div class="flex flex-row gap-5 w-full justify-evenly">
                        <div class="flex w-[65%] flex-col gap-2">
                            <label class="text-[14px]">Address Line <span class="text-[#dc3545]">&nbsp;*</span></label>
                            <input type="text"
                                class="py-3 px-4 block w-full border-gray-200 bg-white outline-none rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Enter Street Line" />
                        </div>
                        <div class="flex w-[35%] flex-col gap-2">
                            <label class="text-[14px]">Zip <span class="text-[#dc3545]">&nbsp;*</span></label>
                            <input type="text"
                                class="py-3 px-4 block w-full border-gray-200 bg-white outline-none rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Zip Code" />
                        </div>
                    </div>
                    <div class="flex flex-row gap-5 w-full justify-evenly">
                        <div class="flex w-[65%] flex-col gap-2">
                            <label class="text-[14px]">City <span class="text-[#dc3545]">&nbsp;*</span></label>
                            <input type="text"
                                class="py-3 px-4 block w-full border-gray-200 bg-white outline-none rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="City Name" />
                        </div>
                        <div class="flex w-[35%] flex-col gap-2">
                            <label class="text-[14px]">State<span class="text-[#dc3545]">&nbsp;*</span></label>
                            <input type="text"
                                class="py-3 px-4 block w-full border-gray-200 bg-white outline-none rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="State" />
                        </div>
                    </div>
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

<script setup lang="ts">
import PhoneNumber from './PhoneNumber.vue';
import { ref } from 'vue';

const phoneNumberObj = ref({
    country_id: 231,
    code: "+1",
    number: "",
});

</script>

<style lang="scss" scoped>
.phone-number-input {
    &.has-info {
        position: relative;

        input {
            padding-right: 34px;
        }

        .info {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 3;
        }
    }
}
</style>
