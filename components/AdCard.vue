<template>
  <NuxtLink class="card" :to="`detail/${card_data.slug}`">
    <div class="card-image">
      <img :src="image" alt="Card Image" />
      <div v-if="post_title !== null" class="service-provider">
        {{ post_title }}
      </div>
      <div v-if="cost !== null" class="cost">${{ card_data.cost }}</div>
    </div>
    <div class="flex flex-col justify-between h-screen p-2 md:p-3">
      <h3 class="card-title pb-0 md:mb-2">{{ card_data.title }}</h3>
      <div class="card-details flex-col md:flex md:flex-row md:justify-between">
        <div class="card-location">
          <Icon name="location" class="w-3" />
          <p class="text-[10px] sm:text-[14px]">{{ card_data.city }}</p>
        </div>
        <div class="card-date">
          <Icon name="calendar" class="w-3" />
          <p class="text-[10px] sm:text-[14px]">{{ formattedDate }}</p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import Icon from "./Icon.vue";

const card_data = defineProps<{
  title: string;
  slug: string;
  service_provider: string | null;
  cost: string | null;
  city: string | null;
  created_at: string;
  image: string;
  category: any | null;
  job_title: string | null;
  house_type: string | null;
  trainer_institute: string | null;
  rent_lease_item: string | null;
  sub_category: any;
  breed_species_type: string | null;
}>();

const post_title = computed(() => {

  if (!card_data.category) return null;
  if (card_data.category.name === "Jobs")
    return card_data.job_title ? card_data.job_title : "Local Jobs";

  if (card_data.category.name === "Services")
    return card_data.service_provider
      ? card_data.service_provider
      : "Local Services";

  if (card_data.category.name === "For Sale")
    return card_data.job_title ? card_data.job_title : "For Sale";

  if (card_data.category.name === "Accommodation")
    return card_data.house_type
      ? card_data.house_type.substring(0, 30)
      : "Accommodation";

  if (card_data.category.name === "Real Estate")
    return card_data.house_type ? card_data.house_type : "Real Estate";

  if (card_data.category.name === "Legal/Lawyers")
    return card_data.service_provider
      ? card_data.service_provider
      : "Legal/Lawyers";

  if (card_data.category.name === "Repairs")
    return card_data.service_provider ? card_data.service_provider : "Repairs";

  if (card_data.category.name === "Skilled Trades")
    return card_data.service_provider
      ? card_data.service_provider
      : "Skilled Trades";

  if (card_data.category.name === "Training/Lessons")
    return card_data.trainer_institute
      ? card_data.trainer_institute
      : "Training/Lessons";

  if (card_data.category.name === "Rent/Lease")
    return card_data.rent_lease_item
      ? card_data.rent_lease_item
      : "For Rent/Lease";

  if (card_data.category.name === "Community")
    return card_data.sub_category ? card_data.sub_category.name : "Community";

  if (
    card_data.category.name === "Pets" &&
    card_data.sub_category.name === "Pet Care"
  )
    return card_data.service_provider ? card_data.service_provider : "Pet Care";
  if (
    card_data.category.name === "Pets" &&
    card_data.sub_category.name === "Pet Adoption"
  )
    return card_data.breed_species_type
      ? card_data.breed_species_type
      : "Pet Adoption";
  if (
    card_data.category.name === "Pets" &&
    card_data.sub_category.name === "Pet Accessories"
  )
    return card_data.job_title ? card_data.job_title : "Pet Accessories";

  return card_data.sub_category
    ? card_data.sub_category.name
    : card_data.category.name;
});

const formattedDate = new Date(card_data.created_at).toLocaleDateString(
  "en-US",
  {
    month: "short",
    day: "numeric",
  }
);
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  height: 255px;
  background-color: #fff;
}

.card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.card-image {
  position: relative;
}

.card-image img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.service-provider {
  position: absolute;
  top: 0px;
  right: 8px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 3px 6px;
  font-size: 12px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 4px;
}

.cost {
  position: absolute;
  right: 15px;
  bottom: 5px;
  font-size: 12px;
  background-color: #007bff;
  padding: 2px 4px;
  border-radius: 5px;
  color: white;
}

.card-content {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: inherit;
}

.card-title {
  font-size: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-details {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
}

.card-location,
.card-date {
  display: flex;
  align-items: center;
  gap: 3px;
}

.card-location i,
.card-date i {
  margin-right: 4px;
  font-size: 14px;
  color: #666;
}
</style>
