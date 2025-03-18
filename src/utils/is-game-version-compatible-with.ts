export default function isGameVersionCompatibleWith(gameVersion: string, jarGameVersion: string) {
    const compatibleVersions: Record<string, string[]> = {
        '1.21.3': ['1.21.2'],
        '1.21.1': ['1.21'],
    }
    return jarGameVersion === gameVersion || compatibleVersions[gameVersion]?.includes(jarGameVersion);
}