import searchMaven from './search-maven';

export default async function listModFiles(
    modId: string,
    gameVersion: string,
    loader: string,
    branch: string,
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
            version: version.version,
            downloadUrl: jarAsset?.downloadUrl.replace('maven-snapshots', 'maven-public').replace('maven-releases', 'maven-public') ?? '',
            fileSize: jarAsset?.fileSize ?? 0,
            lastModified: jarAsset?.lastModified ?? new Date().toISOString(),
        };
    });
    const filteredJars = jars.filter((jar) => jar?.version.endsWith('+' + gameVersion));
    return filteredJars;
}