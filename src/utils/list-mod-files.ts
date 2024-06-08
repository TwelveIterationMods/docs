import searchMaven from './search-maven';

const extractGameVersion = (version: string, snapshot: boolean) => {
    if (version.includes('+')) {
        return version.split('+')[1];
    }
    if (snapshot) {
        let gameVersion = '1.' + version.split('-')[0].split('.').slice(0, 2).join('.');
        if (gameVersion.endsWith('.0')) {
            gameVersion = gameVersion.slice(0, -2);
        }
        return gameVersion;
    }
    return 'Unknown';
};

export default async function listModFiles(
    modId: string,
    gameVersion: string,
    loader: string,
    branch: string
): Promise<
    {
        version: string;
        downloadUrl: string;
        fileSize: number;
        lastModified: string;
    }[]
> {
    const repository = branch === 'snapshot' ? 'maven-snapshots' : 'maven-releases';
    const versions = await searchMaven(repository, 'net.blay09.mods', modId + '-' + loader);
    const jars = versions.map((version) => {
        const jarAsset = version.assets.find(
            (asset) => asset.contentType == 'application/java-archive' && asset.maven2.extension === 'jar' && !asset.maven2.classifier
        );
        return {
            gameVersion: extractGameVersion(version.version, version.repository === 'maven-snapshots'),
            version: version.version,
            downloadUrl: jarAsset?.downloadUrl.replace('maven-snapshots', 'maven-public').replace('maven-releases', 'maven-public') ?? '',
            fileSize: jarAsset?.fileSize ?? 0,
            lastModified: jarAsset?.lastModified ?? new Date().toISOString(),
        };
    });
    const filteredJars = jars.filter((jar) => jar?.gameVersion === gameVersion);
    return filteredJars;
}
