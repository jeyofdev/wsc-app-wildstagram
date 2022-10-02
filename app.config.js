import 'dotenv/config';

export default {
    expo: {
        name: 'wcs-app-wildstagram',
        slug: 'wcs-app-wildstagram',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/icon.png',
        userInterfaceStyle: 'light',
        splash: {
            image: './assets/splash.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff',
        },
        updates: {
            fallbackToCacheTimeout: 0,
        },
        assetBundlePatterns: ['**/*'],
        ios: {
            supportsTablet: true,
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/adaptive-icon.png',
                backgroundColor: '#FFFFFF',
            },
        },
        web: {
            favicon: './assets/favicon.png',
        },
        extra: {
            token: process.env.token,
        },
    },
};