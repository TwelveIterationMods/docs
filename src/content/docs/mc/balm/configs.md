---
title: Mod Configurations
type: guide
icon: mdi:cog
---

Balm provides a flexible configuration system that supports both declarative and annotation-based approaches.
This documentation explains how to create, register, and use configurations in your mod.

## Declarative vs Annotations

Balm offers two ways to define configurations:

1. Annotation-based Configuration - Using annotated Java classes (simplest)
2. Declarative Configuration - Using a builder pattern (more flexible)

Both approaches are backed by the same system and offer the same functionality. It is up to personal preference which one to choose.

## Getting Started

To use Balm's configuration system, you need to:

1. Create your configuration class (annotation-based) or configuration schema (declarative)
2. Register it with Balm in your mod's constructor

## Declarative Configuration

The declarative approach uses a builder pattern to define configuration properties.

### Creating a configuration schema

```java
public class MyDeclarativeConfig {
    // Create a schema with your mod's namespace and config type
    public static final ConfigSchemaBuilder schema = BalmConfigSchema.create(
        ResourceLocation.fromNamespaceAndPath("yourmodid", "common")
    );

    // Define a boolean property
    public static final ConfiguredBoolean enableFeature = schema
        .property("enableFeature")
        .comment("Enables the special feature")
        .boolOf(true); // default value

    // Define an integer property
    public static final ConfiguredInt maxItems = schema
        .property("maxItems")
        .comment("Maximum number of items")
        .intOf(100); // default value

    // Define a string property
    public static final ConfiguredString welcomeMessage = schema
        .property("welcomeMessage")
        .comment("Message shown to players")
        .stringOf("Welcome to my mod!");

    // Create a category for related settings
    public static final MyCategory advancedSettings = schema
        .category("advanced")
        .comment("Advanced configuration options")
        .via(MyCategory::new);

    // Define a nested category
    public static class MyCategory extends BalmConfigCategoryInitializer {
        public final ConfiguredFloat speedMultiplier = category
            .property("speedMultiplier")
            .comment("Multiplier for movement speed")
            .synced() // This will sync to clients
            .floatOf(1.0f);

        public MyCategory(ConfigCategoryBuilder category) {
            super(category);
        }
    }
}
```

### Registering a configuration schema

Register your configuration in your mod's initialization code:

```java
Balm.getConfig().registerConfig(MyDeclarativeConfig.schema);
```

### Accessing properties

When accessing properties, Balm will automatically use the current active config. This config may differ from the local config, as it includes values that were synced from the server.

```java
// Access a boolean value
boolean featureEnabled = MyDeclarativeConfig.enableFeature.get();

// Access an integer value
int max = MyDeclarativeConfig.maxItems.get();

// Access a category property
float speed = MyDeclarativeConfig.advancedSettings.speedMultiplier.get();
```

### Updating properties

To update a property, you can use the `set()` method - but you must remember to call `saveLocalConfig()` afterwards to apply the changes.

```java
// Update a boolean valu
MyDeclarativeConfig.enableFeature.set(true);

// Update an integer value
MyDeclarativeConfig.maxItems.set(200);

// Update a category property
MyDeclarativeConfig.advancedSettings.speedMultiplier.set(1.5f);

// Save the updated config
Balm.getConfig().saveLocalConfig(MyDeclarativeConfig.schema);
```

## Annotation-based Configuration

The annotation-based approach uses annotations on regular Java fields to define configuration properties.

```java
@Config(value = "yourmodid", type = "common")
public class MyAnnotationConfig {
    @Comment("Enables the special feature")
    public boolean enableFeature = true;

    @Comment("Maximum number of items")
    public int maxItems = 100;

    @Comment("Message shown to players")
    public String welcomeMessage = "Welcome to my mod!";

    @Comment("Advanced configuration options")
    public AdvancedCategory advanced = new AdvancedCategory();

    public static class AdvancedCategory {
        @Comment("Multiplier for movement speed")
        @Synced // This will sync to clients
        public float speedMultiplier = 1.0f;

        @NestedType(String.class) // Important to specify on Lists and Sets
        @Comment("List of allowed items")
        public List<String> allowedItems = Arrays.asList("minecraft:diamond", "minecraft:gold_ingot");
    }
}
```

### Registering a configuration schema

Register your configuration class in your mod's initialization code:

```java
Balm.getConfig().registerConfig(MyAnnotationConfig.class);
```

Under the hood, Balm will automatically create a declarative schema for your configuration class.

### Accessing properties

You can retrieve the current configuration with all fields set to their configured values from Balm. This config may differ from the local config, as it includes values that were synced from the server.

```java
// Get the active config object
MyReflectionConfig config = Balm.getConfig().getActiveConfig(MyReflectionConfig.class);

// Access properties
boolean featureEnabled = config.enableFeature;
int max = config.maxItems;
float speed = config.advanced.speedMultiplier;
```

### Updating properties

To update a property, you should use the `updateLocalConfig()` method and update the field values of the passed in config object.

```java
Balm.getConfig().updateLocalConfig(MyReflectionConfig.class, config -> {
    config.maxItems = 200;
    config.advanced.speedMultiplier = 1.5f;
});
```

## Config Sync

Properties marked as `.synced()` or `@Synced` will be synced from server to clients when they join. These changes are temporary and only apply to the active config, not the local config.

## Loader-specific Differences

On Forge and NeoForge, local configs are managed by the mod loader and Balm acts as an access and sync layer.
On Fabric, Balm manages local configs itself using a subset of the TOML format. 
The resulting TOML files are identical in both format and naming.

Note that only the config types "common" and "client" are supported across all three mod loaders. While the Fabric version could technically support other custom types as well, using them is not recommended unless you are building a mod exclusively for Fabric.

## Supported Config Screen

Balm automatically integrates with Mod Menu on Fabric to provide support for the following configuration screen mods:

- Cloth Config
- Configured

Since configs are managed through the default config system in NeoForge and Forge, any configuration screen mod that supports Neo/Forge's config system should work out of the box.

## Supported Property Types

Balm supports the following property types:

- `boolean`
- `int`
- `long`
- `float`
- `double`
- `String`
- `ResourceLocation` (maps to `namespace:path` strings)
- `any enum implementing StringRepresentable` (maps to enum's `getSerializedName()`)
- `List<any of the above>`
- `Set<any of the above>`

If you need property types beyond these, there's a good chance your use case would be better solved through a data pack.