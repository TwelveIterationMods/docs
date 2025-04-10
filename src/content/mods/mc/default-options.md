---
title: Default Options
description: A way for modpacks to ship a default (key) configuration without having to include an options.txt file. Also allows local options from any mod .cfg file.
cover: ./default-options.png
priority: 960
loaders: ['Forge', 'Fabric', 'NeoForge']
gameVersions: ['1.21.4','1.21.3','1.21.1', '1.20.6', '1.20.4', '1.20.1']
category: Utilities
curseForgeSlug: default-options
modrinthSlug: default-options
modId: defaultoptions
curseForgeId: 232131
---

This mod can be used by Modpack developers to distribute default options and keybindings without overriding user changes on every modpack update.

Instead of shipping the options.txt directly, you will ship a "defaultoptions" folder in your modpack which contains the defaults previously saved through the /defaultoptions command.