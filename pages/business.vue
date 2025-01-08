<template>
    <div class="md:container mx-0 lg:mx-auto pt-5">
        <div class="flex gap-4 text-base w-full items-center justify-center">
            <div class="flex flex-col gap-4 text-base bg-white rounded-md">
                <p class="text-lg font-semibold text-center">Business Portfolio</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <!-- Use v-for to render the cards -->
                    <template v-for="(card, index) in card_data" :key="`card-${index}`">
                        <BusinessCard :image_url="card.image_url" :content="card.content"
                            :btn_content="card.btn_content" />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BusinessCard from "~/components/BusinessCard.vue";

// Define card data
const card_data = ref([
    {
        image_url: "/_nuxt/assets/images/first.png",
        content: "Create Automotive seller profile and add inventory to reach local buyers",
        btn_content: "Create Automotive Profile",
    },
    {
        image_url: "/_nuxt/assets/images/second.png",
        content: "Add properties in bulk and manage listings from dashboard. ",
        btn_content: "Create Realtor Profile",
    },
    {
        image_url: "/_nuxt/assets/images/third.png",
        content: "Join local recruiters network, create profile and post unlimited jobs.",
        btn_content: "Create Recruiter Profile",
    },
    {
        image_url: "/_nuxt/assets/images/fourth.png",
        content: "Create one time advocate profile for more locals visibility.",
        btn_content: "Create Advocate Profile",
    },
    {
        image_url: "/_nuxt/assets/images/fifth.png",
        content: "Create your skilled trade profile as a local service provider.",
        btn_content: "Create Contractor Profile",
    },
    {
        image_url: "/_nuxt/assets/images/sixth.png",
        content: "Create trainer profile with skills and courses to reach out local trainees.",
        btn_content: "Create Trainer Profile",
    },
]);
</script>

<style scoped>
/* Add padding and spacing for the container */
.md\:container {
    padding: 20px;
}

/* Responsive grid */
.grid {
    display: grid;
    gap: 24px;
}
</style>