---
title: Customization
type: guide
icon: mdi:puzzle-edit
---


Mod compatibility with Cooking for Blockheads can be achieved using data pack JSON files.

See [here](https://github.com/TwelveIterationMods/CookingForBlockheads/tree/1.19.x/forge/src/main/resources/data/cookingforblockheads/cookingforblockheads/compat) for examples of already inbuilt files.

If you're creating custom compatibility files, you can give back to the community by submitting them as a [Pull Request](https://github.com/TwelveIterationMods/CookingForBlockheads/pulls) in the repository.

## Folder Format

In your data pack, you need a new folder "cookingforblockheads" with a subfolder "compat".

Your full path may look like:

`data/mycustomdatapack/cookingforblockheads/compat/`

In that folder, you can create JSON files for each mod compatibility. The file can be named anything, but it's best to name it after the mod id of the mod you're integrating.

## File Format

The files are written in JSON. Please be sure to test your files in a [JSON validator](https://jsonlint.com/) and read up on the basics of JSON before reporting issues.

### Fields
| field                | description                                                                                                                                                                                                                          |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| modid                | The mod id of the mod you're integrating. The file will only be loaded if that mod is loaded.                                                                                                                                        |
| foods                | An object containing named arrays to specify additional food items that can not be picked up automatically (e.g. because they're not edible but only ingredients). Currently, only the keys "GENERAL" and "INGREDIENTS" are allowed. |
| tools                | An array of item registry names for items that should count as tools. Tools will be displayed as "missing tools" when missing instead of making a recipe not show up at all.                                                         |
| water                | An array of items that are equivalent to a bucket of water. This is used for Pam's Fresh Water, for example. The sink will be able to provide these items to recipes.                                                                |
| milk                 | An array of items that are equivalent to a bucket of milk. This is used for Pam's Fresh Milk, for example. The milk jar will be able to provide these items to recipes.                                                              |
| toaster              | An array of objects with keys `input` and `output` specifying what items can be toasted into what by the toaster.                                                                                                                    |
| kitchenConnectors    | An array of TileEntity or Block registry names that can bridge gaps in Multiblock Kitchens similar to the Kitchen Floor.                                                                                                             |
| kitchenItemProviders | An array of TileEntity registry names whose inventories should be considered for the Multiblock Kitchen. Use with care, as not all inventories will work correctly.                                                                  |

### Example

This is the inbuilt Vanilla example:

```json
{
  "modid": "minecraft",
  "foods": {
    "GENERAL": [
      "minecraft:cake"
    ],
    "INGREDIENTS": [
      "minecraft:sugar"
    ]
  },
  "tools": [
    "minecraft:bucket"
  ],
  "water": [
    "minecraft:water_bucket"
  ],
  "milk": [
    "minecraft:milk_bucket"
  ]
}
```

This is a short example for making toast compatible (also from the inbuilt files):

```json
{
  "modid": "pamhc2foodcore",
  "toaster": [
    {
        "input": "minecraft:bread",
        "output": "pamhc2foodcore:toastitem"
    }
  ]
}
```

And this is the inbuilt Storage Drawers compatibility as an example for supporting custom blocks in the multiblock:

```json
{
  "modid": "storagedrawers",
  "kitchenConnectors": [
    "storagedrawers:controller_slave",
    "storagedrawers:controller",
    "storagedrawers:oak_trim",
    "storagedrawers:spruce_trim",
    "storagedrawers:birch_trim",
    "storagedrawers:jungle_trim",
    "storagedrawers:acacia_trim",
    "storagedrawers:dark_oak_trim"
  ],
  "kitchenItemProviders": [
    "storagedrawers:standard_drawers_1",
    "storagedrawers:standard_drawers_2",
    "storagedrawers:standard_drawers_4",
    "storagedrawers:fractional_drawers_3"
  ]
}
```

Note that the controller is a connector (only bridges multi-blocks, does not provide items) instead of an item provider.
This is because mass storage blocks like the Storage Drawers Controller (or other storage systems) often do not respond well when being used as a source inventory.

Be careful about what blocks you add as item providers and make sure to test them to avoid odd visual bugs, dupe bugs or even crashes.