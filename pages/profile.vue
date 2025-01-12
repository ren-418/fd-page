<template>
    <div class="md:container mx-0 lg:mx-auto pt-5">
        <div class="flex flex-col gap-4 text-base w-full items-center justify-center">
            <!-- Tab Navigation -->
            <nav class="flex space-x-8 gap-4 w-full overflow-x-auto xl:gap-8 lg:overflow-hidden" aria-label="Tabs">
                <div v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                    activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium cursor-pointer'
                ]">
                    <div class="flex items-center gap-2">
                        <Icon :name="tab.icon" class="w-6" /> {{ tab.name }}
                    </div>
                </div>
            </nav>
            <!-- Tab Content -->
            <div class="mt-4 rounded-lg p-4 w-full pb-[90px]">
                <div v-if="activeTab === 'profile'">
                    <ProfileCard />
                </div>
                <div v-if="activeTab === 'listings'">
                    <MyListing />
                </div>
                <div v-if="activeTab === 'business'">
                    <div class="flex flex-col gap-4 text-base bg-white rounded-md pt-5 mx-auto">
                        <p class="text-lg font-semibold w-full px-[30px] sm:px-[100px]">Your Business Portfolio</p>
                        <div
                            class="flex flex-col justify-center items-center sm:grid sm:grid-cols-2 sm:mx-auto lg:grid-cols-3 gap-10">
                            <template v-for="(card, index) in card_data" :key="`card-${index}`">
                                <BusinessCard :image_url="card.image_url" :content="card.content"
                                    :btn_content="card.btn_content" />
                            </template>
                        </div>
                    </div>
                </div>
                <div v-if="activeTab === 'settings'">
                    <Settings />
                </div>
                <div v-if="activeTab === 'password'">
                    <Password />
                </div>
                <div v-if="activeTab === 'privacy'">
                    <Privacy />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from '~/components/Icon.vue'
import ProfileCard from '~/components/ProfileCard.vue'
import MyListing from '~/components/MyListing.vue'
import BusinessCard from '~/components/BusinessCard.vue'
import Settings from '~/components/Settings.vue'
import Password from '~/components/Password.vue'
import Privacy from '~/components/Privacy.vue'

definePageMeta({
    middleware: ['auth'],
    requiresAuth: 'high'
});

const route = useRoute();

const tabs = [
    { id: 'profile', name: 'Profile', icon: 'user' },
    { id: 'listings', name: 'My Listings', icon: 'user' },
    { id: 'business', name: 'Manage Business', icon: 'user' },
    { id: 'settings', name: 'Settings', icon: 'setting' },
    { id: 'password', name: 'Password', icon: 'user' },
    { id: 'privacy', name: 'Privacy & Activity', icon: 'user' },
]
const activeTab = ref(route.query.tab?.toString() || 'profile')

// Watch for route query changes
watch(() => route.query.tab, (newTab) => {
    if (newTab && tabs.some(tab => tab.id === newTab)) {
        activeTab.value = newTab as string
    }
})

definePageMeta({
    middleware: ['auth'],
    requiresAuth: 'high'
});

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

<style lang="scss" scoped>
::-webkit-scrollbar {
    width: 3px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: #888;
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
