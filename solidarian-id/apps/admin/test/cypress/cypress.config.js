const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'apps/admin/test/cypress/e2e/**/*.cy.{js,ts}',
    supportFile: 'apps/admin/test/cypress/support/e2e.js',
    fixturesFolder: 'apps/admin/test/cypress/fixtures',
    screenshotsFolder: 'apps/admin/test/cypress/screenshots',
    videosFolder: 'apps/admin/test/cypress/videos',
    defaultBrowser: 'chrome',
    video: true,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    env: {
      ADMIN_URL: 'http://localhost:3000',
      USERS_URL: 'http://localhost:3001',
      COMMUNITIES_URL: 'http://localhost:3002',
    },
    setupNodeEvents(on, config) {
      // Aquí se pueden añadir plugins de Cypress
      return config;
    },
  },
});
