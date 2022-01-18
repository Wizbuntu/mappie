module.exports = {
    reactStrictMode: true,

    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    env: {
        API_ROOT: 'http://localhost:7000/v1/api'
    }
}