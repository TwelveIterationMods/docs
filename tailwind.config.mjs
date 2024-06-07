const brandButtons = {
    '.btn-youtube': {
        'background-color': '#ff0000',
        color: '#ffffff',
    },
    '.btn-youtube:hover': {
        'background-color': '#cc0000',
        color: '#ffffff',
    },
    '.btn-patreon': {
        'background-color': '#f96854',
        color: '#ffffff',
    },
    '.btn-patreon:hover': {
        'background-color': '#d2493e',
        color: '#ffffff',
    },
    '.btn-discord': {
        'background-color': '#7289da',
        color: '#ffffff',
    },
    '.btn-discord:hover': {
        'background-color': '#677bc4',
        color: '#ffffff',
    },
    '.btn-curseforge': {
        'background-color': '#f16436',
        color: '#ffffff',
    },
    '.btn-curseforge:hover': {
        'background-color': '#ff784d',
        color: '#ffffff',
    },
    '.btn-modrinth': {
        'background-color': '#1BD96A',
        color: '#000000',
    },
    '.btn-modrinth:hover': {
        'background-color': '#13a455',
        color: '#000000',
    },
	'.btn-github': {
		'background-color': '#24292e',
		color: '#ffffff',
	},
	'.btn-github:hover': {
		'background-color': '#1b1f23',
		color: '#ffffff',
	},
    '.btn-steam': {
        'background-color': '#171a21',
        color: '#ffffff',
    },
    '.btn-steam:hover': {
        'background-color': '#0f1115',
        color: '#ffffff',
    },
};

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    safelist: ['badge-error', 'badge-warning', 'badge-success', 'badge-info'],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                'twelve-dark': {
                    primary: '#FFD700',
                    secondary: '#32E0C4',
                    accent: '#FF2E63',
                    neutral: '#121212',
                    error: '#D32F2F',
                    warning: '#FFAB00',
                    success: '#388E3C',
                    info: '#29B6F6',
                    'base-100': '#0D1B2A',
                    ...brandButtons,
                },
                'twelve-light': {
                    primary: '#4FC3F7',
                    secondary: '#81C784',
                    accent: '#9575CD',
                    neutral: '#9E9E9E',
                    error: '#E57373',
                    warning: '#FFEE58',
                    success: '#66BB6A',
                    info: '#64B5F6',
                    'base-100': '#FDF6E3',
                    ...brandButtons,
                },
            },
        ],
    },
};
