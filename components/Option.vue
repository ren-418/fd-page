<template>
    <NuxtLink class="flex flex-col items-center" to="/">
        <img :src="props.image" alt=""/>
        <div>{{ props.title }}</div>
    </NuxtLink>
</template>

<script lang="ts" setup>

const props = defineProps<{
    image:string,
    title:string;
}>()

</script>