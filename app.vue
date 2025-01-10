<template>
  <NuxtLayout>
    <!-- <Transition name="page" mode="out-in"> -->
      <NuxtPage />
    <!-- </Transition> -->
  </NuxtLayout>
  <NuxtLoadingIndicator />
</template>


<!-- <style lang="scss" scoped>

.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease-out;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style> -->