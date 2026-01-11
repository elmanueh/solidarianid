describe('Dashboard Metrics', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.fixture('admins').then(admins => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('ADMIN_URL')}/api/auth/login`,
        body: {
          email: admins.validAdmin.email,
          password: admins.validAdmin.password,
        },
      });
    });
    cy.visit('/dashboard');
  });

  afterEach(() => {
    cy.logout();
  });

  it('should render all chart canvases', () => {
    cy.get('#chart-communities').should('exist');
    cy.get('#chart-nationalities').should('exist');
    cy.get('#chart-ods').should('exist');
    cy.get('#chart-joins').should('exist');
  });

  it('should render top communities pie chart with data', () => {
    cy.get('#chart-communities').should('be.visible');

    cy.get('#chart-communities').then($canvas => {
      const canvas = $canvas[0];
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const hasPixels = imageData.data.some(pixel => pixel !== 0);
      expect(hasPixels).to.be.true;
    });
  });

  it('should render nationalities doughnut chart with data', () => {
    cy.get('#chart-nationalities').should('be.visible');

    cy.get('#chart-nationalities').then($canvas => {
      const canvas = $canvas[0];
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const hasPixels = imageData.data.some(pixel => pixel !== 0);
      expect(hasPixels).to.be.true;
    });
  });

  it('should render ODS bar chart with data', () => {
    cy.get('#chart-ods').should('be.visible');

    cy.get('#chart-ods').then($canvas => {
      const canvas = $canvas[0];
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const hasPixels = imageData.data.some(pixel => pixel !== 0);
      expect(hasPixels).to.be.true;
    });
  });

  it('should render monthly joins line chart', () => {
    cy.get('#chart-joins').should('be.visible');

    cy.get('#chart-joins').then($canvas => {
      const canvas = $canvas[0];
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const hasPixels = imageData.data.some(pixel => pixel !== 0);
      expect(hasPixels).to.be.true;
    });
  });
});
