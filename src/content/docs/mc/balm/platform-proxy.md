---
title: Platform Proxies
type: guide
priority: 10
icon: mdi:anvil
---

## Overview

Platform proxies in Balm provide a mechanism to load platform-specific implementations dynamically based on the mod loader platform (Fabric, Forge, or NeoForge) the mod is running on.

Most features you would normally need to access are already abstracted through other means using the Balm API, and there is a good chance you do not need to use platform proxies. They merely exist as a simple way to extend Balm's capabilities for things that are not already natively supported.

Balm's platform proxy system allows you to:

- Define a common interface to abstract loader-specific code into common-accessible code
- Provide implementations for your interface on each loader individually
- Have Balm automatically load the appropriate implementation when accessing your proxy

## Usage

```java
// Define implementations for each platform
MyInterface instance = Balm.platformProxy()
    .withFabric("com.example.mymod.fabric.FabricImplementation")
    .withForge("com.example.mymod.forge.ForgeImplementation") 
    .withNeoForge("com.example.mymod.neoforge.NeoForgeImplementation")
    .build();
```

## Requirements for Proxy Classes

Implementation classes loaded through the platform proxy system must:

- Implement the interface you're proxying
- Have a public no-argument constructor

## Platform Detection

For the rare case where you need to handle some mod logic differently on one platform without needing to access loader-specific code, Balm also provides the currently running platform through `Balm.getPlatform()` and its supported platforms in the `LoaderPlatforms` class.

```java
if (Balm.getPlatform().equals(LoaderPlatforms.FABRIC)) {
    // Do something that only happens on Fabric (but obviously, without having access to Fabric APIs)
}
```

### Comparison with Other Proxy Types

Balm also provides other proxy types:

- Mod Proxies: For mod-specific code (e.g. abstracting away different currency mods)
- Sided Proxies: For client vs server code (only rarely needed nowadays)