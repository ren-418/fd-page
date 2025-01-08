<template>
  <div class="md:container mx-0 lg:mx-auto pt-5">
    <div class="flex gap-4 text-base w-full">
      <div class="flex flex-col gap-3">
        <div
          class="hidden sm:flex flex-col justify-start gap-2 bg-color-2 px-3 pr-10 py-3 border-color-1 border h-max w-auto"
        >
          <div
            class="flex gap-1 items-center border-color-1 pb-2 cursor-pointer border-b"
            :class="{
              'text-active':
                typeof selectedCategory == 'string' &&
                selectedCategory == 'all',
            }"
            @click="selectCategory('all')"
          >
            <Icon name="all_categories" class="w-6" />
            All Categories
          </div>
          <div
            class="flex gap-1 items-center border-color-1 pb-2 cursor-pointer border-b"
          >
            <Icon name="automotive" class="w-6" />
            Automotives
          </div>
          <div
            v-for="category in categories"
            :key="category.id"
            class="flex gap-1 items-center border-color-1 pb-2 cursor-pointer border-b"
            :class="{
              'text-active':
                typeof selectedCategory == 'object' &&
                selectedCategory.id == category.id,
            }"
            @click="selectCategory(category)"
          >
            <Icon :name="`ads-${category.slug}`" class="w-6" />
            {{ category.name }}
          </div>
        </div>
        <NuxtLink class="hidden sm:flex">
          <img :src="VerticalAdData.image" alt="" />
        </NuxtLink>
      </div>
      <div class="flex flex-col gap-5">
        <div
          class="grid grid-cols-2 xsm:grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 overflow-x-auto"
        >
          <div
            v-for="option in optionData"
            :key="option.title"
            style="font-size: 14px"
          >
            <Option :image="option.image" :title="option.title" />
          </div>
        </div>
        <div>
          <div class="flex flex-wrap">
            <template v-for="(ad, index) in ads" :key="`ad-${index}`">
              <div class="w-[50%] lg:w-[25%] md:lg:w-[50%]">
                <div class="p-2">
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
              <template v-if="isBannerPosition(index + 1)">
                <div class="w-full my-4 p-2">
                  <div
                    class="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1"
                  >
                    <div
                      v-for="(banner, bannerIndex) in getBannersForPosition(
                        index + 1
                      )"
                      :key="`banner-item-${index}-${bannerIndex}`"
                    >
                      <NuxtLink :to="banner.link">
                        <img
                          :src="banner.image"
                          alt="Banner"
                          class="w-full rounded-md"
                        />
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </template>
            </template>
          </div>
        </div>
        <div v-if="adsLoading" class="">Loading...</div>
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

const optionData = [
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

const selectedCategory = ref<any>("all");

const { category, setCategory } = useSelectCategory();

const selectCategory = (newVal: any) => {
  selectedCategory.value = newVal;
};

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
