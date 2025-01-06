<template>
  <div class="header shadow-lg">
    <div class="container mx-0 lg:mx-auto pt-3 pb-3">
      <div class="flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl logo">Logo</NuxtLink>
        <div class="flex items-center gap-8">
          <div class="hidden md:flex items-center gap-8">
            <div class="flex items-center gap-1.5">
              <img src="../assets/images/arrow_down.png" alt="" width="16" />
              <span class="text-base">Learn</span>
              
            </div>
            <div class="flex items-center gap-1.5">
              <img src="../assets/images/briefcase.png" alt="" width="16" />
              <span class="text-base">Business</span>
              
            </div>
            <button class="btn btn-active">+ POST AD</button>
          </div>
          <div class="hidden md:flex items-center gap-1">
            <NuxtLink to="login"
              class="cursor-pointer"
              :class="routeName == 'login' && 'text-active'"
              >Login
            </NuxtLink>
            <span> | </span>
            <NuxtLink
            to="register"
              class="cursor-pointer"
              :class="routeName == 'register' && 'text-active'"
              >Sign Up</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const routeName = computed(() => route.name);
</script>
<style lang="scss" scoped>
@use "../assets/styles/vars";

.logo {
  color: vars.$text-color-2;
}
.header {
  background-color: #ffffff;
}
</style>
