<template>
  <div class="upload-container border-2 border-dashed border-[#008080] rounded-lg p-4 mx-[20px] bg-purple-50">
    <!-- Make this div clickable -->
    <div class="empty-state flex flex-col items-center justify-center text-center py-4 cursor-pointer"
      @click="triggerFileInput">
      <p class="text-[#008080] text-2xl">⬆</p>
      <p class="text-gray-500 font-medium">Click here to upload image</p>
      <p class="text-sm text-gray-400">Max {{ remainingImages }} images allowed</p>
    </div>

    <div v-if="props.imageData && props.imageData.length > 0"
      class="uploaded-images w-full flex justify-center flex-wrap gap-4 ">
      <div v-for="(image, index) in props.imageData" :key="index"
        class="relative w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
        <img :src="image.src_url" class="w-full h-full object-cover" />
        <div class="absolute top-1 right-1 bg-white cursor-pointer text-[#008080] p-1 rounded-full shadow-md"
          @click="removeImage(index)">
          <Icon name="trash" class="w-5 h-5" />
        </div>
      </div>
    </div>

    <label for="fileInput" class="upload-label mt-4 flex flex-col items-center cursor-pointer">
      <input id="fileInput" type="file" multiple accept="image/*" class="hidden" @change="handleFileChange"
        ref="fileInputRef" />
    </label>
    <div class="absolute top-0 left-0 z-10 flex justify-center items-center w-full h-full bg-[#fff]"
      v-if="form.progress && uploadingImage">
      <div id="wifi-loader">
        <svg class="circle-outer" viewBox="0 0 86 86">
          <circle class="back" cx="43" cy="43" r="40"></circle>
          <circle class="front" cx="43" cy="43" r="40"></circle>
          <circle class="new" cx="43" cy="43" r="40"></circle>
        </svg>
        <svg class="circle-middle" viewBox="0 0 60 60">
          <circle class="back" cx="30" cy="30" r="27"></circle>
          <circle class="front" cx="30" cy="30" r="27"></circle>
        </svg>
        <svg class="circle-inner" viewBox="0 0 34 34">
          <circle class="back" cx="17" cy="17" r="14"></circle>
          <circle class="front" cx="17" cy="17" r="14"></circle>
        </svg>
        <div class="text" data-text="Loading"></div>
      </div>
    </div>
  </div>

</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import Icon from '../Icon.vue';

const maxImages = 30;
const images = ref<{ url: string; file: File }[]>([]);
const form = ref({ progress: null as { percentage: number } | null });
const uploadingImage = ref(false);
const fileInputRef = ref<HTMLInputElement | null>(null); // Ref for the file input

const props = defineProps<{
  imageData: Array<any> | null;
}>();

const { $swal } = useNuxtApp()

const imageData = ref<Array<any> | null>(props.imageData);

const emit = defineEmits<{
  (event: 'imageData', data: { imageData: Array<any> | null }): void;
  (event: 'updateFormImages', images: Array<any>): void;
}>();

const remainingImages = computed(() => maxImages - (props.imageData?.length ?? 0));

watch([imageData], ([newImageData]) => {
  emit('imageData', {
    imageData: newImageData,
  });
});

const handleFileChange = async (event: Event) => {
  if (remainingImages.value <= 0) {
    $swal.fire({
      text: 'Maximum number of images reached.',
      icon: 'warning'
    })
    return;
  }

  if (uploadingImage.value) {
    $swal.fire({
      text: 'Please wait until the current image upload completes.',
      icon: 'warning'
    })
    return;
  }

  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files) {
    const filesToUpload = Array.from(files).slice(0, remainingImages.value);
    filesToUpload.forEach((file) => {
      const url = URL.createObjectURL(file);
      images.value.push({ url, file });
      uploadImage({ url, file });
    });
    target.value = '';
  }
};

const triggerFileInput = () => {
  if (fileInputRef.value && !uploadingImage.value) {
    fileInputRef.value.click();
  }
};


const uploadImage = async (image: { url: string; file: File }) => {
  try {
    const formData = new FormData();
    formData.append("image", image.file);
    uploadingImage.value = true; // Set uploading state

    const response = await axios.post(
      `${import.meta.env.VITE_ADS_API_URL}/post/upload_image`,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            form.value!.progress = {
              percentage: Math.round((progressEvent.loaded * 100) / progressEvent.total),
            };
          }
        },
      }
    );

    if (response.data.status !== "Success") {
      throw new Error("Image upload failed");
    }
    console.log(response.data.data, ":: response data");
    imageData.value = response.data.data;
  } catch (error) {
    console.error("Image upload error:", error);
  } finally {
    uploadingImage.value = false;
    form.value!.progress = null;
  }
};

const removeImage = async (index: number) => {
  try {
    if (!props.imageData || !props.imageData[index]) {
      throw new Error('No image data available');
    }

    // Set loading state
    uploadingImage.value = true;
    form.value.progress = { percentage: 0 };

    const imageId = props.imageData[index].id;

    const response = await axios.delete(`${import.meta.env.VITE_ADS_API_URL}/post/image/delete/${imageId}`);
    console.log('Delete response:', response);

    const newImageData = props.imageData.filter((_, i) => i !== index);

    emit('imageData', { imageData: newImageData });
    emit('updateFormImages', newImageData);
    $swal.fire({
      text: 'Deleted image successfully',
      icon: 'success'
    });

  } catch (error) {
    console.error('Error removing image:', error);
    $swal.fire({
      text: 'Failed to remove image',
      icon: 'error'
    });
  } finally {
    uploadingImage.value = false;
    form.value!.progress = null;
  }
};
</script>



<style scoped>
.upload-container {
  position: relative;
  min-height: 200px;
}

.empty-state {
  border: 2px dashed #008080;
  border-radius: 12px;
  margin-bottom: 10px;
}

.uploaded-images img {
  object-fit: cover;
  border-radius: 8px;
}

.progress {
  width: 100%;
  background-color: #e6e6e6;
}

.progress-bar {
  height: 8px;
  background-color: #008080;
}

#wifi-loader {
  --background: #62abff;
  --front-color: #008080;
  --back-color: #c3c8de;
  --text-color: #414856;
  width: 64px;
  height: 64px;
  border-radius: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

#wifi-loader svg {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

#wifi-loader svg circle {
  position: absolute;
  fill: none;
  stroke-width: 6px;
  stroke-linecap: round;
  stroke-linejoin: round;
  transform: rotate(-100deg);
  transform-origin: center;
}

#wifi-loader svg circle.back {
  stroke: var(--back-color);
}

#wifi-loader svg circle.front {
  stroke: var(--front-color);
}

#wifi-loader svg.circle-outer {
  height: 86px;
  width: 86px;
}

#wifi-loader svg.circle-outer circle {
  stroke-dasharray: 62.75 188.25;
}

#wifi-loader svg.circle-outer circle.back {
  animation: circle-outer135 1.8s ease infinite 0.3s;
}

#wifi-loader svg.circle-outer circle.front {
  animation: circle-outer135 1.8s ease infinite 0.15s;
}

#wifi-loader svg.circle-middle {
  height: 60px;
  width: 60px;
}

#wifi-loader svg.circle-middle circle {
  stroke-dasharray: 42.5 127.5;
}

#wifi-loader svg.circle-middle circle.back {
  animation: circle-middle6123 1.8s ease infinite 0.25s;
}

#wifi-loader svg.circle-middle circle.front {
  animation: circle-middle6123 1.8s ease infinite 0.1s;
}

#wifi-loader svg.circle-inner {
  height: 34px;
  width: 34px;
}

#wifi-loader svg.circle-inner circle {
  stroke-dasharray: 22 66;
}

#wifi-loader svg.circle-inner circle.back {
  animation: circle-inner162 1.8s ease infinite 0.2s;
}

#wifi-loader svg.circle-inner circle.front {
  animation: circle-inner162 1.8s ease infinite 0.05s;
}

#wifi-loader .text {
  position: absolute;
  bottom: -40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: lowercase;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.2px;
}

#wifi-loader .text::before,
#wifi-loader .text::after {
  content: attr(data-text);
}

#wifi-loader .text::before {
  color: var(--text-color);
}

#wifi-loader .text::after {
  color: var(--front-color);
  animation: text-animation76 3.6s ease infinite;
  position: absolute;
  left: 0;
}

@keyframes circle-outer135 {
  0% {
    stroke-dashoffset: 25;
  }

  25% {
    stroke-dashoffset: 0;
  }

  65% {
    stroke-dashoffset: 301;
  }

  80% {
    stroke-dashoffset: 276;
  }

  100% {
    stroke-dashoffset: 276;
  }
}

@keyframes circle-middle6123 {
  0% {
    stroke-dashoffset: 17;
  }

  25% {
    stroke-dashoffset: 0;
  }

  65% {
    stroke-dashoffset: 204;
  }

  80% {
    stroke-dashoffset: 187;
  }

  100% {
    stroke-dashoffset: 187;
  }
}

@keyframes circle-inner162 {
  0% {
    stroke-dashoffset: 9;
  }

  25% {
    stroke-dashoffset: 0;
  }

  65% {
    stroke-dashoffset: 106;
  }

  80% {
    stroke-dashoffset: 97;
  }

  100% {
    stroke-dashoffset: 97;
  }
}

@keyframes text-animation76 {
  0% {
    clip-path: inset(0 100% 0 0);
  }

  50% {
    clip-path: inset(0);
  }

  100% {
    clip-path: inset(0 0 0 100%);
  }
}
</style>
