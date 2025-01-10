<template>
  <div class="header shadow-lg ">
    <div class="container mx-0 lg:mx-auto pt-3 pb-3">
      <div class="flex flex-row justify-between px-2">
        <router-link to="/" class="text-2xl logo ">Logo</router-link>
        <div @click="toggleDrawer" class="sm:hidden">
          <div class="flex gap-1 items-center cursor-pointer" :class="{
            'text-active':
              typeof selectedCategory == 'string' &&
              selectedCategory == 'all',
          }" @click="selectCategory('all')">
            <Icon name="all_categories" class="w-6" />
            All Categories
          </div>
        </div>

        <div class="items-center gap-8 hidden sm:flex">
          
          <div class="hidden md:flex items-center gap-8">
            <router-link to="/learn" class="flex items-center gap-1.5 cursor-pointer">
              <img src="../assets/images/arrow_down.png" alt="" width="16" />
              <span class="text-base">Learn</span>
            </router-link>
            <div class="flex items-center gap-1.5">
              <img src="../assets/images/briefcase.png" alt="" width="16" />
              <router-link to="business" class="text-base cursor-pointer">Business</router-link>

            </div>
            <button class="btn btn-active">+ POST AD</button>
          </div>
          <div class="hidden md:flex items-center gap-1">
            <router-link to="/login" class="cursor-pointer" :class="routeName == 'login' && 'text-active'">Login
            </router-link>
            <span> | </span>
            <router-link to="/register" class="cursor-pointer" :class="routeName == 'register' && 'text-active'">Sign Up
            </router-link>
          </div>
        </div>

        <transition enter-class="opacity-0" enter-active-class="ease-out transition-medium" enter-to-class="opacity-100"
          leave-class="opacity-100" leave-active-class="ease-out transition-medium" leave-to-class="opacity-0">
          <div @keydown.esc="isOpen = false" v-show="isOpen"
            class="z-[1000] fixed inset-0 transition-opacity top-[57px]">
            <div @click="isOpen = false" class="absolute inset-0 bg-black opacity-50" tabindex="0"></div>
          </div>
        </transition>
        <aside class="transform top-[57px] right-0 w-35 bg-white fixed h-auto overflow-auto overflow-y-scroll ease-in-out transition-all
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
