<template>
  <div class="header shadow-lg ">
    <div class="container mx-0 lg:mx-auto pt-3 pb-3">
      <div class="flex flex-row justify-between px-2">
        <router-link to="/" class="text-2xl logo ">Logo</router-link>
        <div @click="toggleDrawer" class="md:hidden">
          <div class="flex gap-1 items-center cursor-pointer" :class="{
            'text-active':
              typeof selectedCategory == 'string' &&
              selectedCategory == 'all',
          }" @click="selectCategory('all')">
            <Icon name="all_categories" class="w-6" />
            All Categories
          </div>
        </div>

        <div class="items-center gap-8 hidden md:flex">

          <div class="hidden md:flex items-center gap-8">

            <div class="relative flex items-center gap-1.5 cursor-pointer" @click.prevent="toggleLearnMenu">
              <img src="../assets/images/arrow_down.png" alt="" width="16" />
              <span class="text-base">Learn</span>

              <transition enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-200 ease-in" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <div v-if="showLearnMenu"
                  class="z-[100] absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md py-2 min-w-[200px] origin-top border border-color-1 px-3">
                  <div v-for="category in categories_list" :key="category.id"
                    class="flex gap-1 items-center border-color-1 py-[5px] cursor-pointer"
                    :class="{ 'text-active': modelValue?.id === category.id }" @click="navigateToLearn(category)">
                    <Icon :name="category.icon" class="w-6" />
                    <p class='text-[14px]'>
                      {{ category.title }}
                    </p>
                  </div>
                  <router-link to="/learn?category=1"
                    class="flex justify-center items-center px-3 py-2 hover:bg-gray-100 text-color-2">( Read More
                    )</router-link>
                </div>
              </transition>
            </div>
            <div class="flex items-center gap-1.5">
              <img src="../assets/images/briefcase.png" alt="" width="16" />
              <router-link to="/business" class="text-base cursor-pointer">Business</router-link>

            </div>
            <button class="btn btn-active">+ POST AD</button>
          </div>
          <div class="hidden md:flex items-center gap-1">
            <template v-if="!user_info">
              <router-link to="/login" class="cursor-pointer" :class="routeName == 'login' && 'text-active'">Login
              </router-link>
              <span> | </span>
              <router-link to="/register" class="cursor-pointer" :class="routeName == 'register' && 'text-active'">Sign
                Up
              </router-link>
            </template>
            <template v-else>
              <div class="relative flex items-center gap-1 cursor-pointer" @click.prevent="toggleUserMenu">
                <img :src="user?.photo_url || '../assets/images/user_avatar.png'" alt="user_avatar"
                  class="w-[40px] h-[40px] rounded-md" />
                <div class="flex flex-col">
                  <p class="text-[13px]">{{ (user?.first_name && user?.last_name) ? `${user.first_name}
                    ${user.last_name}` : 'User' }}</p>
                  <p class="text-[12px] text-gray-500">{{ user?.username }}</p>
                </div>

                <transition enter-active-class="transition duration-200 ease-out"
                  enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-200 ease-in"
                  leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                  <div v-if="showUserMenu"
                    class="z-[100] absolute top-full right-0 mt-1 bg-white shadow-lg rounded-md py-2 min-w-[200px] origin-top border border-color-1 px-3">
                    <div v-for="item in userMenuItems" :key="item.id"
                      class="flex gap-3 items-center border-color-1 py-[5px] cursor-pointer"
                      @click.stop="handleUserMenuClick(item)">
                      <Icon :name="item.icon" class="w-6" />
                      <p class='text-[14px]'>
                        {{ item.title }}
                      </p>
                    </div>
                    <div class="flex w-full gap-1 border-color-1 py-[5px] cursor-pointer justify-center items-center">
                      <span class="text-[14px] px-4 py-1 border-color-1 border rounded-md" @click.stop="handleLogout">
                        <Icon name="logout" class="w-6" /> Logout
                      </span>
                    </div>
                  </div>
                </transition>
              </div>
            </template>
          </div>
        </div>

        <transition enter-class="opacity-0" enter-active-class="ease-out transition-medium" enter-to-class="opacity-100"
          leave-class="opacity-100" leave-active-class="ease-out transition-medium" leave-to-class="opacity-0">
          <div @keydown.esc="isOpen = false" v-show="isOpen"
            class="z-[1000] fixed inset-0 transition-opacity top-[57px]">
            <div @click="isOpen = false" class="absolute inset-0 bg-black opacity-50" tabindex="0"></div>
          </div>
        </transition>
        <aside class="transform top-[57px] right-0 w-35 bg-white fixed h-auto overflow-auto ease-in-out transition-all
        duration-300 z-[1001]" :class="isOpen ? 'translate-x-0' : 'translate-x-full'">

          <span @click="isOpen = false" class="flex w-full items-center p-2">
            <div class="flex flex-col w-full h-full justify-start gap-2 bg-color-2">
              <div class="flex gap-1 items-center border-color-1 pb-2 cursor-pointer border-b">
                <Icon name="automotive" class="w-6" />
                Automotives
              </div>
              <div v-for="category in categories" :key="category.id"
                class="flex gap-1 items-center border-color-1 pb-2 cursor-pointer border-b" :class="{
                  'text-active':
                    typeof selectedCategory == 'object' &&
                    selectedCategory.id == category.id,
                }" @click="selectCategory(category)">
                <Icon :name="`ads-${category.slug}`" class="w-6" />
                {{ category.name }}
              </div>
            </div>
          </span>

        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, watch, onMounted, onUnmounted, computed } from "vue";
import { useUserData } from '~/composables/user';

import Icon from "./Icon.vue";

const route = useRoute();
const router = useRouter();
const { $swal } = useNuxtApp()

const { user } = useUserData();
const user_info = computed(() => user.value)

const handleLogout = () => {
  document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  $swal.fire({
    text: 'Logged out successfully',
    icon: 'success'
  })
  router.push('/login');
  user.value = null
}

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
    icon: 'settings',
  },
  {
    id: '3',
    title: 'Manage Business',
    icon: 'logout',
  },
  {
    id: '4',
    title: 'Settings',
    icon: 'setting',
  },
  {
    id: '3',
    title: 'Password',
    icon: 'password',
  },
  {
    id: '3',
    title: 'Activity & Privacy',
    icon: 'logout',
  }
];

const toggleUserMenu = (event: Event) => {
  event.stopPropagation();
  showUserMenu.value = !showUserMenu.value;
};

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

const routeName = computed(() => route.name);
const selectedCategory = ref<any>("all");
const selectCategory = (newVal: any) => {
  selectedCategory.value = newVal;
};

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

const { categories, categoryLoading } = (await useCategories()) as any;
const { category, setCategory } = useSelectCategory();

const showLearnMenu = ref(false);

const toggleLearnMenu = (event: Event) => {
  event.stopPropagation();
  showLearnMenu.value = !showLearnMenu.value;
};
onMounted(() => {
  document.addEventListener('click', () => {
    showLearnMenu.value = false;
    showUserMenu.value = false;
    showLearnMenu.value = false;
  });
});

onUnmounted(() => {
  document.removeEventListener('click', () => {
    showUserMenu.value = false;
    showLearnMenu.value = false;
  });
});

const navigateToLearn = async (category: any) => {
  await router.push({
    path: '/learn',
    query: { category: category.id }
  });
  // Force a reload of the component
  if (route.path === '/learn') {
  }
  showLearnMenu.value = false;
};

const categories_list = [
  {
    id: '1',
    title: 'About',
    icon: 'user'
  },
  {
    id: '2',
    title: 'Services & Features',
    icon: 'user'
  },
  {
    id: '3',
    title: 'Platform Terms',
    icon: 'user'
  },
  {
    id: '4',
    title: 'Safety Guid',
    icon: 'user'
  },
  {
    id: '5',
    title: 'You & FlickerPage',
    icon: 'user'
  },
  {
    id: '6',
    title: 'Terms Of Use',
    icon: 'user'
  }
];

const isOpen = ref(false);

const toggleDrawer = () => {
  isOpen.value = !isOpen.value;
};

watch(isOpen, (newValue) => {
  if (typeof window !== "undefined") {
    if (newValue) {
      document.body.style.setProperty("overflow", "hidden");
    } else {
      document.body.style.removeProperty("overflow");
    }
  }
});
watch(
  () => selectedCategory.value,
  (newVal) => {
    setCategory(newVal);
  }
);
onMounted(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isOpen.value) {
      isOpen.value = false;
    }
  };

  document.addEventListener("keydown", handleKeyDown);

  // Cleanup listener when component unmounts
  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
});
</script>

<style lang="scss" scoped>
@use "../assets/styles/vars";

.logo {
  color: vars.$text-color-2;
}

.header {
  background-color: #ffffff;
}
</style>
