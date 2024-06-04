const tagMappings: {[key: string]: string[]} = {
    "minecraft:planks": [
        "minecraft:oak_planks",
        "minecraft:spruce_planks",
        "minecraft:birch_planks",
        "minecraft:jungle_planks",
        "minecraft:acacia_planks",
        "minecraft:dark_oak_planks",
        "minecraft:crimson_planks",
        "minecraft:warped_planks"
    ],
    "minecraft:wooden_slabs": [
        "minecraft:oak_slab",
        "minecraft:spruce_slab",
        "minecraft:birch_slab",
        "minecraft:jungle_slab",
        "minecraft:acacia_slab",
        "minecraft:dark_oak_slab",
        "minecraft:crimson_slab",
        "minecraft:warped_slab"
    ],
    "minecraft:logs": [
        "minecraft:dark_oak_log",
        "minecraft:oak_log",
        "minecraft:spruce_log",
        "minecraft:jungle_log",
        "minecraft:acacia_log",
        "minecraft:birch_log"
    ],
    "minecraft:leaves": [
        "minecraft:dark_oak_leaves",
        "minecraft:oak_leaves",
        "minecraft:spruce_leaves",
        "minecraft:jungle_leaves",
        "minecraft:acacia_leaves",
        "minecraft:birch_leaves"
    ],
    "minecraft:saplings": [
        "minecraft:dark_oak_sapling",
        "minecraft:oak_sapling",
        "minecraft:spruce_sapling",
        "minecraft:jungle_sapling",
        "minecraft:acacia_sapling",
        "minecraft:birch_sapling"
    ],
    "minecraft:fishes": [
        "minecraft:cod",
        "minecraft:cooked_cod",
        "minecraft:salmon",
        "minecraft:cooked_salmon",
        "minecraft:pufferfish",
        "minecraft:tropical_fish"
    ],
    "cookingforblockheads:kitchen_floor": [
        "cookingforblockheads:white_kitchen_floor",
        "cookingforblockheads:orange_kitchen_floor",
        "cookingforblockheads:magenta_kitchen_floor",
        "cookingforblockheads:light_blue_kitchen_floor",
        "cookingforblockheads:yellow_kitchen_floor",
        "cookingforblockheads:lime_kitchen_floor",
        "cookingforblockheads:pink_kitchen_floor",
        "cookingforblockheads:gray_kitchen_floor",
        "cookingforblockheads:light_gray_kitchen_floor",
        "cookingforblockheads:cyan_kitchen_floor",
        "cookingforblockheads:purple_kitchen_floor",
        "cookingforblockheads:blue_kitchen_floor",
        "cookingforblockheads:brown_kitchen_floor",
        "cookingforblockheads:green_kitchen_floor",
        "cookingforblockheads:red_kitchen_floor",
        "cookingforblockheads:black_kitchen_floor",
    ],
    "cookingforblockheads:recipe_book": [
        "cookingforblockheads:recipe_book",
        "cookingforblockheads:crafting_book",
        "cookingforblockheads:no_filter_edition",
    ],
    "farmingforblockheads:fertilized_farmland": [
        "farmingforblockheads:fertilized_farmland_healthy",
        "farmingforblockheads:fertilized_farmland_healthy_stable",
        "farmingforblockheads:fertilized_farmland_rich",
        "farmingforblockheads:fertilized_farmland_rich_stable",
        "farmingforblockheads:fertilized_farmland_stable"
    ],
    "farmingforblockheads:fertilizer": [
        "farmingforblockheads:red_fertilizer",
        "farmingforblockheads:green_fertilizer",
        "farmingforblockheads:yellow_fertilizer"
    ],
    "excompressum:compressed_hammer": [
        "excompressum:compressed_hammer_wood",
        "excompressum:compressed_hammer_stone",
        "excompressum:compressed_hammer_iron",
        "excompressum:compressed_hammer_gold",
        "excompressum:compressed_hammer_diamond",
        "excompressum:compressed_hammer_netherite",
    ],
    "excompressum:wooden_crucible": [
        "excompressum:oak_crucible",
        "excompressum:spruce_crucible",
        "excompressum:birch_crucible",
        "excompressum:dark_oak_crucible",
        "excompressum:acacia_crucible",
        "excompressum:jungle_crucible",
    ],
    "excompressum:heavy_sieve": [
        "excompressum:oak_heavy_sieve",
        "excompressum:spruce_heavy_sieve",
        "excompressum:birch_heavy_sieve",
        "excompressum:dark_oak_heavy_sieve",
        "excompressum:acacia_heavy_sieve",
        "excompressum:jungle_heavy_sieve",
    ],
    "excompressum:compressed_block": [
        "excompressum:compressed_dust",
        "excompressum:compressed_cobblestone",
        "excompressum:compressed_sand",
        "excompressum:compressed_dirt",
        "excompressum:compressed_gravel",
        "excompressum:compressed_flint",
        "excompressum:compressed_ender_gravel",
        "excompressum:compressed_nether_gravel",
        "excompressum:compressed_soul_sand",
        "excompressum:compressed_netherrack",
        "excompressum:compressed_end_stone",
        "excompressum:compressed_diorite",
        "excompressum:compressed_andesite",
        "excompressum:compressed_granite"
    ],
    "excompressum:bait": [
        "excompressum:wolf_bait",
        "excompressum:ocelot_bait",
        "excompressum:cow_bait",
        "excompressum:pig_bait",
        "excompressum:chicken_bait",
        "excompressum:sheep_bait",
        "excompressum:squid_bait",
        "excompressum:rabbit_bait",
        "excompressum:horse_bait",
        "excompressum:donkey_bait",
        "excompressum:llama_bait",
        "excompressum:polar_bear_bait",
        "excompressum:parrot_bait",
        "excompressum:fox_bait",
        "excompressum:turtle_bait",
        "excompressum:cat_bait",
        "excompressum:mooshroom_bait"
    ],
    "excompressum:auto_compressor": [
        "excompressum:auto_compressor",
        "excompressum:rationing_auto_compressor"
    ],
    "fertilization:flower": [
        "minecraft:poppy",
        "minecraft:blue_orchid",
        "minecraft:allium",
        "minecraft:azure_bluet",
        "minecraft:red_tulip",
        "minecraft:orange_tulip",
        "minecraft:white_tulip",
        "minecraft:pink_tulip",
        "minecraft:oxeye_daisy",
        "minecraft:dandelion",
        "minecraft:lilac",
        "minecraft:sunflower",
        "minecraft:cornflower",
        "minecraft:lily_of_the_valley"
    ],
    "refinedrelocation:sorting_chest": [
        "refinedrelocation:sorting_chest",
        "refinedrelocation:sorting_iron_chest",
        "refinedrelocation:sorting_gold_chest",
        "refinedrelocation:sorting_diamond_chest",
    ],
    "waystones:waystones": [
        "waystones:waystone",
        "waystones:sandy_waystone",
        "waystones:mossy_waystone",
        "waystones:deepslate_waystone",
        "waystones:end_stone_waystone",
        "waystones:blackstone_waystone",
    ],
    "waystones:sharestones": [
        "waystones:black_sharestone",
        "waystones:blue_sharestone",
        "waystones:brown_sharestone",
        "waystones:cyan_sharestone",
        "waystones:gray_sharestone",
        "waystones:green_sharestone",
        "waystones:light_blue_sharestone",
        "waystones:light_gray_sharestone",
        "waystones:lime_sharestone",
        "waystones:magenta_sharestone",
        "waystones:orange_sharestone",
        "waystones:pink_sharestone",
        "waystones:purple_sharestone",
        "waystones:red_sharestone",
        "waystones:yellow_sharestone"
    ],
    "waystones:portstone": [
        "waystones:black_portstone",
        "waystones:blue_portstone",
        "waystones:brown_portstone",
        "waystones:cyan_portstone",
        "waystones:gray_portstone",
        "waystones:green_portstone",
        "waystones:light_blue_portstone",
        "waystones:light_gray_portstone",
        "waystones:lime_portstone",
        "waystones:magenta_portstone",
        "waystones:orange_portstone",
        "waystones:pink_portstone",
        "waystones:purple_portstone",
        "waystones:red_portstone",
        "waystones:white_portstone",
        "waystones:yellow_portstone"
    ],
    "c:dyes/purple": [
        "minecraft:purple_dye"
    ],
    "c:dyes/black": [
        "minecraft:black_dye"
    ],
    "c:dyes/lime": [
        "minecraft:lime_dye"
    ],
    "c:dyes/green": [
        "minecraft:green_dye"
    ],
    "c:dyes/brown": [
        "minecraft:brown_dye"
    ],
    "c:dyes/blue": [
        "minecraft:blue_dye"
    ],
    "c:dyes/cyan": [
        "minecraft:cyan_dye"
    ],
    "c:dyes/light_blue": [
        "minecraft:light_blue_dye"
    ],
    "c:dyes/gray": [
        "minecraft:gray_dye"
    ],
    "c:dyes/light_gray": [
        "minecraft:light_gray_dye"
    ],
    "c:dyes/red": [
        "minecraft:red_dye"
    ],
    "c:dyes/white": [
        "minecraft:white_dye"
    ],
    "c:dyes/yellow": [
        "minecraft:yellow_dye"
    ],
    "c:dyes/orange": [
        "minecraft:orange_dye"
    ],
    "c:dyes/pink": [
        "minecraft:pink_dye"
    ],
    "c:dyes/magenta": [
        "minecraft:magenta_dye"
    ],
    "c:gems/emerald": [
        "minecraft:emerald"
    ],
    "c:nuggets/gold": [
        "minecraft:gold_nugget"
    ],
    "c:nuggets/iron": [
        "minecraft:iron_nugget"
    ]

};

export default tagMappings