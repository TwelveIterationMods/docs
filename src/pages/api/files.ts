import type { APIRoute } from 'astro';
import listModFiles from '../../utils/list-mod-files';

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams;
    const modId = query.get('mod');
    if (!modId) {
        return new Response('Missing mod parameter', {
            status: 400,
        });
    }
    const gameVersion = query.get('gameVersion');
    if(!gameVersion) {
        return new Response('Missing gameVersion parameter', {
            status: 400,
        });
    }
    const loader = query.get('loader');
    if (!loader) {
        return new Response('Missing loader parameter', {
            status: 400,
        });
    }
    const branch = query.get('branch') ?? 'release';
    const files = listModFiles(modId, gameVersion, loader, branch);
    return new Response(JSON.stringify(files), {
        headers: {
            'content-type': 'application/json',
        },
        status: 200,
    });
};
