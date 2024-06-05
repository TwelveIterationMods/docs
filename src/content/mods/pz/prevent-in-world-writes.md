---
title: Prevent In-World Writes
cover: ./prevent-in-world-writes.png
badge: new
description: Prevents players from writing to journals in-world to circumvent a PZ saving bug.
loaders: ['Steam']
category: Utilities
steamId: 3121196793
github: TwelveZeds/PreventInWorldWrites
modId: PreventInWorldWrites
---

Due to a Project Zomboid bug, writing to a notebook on the floor will not save its content unless the notebook is picked up and placed back down.

This can lead to accidental loss of writings between server restarts when said writing is done without picking up the notebook first.

This mod forces players to pick up notebooks from the ground before writing to them, by replacing the "Write on" option with a "Read" option if the notebook is on the ground, and adding an additional "Write on Notebook (Grab)" option that will first pick up the item and then open the writing window.