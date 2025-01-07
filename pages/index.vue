<template>
  <div class="md:container mx-0 lg:mx-auto pt-5">
    <div class="flex gap-4 text-base w-full">
      <div
        class="hidden sm:flex flex-col justify-start gap-2 bg-color-2 px-3 pr-7 py-3 rounded-lg h-max w-auto"
      >
        <div
          class="flex gap-1 items-center border-color-1 border-b pb-2 cursor-pointer"
          :class="typeof selectedCategory =='string' && selectedCategory=='all' ? 'text-active' :''"
          @click="selectCategory('all')"
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
          :class="typeof selectedCategory =='object' && selectedCategory.id== category.id ?'text-active' :''"
          @click="selectCategory(category)"
        >
          <Icon :name="`ads-${category.slug}`" class="w-6" />
          {{ category.name }}
        </div>
      </div>
      <div v-if="ads.length > 0 && !adsLoading" class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="ad in ads">
          <AdCard
            :title="ad.title"
            :slug="ad.slug"
            :city="ad.location.city"
            :cost="ad.cost"
            :service_provider="ad.service_provider"
            :created_at="ad.created_at"
            :image="ad.image"
            :category="ad.category"
            :job_title="ad.job_title"
            :house_type="ad.house_type"
            :trainer_institute="ad.trainer_institute"
            :rent_lease_item="ad.rent_lease_item"
            :sub_category="ad.sub_category"
            :breed_species_type="ad.breed_species_type"
          />
        </div>
      </div>
      <div v-if="adsLoading" class="">Loading</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Icon from "~/components/Icon.vue";
import AdCard from "~/components/AdCard.vue";

const { categories, categoryLoading } = (await useCategories()) as any;
const { ads, adsLoading } = (await useSelectedAds());

const selectedCategory = ref<any>('all');

const { category, setCategory } = useSelectCategory();

const selectCategory = (newVal:any) => {
  
  selectedCategory.value = newVal;
};

onMounted(() => {
  console.log("Loading categories...");
});


watch(
  () => selectedCategory.value,
  (newVal) => {
    setCategory(newVal);
  }
);
</script>
