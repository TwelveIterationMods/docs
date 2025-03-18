export default async function searchMaven(
    repository: string,
    groupId: string,
    artifactId?: string,
    version?: string
): Promise<
    {
        version: string;
        name: string;
        repository: string;
        assets: {
            downloadUrl: string;
            fileSize: number;
            lastModified: string;
            maven2: {
                extension: string;
                classifier?: string;
            };
            contentType: string;
        }[];
    }[]
> {
    const nexusUrl = 'https://maven.twelveiterations.com/service/rest/v1/search';
    const queryParams = new URLSearchParams({
        repository: repository,
        group: groupId,
        sort: 'version',
    });
    if (artifactId) {
        queryParams.set('name', artifactId);
    }
    if (version) {
        queryParams.set('version', version);
    }

    try {
        const response = await fetch(`${nexusUrl}?${queryParams.toString()}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error fetching artifact:', error);
        return [];
    }
}
