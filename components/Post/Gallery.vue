<template>
  <div :class="props.imageData?.length !== 0 ? 'justify-start items-start' : 'justify-center items-center'"
    class="upload-container flex flex-wrap border-2 border-dashed border-[#008080] rounded-lg p-4 mx-[20px] bg-purple-50 gap-4 min-h-[300px]">
    <div v-if="props.imageData && props.imageData.length > 0" class="uploaded-images flex flex-wrap gap-4">
      <div v-for="(image, index) in props.imageData" :key="index"
        class="relative w-[140px] h-[140px] bg-gray-200 rounded-md overflow-hidden">
        <img :src="image.src_url" class="w-full h-full object-cover" />
        <div class="absolute top-1 right-1 bg-white cursor-pointer text-[#008080] p-1 rounded-full shadow-md"
          @click="removeImage(index)">
          <Icon name="trash" class="w-5 h-5" />
        </div>
      </div>
    </div>
    <div
      class="empty-state flex flex-col {{ props.imageData.length !== 0 ? 'justify-start items-start' : 'justify-center items-center' }} text-center py-4 cursor-pointer"
      @click="triggerFileInput">
      <template v-if="form.progress && uploadingImage">
        <p class="text-[#008080] text-2xl btn-loading flex h-[25px]"></p>
      </template>
      <template v-else>
        <p class="text-[#008080] text-2xl">⬆</p>
      </template>
      <p class="text-gray-500 font-medium text-base">Click here to upload image</p>
      <p class="text-sm text-gray-400">Allowed {{ remainingImages }} more images</p>
    </div>
    <label for="fileInput" class="upload-label mt-4 flex flex-col items-center cursor-pointer">
      <input id="fileInput" type="file" multiple accept="image/*" class="hidden" @change="handleFileChange"
        ref="fileInputRef" />
    </label>
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
const fileInputRef = ref<HTMLInputElement | null>(null);

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
}

.empty-state {
  margin-bottom: 10px;
  width: fit-content;
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
</style>
