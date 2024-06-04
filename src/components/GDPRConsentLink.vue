<script setup>
import { onMounted, ref } from 'vue';

const gdpr = ref(false);

onMounted(() => {
    if (window['nitroAds'] && window['nitroAds'].loaded) {
        gdpr.value = window['__tcfapi'] ? true : false;
    } else {
        document.addEventListener('nitroAds.loaded', () => {
            gdpr.value = window['__tcfapi'] ? true : false;
        });
    }
});
</script>

<template>
    <div v-show="gdpr" id="ncmp-consent-link"></div>
</template>
