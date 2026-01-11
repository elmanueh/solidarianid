/**
 * Test E2E: Login de Administradores
 *
 * Pruebas de autenticación para el panel de administración de SolidarianID.
 * Los administradores están pre-cargados en MongoDB mediante el script init-mongo-admins.js
 *
 * @see scripts/mongodb/init-mongo-admins.js
 * @see scripts/mongodb/CREDENTIALS.md
 */

describe('Login de Administradores', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.visit('/login');
  });

  describe('Renderizado de la página de login', () => {
    it('debe mostrar el formulario de login correctamente', () => {
      cy.get('#login-title').should('contain.text', 'Iniciar Sesión');
      cy.get('#login-form').should('be.visible');
      cy.get('#email').should('be.visible');
      cy.get('#password').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });

    it('debe mostrar el logo de SolidarianID', () => {
      cy.get('.auth-logo').should('be.visible').and('have.attr', 'alt', 'SolidarianID Logo');
    });

    it('debe tener los campos con atributos de accesibilidad correctos', () => {
      cy.get('#email').should('have.attr', 'aria-required', 'true').and('have.attr', 'type', 'email');

      cy.get('#password').should('have.attr', 'aria-required', 'true').and('have.attr', 'type', 'password');
    });
  });

  describe('Login exitoso con credenciales válidas', () => {
    it('debe hacer login con el primer administrador (Sergio García)', () => {
      cy.fixture('admins').then(admins => {
        const admin = admins.allAdmins[0];

        cy.get('#email').type(admin.email);
        cy.get('#password').type(admin.password);
        cy.get('#login-form').submit();

        cy.url().should('include', '/dashboard');
        cy.get('.metrics-title').should('contain.text', 'Dashboard');
      });
    });

    it('debe hacer login con Fabián Rodríguez', () => {
      cy.fixture('admins').then(admins => {
        const admin = admins.allAdmins[1];

        cy.get('#email').type(admin.email);
        cy.get('#password').type(admin.password);
        cy.get('#login-form').submit();

        cy.url().should('include', '/dashboard');
      });
    });

    it('debe hacer login con Pablo Fernández', () => {
      cy.fixture('admins').then(admins => {
        const admin = admins.allAdmins[2];

        cy.get('#email').type(admin.email);
        cy.get('#password').type(admin.password);
        cy.get('#login-form').submit();

        cy.url().should('include', '/dashboard');
      });
    });

    it('debe hacer login con Antonio Martín', () => {
      cy.fixture('admins').then(admins => {
        const admin = admins.allAdmins[3];

        cy.get('#email').type(admin.email);
        cy.get('#password').type(admin.password);
        cy.get('#login-form').submit();

        cy.url().should('include', '/dashboard');
      });
    });

    it('debe hacer login con Manuel Pérez', () => {
      cy.fixture('admins').then(admins => {
        const admin = admins.allAdmins[4];

        cy.get('#email').type(admin.email);
        cy.get('#password').type(admin.password);
        cy.get('#login-form').submit();

        cy.url().should('include', '/dashboard');
      });
    });

    it('debe mostrar las métricas del dashboard tras login exitoso', () => {
      cy.fixture('admins').then(admins => {
        const admin = admins.validAdmin;

        cy.get('#email').type(admin.email);
        cy.get('#password').type(admin.password);
        cy.get('#login-form').submit();

        cy.get('.metrics-summary').should('be.visible');
        cy.get('.metrics-summary-card').should('have.length.at.least', 3);
      });
    });
  });

  describe('Login fallido con credenciales inválidas', () => {
    it('debe mostrar error con email no registrado', () => {
      cy.fixture('admins').then(admins => {
        cy.get('#email').type(admins.invalidAdmin.email);
        cy.get('#password').type(admins.invalidAdmin.password);
        cy.get('#login-form').submit();

        cy.url().should('include', '/login');

        cy.get('.alert-error, .toast', { timeout: 5000 }).should('exist');
      });
    });

    it('debe mostrar error con contraseña incorrecta', () => {
      cy.fixture('admins').then(admins => {
        const admin = admins.allAdmins[0];

        cy.get('#email').type(admin.email);
        cy.get('#password').type('WrongPassword123!');
        cy.get('#login-form').submit();

        cy.url().should('include', '/login');
        cy.get('.alert-error, .toast', { timeout: 5000 }).should('exist');
      });
    });
  });

  describe('Validación del formulario en cliente', () => {
    it('no debe permitir enviar con email vacío', () => {
      cy.fixture('admins').then(admins => {
        cy.get('#password').type(admins.validAdmin.password);
        cy.get('#login-form').submit();

        cy.get('#email:invalid').should('exist');
      });
    });

    it('no debe permitir enviar con contraseña vacía', () => {
      cy.fixture('admins').then(admins => {
        cy.get('#email').type(admins.validAdmin.email);
        cy.get('#login-form').submit();

        cy.get('#password:invalid').should('exist');
      });
    });

    it('debe validar formato de email', () => {
      cy.fixture('admins').then(admins => {
        cy.get('#email').type('invalid-email');
        cy.get('#password').type(admins.validAdmin.password);
        cy.get('#login-form').submit();

        cy.get('#email:invalid').should('exist');
      });
    });
  });

  describe('Funcionalidad adicional', () => {
    it('debe poder mostrar/ocultar la contraseña', () => {
      cy.get('#password').type('TestPassword123!');
      cy.get('#password').should('have.attr', 'type', 'password');

      cy.get('.password-toggle').click();
      cy.get('#password').should('have.attr', 'type', 'text');

      cy.get('.password-toggle').click();
      cy.get('#password').should('have.attr', 'type', 'password');
    });
  });
});
