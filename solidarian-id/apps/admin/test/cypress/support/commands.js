// ***********************************************
// Custom commands for SolidarianID E2E tests
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Custom command to login as an administrator
 * @param {string} email - Administrator email
 * @param {string} password - Administrator password
 */
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('#login-form').submit();
  cy.url().should('include', '/dashboard');
});

/**
 * Custom command to logout
 */
Cypress.Commands.add('logout', () => {
  cy.request({
    method: 'POST',
    url: '/api/auth/logout',
    failOnStatusCode: false,
  });
});

/**
 * Custom command to register a new administrator
 * @param {Object} adminData - Administrator data object
 */
Cypress.Commands.add('registerAdmin', adminData => {
  cy.visit('/register');
  cy.get('#firstName').type(adminData.firstName);
  cy.get('#lastName').type(adminData.lastName);
  cy.get('#email').type(adminData.email);
  cy.get('#phone').type(adminData.phone);
  cy.get('#password').type(adminData.password);
  cy.get('#confirmPassword').type(adminData.password);
  cy.get('#register-form').submit();
});

/**
 * Custom command to create a user in the users microservice
 * @param {Object} userData - User data object
 */
Cypress.Commands.add('createUser', userData => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('USERS_URL')}/api/users`,
    body: userData,
    headers: {
      'Content-Type': 'application/json',
    },
    failOnStatusCode: false,
  });
});

/**
 * Custom command to create a community request
 * @param {Object} communityData - Community request data
 */
Cypress.Commands.add('createCommunityRequest', communityData => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('COMMUNITIES_URL')}/api/community-requests`,
    body: communityData,
    headers: {
      'Content-Type': 'application/json',
    },
    failOnStatusCode: false,
  });
});

/**
 * Custom command to approve a request
 * @param {string} requestId - Request ID
 * @param {string} reason - Approval reason (optional)
 */
Cypress.Commands.add('approveRequest', (requestId, reason = 'Aprobado mediante test E2E') => {
  return cy.request({
    method: 'PATCH',
    url: `${Cypress.env('ADMIN_URL')}/requests/${requestId}`,
    body: {
      status: 'approved',
      reason: reason,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

/**
 * Custom command to get the number of communities from the dashboard
 */
Cypress.Commands.add('getCommunitiesCount', () => {
  return cy
    .get('[data-variant="green"] .metrics-summary-card-value')
    .invoke('text')
    .then(text => parseInt(text.trim(), 10));
});
