<template>
    <div class="flex w-full flex-col">
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
            <div v-if="activeTab === 'login'">
                Login Activity
            </div>
            <div v-if="activeTab === 'privacy'">
               Privacy Center
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Icon from "./Icon.vue";

const route = useRoute();

const tabs = [
    { id: 'login', name: 'Login Activity', icon: 'user' },
    { id: 'privacy', name: 'My Listings', icon: 'user' },
   
]
const activeTab = ref(route.query.tab?.toString() || 'profile')

// Watch for route query changes
watch(() => route.query.tab, (newTab) => {
    if (newTab && tabs.some(tab => tab.id === newTab)) {
        activeTab.value = newTab as string
    }
})
</script>

<style lang="scss" scoped></style>