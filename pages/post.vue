<template>
    <div class="md:container mx-0 lg:mx-auto pt-5 pb-[100px]">
        <div class="flex flex-col gap-4 w-full">
            <!-- Step Indicator -->
            <div class="hidden items-center w-full justify-center sm:flex">
                <div v-for="(step, index) in steps" :key="index" class="relative flex items-center">
                    <div class="flex flex-col items-center min-w-[80px] lg:min-w-[160px] relative step-container">
                        <div :class="[
                            'step-circle w-5 h-5 flex items-center justify-center rounded-full border-2 relative',
                            currentStep > index ? 'bg-pink-500 border-[#008080] text-white' :
                                currentStep === index ? 'bg-white border-[#008080] text-pink-500' :
                                    'bg-gray-300 border-gray-300 text-gray-500'
                        ]">
                            <span v-if="currentStep > index" class="font-bold text-[10px] text-white">✔</span>
                        </div>
                        <div class="mt-2 text-center text-gray-800 text-sm font-medium">
                            {{ step.title }}
                        </div>
                        <span v-if="index !== steps.length - 1"
                            class="hidden absolute top-[10px] -right-[45px] h-[5px] step-line w-[45px] lg:w-[80px] sm:block lg:-right-[80px]"
                            :style="{
                                '--line-color': currentStep > index ? '#008080' : '#d1d5db'
                            }"></span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-full justify-center items-center h-auto sm:hidden">
                <p class="text-lg text-[#008080]">{{ steps[currentStep].title }}</p>
            </div>
            <div class="mt-6">
                <div v-for="(step, index) in steps" :key="step.title" v-show="currentStep === index">
                    <component :is="steps[currentStep].content" @updatePostData="handlePostData"
                        :updateCategory="updateCategory" :updateSubCategory="updateSubCategory"
                        :currentCategory="form.category" :currentSubcategory="form.subcategory" :postTitle="form.title"
                        :postDescription="form.description" :businessName="form.businessName" :services="form.services"
                        :imageData="form.imageData" @updateFormImages="updateFormImages" :openHours="form.openHours"
                        @updateOtherDetails="updateOtherDetails" @imageData="imageData"
                        :contactEmail="form.contactEmail" :contactPhone="form.contactPhone" :webLink="form.webLink"
                        :user="form.user" @ContactData="ContactData" :formData="form"
                        @termsAccepted="updateTermsAccepted" />
                </div>

                <div class=" mt-4 flex w-full justify-center items-center gap-4">
                    <div v-if="currentStep > 0" @click="prevStep"
                        class="border border-color-1 rounded-md px-[15px] py-[7px] cursor-pointer">
                        Previous
                    </div>
                    <div v-if="currentStep < steps.length - 1" @click="nextStep" class="btn btn-active">
                        Next
                    </div>
                    <div v-else @click="termsAccepted ? submit() : showTermsWarning()"
                        :class="['btn btn-active', termsAccepted ? '' : '', !!loading && 'btn-loading']">
                        Submit
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue';
import SelectCategory from '~/components/Post/SelectCategory.vue';
import Gallery from '~/components/Post/Gallery.vue';
import LocationContact from '~/components/Post/LocationContact.vue';
import OtherDetail from '~/components/Post/OtherDetail.vue';
import PostDetail from '~/components/Post/PostDetail.vue';
import Submit from '~/components/Post/Submit.vue';
import axios from 'axios';

const { $swal } = useNuxtApp();

interface Step {
    title: string;
    content: any;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface SubCategory {
    id: number;
    name: string;
}

definePageMeta({
    middleware: ['auth'],
    requiresAuth: 'high'
});

const steps = ref<Step[]>([
    { title: 'Select Category', content: markRaw(SelectCategory) },
    { title: 'Post Details', content: markRaw(PostDetail) },
    { title: 'Other Details', content: markRaw(OtherDetail) },
    { title: 'Gallery', content: markRaw(Gallery) },
    { title: 'Location & Contact', content: markRaw(LocationContact) },
    { title: 'Submit', content: markRaw(Submit) }
]);

const form = ref<{
    category: Category | null;
    subcategory: SubCategory | null | string;
    title: string;
    description: string;
    businessName: string;
    services: any;
    openHours: string;
    imageData: any;
    contactEmail: string;
    contactPhone: string;
    webLink: string;
    user: any;
}>({
    category: null,
    subcategory: null,
    title: "",
    description: "",
    businessName: "",
    services: [],
    openHours: "",
    imageData: [],
    contactEmail: "",
    contactPhone: "",
    webLink: "",
    user: []
});

const loading = ref(false);

function updateOtherDetails(data: { businessName: string | null; services: string[]; openHours: string | null }) {
    form.value.businessName = data.businessName || "";
    form.value.services = data.services || [];
    form.value.openHours = data.openHours || "";
}

function updateFormImages(newImages: Array<any>) {
    form.value.imageData = newImages;
    console.log("Updated form images:", form.value.imageData);
}

function imageData(data: { imageData: any }) {

    if (Array.isArray(data.imageData)) {
        form.value.imageData.push(...data.imageData);
    } else if (typeof data.imageData === 'object' && data.imageData !== null) {

        form.value.imageData.push(data.imageData);
    }
    console.log("Updated form.value.imageData:", form.value.imageData);
}

function handlePostData(data: { title: string | null, description: string | null }) {
    form.value.title = data.title || "";
    form.value.description = data.description || "";
}

const termsAccepted = ref(false);

function updateTermsAccepted(value: boolean) {
    termsAccepted.value = value;
}

function showTermsWarning() {
    $swal.fire({
        text: 'Please accept the Terms of Use and Privacy Policy to continue.',
        icon: 'warning',
    });
}


function ContactData(data: { contactEmail: string | null; contactPhone: string | null; webLink: string | null, user: Array<any> | [] }) {
    form.value.contactEmail = data.contactEmail || "";
    form.value.contactPhone = data.contactPhone || "";
    form.value.webLink = data.webLink || "";
    form.value.user = data.user || [];
}

const currentStep = ref(0);

function updateCategory(category: Category | null) {
    form.value.category = category || null;
}


function updateSubCategory(subcategory: SubCategory | null) {
    form.value.subcategory = subcategory || "";
}

function nextStep() {
    try {
        if (currentStep.value === 0 && !form.value.category) {
            $swal.fire({
                text: 'Please select a category to proceed.',
                icon: 'warning',
            });
            return;
        }
        if (currentStep.value === 3 && form.value.imageData.length === 0) {
            $swal.fire({
                text: 'Please add at least one image to proceed.',
                icon: 'warning',
            });
            return;
        }

        if (currentStep.value === 1 && (!form.value.title && !form.value.description)) {
            $swal.fire({
                text: 'Please input at least a title or description for your post',
                icon: 'warning',
            });
            return;
        }

        setTimeout(() => {
            if (currentStep.value < steps.value.length - 1) {
                currentStep.value++;
            }
        }, 100);
    } catch (error) {
        console.error('Navigation error:', error);
    }

    console.log(form.value.category?.name, " :: category name ");

}

const getCookie = (name: any) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        const part = parts.pop();
        if (part !== undefined) {
            return part.split(';').shift() || '';
        }
    }

    return '';

};

async function submit() {
    try {
        loading.value = true;
        console.log(form.value.imageData, ': const data');

        const data = {
            accommodation_amenities: [],
            accommodation_properties: [],
            address: "RT Nagar",
            automotive_color: "",
            automotive_make_manufacturer: "",
            automotive_model: "",
            automotive_year: "",
            available_from: "",
            available_from_today: false,
            bath_rooms: "",
            bed_rooms: "",
            benefits: [],
            breed_species_type: "",
            business_address: "",
            business_city: "",
            business_full_address: "",
            business_hours: "testing post",
            business_location: {
                country: "",
                city: "",
                state: "",
                county: "",
                zipcode: "",
                address: "",
                full_address: "",
                latitude: "",
                longitude: "",
            },
            business_state: "",
            business_zipcode: "",
            category: {
                id: 1,
                name: "Services",
                slug: "services",
                description: null,
                price: null,
                order: 1,
                image: null,
            },
            category_id: 1,
            city: "Bengaluru",
            client_recruiter: "",
            compensation: "",
            compensation_unit: "Month",
            condition: "",
            contact_email: null,
            contact_phone_number: null,
            contact_weblink: "",
            cost: "",
            cost_unit: "Month",
            description: "testing post",
            diff_time: "just now",
            employement_types: [],
            enable_chat: false,
            full_address: null,
            furnished: "",
            house_type: "",
            id: "",
            images: form.value.imageData,
            interview_mode: "",
            isAccepted: true,
            job_options: [],
            job_title: "",
            license: "",
            location: {
                address: "RT Nagar",
                city: "Bengaluru",
                country: "IN",
                county: null,
                full_address: null,
                latitude: 13.0247291,
                longitude: 77.5947532,
                state: "KA",
                zipcode: "560032"
            },
            locations: [],
            manufacturer: "",
            model: "",
            no_reply_to_this_post: false,
            pet_age: "",
            pet_characteristics: "",
            pet_color: "",
            pet_sex: "",
            pet_size_weight: "",
            pets_allowed: "",
            property_area: "",
            property_area_unit: "Sq.ft",
            realtor: "",
            remote_work_from_home: "",
            rent_lease_cost: "",
            rent_lease_item: "",
            rent_lease_term: "",
            rent_lease_unit: "for rent",
            rent_other_utilities: "",
            rent_other_utilities_unit: "Month",
            sale_by: "",
            service_provider: "testing post",
            services: ["testing post"],
            smoking_allowed: "",
            state: "KA",
            stay_available_for: [],
            sub_category: {
                id: 21,
                name: "Travel/Hosting/Vacation",
                category_id: 1,
                order: 0,
            },
            sub_category_id: 21,
            title: "testing post",
            trainer_institute: "",
            training_courses: [],
            training_fee: "",
            training_modes: [],
            user: form.value.user,
            user_id: null,
            work_authorizations: [],
            zipcode: "560032",
        };

        const token = getCookie('auth_token');
        if (!token) {
            $swal.fire({
                text: 'Authentication token not found. Please log in.',
                icon: 'error',
            });
            return;
        }

        const response = await axios.post(
            'https://ads-post.flickerpage.com/api/v01/post/store', // Your server URL
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.data.status === "Success") {
            $swal.fire({
                text: 'Form Submitted Successfully!',
                icon: 'success',
            });
            navigateTo('/');
        } else {
            $swal.fire({
                text: 'Unexpected response from the server.',
                icon: 'warning',
            });
        }
        loading.value = false;
    } catch (error) {
        console.error("Error submitting form:", error);
        $swal.fire({
            text: 'Submission failed!',
            icon: 'error',
        });
    } finally {
        loading.value = false;
    }
}

function prevStep() {
    try {
        // Add delay to allow proper component cleanup
        setTimeout(() => {
            if (currentStep.value > 0) {
                currentStep.value--;
            }
        }, 100);
    } catch (error) {
        console.error('Navigation error:', error);
    }
}
</script>

<style scoped>
.h-1 {
    height: 4px;
}

.rounded-full {
    border-width: 2px;
}

.text-gray-500 {
    color: #a0aec0;
}

.bg-pink-500 {
    background-color: #008080;
}

.bg-gray-300 {
    background-color: #d1d5db;
}

.step-container {
    position: relative;
}

.step-circle {
    position: relative;
    z-index: 10;
}

.step-line {
    position: absolute;
    height: 2px;
    background-color: var(--line-color, gray);
    z-index: 5;
    transition: all 0.4s ease-in-out;
}

.step-line::before,
.step-line::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 100%;
    z-index: 5;
    transition: all 0.4s ease-in-out;
}

.step-line::before {
    left: -100%;
    background-color: var(--line-color, gray);
    transition: all 0.4s ease-in-out;
}

.step-line::after {
    right: 0;
    background-color: var(--line-color, gray);
    transition: all 0.4s ease-in-out;
}


.step-line.active {
    background-color: #008080;
    transition: all 0.4s ease-in-out;
}

.step-line.completed::before {
    background-color: #008080;
    transition: all 0.4s ease-in-out;
}

.step-circle {
    transition: all 0.4s ease-in-out;
}

.step-line {
    transition: all 0.4s ease-in-out;
}
</style>
