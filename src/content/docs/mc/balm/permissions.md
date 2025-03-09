---
title: Permission System
type: guide
priority: 10
icon: mdi:alert-decagram
---

## Overview

The Balm permission system provides a platform-agnostic way to handle permissions across different Minecraft mod loaders (Fabric, Forge, NeoForge). It integrates with each platform's native permission systems when available, falling back to a common implementation otherwise.

## Core Concepts

### Permission Identifiers

Permissions are identified using Minecraft's ResourceLocation objects in the format:

- Namespace: typically your mod ID
- Path: the specific permission path (dot.seperated)

Example: 
```java
private static final ResourceLocation PERMISSION_YOURCOMMAND = ResourceLocation.fromNamespaceAndPath("yourmod", "command.yourcommand")
```

### Permission Context

Permissions are resolved in a specific context, which can be:

- A player context
- A command source context (player, entity or command block)
- An offline player (UUID only)

Note that only player contexts are fully supported on all platforms. Most permission systems do not support non-player permissions and will instead fall back to the default resolver you specify when registering your permissions. At the moment, Balm also does not support offline player permissions.

### Usage

#### Registiering Permissions

```java
// For commands, there is a helper method to register a permission which will use the permission system for players and fall back to the regular Vanilla permission level check for non-players like command blocks.
BalmCommands.registerPermission(
    ResourceLocation.fromNamespaceAndPath("mymod", "command.feature"),
    2 // Permission level: 2 (gamemaster), same as e.g. /gamerule command
);

// You can also register custom permissions. For example, the above helper method uses this:
Balm.getPermissions().registerPermission(
    permission,
    (context) -> context.getCommandSource().map(it -> it.hasPermission(permissionLevel)).orElse(false)
);
```

#### Checking Permissions

```java
// Check if a player has a permission
boolean hasPermission = Balm.getPermissions().hasPermission(player, permission);

// Check if a command source has a permission
boolean hasPermission = Balm.getPermissions().hasPermission(commandSource, permission);
```

#### Requiring Permissions on Commands

The `BalmCommands` interface provides helper methods for command permission checks:

```java
// Require a single permission
Commands.literal("mycommand")
    .requires(BalmCommands.requirePermission(PERMISSION_ID))
    .executes(context -> { /* command logic */ });

// Require any of multiple permissions
Commands.literal("mycommand")
    .requires(BalmCommands.requireAnyPermission(PERMISSION_A, PERMISSION_B))
    .executes(context -> { /* command logic */ });

// Require all permissions
Commands.literal("mycommand")
    .requires(BalmCommands.requireAllPermissions(PERMISSION_A, PERMISSION_B))
    .executes(context -> { /* command logic */ });
```

### Platform Integrations

Balm automatically integrates with:

- `fabric-permissions-api` (third party mod) when it's present on Fabric
- The NeoForge PermissionAPI on NeoForge
- The Forge PermissionAPI on Forge
- Fallback to your defined default resolvers / vanilla permission levels when no permission handler is installed

### Example

```java
public class MyCommand {
    private static final ResourceLocation MY_PERMISSION = 
        ResourceLocation.fromNamespaceAndPath("mymod", "command.feature");

    public static void register(CommandDispatcher<CommandSourceStack> dispatcher) {
        // Register permission with level 2 access (gamemasters)
        BalmCommands.registerPermission(MY_PERMISSION, 2);

        dispatcher.register(Commands.literal("mymod")
            .then(Commands.literal("feature")
                .requires(BalmCommands.requirePermission(MY_PERMISSION))
                .executes(context -> {
                    // Command implementation
                    context.getSource().sendSuccess(() -> 
                        Component.literal("Feature executed!"), true);
                    return 1;
                })
            )
        );
    }
}
```