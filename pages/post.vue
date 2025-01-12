<template>
    <div class="md:container mx-0 lg:mx-auto pt-5">
        <div class="flex flex-col gap-4 w-full">
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
                    <component :is="steps[currentStep].content" />
                </div>
            </div>

            <div class="mt-4 flex w-full justify-center items-center gap-4">
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SelectCategory from '~/components/Post/SelectCategory.vue';
import Gallery from '~/components/Post/Gallery.vue';
import LocationContact from '~/components/Post/LocationContact.vue';
import OtherDetail from '~/components/Post/OtherDetail.vue';
import PostDetail from '~/components/Post/PostDetail.vue';
import Submit from '~/components/Post/Submit.vue';

const { $swal } = useNuxtApp()

interface Step {
    title: string;
    content: any;
}

const steps = ref<Step[]>([
    { title: 'Select Category', content: SelectCategory },
    { title: 'Post Details', content: PostDetail },
    { title: 'Other Details', content: OtherDetail },
    { title: 'Gallery', content: Gallery },
    { title: 'Location & Contact', content: LocationContact },
    { title: 'Submit', content: Submit }
]);

const currentStep = ref(0);

function nextStep() {
    if (currentStep.value < steps.value.length - 1) {
        currentStep.value++;
    }
}

function prevStep() {
    if (currentStep.value > 0) {
        currentStep.value--;
    }
}

function submit() {
    $swal.fire({
        text: 'Form Submitted!',
        icon: 'success'
    })
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
