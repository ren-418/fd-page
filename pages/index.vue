<template>
  <div class="md:container mx-0 lg:mx-auto pt-5">
    <div class="flex gap-1 text-base w-full">
      <div
        class="flex flex-col justify-start gap-2 bg-color-2 p-3 w-52 rounded-lg"
      >
        <div class="flex gap-1 items-center border-color-1 border-b pb-2">
          <Icon name="all_categories" class="w-6" />
          All Categories
        </div>
        <div class="flex gap-1 items-center border-color-1 border-b pb-2">
          <Icon name="automotive" class="w-6" />
          Automotives
        </div>
        <div
          v-for="category in categories"
          :key="category.id"
          class="flex gap-1 items-center border-color-1 border-b pb-2"
        >
          <Icon :name="`ads-${category.slug}`" class="w-6" />
          {{ category.name }}
        </div>
      </div>
      <div class=""></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Icon from "~/components/Icon.vue";

const { categories, categoryLoading } = useCategories() as any;
const { ads, adsLoading } = useSelectedAds() as any;

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

// watch(
//   () => adsLoading.value,
//   (newVal) => {
//     if (!newVal) {
//       console.log("ads fetched:", ads.value);
//     }
//   }
// );
</script>
