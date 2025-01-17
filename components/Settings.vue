<template>
    <div class="flex bg-transparent flex-col p-0 w-full gap-10 md:bg-white md:p-5">
        <div class="flex flex-col justify-between gap-10 w-full md:flex-row md:gap-0">
            <div class="flex flex-col w-full gap-3 md:w-[48%]">
                <div class="flex flex-col">
                    <p class="text-lg">Set Post default Location</p>
                    <p class="text-sm text-color-2 text-color-3 heading-2">(This location populates automatically unless
                        changed
                        while posting a local ad)</p>
                </div>
                <div class="flex flex-col w-full h-auto px-5 py-8 border-color-1 border rounded-md gap-5">
                    <div class="flex w-full flex-col gap-2">
                        <label class="text-[14px]">Address</label>
                        <input type="text"
                            class="py-3 px-4 block w-full border-gray-200 bg-white outline-none rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                            placeholder="Ex. 123 Main Street" />
                    </div>
                    <div class="flex flex-row justify-between gap-5">
                        <div class="flex w-full flex-col gap-2 sm:w-[45%]">
                            <label class="text-[14px]">Zip Code <span class="text-[#dc3545]">&nbsp;*</span></label>
                            <input type="text"
                                class="py-3 px-4 block w-full border-gray-200 bg-white outline-none rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Ex. 92126" />
                        </div>
                        <div class="flex w-full flex-col gap-2 sm:w-[45%]">
                            <label class="text-[14px]">City <span class="text-[#dc3545]">&nbsp;*</span></label>
                            <input type="text"
                                class="py-3 px-4 block w-full border-gray-200 bg-white outline-none rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Ex. San Diego" />
                        </div>
                        <div class="flex w-full flex-col gap-2 sm:w-[45%]">
                            <label class="text-[14px]">State <span class="text-[#dc3545]">&nbsp;*</span></label>
                            <input type="text"
                                class="py-3 px-4 block w-full border-gray-200 bg-white outline-none rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Ex. CA" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-full gap-3 md:w-[48%]">
                <div class="flex flex-col">
                    <p class="text-lg">Set Post default Contact</p>
                    <p class="text-sm text-color-2 text-color-3">(This will be your ad post default contact details
                        unless changed while posting a local ad)</p>
                </div>
                <div class="flex flex-col w-full h-auto px-5 pt-8 border-color-1 border rounded-md">
                    <div class="flex flex-row justify-between gap-5 pb-5">
                        <div class="flex w-full flex-col gap-2 sm:w-[45%]">
                            <label class="text-[14px]">Email</label>
                            <input type="text"
                                class="py-3 px-4 block w-full border-gray-200 bg-white outline-none rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Email(Recommended)" />
                        </div>
                        <div class="flex w-full flex-col gap-2 sm:w-[45%]">
                            <label class="text-[14px]">Phone</label>
                            <input type="text"
                                class="py-3 px-4 block w-full border-gray-200 bg-white outline-none rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Phone(Optional)" />
                        </div>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <label class="text-[14px]">Web Link</label>
                        <input type="text"
                            class="py-3 px-4 block w-full border-gray-200 bg-white outline-none rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                            placeholder="Any web links(Optional)" />
                    </div>
                    <div class="flex flex-row gap-10 pt-3">
                        <div class="flex flex-row gap-3">
                            <input type="checkbox" class="text-color-3" />
                            <p class="">Chat</p>
                        </div>
                        <div class="flex flex-row gap-3">
                            <input type="checkbox" class="text-color-3" />
                            <p class="">No reply to this post</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col w-full gap-5">
            <p class="text-lg">Your post appears in below cities</p>
            <div class="flex flex-wrap w-full gap-5">
                <div class="btn border border-color-1 rounded-md px-3">San diego</div>
                <div class="btn border border-color-1 rounded-md px-3">San diego</div>
                <div class="btn border border-color-1 rounded-md px-3">San diego</div>
                <div class="btn border border-color-1 rounded-md px-3">San diego</div>
                <div class="btn border border-color-1 rounded-md px-3">San diego</div>
                <div class="btn border border-color-1 rounded-md px-3">San diego</div>
                <div class="btn border border-color-1 rounded-md px-3">San diego</div>
            </div>
            <div class="flex w-full h-[200px] sm:h-[300px]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8109.663153793965!2d10.6886197!3d59.4594927!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf0c938655e220549!2sSevtleAS!5e0!3m2!1sno!2sno!4v1591397614919!5m2!1sno!2sno"
                    className='google-map w-full h-full border border-color-1'></iframe>
            </div>
            <p class="text-sm text-color-2 text-color-3">The location data here is only for information purpose. May not
                be accurate.</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Icon from "./Icon.vue";
</script>

<style lang="scss" scoped>
.google-map {
    object-fit: cover;
    border-radius: 12px;
}
</style>