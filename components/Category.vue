<template>
    <div class="hidden md:flex flex-col justify-start gap-1 bg-color-2 pt-5 px-3 rounded-lg h-max w-[255px]">
        <!-- Add v-model binding to sync with parent component -->
        <div v-for="category in categories" :key="category.id"
            class="flex gap-1 items-center border-color-1 py-[5px] cursor-pointer border-b" :class="{
                'text-active': modelValue?.id === category.id
            }" @click="selectCategory(category)">
            <Icon :name="category.icon" class="w-6" />
            <p class='text-[14px]'>
                {{ category.title }}
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Icon from "~/components/Icon.vue";
import { useRouter } from 'vue-router';

const router = useRouter(); // Add this
const emit = defineEmits(['categoryChanged', 'update:modelValue']);
const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    }
});
const selectCategory = (newVal: any) => {
    emit('update:modelValue', newVal);
    emit('categoryChanged', newVal);
    router.push({
        path: '/learn',
        query: { category: newVal.id }
    });
};

const categories = [
    {
        id: '1',
        title: 'About',
        icon: 'user'
    },
    {
        id: '2',
        title: 'Services & Features',
        icon: 'user'
    },
    {
        id: '3',
        title: 'Platform Terms',
        icon: 'user'
    },
    {
        id: '4',
        title: 'Safety Guid',
        icon: 'user'
    },
    {
        id: '5',
        title: 'You & FlickerPage',
        icon: 'user'
    },
    {
        id: '6',
        title: 'Terms Of Use',
        icon: 'user'
    },
    {
        id: '7',
        title: 'Privacy & Security Policy',
        icon: 'user'
    },
    {
        id: '8',
        title: 'Data Policy',
        icon: 'user'
    },
    {
        id: '9',
        title: 'Cookies',
        icon: 'user'
    },
    {
        id: '10',
        title: 'Payments and Refunds',
        icon: 'user'
    },
    {
        id: '11',
        title: 'Platform Gaurantee',
        icon: 'user'
    },
    {
        id: '12',
        title: 'Our Platform & Funding',
        icon: 'user'
    }
    ,
    {
        id: '13',
        title: 'What is Prohibited?',
        icon: 'user'
    }
    ,
    {
        id: '14',
        title: 'Avoid Scams',
        icon: 'user'
    }
    ,
    {
        id: '15',
        title: 'Posting Tips',
        icon: 'user'
    }
    ,
    {
        id: '16',
        title: 'Report',
        icon: 'user'
    }
    ,
    {
        id: '17',
        title: 'FAQs',
        icon: 'user'
    }
    ,
    {
        id: '18',
        title: 'Contact Us',
        icon: 'user'
    }
    ,
    {
        id: '19',
        title: 'Careers',
        icon: 'user'
    }
];

const selectedCategory = ref(categories[0]);

</script>