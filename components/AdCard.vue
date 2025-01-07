<template>
    <NuxtLink class="card" :to="`detail/${card_data.slug}`">
      <div class="card-image">
        <img :src="image" alt="Card Image" />
        <div class="service-provider">{{ card_data.service_provider }}</div>
        <div v-if="cost!==null" class="cost">${{ card_data.cost }}</div>
      </div>
      <div class="card-content">
        <h3 class="card-title">{{ card_data.title }}</h3>
        <div class="card-details">
          <p class="card-location">
            <Icon name="location" class="w-5"/> {{ card_data.city }}
          </p>
          <p class="card-date">
            <Icon name="calendar" class="w-5"/> {{ formattedDate }}
          </p>
        </div>
      </div>
    </NuxtLink>
  </template>
  
  <script lang="ts" setup>
  import Icon from './Icon.vue';

  const card_data = defineProps<{
    title: string;
    slug: string;
    service_provider: string;
    cost: number | null;
    city: string;
    created_at: string;
    image:string
  }>();
  

  const formattedDate = new Date(card_data.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  </script>
  
  <style scoped>
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
  
  /* Image Section */
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
    background: rgba(0, 0, 0,0.5);
    color: #fff;
    padding: 3px 6px;
    font-size: 12px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
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
    padding: 16px;
  }
  
  .card-title {
    margin: 0 0 8px;
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
    gap:3px
  }
  
  .card-location i,
  .card-date i {
    margin-right: 4px;
    font-size: 14px;
    color: #666;
  }

 
  

  </style>
  