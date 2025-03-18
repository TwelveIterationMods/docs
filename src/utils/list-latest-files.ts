import extractGameVersion from './extract-game-version';
import isGameVersionCompatibleWith from './is-game-version-compatible-with';
import searchMaven from './search-maven';

export default async function listLatestFiles(
    gameVersion: string,
    branch: string
): Promise<
    {
        version: string;
        name: string;
        loader: string;
        downloadUrl: string;
        fileSize: number;
        lastModified: string;
    }[]
> {
    const repository = branch === 'snapshot' ? 'maven-snapshots' : 'maven-releases';
    const versions = await searchMaven(repository, 'net.blay09.mods', undefined, gameVersion.substring(2) + ".*");
    const jars = versions.map((version) => {
        const jarAsset = version.assets.find(
            (asset) => asset.contentType == 'application/java-archive' && asset.maven2.extension === 'jar' && !asset.maven2.classifier
        );
        const parts = version.name.split('-');
        return {
            name: parts[0],
            loader: parts[1],
            gameVersion: extractGameVersion(version.version, version.repository === 'maven-snapshots'),
            version: version.version,
            downloadUrl: jarAsset?.downloadUrl.replace('maven-snapshots', 'maven-public').replace('maven-releases', 'maven-public') ?? '',
            fileSize: jarAsset?.fileSize ?? 0,
            lastModified: jarAsset?.lastModified ?? new Date().toISOString(),
        };
    });
    const filteredJars = jars.filter((jar) => isGameVersionCompatibleWith(gameVersion, jar?.gameVersion));
    return filteredJars;
}
