<template>
    <div class="flex flex-col items-center">
        <div :class="{ 'text-4xl font-bold': true, zoom: zoomText }">{{ formatNumber(Math.ceil(current)) }}{{ suffix ?? '' }}</div>
        <div class="text-gray-500">{{ label }}</div>
        <div v-if="showConfetti" class="confetti">
            <span v-for="i in 30" :key="i" class="emoji" :style="getConfettiStyle()">🎉</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue';

export interface Props {
    count: number
    suffix?: string
    label?: string
    animate?: boolean
    time?: number
}

const props = withDefaults(defineProps<Props>(), {
    time: 1000
});

const current = ref(0);
const intervalTime = 10; // Consistent update frequency
const step = computed(() => Math.ceil(props.count / (props.time / intervalTime)));
const showConfetti = computed(() => current.value >= 2e9);
const zoomText = computed(() => current.value >= 1e9 && current.value < 1e9 + step.value);

function formatNumber(num: number) {
    if (num >= 1e9) {
        return (num / 1e9).toFixed(0) + 'B';
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(0) + 'M';
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(0) + 'K';
    }
    return num.toString();
}

let intervalHandle: any;

onMounted(() => {
    intervalHandle = setInterval(() => {
        if (current.value < props.count) {
            current.value = Math.min(current.value + step.value, props.count);
        } else {
            clearInterval(intervalHandle);
        }
    }, intervalTime);
});

onUnmounted(() => {
    clearInterval(intervalHandle);
});

const getConfettiStyle = () => ({
    animationDelay: `${Math.random() * 1}s`,
    left: `${Math.random() * 100}%`,
});
</script>

<style>
:global(body) {
    position: relative;
    overflow-x: hidden;
}

.zoom {
    animation: zoomEffect 2s;
}

@keyframes zoomEffect {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
        color: green;
    }
    100% {
        transform: scale(1);
    }
}

.confetti {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 9999;
}

.emoji {
    position: absolute;
    font-size: 2rem;
    animation: drop 3s ease-out forwards;
    top: -10%;
}

@keyframes drop {
    0% {
        transform: translateY(0);
        opacity: 1;
    }
    100% {
        transform: translateY(100vh);
        opacity: 0;
    }
}
</style>
