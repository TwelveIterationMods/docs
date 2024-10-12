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

function determineModId(result: { item: string }) {
    const parts = result.item.split(':');
    return parts.length === 2 ? parts[0] : 'minecraft';
}

function determineDefaults(preset: string) {
    const parts = preset.split(':');
    const modId = parts.length === 2 ? parts[0] : 'minecraft';
    const group = parts.length === 2 ? parts[1] : parts[0];
    let newGroup = group;
    switch (group) {
        case 'animal_eggs':
            newGroup = 'spawn_eggs';
            break;
        case 'exotic_saplings':
            newGroup = 'rare.saplings';
            break;
        case 'soil':
            newGroup = 'soils';
            break;
        case 'bone_meal':
            newGroup = 'fertilizers';
            break;
    }
    return 'selling.' + newGroup + '.' + modId;
}

function determineCategory(defaults: string) {
    if (defaults.includes('.seeds.')) {
        return 'farmingforblockheads:seeds';
    } else if (defaults.includes('.flowers.')) {
        return 'farmingforblockheads:flowers';
    } else if (defaults.includes('.saplings.')) {
        return 'farmingforblockheads:saplings';
    } else {
        return 'farmingforblockheads:other';
    }
}

function migrate(fileName: string, data: any) {
    logs.value.push({ type: 'info', message: `Migrating ${fileName}...` });

    const modId = determineModId(data.result);
    const defaults = determineDefaults(data.preset);
    const expectedCategory = determineCategory(defaults);
    const output = {
        path: fileName,
        data: {
            ...data,
            preset: undefined,
            category: data.category === expectedCategory ? undefined : data.category,
            defaults,
            conditions: [
                {
                    type: 'farmingforblockheads:preset_enabled',
                    preset: defaults,
                },
                {
                    type: 'forge:mod_loaded',
                    mod: modId,
                },
            ],
            'fabric:load_conditions': [
                {
                    condition: 'farmingforblockheads:preset_enabled',
                    preset: defaults,
                },
                {
                    condition: 'fabric:all_mods_loaded',
                    values: [modId],
                },
            ],
            'neoforge:conditions': [
                {
                    type: 'farmingforblockheads:preset_enabled',
                    preset: defaults,
                },
                {
                    type: 'neoforge:mod_loaded',
                    modid: modId,
                },
            ],
        },
    };
    const outputFiles: { path: string; data: any }[] = [output];
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
                        <span class="label-text">Select recipe file(s) to convert:</span>
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
