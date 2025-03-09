---
title: Mod Proxies
type: guide
priority: 10
icon: mdi:puzzle
---

## Overview

Mod proxies are a way of abstracting mod integrations away through a common interface and conditionally use different implementations based on which other mods are loaded in the environment. This enables seamless integration with third party mods without introducing hard dependencies or loader-specific code.

## Key Concepts

Mod proxies provide:

- Common Interfaces: Load different mod-specific implementations under a mod-independent interface
- Fallbacks: Use a default implementation when no mod providing an implementation is present
- Multiplexing: Define how to handle multiple supported mods being present (by default: uses the first defined)

## Usage

### Creating a Mod Proxy

The most common use case is to create a specific implementation when a mod is present, with a fallback for when it's not:

```java
MyInterface implementation = Balm.<MyInterface>modProxy()
    .with("othermodid", "com.example.mod.compat.OtherModImplementation")
    .withFallback(new DefaultImplementation())
    .build();
```

This code will:

1. Check if `"othermodid"` is loaded
2. If loaded, instantiate the `OtherModImplementation` class
3. If not loaded, use the fallback implementation (`DefaultImplementation`) you provide

### Multiple Implementations

You can chain multiple mod integrations:

```java
MyInterface implementation = Balm.<MyInterface>modProxy()
    .with("modid-a", "com.example.mod.compat.ModAImplementation")
    .with("modid-b", "com.example.mod.compat.ModBImplementation")
    .withFallback(new DefaultImplementation())
    .build();
```

By default, the first loaded mod's implementation (in order of `.with()` calls) will be used. If neither mod is loaded, the fallback is used.

### Multiplexing

In some cases, you might want to specially handle multiple implementations being present instead of just using the first one:

```java
MyInterface implementation = Balm.<MyInterface>modProxy()
    .with("modid-a", "com.example.mod.ModAImplementation")
    .with("modid-b", "com.example.mod.ModBImplementation")
    .withMultiplexer(implementations -> new CombinedImplementation(implementations))
    .withFallback(new DefaultImplementation())
    .build();
```

The multiplexer function receives a list of all loaded implementations and should return a single combined implementation.

### Real World Examples

Balm itself uses mod proxies for its Trinkets/Curios integration, as well as its Permissions support on Fabric.

Here's how Balm itself uses mod proxies for the permissions system:

```java
BalmPermissions permissions = Balm.<BalmPermissions>modProxy()
    .with("fabric-permissions-api-v0", "net.blay09.mods.balm.fabric.compat.FabricPermissionsAPIIntegration")
    .withFallback(new CommonBalmPermissions())
    .build();
```

This code creates a permissions system that integrates with fabric-permissions-api (third-party-mod) when available, but falls back to a standard implementation when the API isn't present.

### Requirements for Proxy Classes

Implementation classes loaded through the mod proxy system must:

- Implement the interface you're proxying
- Have a public no-argument constructor

### Comparison with Other Proxy Types

Balm also provides other proxy types:

- Platform Proxies: For platform-specific code (e.g. NeoForge vs Fabric)
- Sided Proxies: For client vs server code (only rarely needed nowadays)