---
title: Configuration
type: guide
icon: mdi:cogs
---

The config files can be found in the config folder of your instance. 

See the [FAQ](/faq#configuration) for more information on how to edit configuration files.

## Options

| field                  | description                                                                                                                                              | default |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| cowJarEnabled          | If true, a cow can be squished into a Milk Jar by dropping an anvil on top.                                                                              | true    |
| cowJarMilkPerTick      | The amount of milk the cow in a jar generates per tick.                                                                                                  | 0.5     |
| sinkRequiresWater      | Set this to true if you'd like the sink to require water to be piped in, instead of providing infinite of it.                                            | false   |
| largeCounters          | Enabling this will make the kitchen counters have twice as much inventory space. You will have to break and re-place the blocks for this to take effect. | false   |
| disallowOvenAutomation | Set this to true if you'd like to disallow automation of the oven (pipes and such won't be able to insert/extract)                                       | false   |
| ovenFuelTimeMultiplier | The fuel multiplier for the cooking oven. Higher values means fuel lasts longer, 1.0 is furnace default.                                                 | 0.33    |
| ovenCookTimeMultiplier | The cooking time multiplier for the cooking oven. Higher values means it will take longer.                                                               | 1       |
| ovenRequiresCookingOil | Set this to true if you'd like the oven to only accept cooking oil as fuel (requires Pam's Harvestcraft)                                                 | false   |
| showIngredientIcon     | Set to false if you don't want ingredients to be marked with a special icon in the recipe book.                                                          | true    |
