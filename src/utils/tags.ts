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
    "forge:stone": [
        "minecraft:andesite",
        "minecraft:diorite",
        "minecraft:granite",
        "minecraft:infested_stone",
        "minecraft:stone",
        "minecraft:polished_andesite",
        "minecraft:polished_diorite",
        "minecraft:polished_granite"
    ],
    "forge:chests/wooden": [
        "minecraft:chest",
        "minecraft:trapped_chest"
    ],
    "forge:rods/wooden": [
        "minecraft:stick"
    ],
    "forge:storage_blocks/iron": [
        "minecraft:iron_block"
    ],
    "forge:storage_blocks/steel": [
        "c:steel_block"
    ],
    "forge:ingots/steel": [
        "c:steel_ingot"
    ],
    "forge:ingots/iron": [
        "minecraft:iron_ingot"
    ],
    "forge:ingots/gold": [
        "minecraft:gold_ingot"
    ],
    "forge:nuggets/iron": [
        "minecraft:iron_nugget"
    ],
    "forge:nuggets/gold": [
        "minecraft:gold_nugget"
    ],
    "forge:gems/diamond": [
        "minecraft:diamond"
    ],
    "forge:gems/emerald": [
        "minecraft:emerald"
    ],
    "forge:dusts/redstone": [
        "minecraft:redstone"
    ],
    "forge:dusts/glowstone": [
        "minecraft:glowstone_dust"
    ],
    "forge:dyes/orange": [
        "minecraft:orange_dye"
    ],
    "forge:dyes/magenta": [
        "minecraft:magenta_dye"
    ],
    "forge:dyes/light_blue": [
        "minecraft:light_blue_dye"
    ],
    "forge:dyes/yellow": [
        "minecraft:yellow_dye"
    ],
    "forge:dyes/lime": [
        "minecraft:lime_dye"
    ],
    "forge:dyes/pink": [
        "minecraft:pink_dye"
    ],
    "forge:dyes/gray": [
        "minecraft:gray_dye"
    ],
    "forge:dyes/light_gray": [
        "minecraft:light_gray_dye"
    ],
    "forge:dyes/cyan": [
        "minecraft:cyan_dye"
    ],
    "forge:dyes/purple": [
        "minecraft:purple_dye"
    ],
    "forge:dyes/blue": [
        "minecraft:blue_dye"
    ],
    "forge:dyes/brown": [
        "minecraft:brown_dye"
    ],
    "forge:dyes/green": [
        "minecraft:green_dye"
    ],
    "forge:dyes/red": [
        "minecraft:red_dye"
    ],
    "forge:dyes/black": [
        "minecraft:black_dye"
    ],
    "forge:glass_panes/colorless": [
        "minecraft:glass_pane"
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
        "waystones:mossy_waystone"
    ],
    "waystones:waystone": [
        "waystones:waystone",
        "waystones:sandy_waystone",
        "waystones:mossy_waystone"
    ],
    "waystones:sharestones": [
        "waystones:sharestone",
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
        "waystones:white_sharestone",
        "waystones:yellow_sharestone"
    ],
    "waystones:sharestone": [
        "waystones:sharestone",
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
        "waystones:white_sharestone",
        "waystones:yellow_sharestone"
    ],
    "waystones:dyed_sharestones": [
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
        "waystones:white_sharestone",
        "waystones:yellow_sharestone"
    ],
    "balm:purple_dyes": [
        "minecraft:purple_dye"
    ],
    "balm:black_dyes": [
        "minecraft:black_dye"
    ],
    "balm:lime_dyes": [
        "minecraft:lime_dye"
    ],
    "balm:green_dyes": [
        "minecraft:green_dye"
    ],
    "balm:brown_dyes": [
        "minecraft:brown_dye"
    ],
    "balm:blue_dyes": [
        "minecraft:blue_dye"
    ],
    "balm:cyan_dyes": [
        "minecraft:cyan_dye"
    ],
    "balm:light_blue_dyes": [
        "minecraft:light_blue_dye"
    ],
    "balm:gray_dyes": [
        "minecraft:gray_dye"
    ],
    "balm:light_gray_dyes": [
        "minecraft:light_gray_dye"
    ],
    "balm:red_dyes": [
        "minecraft:red_dye"
    ],
    "balm:white_dyes": [
        "minecraft:white_dye"
    ],
    "balm:yellow_dyes": [
        "minecraft:yellow_dye"
    ],
    "balm:orange_dyes": [
        "minecraft:orange_dye"
    ],
    "balm:pink_dyes": [
        "minecraft:pink_dye"
    ],
    "balm:magenta_dyes": [
        "minecraft:magenta_dye"
    ],
    "balm:emeralds": [
        "minecraft:emerald"
    ],
    "balm:gold_nuggets": [
        "minecraft:gold_nugget"
    ],
    "c:purple_dyes": [
        "minecraft:purple_dye"
    ],
    "c:black_dyes": [
        "minecraft:black_dye"
    ],
    "c:lime_dyes": [
        "minecraft:lime_dye"
    ],
    "c:green_dyes": [
        "minecraft:green_dye"
    ],
    "c:brown_dyes": [
        "minecraft:brown_dye"
    ],
    "c:blue_dyes": [
        "minecraft:blue_dye"
    ],
    "c:cyan_dyes": [
        "minecraft:cyan_dye"
    ],
    "c:light_blue_dyes": [
        "minecraft:light_blue_dye"
    ],
    "c:gray_dyes": [
        "minecraft:gray_dye"
    ],
    "c:light_gray_dyes": [
        "minecraft:light_gray_dye"
    ],
    "c:red_dyes": [
        "minecraft:red_dye"
    ],
    "c:white_dyes": [
        "minecraft:white_dye"
    ],
    "c:yellow_dyes": [
        "minecraft:yellow_dye"
    ],
    "c:orange_dyes": [
        "minecraft:orange_dye"
    ],
    "c:pink_dyes": [
        "minecraft:pink_dye"
    ],
    "c:magenta_dyes": [
        "minecraft:magenta_dye"
    ],
    "c:emeralds": [
        "minecraft:emerald"
    ],
    "c:gold_nuggets": [
        "minecraft:gold_nugget"
    ]

};

export default tagMappings