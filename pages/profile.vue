<template>
    <div class="md:container mx-0 lg:mx-auto pt-5">
        <div class="flex flex-col gap-4 text-base w-full">
            <!-- Tab Navigation -->
            <nav class="flex space-x-8" aria-label="Tabs">
                <div v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                    activeTab === tab.id
                        ? 'border-blue-500 text-blue-600' // Change these colors as needed
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium cursor-pointer'
                ]">
                    <div class="flex items-center gap-2">
                        <Icon :name="tab.icon" class="w-6" /> {{ tab.name }}
                    </div>
                </div>
            </nav>
            <!-- Tab Content -->
            <div class="mt-4 bg-white rounded-lg p-4">
                <div v-if="activeTab === 'profile'" class="tab-content">
                    Profile Info Content
                </div>
                <div v-if="activeTab === 'listings'" class="tab-content">
                    Security Settings Content
                </div>
                <div v-if="activeTab === 'business'" class="tab-content">
                    Business of Content
                </div>
                <div v-if="activeTab === 'settings'" class="tab-content">
                    Settings Content
                </div>
                <div v-if="activeTab === 'password'" class="tab-content">
                    Password Content
                </div>
                <div v-if="activeTab === 'privacy'" class="tab-content">
                    Privacy & Activity Content
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from '~/components/Icon.vue'

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
</script>