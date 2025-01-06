<template>
    <div>
        <AppHeader/>
        <div>
            <slot/>
        </div>
        <Footer/>
    </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue';
import Footer from '~/components/Footer.vue';

</script>