<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
    delay: number;
    url: string;
}>();

const countdown = ref(props.delay / 1000);
const showDirectLink = ref(false);

const startDownload = () => {
    const link = document.createElement('a');
    link.href = props.url;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
        showDirectLink.value = true;
    }, 2000);
};

onMounted(() => {
    const interval = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value -= 1;
        } else {
            clearInterval(interval);
            startDownload();
        }
    }, 1000);

    const nitroAds = 'nitroAds' in window ? (window.nitroAds as any) : null;
    nitroAds.createAd('ntr-download-video', {
        format: 'video-nc',
        demo: import.meta.env.DEV,
        report: {
            enabled: true,
            icon: false,
            wording: 'Report Ad',
            position: 'top-right',
        },
    });
});
</script>

<template>
    <div>
        <h1 class="text-2xl text-center mb-4">Preparing your download...</h1>
        <div class="mb-4 aspect-video">
            <div id="ntr-download-video"></div>
        </div>
        <div class="text-lg text-center mt-4">
            <p v-if="countdown > 0">Your download will start in {{ countdown }} seconds...</p>
            <p v-else>Your download is starting...</p>
            <p v-if="showDirectLink">
                If your download doesn't start automatically, <a class="link link-primary link-hover" :href="props.url" download>click here to download</a>.
            </p>
        </div>
    </div>
</template>
