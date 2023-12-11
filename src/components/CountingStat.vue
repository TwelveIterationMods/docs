<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = withDefaults(
    defineProps<{
        count: number | string;
        unit: string;
        label: string;
        time?: number | string;
    }>(),
    {
        time: 2000,
    }
);

const current = ref(0);

const count = computed(() => {
    return Number(props.count);
});

const step = computed(() => {
    return Math.ceil((count.value / Number(props.time)) * 10);
});

onMounted(() => {
    const handle = setInterval(() => {
        if (current.value < count.value) {
            current.value = Math.min(current.value + step.value, count.value);
        } else {
            clearInterval(handle);
        }
    }, 10);

    onUnmounted(() => {
        clearInterval(handle);
    });
});
</script>

<template>
    <div class="flex flex-col items-center">
        <div class="text-4xl font-bold">{{ current }}{{ unit }}</div>
        <div class="text-gray-500">{{ label }}</div>
    </div>
</template>

<style scoped></style>
