<template>
    <div class="flex w-full">
        <div class="flex flex-col w-full justify-center items-center gap-10">
            <div class="flex flex-col w-full justify-center items-center">
                <p class="text-lg pb-8">Post in(Required)</p>
                <div class="flex flex-col w-full px-[20px] md:px-[100px]">
                    <div class="flex flex-wrap w-full gap-5">
                        <div v-for="category in categories" :key="category.id"
                            class="flex flex-col justify-center rounded-md items-center border-color-1 px-5 py-3 cursor-pointer border"
                            :class="{
                                'btn-active': props.currentCategory?.id === category.id,
                            }" @click="toggleCategorySelection(category)">
                            <Icon :name="`ads-${category.slug}`" class="w-6" />
                            {{ category.name }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Subcategories Section -->
            <div class="flex flex-col w-full justify-center items-center">
                <p class="text-lg pb-2">Post in(Required)</p>
                <p class="text-md pb-8 text-[#008080]">(*If no category is applicable, select NEXT)</p>
                <div v-if="props.currentCategory" class="flex flex-wrap w-full items-center justify-center gap-4">
                    <div v-for="subCategory in subCategories" :key="subCategory.id"
                        class="flex border border-color-1 py-2 px-4 rounded-md cursor-pointer"
                        :class="{ 'btn-active': props.currentSubcategory?.id === subCategory.id }"
                        @click="toggleSubCategorySelection(subCategory)">
                        {{ subCategory.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";

// Define emits
const emit = defineEmits<{
    (e: 'update:category', value: string | null): void;
    (e: 'update:subcategory', value: string | null): void;
}>();

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface SubCategory {
    id: number;
    name: string;
}

const subCategories = ref<SubCategory[]>([]);

const { categories, categoryLoading } = (await useCategories()) as any;


const props = defineProps<{
    currentCategory: Category | null;
    currentSubcategory: SubCategory | null;
    updateCategory: (category: Category | null) => void;
    updateSubCategory: (subCategory: SubCategory | null) => void;
}>();

const getSubCategories = async (category_id: number) => {
    const params = {
        category_id,
        country_code: '',
    };

    try {
        const { data } = await axios.post(`${import.meta.env.VITE_ADS_API_URL}/category/get_sub_categories`, params);
        subCategories.value = data.data;
    } catch (error) {
        console.error("Error fetching subcategories:", error);
    }
};

const toggleCategorySelection = (category: Category) => {
    if (props.currentCategory?.id === category.id) {
        // Deselect the current category
        props.updateCategory(null);
        subCategories.value = []; // Clear subcategories when category is deselected
    } else {
        // Select the new category
        props.updateCategory(category);
        getSubCategories(category.id);
    }
};

const toggleSubCategorySelection = (subCategory: SubCategory) => {
    if (props.currentSubcategory?.id === subCategory.id) {
        // Deselect the current subcategory
        props.updateSubCategory(null);
    } else {
        // Select the new subcategory
        props.updateSubCategory(subCategory);
    }
}

onMounted(() => {
    if (props.currentCategory?.id) {
        getSubCategories(props.currentCategory.id);
    }
});
</script>

<style lang="scss" scoped></style>
