<template>
  <!-- Main Upload Container -->
  <div class="upload-container border-2 border-dashed border-[#008080] rounded-lg p-4 bg-purple-50">
    <!-- If images are uploaded, show the preview grid -->
    <div v-if="images.length > 0" class="uploaded-images grid grid-cols-4 gap-4">
      <!-- Loop through images and display each one -->
      <div v-for="(image, index) in images" :key="index"
        class="relative w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
        <!-- Image Preview -->
        <img :src="image.url" alt="Uploaded image" class="w-full h-full object-cover" />
        <!-- Delete Button -->
        <button class="absolute top-1 right-1 bg-white text-red-500 p-1 rounded-full shadow-md"
          @click="removeImage(index)">
          🗑
        </button>
      </div>
    </div>

    <!-- If no images uploaded, show empty state -->
    <div v-else class="empty-state flex flex-col items-center justify-center text-center py-8">
      <p class="text-[#008080] text-2xl">⬆</p>
      <p class="text-gray-500 font-medium">Click here to upload image</p>
      <p class="text-sm text-gray-400">Max {{ maxImages }} images allowed</p>
    </div>

    <!-- Upload Input (hidden) -->
    <label for="fileInput" class="upload-label mt-4 flex flex-col items-center cursor-pointer">
      <input id="fileInput" type="file" multiple accept="image/*" class="hidden" @change="handleFileChange" />
    </label>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// Define the maximum number of images allowed
const maxImages = 30;

// Reactive array to store uploaded images (each image has a URL and the original file)
const images = ref<{ url: string; file: File }[]>([]);

// Handle file input change event
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement; // Get the input element
  const files = target.files; // Get the selected files

  if (files) {
    Array.from(files).forEach((file) => {
      // Ensure the max limit isn't exceeded
      if (images.value.length < maxImages) {
        const url = URL.createObjectURL(file); // Create a URL for the file (for preview)
        images.value.push({ url, file }); // Add the file and its preview URL to the reactive array
      }
    });
    target.value = ''; // Clear the input so the same file can be re-uploaded if needed
  }
};

// Remove an image from the array
const removeImage = (index: number) => {
  images.value.splice(index, 1); // Remove the image at the given index
};
</script>

<style scoped>
/* Main upload container styles */
.upload-container {
  position: relative;
  min-height: 200px;
}

/* Styling for the empty state */
.empty-state {
  min-height: 150px;
  border: 2px dashed #008080;
  border-radius: 12px;
}

/* Grid of uploaded images */
.uploaded-images img {
  object-fit: cover;
  /* Make sure images fit properly */
  border-radius: 8px;
}

/* Delete button styles */
button {
  font-size: 14px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #f87171;
  color: white;
}
</style>