import { z, defineCollection } from 'astro:content';

const categories = ['Content Expansion', 'Quality of Life', 'Utilities', 'Library'] as const;

const gamesCollection = defineCollection({
    type: 'content',
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            badge: z.string().optional(),
            categories: z.array(z.enum(categories)),
            cover: image(),
        }),
});

const modsCollection = defineCollection({
    type: 'content',
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            cover: image(),
            badge: z.string().optional(),
            icon: z.string().optional(),
            item: z.string().optional(),
            description: z.string(),
            gameVersions: z.string().array().default([]),
            loaders: z.array(z.enum(['Forge', 'Fabric', 'NeoForge', 'Steam'])),
            category: z.enum(categories),
            github: z.string().optional(),
            curseForgeId: z.number().optional(),
            curseForgeSlug: z.string().optional(),
            modrinthSlug: z.string().optional(),
            steamId: z.number().optional(),
            patreonCallout: z.boolean().default(true),
            modId: z.string(),
            priority: z.number().default(0),
            discontinued: z.boolean().default(false),
        }),
});

const exclusivesCollection = defineCollection({
    type: 'content',
    schema: () =>
        z.object({
            title: z.string(),
            gameVersion: z.string(),
            notes: z.record(z.string(), z.string()).default({})
        }),
});

const releasesCollection = defineCollection({
    type: 'content',
    schema: () =>
        z.object({
            title: z.string(),
            gameVersion: z.string(),
            notes: z.record(z.string(), z.string()).default({})
        }),
});

const docsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        item: z.string().optional(),
        icon: z.string().optional(),
        badge: z.string().optional(),
        type: z.enum(['item', 'guide']),
        priority: z.number().default(0),
    }),
});

const galleriesCollection = defineCollection({
    type: 'data',
    schema: ({ image }) =>
        z.object({
            images: z
                .object({
                    file: image(),
                    alt: z.string(),
                })
                .array(),
        }),
});

const recipesCollection = defineCollection({
    type: 'data',
    schema: z.object({
        type: z.enum(['minecraft:crafting_shaped', 'crafting_shaped', 'minecraft:crafting_shapeless', 'crafting_shapeless', 'minecraft:smelting', 'smelting']),
        result: z
            .object({
                item: z.string().optional(),
                id: z.string().optional(),
                count: z.number().default(1),
            })
            .or(z.string()),
        ingredient: z
            .object({
                item: z.string().optional(),
                tag: z.string().optional(),
                type: z.string().optional(),
                value: z.string().optional(),
            })
            .default({}),
        ingredients: z
            .array(
                z.object({
                    item: z.string().optional(),
                    tag: z.string().optional(),
                    type: z.string().optional(),
                    value: z.string().optional(),
                })
            )
            .default([]),
        pattern: z.array(z.string()).default([]),
        key: z
            .record(
                z.object({
                    item: z.string().optional(),
                    tag: z.string().optional(),
                    type: z.string().optional(),
                    value: z.string().optional(),
                })
            )
            .default({}),
        category: z.string().optional(),
        conditions: z.array(z.any()).default([]),
    }),
});

const i18nCollection = defineCollection({
    type: 'data',
    schema: z.record(z.string()),
});

const configCollection = defineCollection({
    type: 'data',
    schema: z.array(
        z.object({
            name: z.string(),
            type: z.string(),
            description: z.string(),
            defaultValue: z.any(),
            validValues: z.array(z.any()).optional(),
        })
    ),
});

export const collections = {
    games: gamesCollection,
    mods: modsCollection,
    exclusives: exclusivesCollection,
    releases: releasesCollection,
    docs: docsCollection,
    galleries: galleriesCollection,
    recipes: recipesCollection,
    configs: configCollection,
    i18n: i18nCollection,
};
