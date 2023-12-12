<script setup lang="ts">
import { getEntry } from 'astro:content';
import Tags from '../../utils/tags';
import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue';
import getGameImage from '../../utils/image';

const props = defineProps<{
    item: string;
}>();
const isTag = computed(() => props.item.startsWith('#'));

const variants = computed(() => Tags[props.item.substring(1)] || []);
const currentIndex = ref(0);
const currentItem = computed(() => (variants.value.length > 0 ? variants.value[currentIndex.value] : props.item));
const namespace = computed(() => currentItem.value.split(':')[0]);
const path = computed(() => currentItem.value.split(':')[1]);

const itemUrlTarget = computed(() => (namespace.value === 'minecraft' ? '_blank' : null));
const itemUrl = computed(() => {
    if (namespace.value === 'minecraft') {
        let wikiPath = path.value.replace(/_/g, ' ');
        let wikiPathParts = wikiPath.split(' ');
        for (let i = 0; i < wikiPathParts.length; i++) {
            wikiPathParts[i] = wikiPathParts[i][0].toUpperCase() + wikiPathParts[i].slice(1);
        }
        wikiPath = wikiPathParts.join('_');
        return 'https://minecraft.gamepedia.com/' + wikiPath;
    } else if (namespace.value === 'c') {
        return undefined;
    }

    if (isTag.value) {
        let tag = props.item.substring(1);
        let tagNamespace = tag.split(':')[0];
        let tagPath = tag.split(':')[1];
        return `/mc/${tagNamespace}/${tagPath}`;
    }

    return '/mc/' + namespace.value + '/' + path.value;
});

let variantTicker: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
    watchEffect(() => {
        if (variants.value.length > 0) {
            variantTicker = setInterval(() => {
                currentIndex.value = (currentIndex.value + 1) % variants.value.length;
            }, 1000);
        }
    });
});

onUnmounted(() => {
    if (variantTicker) {
        clearInterval(variantTicker);
        variantTicker = null;
    }
});

const i18n = await getEntry('i18n', `mc/${namespace.value}/en_us`);
const label = computed(() => i18n?.data['item.' + currentItem.value.replace(':', '.')] ?? i18n?.data['block.' + currentItem.value.replace(':', '.')]);
const image = computed(() => getGameImage('mc', currentItem.value))
</script>

<template>
    <a :href="itemUrl" class="minecraft-item" :title="label">
        <img :src="image" :alt="item" v-bind="props" class="w-full h-full max-w-16 max-h-16 object-contain" />
    </a>
</template>
