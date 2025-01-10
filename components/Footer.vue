<template>
  <div>
    <Transition name="fade">
      <div>
        <div v-if="showOverlay && route.name === 'learn'"
          class="fixed inset-0 top-[57px] w-screen h-[calc(100vh-57px)] z-[1] overlay" @click="toggleOverlay">
          <Category v-model="currentCategory" @category-changed="handleCategoryChange"
            class="category-block overflow-y-scroll" />
        </div>
        <div class="flex flex-col gap-5 w-full h-full justify-start bg-white rounded-md self-start p-4">
          <p class="text-[24px]">
            {{ currentCategory.title }}
          </p>
          <div class="flex text-[14px] whitespace-pre-line text-[#64748b]">
            {{ categoryContent[currentCategory.id] || 'Content not available.' }}
          </div>
        </div>
      </div>
    </Transition>
    <div class="md:hidden">
      <div class="navbar shadow-lg  rounded-lg">
        <div class="nav-item text-color-1">
          <router-link class="nav-link flex flex-col justify-center items-center" to="/"
            :class="{ 'text-active': route.name === 'index' }">
            <Icon name="home" class="w-6" />
            <span class="nav-title">Home</span>
          </router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link flex flex-col justify-center items-center"
            :class="{ 'text-active': route.name === 'business' }" to="/business">
            <img src="../assets/images/briefcase.png" alt="" class="w-6" />
            <span class="nav-title">Business</span>
          </router-link>
        </div>
        <div class="nav-item">
          <span class="nav-link d-flex flex-column justify-content-between post-nav-link">
            <a href="javascript:;" class="btn-post">
              <slot>
                <span class="icon-post">
                  <Icon name="plus" class="text-white w-6" />
                </span>
                <Icon name="plus-square" class="post-icon" />
              </slot>
            </a>
            <span class="nav-title mt-1">Add Post</span>
          </span>
        </div>
        <div class="nav-item">
          <button v-if="route.name === 'learn'" class="nav-link flex flex-col justify-center items-center text-active"
            @click="toggleOverlay">
            <Icon name="learn" class="w-6" />
            <span class="nav-title">Learn</span>
          </button>

          <!-- If we're not on learn page, show router-link -->
          <router-link v-else to="/learn" class="nav-link flex flex-col justify-center items-center"
            :class="{ 'text-active': route.name === 'learn' }">
            <Icon name="learn" class="w-6" />
            <span class="nav-title">Learn</span>
          </router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link more flex flex-col justify-center items-center"
            :class="{ 'text-active': route.name === 'login' }" to="/login">
            <Icon name="user-plus" class="w-6" />
            <span class="nav-title">Login</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import Category from "./Category.vue";
import Icon from "./Icon.vue";

const router = useRouter();
const route = useRoute();

const showOverlay = ref(false);

const toggleOverlay = () => {
  showOverlay.value = !showOverlay.value;
};

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

const handleCategoryChange = (category: CategoryType) => {
  currentCategory.value = category;
};
// Use Vue Router and Vuex
interface CategoryType {
  id: string;
  title: string;
  icon: string;
}

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

watch(
  () => route.name,
  (newRoute, oldRoute) => {
    // Reset when leaving learn page
    if (oldRoute === 'learn' && newRoute !== 'learn') {
      currentCategory.value = {
        id: '1',
        title: 'About',
        icon: 'user'
      };
      showOverlay.value = false;
    }
  }
);


</script>

<style lang="scss" scoped>
.category-block {
  display: flex !important;
  width: 100% !important;
  height: 100% !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

// Optional: Add backdrop blur effect
.overlay {
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.8); // More sophisticated black with transparency
}

/* Your existing styles */
.navbar {
  position: fixed;
  bottom: 0;
  z-index: 999;
  background-color: #ffffff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  width: 100%;
  margin-bottom: 0;
  border: 1px solid #64748B;
  padding: 0;
  display: flex;

  .nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex: 1;

    .nav-link {
      text-align: center;
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 4px;

      svg {
        display: block;
        margin: auto;
        font-size: 24px;
      }

      .icon-post {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        background: linear-gradient(152.53deg, #008080 12.66%, #008080 91.02%);
        display: flex;
        align-items: center;
        justify-content: center;
        border-style: solid;
        border-width: 4px;
      }

      &.more {
        img {
          width: 32px;
          height: 30px;
        }
      }

      &.active {

        &>span,
        &>svg {
          color: #ff22a1;
        }
      }
    }

    .post-nav-link {
      padding-top: 0;

      :deep(.btn-post) {
        background: none;
        padding: 0 !important;
        display: block;
        width: 70px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: -30px;
      }
    }
  }
}
</style>
