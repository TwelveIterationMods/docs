export default function humanizeLoader(loader?: string) {
    if (!loader) {
        return 'Unknown';
    }

    if (loader === 'neoforge') {
        return 'NeoForge';
    }

    return loader.charAt(0).toUpperCase() + loader.slice(1);
};