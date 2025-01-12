<template>
    <!-- Main Upload Container -->
    <div class="upload-container border-2 border-dashed border-pink-500 rounded-lg p-4 bg-purple-50">
      <!-- If images exist (static example with placeholders) -->
      <div class="uploaded-images grid grid-cols-4 gap-4 mb-4">
        <!-- Static placeholder images -->
        <div
          v-for="index in 8"
          :key="index"
          class="relative w-24 h-24 bg-gray-200 rounded-md overflow-hidden"
        >
          <!-- Placeholder Image -->
          <div class="w-full h-full bg-gray-300"></div>
          <!-- Delete Button -->
          <button
            class="absolute top-1 right-1 bg-white text-red-500 p-1 rounded-full shadow-md"
          >
            🗑
          </button>
        </div>
      </div>
  
      <!-- Upload Button Area -->
      <div class="upload-button flex flex-col items-center justify-center text-center py-8">
        <p class="text-pink-500 text-2xl">⬆</p>
        <p class="text-gray-500 font-medium">Click here to upload image</p>
        <p class="text-sm text-gray-400">Max 30 images allowed</p>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  </script>
  
  <style scoped>
  /* Main container styling */
  .upload-container {
    position: relative;
    min-height: 300px;
  }
  
  /* Styling for image grid */
  .uploaded-images {
    margin-bottom: 16px;
  }
  
  /* Static image placeholders */
  .uploaded-images > div {
    position: relative;
    width: 6rem;
    height: 6rem;
    border-radius: 8px;
    background-color: #f3f4f6; /* Light gray background */
    overflow: hidden;
  }
  
  /* Delete button styling */
  button {
    font-size: 14px;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #f87171;
    color: white;
  }
  </style>
  