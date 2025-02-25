<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { z } from 'zod';

const formData = ref({
    modId: '',
    modName: '',
    packageName: '',
    author: '',
    description: '',
    minecraftVersion: '1.20.1',
    components: {
        neoforge: true,
        fabric: true,
        forge: true,
        blocks: true,
        items: true,
        entities: false,
        menus: true,
        recipes: false,
        components: false,
        config: true,
        commands: false,
        networking: true,
        api: true,
        loot: false,
        sounds: false,
        stats: false,
        worldgen: false
    }
});

const minecraftVersions = ['1.21.4', '1.21.1', '1.20.1'];

const schema = z.object({
    modId: z
        .string()
        .min(3, 'Mod ID must be at least 3 characters')
        .max(32, 'Mod ID cannot exceed 32 characters')
        .regex(/^[a-z][a-z0-9_]*$/, 'Mod ID must start with a lowercase letter and contain only lowercase letters, numbers, and underscores'),
    modName: z.string().min(3, 'Mod name must be at least 3 characters').max(64, 'Mod name cannot exceed 64 characters'),
    packageName: z.string().regex(/^[a-z][a-z0-9_\.]*[a-z0-9]$/, 'Group name must follow Java package naming conventions'),
    author: z.string(),
    description: z.string().default('Minecraft Mod.'),
    minecraftVersion: z.enum(minecraftVersions),
    components: z.object({
        neoforge: z.boolean().default(true),
        fabric: z.boolean().default(true),
        forge: z.boolean().default(true),
        blocks: z.boolean().default(true),
        items: z.boolean().default(true),
        entities: z.boolean().default(false),
        menus: z.boolean().default(true),
        recipes: z.boolean().default(false),
        components: z.boolean().default(false),
        config: z.boolean().default(true),
        commands: z.boolean().default(false),
        networking: z.boolean().default(true),
        api: z.boolean().default(true),
        loot: z.boolean().default(false),
        sounds: z.boolean().default(false),
        stats: z.boolean().default(false),
        worldgen: z.boolean().default(false)
    }),
});

const errors = ref<Record<string, string>>({});

const isFormValid = computed(() => {
    const result = schema.safeParse(formData.value);
    return result.success;
});

const validateField = (field: keyof typeof formData.value) => {
    const fieldSchema = schema.shape[field];
    const result = fieldSchema.safeParse(formData.value[field]);

    if (!result.success) {
        errors.value[field] = result.error.errors[0].message;
        return false;
    } else {
        delete errors.value[field];
        return true;
    }
};

const validateForm = () => {
    const result = schema.safeParse(formData.value);

    if (!result.success) {
        result.error.errors.forEach((err) => {
            errors.value[err.path[0] as string] = err.message;
        });
        return false;
    }

    return true;
};

const submitForm = () => {
    if (validateForm()) {
        // TODO
    }
};

const computedModId = computed(() => {
    const modId = formData.value.modName.toLowerCase();
    return modId.replace(/[^a-z0-9_]/g, '');
})
</script>

<template>
    <div class="balm-project-builder">
        <form @submit.prevent="submitForm" class="space-y-4">
            <div class="form-group">
                <label for="modName">Mod Name</label>
                <input
                    type="text"
                    id="modName"
                    v-model="formData.modName"
                    @blur="validateField('modName')"
                    class="input input-bordered"
                    :class="{ 'is-invalid': errors.modName }"
                    placeholder="My Awesome Mod"
                />
                <small class="text-red-500" v-if="errors.modName">{{ errors.modName }}</small>
                <small class="text-gray-500" v-else-if="computedModId">Mod ID: {{ computedModId }}</small>
            </div>

            <div class="form-group">
                <label for="packageName">Group Name</label>
                <input
                    type="text"
                    id="packageName"
                    v-model="formData.packageName"
                    @blur="validateField('packageName')"
                    class="input input-bordered"
                    :class="{ 'is-invalid': errors.packageName }"
                    placeholder="yourname.mods"
                />
                <small class="text-red-500" v-if="errors.packageName">{{ errors.packageName }}</small>
                <small class="text-gray-500" v-else>If you own a domain, consider using it for your group name (e.g., com.yourdomain.mods)</small>
            </div>

            <div class="form-group">
                <label for="author">Author</label>
                <input
                    type="text"
                    id="author"
                    v-model="formData.author"
                    @blur="validateField('author')"
                    class="input input-bordered"
                    :class="{ 'is-invalid': errors.author }"
                    placeholder="YourName"
                />
                <small class="text-red-500" v-if="errors.author">{{ errors.author }}</small>
            </div>

            <div class="form-group">
                <label for="description">Description</label>
                <input
                    type="text"
                    id="description"
                    v-model="formData.description"
                    @blur="validateField('description')"
                    class="input input-bordered"
                    :class="{ 'is-invalid': errors.description }"
                    placeholder="A short summary of what your mod does."
                ></input>
                <small class="text-red-500" v-if="errors.description">{{ errors.description }}</small>
            </div>

            <div class="form-group">
                <label for="mcVersion">Minecraft Version</label>
                <select id="mcVersion" v-model="formData.minecraftVersion" class="select select-bordered">
                    <option v-for="version in minecraftVersions" :key="version" :value="version">
                        {{ version }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label>Mod Loaders</label>
                <div class="flex gap-4">
                    <label class="flex items-center">
                        <input type="checkbox" v-model="formData.components.neoforge" disabled />
                        <span class="ml-2">NeoForge</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" v-model="formData.components.fabric" disabled />
                        <span class="ml-2">Fabric</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" v-model="formData.components.forge" disabled />
                        <span class="ml-2">Forge</span>
                    </label>
                </div>
                <small class="text-gray-500">All supported mod loaders will be included in the template.</small>
            </div>

            <div class="form-group">
                <label>Frequently Used Components</label>    
                <div class="flex gap-4">
                    <label class="flex items-center">
                        <input type="checkbox" v-model="formData.components.blocks" />
                        <span class="ml-2">Blocks</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" v-model="formData.components.items" />
                        <span class="ml-2">Items</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" v-model="formData.components.menus" />
                        <span class="ml-2">Menu Screens</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" v-model="formData.components.config" />
                        <span class="ml-2">Config</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" v-model="formData.components.networking" />
                        <span class="ml-2">Networking</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" v-model="formData.components.api" />
                        <span class="ml-2">API</span>
                    </label>
                </div>
                <small class="text-gray-500">Slim down the project template by only selecting components you're likely going to use.</small>
            </div>
            <div class="form-group">
                <label>Other Components</label>
                <div class="flex flex-wrap gap-4 gap-y-0">
                    <label class="flex items-center">
                        <input type="checkbox" v-model="formData.components.entities" />
                        <span class="ml-2">Entities</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" v-model="formData.components.loot" />
                        <span class="ml-2">Loot Modifiers</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" v-model="formData.components.recipes" />
                        <span class="ml-2">Custom Recipe Types</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" v-model="formData.components.sounds" />
                        <span class="ml-2">Sounds</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" v-model="formData.components.stats" />
                        <span class="ml-2">Custom Stats</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" v-model="formData.components.worldgen" />
                        <span class="ml-2">Custom WorldGen</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" v-model="formData.components.commands" />
                        <span class="ml-2">Commands</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" v-model="formData.components.components" />
                        <span class="ml-2">Data Components</span>
                    </label>
                </div>
                <small class="text-gray-500">This only changes what example code is included, you will of course have access to all of these features regardless.</small>
            </div>

            <div class="form-group mt-6">
                <button type="submit" class="btn btn-primary" :disabled="!isFormValid || true">
                    Generate Project (coming soon)
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.balm-project-builder {
    max-width: 800px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

input[type='text'],
textarea,
select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
}

input.is-invalid,
textarea.is-invalid {
    border-color: #dc3545;
}

.badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    margin-right: 0.25rem;
    background-color: #6c757d;
    color: white;
    border-radius: 0.25rem;
}
</style>
