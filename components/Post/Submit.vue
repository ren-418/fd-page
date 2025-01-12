<template>
    <div class="flex flex-col gap-4 text-base w-full">
        <div class="flex w-full">
            <router-link to="/">
                <div class="flex flex-row gap-2 justify-center items-center text-color-1">
                    <svg data-v-2b080c29="" data-v-4c867148="" viewBox="0 0 18 18" fill="none"
                        xmlns="http://www.w3.org/2000/svg" class="text-lg h-5 text-color-1">
                        <path data-v-2b080c29="" d="M8.596 2.654 2.25 9l6.346 6.346M2.25 9h13.5" stroke="currentColor"
                            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                    </svg>
                    <p class="text-color-2">Back</p>
                </div>
            </router-link>
        </div>
        <div class="flex flex-col w-full bg-white h-auto rounded-lg gap-5 px-5 mb-[100px]">
            <p v-if="detail_data" class="text-color-1 text-lg">{{ detail_data.title }}</p>
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
                            <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt"
                                class="w-full block h-auto" />
                        </template>
                        <template #thumbnail="slotProps" class="gap-3">
                            <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt"
                                class="w-[160px] h-[100px] block rounded-md" />
                        </template>
                    </Galleria>
                    <div class="flex flex-col w-full gap-2 p-5">
                        <!-- Truncated or Full Text -->
                        <p v-if="detail_data" :class="{ 'truncate-text': !isExpanded }"
                            class="text-color-1 text-sm description">
                            {{ detail_data.description }}
                        </p>

                        <!-- Toggle Button -->
                        <div class="flex">
                            <button @click="toggleText" class="text-color-2">
                                {{ isExpanded ? "(Read Less)" : "(Read More...)" }}
                            </button>
                        </div>

                    </div>
                </div>
                <div class="flex flex-col w-full gap-3 lg:w-[340px]">
                    <div class="flex flex-row w-full justify-start gap-3 md:gap-11 lg:justify-between lg:gap-0">
                        <div class='w-[45px] h-[45px]'>
                            <img v-if="detail_data" :src="avatar_image" alt="avatar image" class="rounded-[50%]">
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="flex">
                                <p v-if="detail_data">Posted by {{ detail_data.user.name }}(
                                    <router-link to="/" class="text-color-2" style="text-decoration: underline;">
                                        View all Ads
                                    </router-link>
                                    )
                                </p>
                            </div>
                            <div class="flex flex-row justify-between text-color-3">
                                <p class="flex flex-row cursor-pointer gap-1">
                                    <Icon name="phone" class="w-6" /> Call
                                </p>
                                <p class="flex flex-row cursor-pointer gap-1">
                                    <Icon name="email" class="w-6" /> Email
                                </p>
                                <p class="flex flex-row cursor-pointer gap-1">
                                    <Icon name="message" class="w-6" /> Message
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-3">
                        <p class="text-xl">Quick Info</p>
                        <div class="flex flex-row flex-wrap gap-2">
                            <div class="border-color-1 border rounded-md p-2">
                                <h6 v-if="detail_data?.house_type" class="text-sm text-color-2">{{
                                    detail_data.house_type }}
                                </h6>
                                <h6 v-else class="text-sm text-color-2">House_Type</h6>
                            </div>
                            <div class="border-color-1 border rounded-md p-2">
                                <h6 v-if="detail_data?.realtor" class="text-sm text-color-2">{{ detail_data.realtor
                                    }}</h6>
                                <h6 v-else class="text-sm text-color-2">Realtor</h6>
                            </div>
                            <div class="border-color-1 border rounded-md p-2">
                                <h6 v-if="detail_data?.short_location" class="text-sm text-color-2">{{
                                    detail_data.short_location }}
                                </h6>
                                <h6 v-else class="text-sm text-color-2">Short_Location</h6>
                            </div>
                            <div class="border-color-1 border rounded-md p-2">
                                <h6 v-if="detail_data?.license" class="text-sm text-color-2">{{ detail_data.license
                                    }}</h6>
                                <h6 v-else class="text-sm text-color-2">License</h6>
                            </div>
                            <div class="border-color-1 border rounded-md p-2">
                                <h6 v-if="detail_data?.realtor" class="text-sm text-color-2">{{ detail_data.realtor
                                    }}</h6>
                                <h6 v-else class="text-sm text-color-2">Realtor</h6>
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
            <div class="flex flex-row gap-3 items-center">
                <p v-if="detail_data" class="text-color-3 text-md">Post ID : {{ detail_data.id }}</p>
                <p class="flex flex-row text-color-3 text-md cursor-pointer" @click="handleReportClick">
                    <Icon name="report" class="w-5" />
                    &nbsp;Report Post
                </p>
                <p class="flex flex-row text-color-3 text-md cursor-pointer" @click="handleLinkClick">
                    <Icon name="share" class="w-5" />
                    &nbsp;Share
                </p>
            </div>
        </div>
    </div>
    <transition name="modal-fade">
        <div v-show="showModal" class="image-modal">
            <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5"
                containerStyle="max-width: 100%; border:none" :showItemNavigators="true">
                <template #item="slotProps">
                    <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt"
                        class="w-auto block h-[300px] sm:h-[450px] md:h-[600px]" />
                </template>
                <template #thumbnail="slotProps" class="gap-3">
                    <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt"
                        class="w-[180px] h-[100px] block rounded-md" />
                </template>
            </Galleria>
            <button @click="showModal = false"
                class="absolute top-[20px] right-[20px] bg-white p-2 rounded-md cursor-pointer">
                <Icon name="close-1" class="w-5" />
            </button>
        </div>
    </transition>
    <transition name="modal-fade">
        <ReportModal v-show="showReportModal" @close="showReportModal = false" :is-visible="showReportModal" />
    </transition>
    <transition name="modal-fade">
        <ShareLink v-show="showLinkModal" @close="showLinkModal = false" :is-visible="showLinkModal" />
    </transition>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Icon from "~/components/Icon.vue";
import Galleria from 'primevue/galleria';
import ReportModal from "~/components/ReportModal.vue";
import ShareLink from "~/components/ShareLink.vue";

const route = useRoute();
const id = ref('31');
const detail_data = ref<any>();
const isExpanded = ref(false);
const showReportModal = ref(false);
const showLinkModal = ref(false);
const showModal = ref(false);

const handleReportClick = () => {
    showReportModal.value = true;
    console.log("showReportModal:", showReportModal.value); // Log the value to the console
};

const handleLinkClick = () => {
    showLinkModal.value = true;
    console.log("showLinkModal:", showLinkModal.value); // Log the value to the console
};

const toggleText = () => {
    isExpanded.value = !isExpanded.value;
};
const images = ref<any[]>([]); // Array for Galleria images
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
onMounted(async () => {
    try {
        id.value = route.params.id
        const { detail, detailLoading } = await useSelectedDetail(id.value) as any;

        detail_data.value = detail.value;

        if (detail_data.value.images && detail_data.value.images.length > 0) {
            images.value = detail_data.value.images.map((img: any) => ({
                itemImageSrc: img.src_url, // Full image URL    
                thumbnailImageSrc: img.thumbnail_url, // Thumbnail URL
                alt: `Image ${img.id}`,
                title: `Image ${img.id}`
            }));
        }
        if (detail_data.value.user.photo_url && detail_data.value.user.photo_url.length > 0) {
            avatar_image.value = detail_data.value.user.photo_url;
        }
    } catch (error) {
    }

})
</script>

<style scoped>
.google-map {
    object-fit: cover;
    border-radius: 12px;
}

.truncate-text {
    display: -webkit-box;
    -webkit-line-clamp: 6;
    /* Show only 6 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Button Styling */
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

/* Smooth fade-in and fade-out transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}
</style>