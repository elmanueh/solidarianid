import defineConfig from cypress;

module.exports = defineConfig({ e2e: { baseUrl: process.env.BASE_URL } });
