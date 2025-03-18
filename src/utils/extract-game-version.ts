export default function extractGameVersion(version: string, snapshot: boolean) {
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