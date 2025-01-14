<template>
    <div class="md:container mx-0 lg:mx-auto pt-5">
        <div class="flex flex-col gap-4 w-full">
            <!-- Step Indicator -->
            <div class="flex items-center w-full justify-center">
                <div v-for="(step, index) in steps" :key="index" class="relative flex items-center">
                    <div class="flex flex-col items-center min-w-[160px] relative step-container">
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
                            class="absolute top-[10px] -right-[80px] h-[5px] w-[40px] step-line" :style="{
                                '--line-color': currentStep > index ? '#008080' : '#d1d5db'
                            }"></span>
                    </div>
                </div>
            </div>

            <div class="mt-6">
                <div v-for="(step, index) in steps" :key="step.title" v-show="currentStep === index">
                    <component :is="steps[currentStep].content" @updatePostData="handlePostData"
                        :updateCategory="updateCategory" :updateSubCategory="updateSubCategory"
                        :currentCategory="form.category" :currentSubcategory="form.subcategory" :postTitle="form.title"
                        :postDescription="form.description" :businessName="form.businessName" :services="form.services"
                        :imageData="form.imageData" :openHours="form.openHours" @updateOtherDetails="updateOtherDetails"
                        @imageData="imageData" :contactEmail="form.contactEmail" :contactPhone="form.contactPhone"
                        :webLink="form.webLink" :location="form.location" :user="form.user" @ContactData="ContactData"
                        :formData="form" />
                </div>

                <div class=" mt-4 flex w-full justify-center items-center gap-4">
                    <div v-if="currentStep > 0" @click="prevStep"
                        class="border border-color-1 rounded-md px-[15px] py-[7px] cursor-pointer">
                        Previous
                    </div>
                    <div v-if="currentStep < steps.length - 1" @click="nextStep" class="btn btn-active">
                        Next
                    </div>
                    <div v-else @click="submit" class="btn btn-active">
                        Submit
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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
    { title: 'Select Category', content: SelectCategory },
    { title: 'Post Details', content: PostDetail },
    { title: 'Other Details', content: OtherDetail },
    { title: 'Gallery', content: Gallery },
    { title: 'Location & Contact', content: LocationContact },
    { title: 'Submit', content: Submit }
]);

// Form state management
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
    location: any;
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
    location: [],
    user: []
});


function updateOtherDetails(data: { businessName: string | null; services: string[]; openHours: string | null }) {
    form.value.businessName = data.businessName || "";
    form.value.services = data.services || [];
    form.value.openHours = data.openHours || "";
}
function imageData(data: { imageData: any }) {
    // Ensure that data.imageData is an array if multiple images are expected
    if (Array.isArray(data.imageData)) {
        form.value.imageData.push(...data.imageData);
    } else if (typeof data.imageData === 'object' && data.imageData !== null) {
        // If it's a single image object
        form.value.imageData.push(data.imageData);
    }
    console.log("Updated form.value.imageData:", form.value.imageData);
}

// Handle the post data received from PostDetail
function handlePostData(data: { title: string | null, description: string | null }) {
    form.value.title = data.title || "";
    form.value.description = data.description || "";
}


function ContactData(data: { contactEmail: string | null; contactPhone: string | null; webLink: string | null, location: Array<any> | [], user: Array<any> | [] }) {
    form.value.contactEmail = data.contactEmail || "";
    form.value.contactPhone = data.contactPhone || "";
    form.value.webLink = data.webLink || "";
    form.value.location = data.location || [];
    form.value.user = data.user || [];
}

const currentStep = ref(0);

// To handle updated category and subcategory from SelectCategory.vue
function updateCategory(category: Category | null) {
    form.value.category = category || null;
}


function updateSubCategory(subcategory: SubCategory | null) {
    form.value.subcategory = subcategory || "";
}

function nextStep() {
    if (currentStep.value === 0 && !form.value.category) {
        // Display a message to the user
        $swal.fire({
            text: 'Please select a category to proceed.',
            icon: 'warning',
        });
        return;
    }
    if (currentStep.value === 1 && (!form.value.title || !form.value.description)) {
        if (!form.value.title && !form.value.description) {
            $swal.fire({
                text: 'Please input at least a title or description for your post',
                icon: 'warning',
            });
            return;
        }
    }

    // Proceed to the next step if validation passes
    if (currentStep.value < steps.value.length - 1) {
        currentStep.value++;
    }

    console.log(form, ':: form data');
    console.log(form.value.subcategory, ':: sub category');
    console.log(form.value.category, ':: category');

}

async function submit() {
    try {
        // Create a new FormData object
        const formData = new FormData();

        // Append all form values to the FormData object
        formData.append("category", JSON.stringify(form.value.category));
        formData.append("subcategory", JSON.stringify(form.value.subcategory));
        formData.append("title", form.value.title);
        formData.append("description", form.value.description);
        formData.append("businessName", form.value.businessName);
        formData.append("openHours", form.value.openHours);
        formData.append("contactEmail", form.value.contactEmail);
        formData.append("contactPhone", form.value.contactPhone);
        formData.append("webLink", form.value.webLink);
        formData.append("location", JSON.stringify(form.value.location));
        formData.append("user", JSON.stringify(form.value.user));

        // Add images to FormData
        form.value.imageData.forEach((image: { url: string; file: File }, index: number) => {
            formData.append(`imageData[${index}]`, image.file);
        });

        // Add services as an array
        form.value.services.forEach((service: string, index: number) => {
            formData.append(`services[${index}]`, service);
        });

        const response = await axios.post(`${import.meta.env.VITE_ADS_API_URL}/post/store`, formData);

        if (response.data.status === "Success") {
            $swal.fire({
                text: 'Form Submitted Successfully!',
            });
        }
    } catch (error) {
        // Handle errors during submission
        console.error("Error submitting form:", error);
        $swal.fire({
            text: 'Submission failed!',
            icon: 'error',
        });
    }
}


function prevStep() {
    if (currentStep.value > 0) {
        currentStep.value--;
    }

    console.log(form, ':: form data');
    console.log(form.value.subcategory, ':: sub category');
    console.log(form.value.category, ':: category');
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
    width: 80px;
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
