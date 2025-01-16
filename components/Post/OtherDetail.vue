<template>
    <div class="flex w-full">
        <div class="flex flex-col w-full h-auto items-start px-[30px] lg:px-[100px] gap-5">
            <div class="flex flex-col w-full h-auto gap-5 sm:flex-row">
                <div class="flex flex-col w-full h-full gap-2">
                    <div class="flex flex-col w-full gap-2 pb-[50px] pt-2">
                        <label class="text-[14px]">
                            Business or your name <span class="text-[#dc3545]">&nbsp;*</span>
                        </label>
                        <input v-model="businessName"
                            class="py-3 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                            placeholder="Enter business or your name" />
                    </div>

                    <div class="flex flex-col w-full gap-2">
                        <label class="text-[14px]">
                            List of Services <span class="text-[#dc3545]">&nbsp;*</span>
                        </label>
                        <div class="flex flex-row gap-2 justify-between">
                            <input v-model="newService" type="text"
                                class="py-3 px-4 w-[80%] block outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Enter service" @keyup.enter="addService" />
                            <div class="flex btn btn-active items-center justify-center text-center cursor-pointer min-w-[80px]"
                                @click="addService">
                                + Add
                            </div>
                        </div>
                    </div>

                    <ul class="flex md:hidden flex-wrap w-full gap-3">
                        <li v-for="(service, index) in services" :key="index"
                            class="flex flex-row justify-between items-center py-2 px-2 bg-gray-100 rounded-md border border-color-1 gap-2">
                            <span>{{ service }}</span>
                            <Icon name="plus" class="w-5 h-5 transform rotate-45 text-center cursor-pointer"
                                @click="removeService(service)" />
                        </li>
                    </ul>
                </div>
                <div class="flex w-full flex-col gap-2">
                    <label class="text-[14px]">
                        Open hours
                    </label>
                    <textarea v-model="openHours"
                        class="py-3 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1 min-h-[200px]"
                        placeholder="Enter open hours"></textarea>
                </div>
            </div>
            <ul class="hidden md:flex flex-wrap w-full gap-3">
                <li v-for="(service, index) in services" :key="index"
                    class="flex flex-row justify-between items-center py-2 px-2 bg-gray-100 rounded-md border border-color-1 gap-2">
                    <span>{{ service }}</span>
                    <Icon name="plus" class="w-5 h-5 transform rotate-45 text-center cursor-pointer"
                        @click="removeService(service)" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Icon from '../Icon.vue';
import { ref, watch } from 'vue';

const { $swal } = useNuxtApp()

const props = defineProps<{
    businessName: string | null;
    services: string[];
    openHours: string | null;
}>();

const emit = defineEmits<{
    (event: 'updateOtherDetails', data: { businessName: string | null, services: string[], openHours: string | null }): void;
}>();

const businessName = ref<string | null>(props.businessName);
const services = ref<Array<any>>([...props.services]);
const openHours = ref<string | null>(props.openHours);
const newService = ref<string>("");

watch([businessName, services, openHours], ([newBusinessName, newServices, newOpenHours]) => {
    emit('updateOtherDetails', {
        businessName: newBusinessName,
        services: newServices,
        openHours: newOpenHours
    });
}, { immediate: true });

const addService = () => {
    const trimmedValue = newService.value.trim();
    if (trimmedValue !== "") {
        if (services.value.includes(trimmedValue)) {
            $swal.fire({
                text: 'Same value',
                icon: 'warning'
            })
        } else {
            services.value.push(trimmedValue);
            newService.value = "";
        }
    }
}
// Remove service from the list
const removeService = (service: string) => {
    services.value = services.value.filter(s => s !== service);
};
</script>

<style lang="scss" scoped></style>
