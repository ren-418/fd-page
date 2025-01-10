<template>
    <div class="md:container mx-0 lg:mx-auto pt-5">
        <div class="flex flex-row gap-4 text-base w-full">
            <Category v-model="currentCategory" @category-changed="handleCategoryChange" />
            <div class="hidden md:flex flex-col gap-5 w-full h-full justify-start bg-white rounded-md self-start p-4">
                <Transition name="fade" mode="out-in">
                    <div :key="currentCategory.id">
                        <p class="text-[24px]">
                            {{ currentCategory.title }}
                        </p>
                        <div class="flex text-[14px] whitespace-pre-line text-[#64748b] mt-5">
                            {{ categoryContent[currentCategory.id] || 'Content not available.' }}
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Category from "~/components/Category.vue";
import { useRoute } from 'vue-router';

const route = useRoute();

definePageMeta({
  middleware:['auth'],
  requiresAuth: 'low'
});

interface CategoryType {
    id: string;
    title: string;
    icon: string;
}

const categories: CategoryType[] = [
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

const currentCategory = ref<CategoryType>(categories[0]);

interface CategoryContentType {
    [key: string]: string;
}

const categoryContent: CategoryContentType = {
    '1': `About FlickerPage:
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur id repudiandae quam
    deleniti aspernatur, accusantium temporibus accusamus cum.`,

    '2': `Services & Features:
    Our platform offers various services including content creation, sharing, and community engagement.
    Key features include user profiles, messaging, and content management.`,

    '3': `Platform Terms:
    Detailed information about our platform terms and conditions.`,

    '4': `Safety Guide:
    Important safety guidelines and best practices for using our platform.`,

    '5': `You & FlickerPage:
    Learn about how to make the most of your FlickerPage experience.`,

    '6': `Terms of Use:
    Detailed terms of use and user agreements.`,

    '7': `Privacy & Security Policy:
    Information about how we protect your data and ensure platform security.`,

    '8': `Data Policy:
    Details about data collection, usage, and storage practices.`,

    '9': `Cookies:
    Information about how we use cookies and similar technologies.`,

    '10': `Payments and Refunds:
    Details about our payment processes and refund policies.`,

    '11': `Platform Guarantee:
    Information about our platform guarantees and commitments.`,

    '12': `Our Platform & Funding:
    Details about our platform's infrastructure and funding model.`,

    '13': `What is Prohibited?:
    Clear guidelines about prohibited content and behavior.`,

    '14': `Avoid Scams:
    Tips and guidelines to help you avoid scams and fraud.`,

    '15': `Posting Tips:
    Best practices for creating and sharing content.`,

    '16': `Report:
    How to report issues and concerns on the platform.`,

    '17': `FAQs:
    Frequently asked questions and their answers.`,

    '18': `Contact Us:
    Ways to get in touch with our support team.`,

    '19': `Careers:
    Information about career opportunities at FlickerPage.`
};

const handleCategoryChange = (category: CategoryType) => {
    currentCategory.value = category;
};

watch(
    () => route.query.category,
    (newCategoryId) => {
        if (newCategoryId) {
            const category = categories.find(c => c.id === newCategoryId);
            if (category) {
                currentCategory.value = category;
            }
        }
    },
    { immediate: true }
);

onMounted(() => {
    const categoryId = route.query.category as string;
    if (categoryId) {
        const category = categories.find(c => c.id === categoryId);
        if (category) {
            currentCategory.value = category;
        }
    }
});

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>