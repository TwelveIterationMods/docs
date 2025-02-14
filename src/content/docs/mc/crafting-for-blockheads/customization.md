---
title: Customization
type: guide
icon: mdi:puzzle-edit
---

Crafting for Blockheads is highly customizable and in most cases only makes sense when tailored to your specific modpack's progression or needs.

You can define custom workshops, tabs and recipes to be available within that workshop, multiblock requirements and progressive unlocks.

This guide gives an overview over the different options available in customization. You can also find a [full example](#full-example) at the end of this page.

## Table of Contents

## Simple Registry

The simple registry supports all the same features as the data pack variant, but is defined in the `CraftingForBlockheadsRegistry.json` file in the config folder.
Unlike a data pack, this file cannot be individually enabled or disabled. It is a good choice for making changes to existing packs or prototyping.

## Advanced Registry (Data Packs)

Crafting for Blockheads loads its data from json files located in data packs under the path `craftingforblockheads`, for example: `data/mycustomdatapack/craftingforblockheads/mycustomdata.json`

## Registry Format

Json files can either have a json object at its root, or an array of json objects. When using the array variant, you can define multiple providers in a single file, e.g. for defining multiple presets or optional mod compatibility. However, in most cases, you will probably be fine with just a single object.

The format of a json provider divides into the following properties:

| Field      | Description                                                                                                                                     |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| modid      | The mod id that has to be present for this data to be loaded                                                                                    |
| preset     | The preset that has to be enabled in the config for this data to be loaded, i.e. "default" or "hardmode"                                        |
| predicates | A dictionary of predicates that can later be referenced. See Predicates below for more information.                                             |
| groups     | A dictionary of items that should be grouped into a single craftable despite being separate items (e.g. the different wood variants of buttons) |
| filters    | A dictionary of filters that divide the craftables into categories. These filters will show up as tab buttons on the workshop menu.             |
| craftables | A list of items whose recipes should be available in the workshop. **This is automatically populated by filters, so you should not need it!**   |

## Referencing Items

The mod uses Minecraft's ingredient format for defining item references, such as when defining a filter or groups.

This means that you can use the following formats in properties that expect items:

```json
{
    "tag": "minecraft:tools"
}
```

```json
{
    "item": "minecraft:stone_pickaxe"
}
```

Optionally, you can also define nbt data:

```json
{
    "item": "minecraft:stone_pickaxe",
    "nbt": {
        "Hello": "World"
    }
}
```

## Defining a Predicate

Predicates are used to define conditions that need to be met for a filter or item to be available.

Predicates are defined in a dictionary, where the key is a unique id for the predicate, and the value is a json object (or array of objects) with the following properties:

| Field | Description                                                                         |
| ----- | ----------------------------------------------------------------------------------- |
| type  | The type of predicate. See below for more information.                              |
| ...   | The properties required for this type of predicate. See below for more information. |

### workshop_core

Crafting for Blockheads is designed in a way that allows for multiple kinds of workshops. It is not restricted to only its own workshop block.
See the [Workshop Cores](#workshop-cores) section for more information.

The `workshop_core` predicate verifies the activating item or block to match, i.e. the block that was right clicked to open the workshop.

A specific block, e.g. the workshop block:

```json
{
    "type": "workshop_core",
    "block": "craftingforblockheads:workshop"
}
```

A tag of an item or block, e.g. any of the workshop cores:

```json
{
    "type": "workshop_core",
    "tag": "craftingforblockheads:workshop_core"
}
```

A specific item, e.g. a stick:

```json
{
    "type": "workshop_core",
    "item": "minecraft:stick"
}
```

### workshop_has

The `workshop_has` predicate verifies that the workshop multiblock has a specific block attached.

A specific block, e.g. a barrel:

```json
{
    "type": "workshop_has",
    "block": "minecraft:barrel"
}
```

A tag of a block, e.g. any of the anvil states (normal, chipped, damaged):

```json
{
    "type": "workshop_has",
    "tag": "minecraft:anvil"
}
```

### workshop_contains

The `workshop_contains` predicate verifies that the workshop multiblock or player inventory contains a specific item.

A specific item, e.g. a bucket (this does not currently support NBT!):

```json
{
    "type": "workshop_contains",
    "item": "minecraft:bucket"
}
```

A tag of an item, e.g. any sword:

```json
{
    "type": "workshop_contains",
    "tag": "minecraft:swords"
}
```

### meets_predicate

The `meets_predicate` predicate verifies that a specific other predicate is met.

Be careful not to create circular dependencies with this predicate, or you will crash with a StackOverflowException.

````json
{
    "type": "meets_predicate",
    "predicate": "craftingforblockheads:workbench_used"
}
``

### has_advancement

The `has_advancement` predicate verifies that the player has a specific advancement.

```json
{
    "type": "has_advancement",
    "advancement": "minecraft:story/mine_stone"
}
````

### has_gamestage (GameStages mod)

The `has_gamestage` predicate verifies that the player has a specific gamestage from the GameStages mod.

```json
{
    "type": "has_gamestage",
    "gamestage": "hello_world"
}
```

### all_of

The `all_of` predicate verifies that all of the conditions in the array are met.

```json
{
    "type": "all_of",
    "conditions": [
        {
            "type": "workshop_has",
            "block": "minecraft:barrel"
        },
        {
            "type": "workshop_has",
            "block": "minecraft:anvil"
        }
    ]
}
```

### any_of

The `any_of` predicate verifies that at least one of the conditions in the array is met.

```json
{
    "type": "any_of",
    "conditions": [
        {
            "type": "workshop_has",
            "block": "minecraft:barrel"
        },
        {
            "type": "workshop_has",
            "block": "minecraft:anvil"
        }
    ]
}
```

### none_of

The `none_of` predicate verifies that none of the conditions in the array are met.

```json
{
    "type": "none_of",
    "conditions": [
        {
            "type": "workshop_has",
            "block": "minecraft:barrel"
        },
        {
            "type": "workshop_has",
            "block": "minecraft:anvil"
        }
    ]
}
```

### not

The `not` predicate verifies that the condition is not met.

```json
{
    "type": "not",
    "condition": {
        "type": "workshop_has",
        "block": "minecraft:barrel"
    }
}
```

## Defining a Filter

Filters define a category of items that can be crafted. They will show up as a tab button in applicable workshops.

Filters are defined in a dictionary, where the key is a unique id for the filter, and the value is a json object with the following properties:

| Field             | Description                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| name              | The name of the filter. This can be a translation key as well.                                     |
| includes          | An array of items that should be included in this filter.                                          |
| excludes          | An array of items that should be excluded from this filter. Entries take precedence over includes. |
| icon              | An item (not a tag) to use as the icon of the filter tab.                                          |
| hard_requirements | An array of predicate ids that need to be met for this filter to show up at all.                   |
| soft_requirements | An array of predicate ids that need to be met for this filter to not be locked.                    |
| priority          | A number that defines the order of the filter tabs. Higher priority shows up first.                |

This filter creates a tab for Tools, with an iron pickaxe as its icon, and includes all items that are tagged as tools or fishing rods, but excludes all items that are tagged as swords. It will only show up if the `workbench_used` predicate is met, which is a predicate defined in the same file.

```json
{
    "filters": {
        "craftingforblockheads:tools": {
            "name": "Tools",
            "icon": {
                "item": "minecraft:iron_pickaxe"
            },
            "includes": [
                {
                    "tag": "minecraft:tools"
                },
                {
                    "tag": "minecraft:fishing_rods"
                }
            ],
            "excludes": [
                {
                    "tag": "minecraft:swords"
                }
            ],
            "hard_requirements": ["workbench_used"],
            "priority": 900
        }
    }
}
```

## Defining a Group

Some items are functionally identical, but have different textured variants (e.g. buttons for each wood type). To avoid cluttering the workshop with all these variants, these items can be grouped together into a single slot, that will allow navigation through the recipes just like with items that were to have multiple recipes themselves.

Groups are defined in a dictionary, where the key is the item id the content should be grouped under, and the value is an array of items that should be grouped inside that parent item.

This example groups all buttons under a single oak button entry in the workshop:

```json
{
    "groups": {
        "minecraft:oak_button": [
            {
                "tag": "minecraft:buttons"
            }
        ]
    }
}
```

## Workshop Cores

Blocks and items can be given the tag `craftingforblockheads:is_workshop_core`, which will override their behaviour when used to open a workshop menu.

This can be used in conjunction with the `workshop_core` predicate to allow for multiple kinds of workshops.

This is best used with mods that let you create custom blocks or items.

Remember that block tags are different from item tags! Make sure to put your item or block into the correct `craftingforblockheads:is_workshop_core` tag depending on whether you want a placed block or a used item to open the workshop.

## Workshop Connectors

Blocks that should connect blocks within the multiblock without providing any workshop functionality can be given the tag `craftingforblockheads:workshop_connectors`.

This will ensure that the block and its surroundings will be considered for being a part of the multiblock.

## Workshop Item Providers

Blocks that should provide items to the workshop can be given the tag `craftingforblockheads:workshop_item_providers`. This supports any Container or ItemHandler block (such as chests), as long as they behave like normal inventories (i.e. it may not work correctly with more complex storage mods).

## Item Requirements

Just like filters can have requirements, individual items can have them as well.

Item requirements are defined as tags on the item, following the format `craftingforblockheads:soft_requires_<id>` or `craftingforblockheads:requires_<id>`, where `<id>` is the id of the predicate. If an item is missing only soft requirements, it will still show up in the workshop, but will be locked.

## Exclusive Recipes

Items can be given the tag `craftingforblockheads:is_workshop_exclusive`, preventing them from being crafted through usual means like Crafting Tables.

## Localization

Filter names can be supplied as translation keys to allow for localization.

When a filter or item is missing a soft predicate, it will say so in the tooltip. For this to work, a translation must be supplied at least in `en_us.json`:

`tooltip.craftingforblockheads.missing_` + `<predicate id>`, e.g. `tooltip.craftingforblockheads.missing_metalworking` if a predicate called "metalworking" has not been met.

Translation files can be added in resource packs, and the various modpack customization mods probably have a way to add them as well.

## Full Example

```json
{
    "modid": "craftingforblockheads",
    "preset": "demo",
    "predicates": {
        "workbench_used": {
            "type": "workshop_core",
            "block": "craftingforblockheads:workbench"
        },
        "metalworking": {
            "type": "workshop_has",
            "block": "minecraft:anvil"
        }
    },
    "groups": {
        "minecraft:oak_button": [
            {
                "tag": "minecraft:buttons"
            }
        ]
    },
    "filters": {
        "craftingforblockheads:tools": {
            "name": "Tools",
            "icon": {
                "item": "minecraft:iron_pickaxe"
            },
            "includes": [
                {
                    "tag": "minecraft:tools"
                },
                {
                    "tag": "minecraft:fishing_rods"
                }
            ],
            "excludes": [
                {
                    "tag": "minecraft:swords"
                }
            ],
            "hard_requirements": ["workbench_used"],
            "priority": 900
        },
        "craftingforblockheads:combat": {
            "name": "Combat",
            "icon": {
                "item": "minecraft:iron_sword"
            },
            "includes": [
                {
                    "tag": "minecraft:swords"
                },
                {
                    "tag": "forge:armors"
                },
                {
                    "tag": "forge:bows"
                },
                {
                    "tag": "forge:shields"
                }
            ],
            "hard_requirements": ["workbench_used"],
            "soft_requirements": ["metalworking"]
        },
        "craftingforblockheads:redstone": {
            "name": "Redstone",
            "icon": {
                "item": "minecraft:redstone"
            },
            "includes": [
                {
                    "item": "minecraft:redstone_torch"
                },
                {
                    "item": "minecraft:repeater"
                },
                {
                    "item": "minecraft:comparator"
                },
                {
                    "item": "minecraft:lever"
                },
                {
                    "tag": "minecraft:buttons"
                }
            ],
            "hard_requirements": ["workbench_used"]
        }
    }
}
```
