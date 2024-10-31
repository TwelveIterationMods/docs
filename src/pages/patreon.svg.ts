export async function GET() {
    const current = 13
    const nextGoal = 20
    const progress = current / nextGoal
    const maxWidth = 500
    return new Response(
        `<svg width="550" height="80"
            xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#f96854;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#e95950;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="550" height="80" fill="url(#grad)" />

            <text x="25" y="40" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="24" fill="white" font-weight="bold">
            Support on Patreon for $1.00 a month.
            </text>
            <text x="485" y="40" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="24" fill="white" font-weight="bold">
            🤍
            </text>

            <rect x="25" y="55" width="${maxWidth}" height="6" fill="rgba(0,0,0,0.3)" rx="3" />
            <rect x="25" y="55" width="${(progress * maxWidth).toFixed()}" height="6" fill="white" rx="3" />
            <text x="${25 + maxWidth/2}" y="63" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="16" fill="white" stroke="black" stroke-width="0.4" text-anchor="middle">
            ${current}/${nextGoal}
            </text>        </svg>`,
        {
            headers: {
                'Content-Type': 'image/svg+xml'
            }
        }
    );
}