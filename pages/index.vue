<template>
  <div class="md:container mx-0 lg:mx-auto pt-5">
    <div class="flex gap-4 text-base w-full">
      <div
        class=" hidden sm:flex flex-col justify-start gap-2 bg-color-2 p-3 w-80 rounded-lg h-max"
      >
        <div
          class="flex gap-1 items-center border-color-1 border-b pb-2 cursor-pointer"
        >
          <Icon name="all_categories" class="w-6" />
          All Categories
        </div>
        <div
          class="flex gap-1 items-center border-color-1 border-b pb-2 cursor-pointer"
        >
          <Icon name="automotive" class="w-6" />
          Automotives
        </div>
        <div
          v-for="category in categories"
          :key="category.id"
          class="flex gap-1 items-center border-color-1 border-b pb-2 cursor-pointer"
        >
          <Icon :name="`ads-${category.slug}`" class="w-6" />
          {{ category.name }}
        </div>
      </div>
      <div v-if="ads.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="ad in ads">
          <AdCard :title="ad.title" :slug="ad.slug" :city="ad.location.city" :cost="ad.cost" :service_provider="ad.service_provider" :created_at="ad.created_at" :image="ad.image"/>
        </div>
      </div>
      <div v-else>Loading</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Icon from "~/components/Icon.vue";
import AdCard from "~/components/AdCard.vue";

const { categories, categoryLoading } = (await useCategories()) as any;
const { ads, adsLoading } = (await useSelectedAds()) as any;

onMounted(() => {
  console.log("Loading categories...");
});
watch(
  () => categoryLoading.value,
  (newVal) => {
    if (!newVal) {
      console.log("Categories fetched:", categories.value);
    }
  }
);
</script>
