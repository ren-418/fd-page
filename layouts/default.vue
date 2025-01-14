<template>
    <div>
        <AppHeader :model-value="someModelValue" />
        <div>
            <slot />
        </div>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue';
import Footer from '~/components/Footer.vue';
import { ref } from 'vue';

// Initialize someModelValue according to the expected type
const someModelValue = ref<Record<string, any>>({
    exampleKey: 'exampleValue'
});

</script>