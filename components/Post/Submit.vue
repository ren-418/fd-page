<template>
    <div class="flex flex-col gap-4 text-base w-full">
        <div class="flex flex-col w-full bg-white h-auto rounded-lg gap-5 px-5 mb-[100px]">
            <p v-if="props.formData" class="text-color-1 text-lg">{{ props.formData.title }}</p>
            <div class="flex flex-col w-full gap-10 lg:flex-row">
                <div class="flex flex-col w-full gap-2 lg:w-[calc(100%-340px)] relative">
                    <div class="flex w-[40px] h-[40px] bg-white absolute top-[20px] right-[20px] rounded-md justify-center items-center text-center cursor-pointer border border-color-1"
                        style="z-index: 1;" @click="showModal = true">
                        <p>
                            <Icon name="plus" class="w-6 text-color-3" />
                        </p>
                    </div>
                    <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5"
                        containerStyle="max-width: 100%; border:none" :showItemNavigators="true">
                        <template #item="slotProps">
                            <img :src="slotProps.item.src_url" :alt="slotProps.item.disk" class="w-full block h-auto" />
                        </template>
                        <template #thumbnail="slotProps" class="gap-3">
                            <img :src="slotProps.item.thumbnail_url" :alt="slotProps.item.disk"
                                class="w-[160px] h-[100px] block rounded-md" />
                        </template>
                    </Galleria>
                    <div class="flex flex-col w-full gap-2 p-5">
                        <p v-if="props.formData" :class="{ 'truncate-text': !isExpanded }"
                            class="text-color-1 text-sm description">
                            {{ props.formData.description }}
                        </p>

                        <div class="flex">
                            <button @click="toggleText" class="text-color-2">
                                {{ isExpanded ? "(Read Less)" : "(Read More...)" }}
                            </button>
                        </div>

                    </div>
                </div>
                <div class="flex flex-col w-full gap-3 lg:w-[340px]">
                    <div class="flex flex-row w-full justify-start items-center gap-3 md:gap-11">
                        <div class='w-[45px] h-[45px]'>
                            <img v-if="props.formData" :src="props.formData.user?.photo_url" alt="avatar image"
                                class="rounded-md h-full w-full">
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="flex">
                                <p v-if="props.formData">Posted by {{ props.formData.user?.name }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-3">
                        <p class="text-xl">Quick Info</p>
                        <div class="flex flex-col w-full gap-4">
                            <div class="flex flex-row gap-5">
                                <p>Services by</p>
                                <p>{{ props.formData.businessName }}</p>
                            </div>
                            <div class="flex flex-row gap-5">
                                <p>Open Hours</p>
                                <p>{{ props.formData.openHours }}</p>
                            </div>
                        </div>
                        <div class="flex flex-wrap w-full gap-5">
                            <div v-for="(service, index) in props.formData.services" :key="index"
                                class="flex w-auto py-2 px-3 border border-color-1 rounded-md">
                                {{ service }}
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="w-full sm:h-[300px] md:h-[400px] lg:h-[300px]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8109.663153793965!2d10.6886197!3d59.4594927!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf0c938655e220549!2sSevtleAS!5e0!3m2!1sno!2sno!4v1591397614919!5m2!1sno!2sno"
                                className='google-map w-full h-full'></iframe>
                        </div>
                        <p class="text-[sm] text-color-3">
                            The location data here is only for information purposes. May not be accurate.
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex w-full justify-center items-center">
                <p>
                    <input type="checkbox" />
                    I have read and accept the
                    <router-link to="#" class="text-[#008080] underline">
                        Terms of use
                    </router-link> and
                    <router-link to="#" class="text-[#008080] underline">
                        Privacy policy
                    </router-link>
                </p>
            </div>
        </div>
    </div>
    <transition name="modal-fade">
        <div v-show="showModal" class="image-modal">
            <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5"
                containerStyle="max-width: 100%; border:none" :showItemNavigators="true">
                <template #item="slotProps">
                    <img :src="slotProps.item.src_url" :alt="slotProps.item.disk"
                        class="w-auto block h-[300px] sm:h-[450px] md:h-[600px]" />
                </template>
                <template #thumbnail="slotProps" class="gap-3">
                    <img :src="slotProps.item.thumbnail_url" :alt="slotProps.item.disk"
                        class="w-[180px] h-[100px] block rounded-md" />
                </template>
            </Galleria>
            <button @click="showModal = false"
                class="absolute top-[20px] right-[20px] bg-white p-2 rounded-md cursor-pointer">
                <Icon name="close-1" class="w-5" />
            </button>
        </div>
    </transition>
    <!-- <transition name="modal-fade">
        <ReportModal v-show="showReportModal" @close="showReportModal = false" :is-visible="showReportModal" />
    </transition>
    <transition name="modal-fade">
        <ShareLink v-show="showLinkModal" @close="showLinkModal = false" :is-visible="showLinkModal" />
    </transition> -->
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Icon from "~/components/Icon.vue";
import Galleria from 'primevue/galleria';


const route = useRoute();
const isExpanded = ref(false);
const showModal = ref(false);

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface SubCategory {
    id: number;
    name: string;
}

const props = defineProps<{
    formData: {
        category: Category | null;
        subcategory: SubCategory | null | string;
        title: string;
        description: string;
        businessName: string;
        services: Array<any>;
        openHours: string;
        imageData: any;
        contactEmail: string;
        contactPhone: string;
        webLink: string;
        location: any;
        user: any;
    }
}>();

const toggleText = () => {
    isExpanded.value = !isExpanded.value;
};

const images = ref<any[]>(props.formData.imageData);

const responsiveOptions = ref([
    {
        breakpoint: "1200px",
        numVisible: 3,
    },
    {
        breakpoint: "1024px",
        numVisible: 4,
    },
    {
        breakpoint: "840px",
        numVisible: 3,
    },
    {
        breakpoint: "650px",
        numVisible: 2,
    },
    {
        breakpoint: "440px",
        numVisible: 1,
    },
]);

const avatar_image = ref<string>('');

</script>

<style scoped>
.google-map {
    object-fit: cover;
    border-radius: 12px;
}

.truncate-text {
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.toggle-button {
    display: inline-block;
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.toggle-button:hover {
    background-color: #0056b3;
}

.card {
    width: 400px;
    height: 400px;
}

.image-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}
</style>