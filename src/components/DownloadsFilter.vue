<script setup lang="ts">
const props = defineProps<{
    entry: {
        data: {
            gameVersions: string[];
            loaders: string[];
        };
    };
}>();
</script>

<template>
    <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Game Version</span>
            </div>
            <select class="select select-bordered">
                {entry.data.gameVersions.map((gameVersion) => <option>{gameVersion}</option>)}
            </select>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Mod Loader</span>
            </div>
            <select class="select select-bordered">
                {entry.data.loaders.map((loader) => <option>{loader}</option>)}
            </select>
        </label>
</template>