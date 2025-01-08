<template>
  <div class="header shadow-lg">
    <div class="container mx-0 lg:mx-auto pt-3 pb-3">
      <div class="flex justify-between items-center">
        <button @click="toggleDrawer" class="sm:hidden">
          <svg class="h-8 w-8 fill-current text-black" fill="none" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg> 
        </button>
        <NuxtLink to="/" class="text-2xl logo ">Logo</NuxtLink>

        <div class="flex items-center gap-8">
          <!-- <div>

          </div> -->
          <div class="hidden md:flex items-center gap-8">
            <div class="flex items-center gap-1.5">
              <img src="../assets/images/arrow_down.png" alt="" width="16" />
              <span class="text-base">Learn</span>
            </div>
            <div class="flex items-center gap-1.5">
              <img src="../assets/images/briefcase.png" alt="" width="16" />
              <NuxtLink to="business" class="text-base cursor-pointer">Business</NuxtLink>

            </div>
            <button class="btn btn-active">+ POST AD</button>
          </div>
          <div class="hidden md:flex items-center gap-1">
            <NuxtLink to="login" class="cursor-pointer" :class="routeName == 'login' && 'text-active'">Login
            </NuxtLink>
            <span> | </span>
            <NuxtLink to="register" class="cursor-pointer" :class="routeName == 'register' && 'text-active'">Sign Up
            </NuxtLink>
          </div>
        </div>

        <transition enter-class="opacity-0" enter-active-class="ease-out transition-medium" enter-to-class="opacity-100"
          leave-class="opacity-100" leave-active-class="ease-out transition-medium" leave-to-class="opacity-0">
          <div @keydown.esc="isOpen = false" v-show="isOpen"
            class="z-[1000] fixed inset-0 transition-opacity top-[57px]">
            <div @click="isOpen = false" class="absolute inset-0 bg-black opacity-50" tabindex="0"></div>
          </div>
        </transition>
        <aside
          class="transform top-[57px] left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-[1001]"
          :class="isOpen ? 'translate-x-0' : '-translate-x-full'">

          <div class="close">
            <button class="absolute top-0 right-0 mt-4 mr-4" @click=" isOpen = false">
              <svg class="w-6 h-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <span @click="isOpen = false" class="flex w-full items-center p-4">
            <div
              class="flex flex-col w-full h-full justify-start gap-2 bg-color-2 pt-8">
              <div class="flex gap-1 items-center border-color-1 pb-2 cursor-pointer border-b" :class="{
                'text-active':
                  typeof selectedCategory == 'string' &&
                  selectedCategory == 'all',
              }" @click="selectCategory('all')">
                <Icon name="all_categories" class="w-6" />
                All Categories
              </div>
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
            <Tailwind />
          </span>

        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, watch, onMounted } from "vue";
import Icon from "./Icon.vue";

const route = useRoute();
const routeName = computed(() => route.name);
const selectedCategory = ref<any>("all");
  const selectCategory = (newVal: any) => {
  selectedCategory.value = newVal;
};
const { categories, categoryLoading } = (await useCategories()) as any;
const { category, setCategory } = useSelectCategory();

// Reactive variable for drawer state
const isOpen = ref(false);

// Method to toggle the drawer
const toggleDrawer = () => {
  isOpen.value = !isOpen.value;
};

// Watch for changes in `isOpen` to handle overflow styling
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

// Add event listener for "Escape" key
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
