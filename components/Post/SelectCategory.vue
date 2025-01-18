<template>
    <div class="flex w-full">
        <div class="flex flex-col w-full justify-center items-center gap-10">
            <div class="flex flex-col w-full justify-center items-center p-0 bg-transparent md:bg-white md:p-5">
                <p class="text-lg pb-8">Post in(Required)</p>
                <div class="flex flex-col w-full px-[20px]">
                    <div class="flex flex-row overflow-x-auto w-full gap-3 sm:flex-wrap sm:overflow-x-hidden">
                        <div v-for="category in categories" :key="category.id"
                            class="flex flex-col justify-center rounded-md items-center border-color-1 px-5 py-3 cursor-pointer border w-auto"
                            :class="{
                                'bg-[#008080] text-white': props.currentCategory?.id === category.id,
                            }" @click="toggleCategorySelection(category)">
                            <Icon :name="`ads-${category.slug}`" class="w-6" />
                            <p class="min-w-[60px] text-center">{{ category.name }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col w-full justify-center p-0 items-center bg-transparent md:bg-white md:p-5">
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
        props.updateCategory(null);
        subCategories.value = [];
    } else {
        props.updateCategory(category);
        getSubCategories(category.id);
    }
};

const toggleSubCategorySelection = (subCategory: SubCategory) => {
    if (props.currentSubcategory?.id === subCategory.id) {
        props.updateSubCategory(null);
    } else {
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
