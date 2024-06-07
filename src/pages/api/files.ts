import type { APIRoute } from 'astro';
import searchMaven from '../../utils/search-maven';

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams;
    const branch = query.get('branch');
    const repository = branch === 'snapshot' ? 'maven-snapshots' : 'maven-releases';
    const modId = query.get('modId');
    const loader = query.get('loader');
    const gameVersion = query.get('gameVersion');
    const versions = await searchMaven(repository, 'net.blay09.mods', modId + '-' + loader);
    const jars = versions.map((version) => {
        const jarAsset = version.assets.find(
            (asset) => asset.contentType == 'application/java-archive' && asset.maven2.extension === 'jar' && !asset.maven2.classifier
        );
        return {
            version: version.version,
            downloadUrl: jarAsset?.downloadUrl.replace('maven-snapshots', 'maven-public').replace('maven-releases', 'maven-public') ?? '',
            fileSize: jarAsset?.fileSize ?? 0,
            lastModified: jarAsset?.lastModified,
        };
    });
    const filteredJars = jars.filter((jar) => jar?.version.endsWith('+' + gameVersion));
    return new Response(JSON.stringify(filteredJars), {
        headers: {
            'content-type': 'application/json',
        },
        status: 200,
    });
};
