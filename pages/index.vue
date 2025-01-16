<template>
  <div class="md:container mx-0 lg:mx-auto pt-5">
    <div class="flex gap-0 text-base w-full sm:gap-4">
      <div class="flex flex-col gap-3">
        <div
          class="hidden md:flex flex-col justify-start gap-2 bg-color-2 px-3 pr-10 py-3 border-color-1 border h-max w-auto">
          <div class="flex gap-1 items-center border-color-1 pb-2 cursor-pointer border-b" :class="{
            'text-active':
              typeof selectedCategory == 'string' &&
              selectedCategory == 'all',
          }" @click="selectCategory('all')">
            <Icon name="all_categories" class="w-6" />
            All Categories
          </div>
          <div class="flex gap-1 items-center border-color-1 pb-2 cursor-pointer border-b"
            :class="{ 'text-active': selectedCategory === 'automotive' }" @click="selectCategory('automotive')">
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
        <router-link to="#" class="hidden md:flex">
          <img :src="VerticalAdData.image" alt="" />
        </router-link>
      </div>
      <div class="flex flex-col gap-5 w-full overflow-hidden">
        <div class="w-full flex ucarousel-inteface">
          <UCarousel v-slot="{ item, index }" :items="items" :ui="{ item: 'snap-start' }" class="w-full px-5">
            <router-link to="#" class="router-link-active router-link-exact-active flex flex-col items-center px-2 min-w-[100px]">
              <img :src="item.image" :alt="item.title || 'Item image'" />
              <p class="text-[13px] text-center">{{ item.title }}</p>
            </router-link>
          </UCarousel>
        </div>
       
        <div class="flex w-full" v-if="selectedCategory === 'automotive'">
          <UCarousel v-slot="{ item }" :items="ads_item" :ui="{ item: 'snap-start' }"
            class="w-full px-5 gap-3 ucarousel-surface">
            <p class="flex w-auto text-[13px] border-color-1 min-h-[38px] text-center justify-center items-center border rounded-2xl px-4 cursor-pointer"
              :class="{ 'btn-active': selectedItem === item.title }" @click="selectItem(item.title)">
              {{ item.title }}
            </p>
          </UCarousel>
        </div>

        <div class="flex flex-wrap">
          <template v-for="(ad, index) in ads" :key="`ad-${index}`">
            <div class="w-[50%] lg:w-[25%] md:lg:w-[50%]">
              <div class="p-2">
                <AdCard :title="ad.title" :slug="ad.slug" :city="ad.location.city" :cost="ad.cost"
                  :service_provider="ad.service_provider" :created_at="ad.created_at" :image="ad.image"
                  :category="ad.category" :job_title="ad.job_title" :house_type="ad.house_type"
                  :trainer_institute="ad.trainer_institute" :rent_lease_item="ad.rent_lease_item"
                  :sub_category="ad.sub_category" :breed_species_type="ad.breed_species_type" />
              </div>
            </div>

            <template v-if="isBannerPosition(index + 1)">
              <div class="w-full my-4 p-2">
                <div class="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                  <div v-for="(banner, bannerIndex) in getBannersForPosition(
                    index + 1
                  )" :key="`banner-item-${index}-${bannerIndex}`">
                    <router-link :to="banner.link">
                      <img :src="banner.image" alt="Banner" class="w-full rounded-md" />
                    </router-link>
                  </div>
                </div>
              </div>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Icon from "~/components/Icon.vue";
import AdCard from "~/components/AdCard.vue";
import Option from "~/components/Option.vue";
import VerticalAd from "~/assets/images/Rectangle 3.png";
import Rectangle4 from "~/assets/images/Rectangle 4.png";
import Rectangle5 from "~/assets/images/Rectangle 5.png";
import Rectangle6 from "~/assets/images/Rectangle 6.png";
import Rectangle7 from "~/assets/images/Rectangle 7.png";
import Rectangle8 from "~/assets/images/Rectangle 8.png";
import Rectangle9 from "~/assets/images/Rectangle 9.png";
import Rectangle10 from "~/assets/images/Rectangle 10.png";
import Rectangle11 from "~/assets/images/Rectangle 11.png";
import HorizonAd from "~/assets/images/Rectangle 16.png";


const screenWidth = ref<number | null>(null);

interface AdItem {
  title: string;
  // add other properties if they exist
}

const ads_item = [
  {
    title: "All",
  },
  {
    title: "New/Used Parts",
  },
  {
    title: "ATV/UTV",
  },
  {
    title: "2-Wheels/Bicycles",
  },
  {
    title: "Boats/Streamers",
  },
  {
    title: "Cars/Trucks/SUV",
  },
  {
    title: "Electric Vehicles/Inventions",
  },
  {
    title: "Motorbikes/Scooters",
  },
  {
    title: "RV/Campers/Trailers",
  },
];

const selectedItem = ref(ads_item[0]?.title || '') // Set first item as default

// Add this method
const selectItem = (title: string): void => {
  selectedItem.value = title
}

onMounted(() => {
  screenWidth.value = window.innerWidth;
});

const adsThreshold = computed(() =>
  screenWidth.value && screenWidth.value >= 1024 ? 12 : 8
);

const bannerCount = computed(() => {
  if (screenWidth.value && screenWidth.value <= 640) {
    return 1;
  } else if (screenWidth.value && screenWidth.value <= 850) {
    return 2;
  } else {
    return 3;
  }
});

const items = [
  {
    image: Rectangle4,
    title: "Contractors",
  },
  {
    image: Rectangle5,
    title: "Realtors",
  },
  {
    image: Rectangle6,
    title: "Recruiters",
  },
  {
    image: Rectangle7,
    title: "Legal Adocay",
  },
  {
    image: Rectangle8,
    title: "Renters",
  },
  {
    image: Rectangle9,
    title: "Auto Dealers",
  },
  {
    image: Rectangle10,
    title: "Trainers",
  },
  {
    image: Rectangle11,
    title: "Service Providers",
  },
];

definePageMeta({
  middleware: ['auth'],
  requiresAuth: 'low'
})

const VerticalAdData = {
  link: "",
  image: VerticalAd,
};

const HorizonAdData = [
  {
    link: "",
    image: HorizonAd,
  },
  {
    link: "",
    image: HorizonAd,
  },
  {
    link: "",
    image: HorizonAd,
  },

  {
    link: "",
    image: HorizonAd,
  },
  {
    link: "",
    image: HorizonAd,
  },
  {
    link: "",
    image: HorizonAd,
  },
  {
    link: "",
    image: HorizonAd,
  },
  {
    link: "",
    image: HorizonAd,
  },
  {
    link: "",
    image: HorizonAd,
  },
  {
    link: "",
    image: HorizonAd,
  },
  {
    link: "",
    image: HorizonAd,
  },
  {
    link: "",
    image: HorizonAd,
  },
];

const { categories, categoryLoading } = (await useCategories()) as any;
const { ads, adsLoading } = await useSelectedAds();

const selectedCategory = ref<any>('')

const selectCategory = (category: string): void => {
  selectedCategory.value = category
}

const { category, setCategory } = useSelectCategory();

const isBannerPosition = (index: number): boolean => {
  return index % adsThreshold.value === 0;
};

const getBannersForPosition = (index: number): Array<any> => {
  const bannerStartIndex =
    Math.floor(index / adsThreshold.value - 1) * bannerCount.value;
  return HorizonAdData.slice(
    bannerStartIndex,
    bannerStartIndex + bannerCount.value
  );
};

const {user} = useUserData();

onMounted(() => {
  console.log("user Data :::", user.value)
});

watch(
  () => selectedCategory.value,
  (newVal) => {
    setCategory(newVal);
  }
);
</script>
