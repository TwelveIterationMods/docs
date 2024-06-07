<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';

const props = defineProps<{
    modData: {
        modId: string;
        gameVersions: string[];
        loaders: string[];
    };
    branch: string;
    loader: string;
    gameVersion: string;
}>();


const modId = computed(() => props.modData.modId)

const jars = ref<{
    version: string;
    downloadUrl: string
    fileSize: number;
    lastModified: string;
}[]>([])

watchEffect(async () => {
    const query = new URLSearchParams()
    query.set('modId', modId.value)
    query.set('loader', props.loader.toLowerCase())
    query.set('gameVersion', props.gameVersion)
    query.set('branch', props.branch)
    const response = await fetch('/api/downloads?' + query);
    jars.value = await response.json();
});

const humanizeFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
};

const humanizeTimestamp = (timestamp?: string) => {
    if (!timestamp) {
        return 'Unknown';
    }

    const date = new Date(timestamp);
    return date.toLocaleString();
};

const humanizeVersion = (version?: string) => {
    return version?.split('+')[0];
};

const latestJar = computed(() => jars.value[0]);
</script>

<template>
    <div>{{ jars }}</div>
    <div class="flex items-end justify-center gap-4">
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Game Version</span>
            </div>
            <select class="select select-bordered">
                <template v-for="gameVersion in modData.gameVersions" :key="gameVersion">
                <option>{{gameVersion}}</option>
                </template>
            </select>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Mod Loader</span>
            </div>
            <select class="select select-bordered">
                <template v-for="loader in modData.loaders" :key="loader">
                <option>{{loader}}</option>
                </template>
            </select>
        </label>

        <template v-if="latestJar">
            <a :href="'/download?v=' + encodeURIComponent(latestJar.downloadUrl)" class="btn btn-success">
                    <!--<Icon name="mdi:download" class="w-6" />-->
                    <span>
                        <strong>Download</strong> {{humanizeVersion(latestJar.version)}} for <strong>Minecraft {{gameVersion}}</strong>
                        <span>
                            (<strong>{{loader}}</strong>)
                        </span>
                        <span>({{humanizeFileSize(latestJar.fileSize)}})</span>
                    </span>
                </a>
        </template>
    </div>

    <div class="divider"></div>

    <table class="table mb-4">
        <thead>
            <tr>
                <th>Version</th>
                <th>Loader</th>
                <th>Game Version</th>
                <th>Released at</th>
                <th>File Size</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(jar, i) in jars" key="jar.version">
                <tr>
                    <td>
                        <div class="flex items-center gap-2">
                            {{ humanizeVersion(jar.version) }}
                            <template v-if="i === 0">
                                <span class="badge badge-success badge-sm">latest</span>
                            </template>
                        </div>
                    </td>
                    <td>{{ loader }}</td>
                    <td>{{ gameVersion }}</td>
                    <td>{{ humanizeTimestamp(jar.lastModified) }}</td>
                    <td>{{ humanizeFileSize(jar.fileSize) }}</td>
                    <td>
                        <a :href="'/download?v=' + encodeURIComponent(jar.downloadUrl)" class="btn btn-square btn-sm btn-success">
                            <!--<Icon name="mdi:download" class="w-6" />-->
                        </a>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>
