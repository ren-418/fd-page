<template>
    <div class="flex w-full">
        <div class="flex flex-col w-full justify-center items-center gap-10">
            <div class="flex flex-col w-full justify-center items-center">
                <p class="text-lg pb-8">Post in(Required)</p>
                <div class="flex flex-col w-full px-[100px]">
                    <div class="flex flex-wrap w-full gap-5">
                        <div v-for="category in categories" :key="category.id"
                            class="flex flex-col justify-center rounded-md items-center border-color-1 px-5 py-3 cursor-pointer border"
                            :class="{
                                'btn-active':
                                    typeof selectedCategory == 'object' &&
                                    selectedCategory.id == category.id,
                            }" @click="selectCategory(category)">
                            <Icon :name="`ads-${category.slug}`" class="w-6" />
                            {{ category.name }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-full justify-center items-center">
                <p class="text-lg pb-2">Post in(Required)</p>
                <p class="text-md pb-8 text-[#008080]">(*If no category is applicable, select NEXT)</p>
                <div class="flex flex-grow items-start justify-start gap-4">
                    <div class="flex border border-color-1 py-2 px-4 rounded-md cursor-pointer"
                        :class="{ 'btn-active': selectedCategory === 'Cell Phones/Mobiles' }"
                        @click="selectCategory('Cell Phones/Mobiles')">
                        Cell Phones/Mobiles
                    </div>
                    <div class="flex border border-color-1 py-2 px-4 rounded-md cursor-pointer"
                        :class="{ 'btn-active': selectedCategory === 'Arts/Crafts/Handpicks' }"
                        @click="selectCategory('Arts/Crafts/Handpicks')">
                        Arts/Crafts/Handpicks
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const { categories, categoryLoading } = (await useCategories()) as any;
const selectedCategory = ref<any>('')
const selectCategory = (category: string): void => {
    selectedCategory.value = category
}

</script>

<style lang="scss" scoped></style>