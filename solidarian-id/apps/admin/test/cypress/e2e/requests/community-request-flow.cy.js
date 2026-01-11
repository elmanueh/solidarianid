/**
 * Test E2E: Flujo completo de Solicitud de Comunidad
 *
 * Este test verifica el flujo completo:
 * 2. Crear una solicitud de comunidad en el microservicio de communities con un usuario existente
 * 3. Hacer login como administrador
 * 4. Navegar a la página de requests y ver la solicitud
 * 5. Aceptar/Rechazar la solicitud
 * 6. Verificar que el número de comunidades aumentó en el dashboard
 */

/**
 * Función helper para buscar una solicitud en todas las páginas y hacer clic en la acción
 * @param {string} communityName - Nombre de la comunidad a buscar
 * @param {string} action - Acción a realizar: 'approve' o 'reject'
 * @param {number} maxPages - Número máximo de páginas a buscar
 */
function findAndClickRequest(communityName, action, maxPages = 10) {
  cy.get('body').then($body => {
    const requestExists = $body.find(`.request[data-variant="community"]:contains("${communityName}")`).length > 0;

    if (requestExists) {
      // Encontrada, hacer clic en la acción
      cy.contains('.request[data-variant="community"]', communityName).within(() => {
        cy.get(`button[data-action="${action}"]`).click();
      });
    } else {
      // Verificar si hay página siguiente
      cy.get('body').then($body2 => {
        const nextPageLink = $body2.find('a:contains("Siguiente")');
        if (nextPageLink.length > 0 && maxPages > 1) {
          // Ir a la siguiente página y buscar de nuevo
          cy.wrap(nextPageLink).click();
          cy.get('.request[data-variant="community"]', { timeout: 10000 }).should('exist');
          findAndClickRequest(communityName, action, maxPages - 1);
        } else {
          // No encontrada en ninguna página
          throw new Error(`No se encontró la solicitud "${communityName}" en ninguna página`);
        }
      });
    }
  });
}

describe('Escenario completo de solicitud de una comunidad', () => {
  let existingUserId = undefined;

  before(() => {
    const now = Date.now();
    const uniqueUsername = `u${String(now).slice(-8)}`;
    const uniqueMobilePhone = `+3462340${String(now).slice(-4)}${Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, '0')}`;

    // Creamos el usuario con el que haremos la solicitud de comunidad usando el custom command
    cy.createUser({
      fullName: `Fake User E2E ${now}`,
      username: uniqueUsername,
      mobilePhone: uniqueMobilePhone,
      password: 'SecureP@ssw0rd',
      city: 'Madrid',
      countryCode: 'ES',
    }).then(response => {
      if (response.status === 201) {
        const locationHeader = response.headers['location'];
        if (locationHeader) {
          existingUserId = locationHeader.split('/').pop();
          cy.log(`Usuario creado exitosamente con ID: ${existingUserId}`);
        }
      } else {
        cy.log(`Error al crear usuario: ${response.status}`);
        throw new Error(`No se pudo crear el usuario. Status: ${response.status}`);
      }
    });
  });

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
  });

  afterEach(() => {
    cy.logout();
  });

  it('debe realizar el flujo completo de solicitud rechazada de una comunidad y no debe de haber cambio en el número de comunidades del dashboard', () => {
    const timestamp = Date.now();
    const communityRequest = {
      name: `Comunidad Rechazada E2E ${timestamp}`,
      description: 'Esta comunidad será rechazada en el test E2E',
      causeCreationRequests: [
        {
          name: `Causa Rechazada E2E ${timestamp}`,
          description: 'Esta causa será rechazada junto con la comunidad',
          ods: [1, 2],
          initialDate: new Date().toISOString(),
          durationDays: 10,
        },
      ],
      userId: existingUserId,
    };

    let initialCommunities;

    // 1. Obtenemos el número de comunidades de inicio en /dashboard
    cy.visit('/dashboard');
    cy.getCommunitiesCount().then(count => {
      initialCommunities = count;
    });

    // 2. Realizamos la solicitud de creación de la comunidad usando el custom command
    cy.createCommunityRequest(communityRequest).then(response => {
      expect(response.status).to.eq(201);
    });

    // 3. Vamos a la página de requests (página 1 para ver las más recientes)
    cy.visit('/community-requests?page=1');
    cy.get('.request[data-variant="community"]', { timeout: 15000 }).should('exist');

    // 4. Buscamos la solicitud recién creada navegando por las páginas si es necesario
    findAndClickRequest(communityRequest.name, 'reject');

    // 5. Confirmamos el rechazo en el modal escribiendo la razón
    cy.get('#reason_modal').should('be.visible');
    cy.get('#reason-textarea').type('Solicitud rechazada durante test E2E automatizado');
    cy.get('#reason_modal .btn-success').click();

    // 6. Esperamos a que la solicitud desaparezca y volvemos al dashboard
    cy.contains('.request[data-variant="community"]', communityRequest.name).should('not.exist');
    cy.visit('/dashboard');

    // 7. Comprobamos que el número de comunidades es el mismo que al inicio
    cy.getCommunitiesCount().then(finalCommunities => {
      expect(finalCommunities).to.equal(initialCommunities);
    });
  });

  it('debe realizar el flujo completo de solicitud aceptada de una comunidad y debe de haber un aumento en el número de comunidades del dashboard', () => {
    const timestamp = Date.now();
    const communityRequest = {
      name: `Comunidad Aceptada E2E ${timestamp}`,
      description: 'Esta comunidad será aceptada en el test E2E',
      causeCreationRequests: [
        {
          name: `Causa Aceptada E2E ${timestamp}`,
          description: 'Esta causa será aceptada junto con la comunidad',
          ods: [3, 4, 5],
          initialDate: new Date().toISOString(),
          durationDays: 15,
        },
      ],
      userId: existingUserId,
    };

    let initialCommunities;

    // 1. Obtenemos el número de comunidades de inicio en /dashboard
    cy.visit('/dashboard');
    cy.getCommunitiesCount().then(count => {
      initialCommunities = count;
    });

    // 2. Realizamos la solicitud de la comunidad usando el custom command
    cy.createCommunityRequest(communityRequest).then(response => {
      expect(response.status).to.eq(201);
    });

    // 3. Vamos a la página de requests (página 1 para ver las más recientes)
    cy.visit('/community-requests?page=1');
    cy.get('.request[data-variant="community"]', { timeout: 15000 }).should('exist');

    // 4. Buscamos la solicitud recién creada navegando por las páginas si es necesario
    findAndClickRequest(communityRequest.name, 'approve');

    // 5. Confirmamos la aceptación en el modal escribiendo la razón
    cy.get('#reason_modal').should('be.visible');
    cy.get('#reason-textarea').type('Solicitud aceptada durante test E2E automatizado');
    cy.get('#reason_modal .btn-success').click();

    // 6. Esperamos a que la solicitud desaparezca y volvemos al dashboard
    cy.contains('.request[data-variant="community"]', communityRequest.name).should('not.exist');
    cy.visit('/dashboard');

    // 7. Comprobamos que el número de comunidades es mayor que al inicio (inicio + 1)
    cy.getCommunitiesCount().then(finalCommunities => {
      expect(finalCommunities).to.be.greaterThan(initialCommunities);
      expect(finalCommunities).to.equal(initialCommunities + 1);
    });
  });
});
