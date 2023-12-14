# Mod Documentation powered by Astro

Clone the repository and run `pnpm dev` to preview your changes locally.

## 🚀 Project Structure

```text
/
├── src/
│   ├── content/
│   │   └── games/
│   │       └── mc.md
│   │       └── ...
│   │   └── mods/
│   │       └── mc/
│   │           └── waystones.md
│   │           └── ...
│   │   └── docs/
│   │       └── mc/
│   │           └── waystones/
│   │               └── warp_dust.md
│   │               └── ...
│   │   └── recipes/
│   │       └── mc/
│   │           └── waystones/
│   │               └── warp_dust.json
│   │               └── ...
│   │           └── ...
│   │   └── configs/
│   │       └── mc/
│   │           └── waystones.json
│   │           └── ...
│   │   └── i18n/
│   │       └── mc/
│   │           └── waystones/
│   │               └── en_us.json
│   │               └── ...
│   │           └── ...
```

The folders `recipes` and `i18n` take json files in the same format as the game, i.e. these should be directly copied from the mod repository.

The folder `configs` takes an exported json file via Balm's ConfigJsonExporter. This has to be done manually for now.

Most content is located within the `docs` folder, which holds the pages for all mod-related guides and items.