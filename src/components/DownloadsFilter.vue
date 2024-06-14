<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    entry: {
        data: {
            modId: string;
            gameVersions: string[];
            loaders: string[];
        };
    };
    game: string;
    gameVersion: string;
    previewVersion: string;
    loader: string;
    branch: string;
}>();

const gameVersion = ref(props.gameVersion);
const loader = ref(props.loader);

const updateUrl = () => {
    if (props.branch === 'release' && gameVersion.value === props.previewVersion) {
        window.location.href = '/sponsor';
        return;
    }

    window.location.href = `/${props.game}/${props.entry.data.modId}/download/${gameVersion.value}/${loader.value}/${props.branch}`;
};
</script>

<template>
    <label class="form-control w-full max-w-xs">
        <div class="label">
            <span class="label-text">Game Version</span>
        </div>
        <select class="select select-bordered" v-model="gameVersion" @change="updateUrl">
            <template v-if="branch === 'release' && previewVersion">
                <option :value="previewVersion">{{ previewVersion }} (Patreon Preview)</option>
            </template>
            <template v-else-if="previewVersion">
                <option :value="previewVersion">
                    {{ previewVersion }}
                </option>
            </template>
            <option v-for="gameVersion in entry.data.gameVersions" :key="gameVersion">{{ gameVersion }}</option>
        </select>
    </label>
    <label class="form-control w-full max-w-xs">
        <div class="label">
            <span class="label-text">Mod Loader</span>
        </div>
        <select class="select select-bordered" v-model="loader" @change="updateUrl">
            <option v-for="loader in entry.data.loaders" :key="loader" :value="loader.toLowerCase()">{{ loader }}</option>
        </select>
    </label>
</template>
