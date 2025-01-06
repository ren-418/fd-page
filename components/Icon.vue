<template>
    <div v-html="iconComponent" class="flex items-center"  @click="$emit('click', $event)" />
  </template>
  
  <script setup lang="ts">
  import { shallowRef, onMounted, watch } from 'vue';
  
  const props = defineProps<{
    name: string;
  }>();
  
  const iconComponent = shallowRef<null | any>(null);
  
  const loadIcon = async (iconName: string) => {
    try {
      console.log("Loading icon:", iconName);
      const module = await import(`../assets/images/icons/${iconName}.svg?raw`);
      iconComponent.value = module.default;
    } catch (error) {
      console.error(`Error loading icon: ${iconName}`, error);
      iconComponent.value = null;
    }
  };
  
  onMounted(() => {
    loadIcon(props.name);
  });
  
  watch(() => props.name, (newName) => {
    loadIcon(newName);
  });
  </script>
  
  <style lang="scss" scoped>
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  
  svg {
    height: 1em;
    width: auto;
    display: inline-block;
  
    :deep(path),
    :deep(rect) {
      &.icon-stroke-none {
        stroke: none;
      }
  
      &.icon-fill-none {
        fill: none;
      }
  
      &.icon-stroke {
        stroke: #64748B;
      }
  
      &.icon-fill {
        fill: #64748B;
      }
    }
  
    :deep(.rotating) {
      animation: rotate 10s linear infinite;
      transform-origin: center center;
    }
  }
  
  [data-theme='dark'] {
    svg {
      :deep(path) {
        .icon-stroke {
          stroke: #8598B2;
        }
  
        .icon-fill {
          fill: #8598B2;
        }
      }
    }
  }
  </style>
  