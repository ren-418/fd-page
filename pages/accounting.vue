<template>
    <div class="flex flex-col gap-3 px-5 py-3">
        <div v-for="item in userMenuItems" :key="item.id"
            class="flex gap-3 items-center border-color-1 py-[5px] cursor-pointer"
            @click.stop="handleUserMenuClick(item)">
            <Icon :name="item.icon" class="w-6" />
            <p class='text-[14px]'>
                {{ item.title }}
            </p>
        </div>
        <div class="flex w-full gap-1 border-color-1 py-[5px] cursor-pointer justify-center items-center">
            <span class="flex flex-row gap-2 text-[14px] px-4 py-1 border-color-1 border rounded-md"
                @click.stop="handleLogout">
                <Icon name="careers" class="w-6" /> Logout
            </span>
        </div>
    </div>
</template>
<script setup lang="ts">
import Icon from "~/components/Icon.vue";
import axios from "axios";
import { useRuntimeConfig } from "#app";
import { useCookie } from '#app'
const route = useRoute();
const router = useRouter();
const { $swal } = useNuxtApp()

const { user } = useUserData();
const showUserMenu = ref(false);

const userMenuItems = [
    {
        id: '1',
        title: 'Profile',
        icon: 'user',
    },
    {
        id: '2',
        title: 'My Listings',
        icon: 'calendar',
    },
    {
        id: '3',
        title: 'Manage Business',
        icon: 'ads-jobs',
    },
    {
        id: '4',
        title: 'Settings',
        icon: 'setting',
    },
    {
        id: '3',
        title: 'Password',
        icon: 'privacy',
    },
    {
        id: '3',
        title: 'Activity & Privacy',
        icon: 'privacy',
    }
];

const handleLogout = () => {
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    $swal.fire({
        text: 'Logged out successfully',
        icon: 'success'
    })
    router.push('/login');
    user.value = null
}

const handleUserMenuClick = (item: any) => {
    showUserMenu.value = false;

    // Map menu titles to tab IDs
    const menuToTabMapping: { [key: string]: string } = {
        'Profile': 'profile',
        'My Listings': 'listings',
        'Manage Business': 'business',
        'Settings': 'settings',
        'Password': 'password',
        'Activity & Privacy': 'privacy'
    };

    const tabId = menuToTabMapping[item.title];
    if (tabId) {
        router.push({
            path: '/profile',
            query: { tab: tabId }
        });
    }
};


</script>

<style lang="scss" scoped></style>