---
title: Balm
description: Library mod required for all of BlayTheNinth's mods.
cover: ./balm.png
priority: 860
loaders: ['Forge', 'Fabric', 'NeoForge']
gameVersions: ['1.21.4','1.21.3','1.21.1', '1.20.6', '1.20.4', '1.20.1']
category: Library
curseForgeSlug: balm
modrinthSlug: balm
modId: balm
curseForgeId: 531761
---

Balm is a library mod for mod developers that simplifies the process of creating multi-loader mods by providing common interfaces and events and removing the need for most mod-loader specific code.

It is not a magic solution for running Forge and Fabric mods together. As a user, you only need to install this mod if you use a mod that requires it.

---

### Key Points

- No custom Gradle tooling, official mod loader plugins only
- Uses Mojang Mappings, supports Jared's Multiloader-Template
- All-inclusive from networking to configs, no third party dependencies
- Battle-tested across Blay's 20+ mods ranging from content additions to quality of life utilities
- Supports NeoForge, Fabric and Forge without duplicate code
- Unified support for Third Party Mods like Curios/Trinkets or Jade/TheOneProbe

---

### How to make a mod with Balm (as a mod developer)

You can get started [using this template repository](https://github.com/TwelveIterationMods/balm-mod).

There is no documentation, but the template gives an overview of most features and you can browse Blay's other mods' code to learn how specific things are done.