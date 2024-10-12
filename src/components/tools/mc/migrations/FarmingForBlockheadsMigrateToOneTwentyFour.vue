<script setup lang="ts">
import { ref } from 'vue';
import JSZip from 'jszip';

const fileInput = ref<HTMLInputElement | null>(null);
const pending = ref(false);
const logs = ref<{ type: 'success' | 'info' | 'warning' | 'error'; message: string }[]>([]);

function migrateFile(file: File) {
    return new Promise<{ path: string; data: any }[]>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const data = JSON.parse(reader.result as string);
                const outputFiles = migrate(file.name, data);
                resolve(outputFiles);
            } catch (e) {
                reject(e);
            }
        };
        reader.readAsText(file);
    });
}

function migrate(fileName: string, data: any) {
    logs.value.push({ type: 'info', message: `Migrating ${fileName}...` });

    if (data.groupOverrides) {
        logs.value.push({ type: 'warning', message: `Group overrides can not be migrated automatically and will be ignored` });
    }
    if (data.entryOverrides) {
        logs.value.push({ type: 'warning', message: `Entry overrides can not be migrated automatically and will be ignored` });
    }

    const fileNameWithoutExtension = fileName.split('.')[0] ?? '';
    const modId = data.modId ?? 'farmingforblockheads';
    const defaultCategory = data.group?.defaultCategory || 'farmingforblockheads:other';
    const presetWithoutNamespace = fileNameWithoutExtension.includes('_') ? fileNameWithoutExtension.split('_')[1] : fileNameWithoutExtension;
    const preset = modId + ':' + (presetWithoutNamespace ?? 'other');
    const enabled = data.group?.enabledByDefault ?? false;
    const presetOutputPath = `${modId}/market_presets/` + preset.split(':')[1] + '.json';
    logs.value.push({ type: 'info', message: `Generating ${presetOutputPath}...` });
    const marketPreset = {
        path: presetOutputPath,
        data: {
            enabled,
            payment: {
                ingredient: {
                    item: data.group?.defaultPayment?.item ?? 'minecraft:emerald',
                },
                count: data.group?.defaultPayment?.count ?? 1,
            },
        },
    };
    const categories = data.customCategories ? Object.entries(data.customCategories).map(([key, value]: [string, any]) => {
        const keyNamespace = key.includes(':') ? key.split(':')[0] : 'minecraft';
        const keyWithoutNamespace = key.includes(':') ? key.split(':')[1] : key;
        const categoryOutputPath = `${keyNamespace}/market_categories/${keyWithoutNamespace}.json`;
        logs.value.push({ type: 'info', message: `Generating ${categoryOutputPath}...` });
        return {
            path: categoryOutputPath,
            data: {
                tooltip: value.name ?? keyWithoutNamespace,
                icon: value.icon,
                sortIndex: value.sortIndex ?? 0,
            },
        };
    }) : []
    const recipes = data.customEntries?.map((entry: any) => {
        const resultItem = typeof entry.output === 'object' ? entry.output.item : entry.output;
        const resultItemNamespace = resultItem.includes(':') ? resultItem.split(':')[0] : 'minecraft';
        const resultItemWithoutNamespace = resultItem.includes(':') ? resultItem.split(':')[1] : resultItem;
        const recipeOutputPath = `farmingforblockheads/recipes/market/${resultItemNamespace}/${resultItemWithoutNamespace}.json`;
        logs.value.push({ type: 'info', message: `Generating ${recipeOutputPath}...` });
        return {
            path: recipeOutputPath,
            data: {
                type: 'farmingforblockheads:market',
                category: entry.category ?? defaultCategory,
                preset,
                result: {
                    item: resultItem,
                    tag: entry.output.nbt ?? undefined,
                },
            },
        };
    });
    const outputFiles: { path: string; data: any }[] = [marketPreset, ...recipes, ...categories];
    return outputFiles;
}

async function handleSubmit() {
    logs.value = [];
    const files = fileInput.value?.files;
    if (!files || files.length === 0) {
        logs.value.push({ type: 'error', message: 'No files selected' });
        return;
    }

    try {
        pending.value = true;
        const outputFiles = (await Promise.all(Array.from(files).map((file) => migrateFile(file)))).flat();
        const zip = new JSZip();
        outputFiles.forEach((file) => {
            zip.file(file.path, JSON.stringify(file.data));
        });
        const zipContent = await zip.generateAsync({ type: 'blob' });
        //const newBlob = new Blob([blob]);
        const url = URL.createObjectURL(zipContent);
        const a = document.createElement('a');
        a.href = url;
        a.download = files[0].name + '.zip';
        a.click();
        URL.revokeObjectURL(url);
        if (fileInput.value) {
            fileInput.value.value = '';
        }
        logs.value.push({ type: 'success', message: 'Migration successful, starting download...' });
    } catch (e: any) {
        console.error(e);
        logs.value.push({ type: 'error', message: e.message });
    } finally {
        pending.value = false;
    }
}
</script>

<template>
    <div class="flex gap-2">
        <div class="card bg-base-300 p-4">
            <form @submit.prevent="handleSubmit">
                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text">Select registry file(s) to convert:</span>
                    </div>
                    <input type="file" class="file-input file-input-bordered w-full max-w-xs" accept=".json" multiple ref="fileInput" />
                    <div class="label">
                        <span class="label-text-alt">Accepted formats: .json</span>
                    </div>
                </label>
                <div class="card-actions justify-end">
                    <button type="submit" class="btn btn-success" :disabled="pending">Convert & Download</button>
                </div>
            </form>
        </div>
        <div class="font-mono p-4 flex flex-col gap-1 max-h-64 bg-base-200 overflow-auto" v-if="logs.length">
            <div v-for="(log, i) in logs" :key="i">
                <span class="badge" :class="`badge-${log.type}`">{{ log.type }}</span>
                {{ log.message }}
            </div>
        </div>
    </div>
</template>
