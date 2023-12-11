import { z, defineCollection } from 'astro:content';

const categories = ['Content Expansion', 'Quality of Life', 'Utilities'] as const;

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
            loaders: z.array(z.enum(['Forge', 'Fabric', 'NeoForge', 'Steam'])),
            category: z.enum(categories),
            github: z.string().optional(),
            curseForgeId: z.number().optional(),
            curseForgeSlug: z.string().optional(),
            steamId: z.number().optional(),
            priority: z.number().default(0),
        }),
});

const docsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        item: z.string().optional(),
        icon: z.string().optional(),
        type: z.enum(['item', 'guide']),
        priority: z.number().default(0),
    }),
});

const recipesCollection = defineCollection({
    type: 'data',
    schema: z.object({
        type: z.enum(['minecraft:crafting_shaped', 'crafting_shaped', 'minecraft:crafting_shapeless', 'crafting_shapeless', 'minecraft:smelting', 'smelting']),
        result: z.object({
            item: z.string(),
            count: z.number().default(1),
        }).or(z.string()),
        ingredient: z.object({
            item: z.string().optional(),
            tag: z.string().optional(),
            type: z.string().optional(),
            value: z.string().optional(),
        }).default({}),
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
        conditions: z.array(z.any()).default([]),
    }),
});

const i18nCollection = defineCollection({
    type: 'data',
    schema: z.record(z.string()),
});

export const collections = {
    games: gamesCollection,
    mods: modsCollection,
    docs: docsCollection,
    recipes: recipesCollection,
    i18n: i18nCollection,
};
