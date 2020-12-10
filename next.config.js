// MEMO next.config.ts is not available
module.exports = {
    // Use the CDN in production and localhost for development.
    assetPrefix: '/oauth',
    webpack: (config) => {
        config.output.publicPath = `/oauth${config.output.publicPath}`;
        return config;
    },
}