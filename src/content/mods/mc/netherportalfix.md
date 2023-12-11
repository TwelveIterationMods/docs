---
title: NetherPortalFix
description: Ensures correct destinations when travelling back and forth through Nether Portals in Multiplayer.
cover: ./netherportalfix.png
priority: 950
loaders: ['Forge', 'Fabric', 'NeoForge']
category: Quality of Life
curseForgeSlug: netherportalfix
curseForgeId: 241160
---

Ever played on a multiplayer server, built near other players and when returning from the Nether, surprisingly found yourself in another player's base?
It's because of the 8:1 block ratio between the Nether and the Overworld.
It's really weird though that you enter a portal in the overworld, and then when going back through where you came, come out of a different portal in the overworld.
This mod fixes that issue.

It keeps track of what portals a player went through in order to ensure correct destinations when the player is going back through the same portals.
The 1:8 ratio remains, portals just get smarter and remember where you came from.