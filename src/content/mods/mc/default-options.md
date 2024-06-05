---
title: Default Options
description: A way for modpacks to ship a default (key) configuration without having to include an options.txt file. Also allows local options from any mod .cfg file.
cover: ./default-options.png
priority: 960
loaders: ['Forge', 'Fabric', 'NeoForge']
category: Utilities
curseForgeSlug: default-options
modId: defaultoptions
curseForgeId: 232131
---

This mod can be used by Modpack developers to distribute default options and keybindings without overriding user changes on every modpack update.

Instead of shipping the options.txt directly, you will ship a "defaultoptions" folder in your modpack which contains the defaults previously saved through the /defaultoptions command.