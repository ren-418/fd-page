<template>
  <div class="md:hidden">
    <div class="navbar shadow-lg  rounded-lg">
      <div class="nav-item text-color-1">
        <NuxtLink
          class="nav-link flex flex-col justify-center items-center"
          href="javascript:;"
          to="/"
        >
          <Icon
            name="home"
            
            class="w-6"
          />
          <span class="nav-title">Home</span>
        </NuxtLink>
      </div>
      <div class="nav-item">
        <NuxtLink
          class="nav-link flex flex-col justify-center items-center"
          :class="{ active: route.name === 'ads' }"
          href="javascript:;"
          to="/business"
        >
          <img src="../assets/images/briefcase.png" alt="" class="w-6" />
          <span class="nav-title">Business</span>
        </NuxtLink>
      </div>
      <div class="nav-item">
        <span
          class="nav-link d-flex flex-column justify-content-between post-nav-link"
        >
          <a
            href="javascript:;"
            class="btn-post"
          >
            <slot>
              <span class="icon-post">
                <Icon name="plus" class="text-white w-6"/>
              </span>
              <Icon name="plus-square" class="post-icon" />
            </slot>
          </a>
          <span class="nav-title mt-1">Add Post</span>
        </span>
      </div>
      <div class="nav-item" to="/learn">
        <NuxtLink
          href="javascript:;"
          class="nav-link flex flex-col justify-center items-center"
          :class="{ active: route.name === 'topic' }"
        >
          <Icon name="learn" class="w-6" />
          <span class="nav-title">Learn</span>
        </NuxtLink>
      </div>
      <div class="nav-item">
        <NuxtLink
          class="nav-link more flex flex-col justify-center items-center"
          :class="{ active: route.name === 'more' }"
          href="javascript:;"
          to="/login"
        >
          <Icon name="user-plus" class="w-6" :class="{ 'text-active': route.name === 'login' }" />
          <span class="nav-title" :class="{ 'text-active': route.name === 'login' }">Login</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import Icon from "./Icon.vue";

// Use Vue Router and Vuex
const router = useRouter();
const route = useRoute();
</script>

<style lang="scss" scoped>
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
        & > span,
        & > svg {
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
