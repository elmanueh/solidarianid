/**
 * Test E2E: Registro de Administradores
 *
 * Pruebas de registro para nuevos administradores en el panel de SolidarianID.
 *
 * @see apps/admin/views/pages/register.hbs
 */

describe('Registro de Administradores', () => {
  const timestamp = Date.now();
  const uniqueAdmin = {
    firstName: 'Test',
    lastName: 'Administrator',
    email: `test.admin.${timestamp}@solidarianid.org`,
    phone: `+3461234${String(timestamp).slice(-4)}`,
    password: 'Admin2024!Pass',
  };

  // Esto debemos hacerlo porque necesitamos estar logueados para registrar un nuevo administrador
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

    cy.visit('/register');
  });

  afterEach(() => {
    cy.logout();
  });

  describe('Renderizado de la página de registro', () => {
    it('debe mostrar el formulario de registro correctamente', () => {
      cy.get('#register-title').should('contain.text', 'Registro de Administrador');
      cy.get('#register-form').should('be.visible');
      cy.get('#firstName').should('be.visible');
      cy.get('#lastName').should('be.visible');
      cy.get('#email').should('be.visible');
      cy.get('#phone').should('be.visible');
      cy.get('#password').should('be.visible');
      cy.get('#confirmPassword').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });

    it('debe mostrar el logo de SolidarianID', () => {
      cy.get('.auth-logo').should('be.visible').and('have.attr', 'alt', 'SolidarianID Logo');
    });

    it('debe tener un enlace para volver al dashboard', () => {
      cy.get('a[href="/dashboard"]').should('be.visible');
    });

    it('debe tener los campos con atributos de accesibilidad correctos', () => {
      cy.get('#firstName').should('have.attr', 'aria-required', 'true');
      cy.get('#lastName').should('have.attr', 'aria-required', 'true');
      cy.get('#email').should('have.attr', 'aria-required', 'true').and('have.attr', 'type', 'email');
      cy.get('#phone').should('have.attr', 'aria-required', 'true').and('have.attr', 'type', 'tel');
      cy.get('#password').should('have.attr', 'aria-required', 'true');
      cy.get('#confirmPassword').should('have.attr', 'aria-required', 'true');
    });
  });

  describe('Registro exitoso', () => {
    it('debe registrar un nuevo administrador con datos válidos', () => {
      const newAdmin = {
        firstName: uniqueAdmin.firstName,
        lastName: uniqueAdmin.lastName,
        email: `new.admin.${Date.now()}@solidarianid.org`,
        phone: `+3469876${String(Date.now()).slice(-4)}`,
        password: uniqueAdmin.password,
      };

      cy.registerAdmin(newAdmin);

      cy.url().should('satisfy', url => {
        return url.includes('/dashboard') || url.includes('/login');
      });
    });

    it('debe poder hacer login después de registrarse', () => {
      const newAdmin = {
        ...uniqueAdmin,
        email: `login.test.${Date.now()}@solidarianid.org`,
        phone: `+3469877${String(Date.now()).slice(-4)}`,
      };

      cy.get('#firstName').type(newAdmin.firstName);
      cy.get('#lastName').type(newAdmin.lastName);
      cy.get('#email').type(newAdmin.email);
      cy.get('#phone').type(newAdmin.phone);
      cy.get('#password').type(newAdmin.password);
      cy.get('#confirmPassword').type(newAdmin.password);
      cy.get('#register-form').submit();

      cy.url({ timeout: 5000 }).should('satisfy', url => {
        return url.includes('/dashboard') || url.includes('/login');
      });

      cy.visit('/login');
      cy.get('#email').type(newAdmin.email);
      cy.get('#password').type(newAdmin.password);
      cy.get('#login-form').submit();

      cy.url().should('include', '/dashboard');
    });
  });

  describe('Registro fallido con datos inválidos', () => {
    it('debe mostrar error cuando el email ya está registrado', () => {
      cy.fixture('admins').then(admins => {
        const existingAdmin = admins.allAdmins[0];

        cy.get('#firstName').type('Test');
        cy.get('#lastName').type('Duplicate');
        cy.get('#email').type(existingAdmin.email); // Email ya existente
        cy.get('#phone').type(`+3469878${String(Date.now()).slice(-4)}`);
        cy.get('#password').type('Admin2024!Pass');
        cy.get('#confirmPassword').type('Admin2024!Pass');

        cy.get('#register-form').submit();

        cy.get('.alert-warning, .alert-error, .toast', { timeout: 5000 }).should('exist');
      });
    });
  });

  describe('Validación del formulario en cliente', () => {
    it('no debe permitir enviar con nombre vacío', () => {
      cy.get('#lastName').type('Test');
      cy.get('#email').type('test@test.com');
      cy.get('#phone').type('+34612345678');
      cy.get('#password').type('Admin2024!Pass');
      cy.get('#confirmPassword').type('Admin2024!Pass');

      cy.get('#register-form').submit();

      cy.get('#firstName:invalid').should('exist');
    });

    it('no debe permitir enviar con apellidos vacíos', () => {
      cy.get('#firstName').type('Test');
      cy.get('#email').type('test@test.com');
      cy.get('#phone').type('+34612345678');
      cy.get('#password').type('Admin2024!Pass');
      cy.get('#confirmPassword').type('Admin2024!Pass');

      cy.get('#register-form').submit();

      cy.get('#lastName:invalid').should('exist');
    });

    it('no debe permitir enviar con email vacío', () => {
      cy.get('#firstName').type('Test');
      cy.get('#lastName').type('User');
      cy.get('#phone').type('+34612345678');
      cy.get('#password').type('Admin2024!Pass');
      cy.get('#confirmPassword').type('Admin2024!Pass');

      cy.get('#register-form').submit();

      cy.get('#email:invalid').should('exist');
    });

    it('debe validar que las contraseñas coincidan', () => {
      cy.get('#firstName').type('Test');
      cy.get('#lastName').type('User');
      cy.get('#email').type('test@solidarianid.org');
      cy.get('#phone').type('+34612345678');
      cy.get('#password').type('Admin2024!Pass');
      cy.get('#confirmPassword').type('DifferentPassword!');

      cy.get('#register-form').submit();

      cy.url().should('include', '/register');
    });

    it('debe validar formato de email', () => {
      cy.get('#firstName').type('Test');
      cy.get('#lastName').type('User');
      cy.get('#email').type('invalid-email');
      cy.get('#phone').type('+34612345678');
      cy.get('#password').type('Admin2024!Pass');
      cy.get('#confirmPassword').type('Admin2024!Pass');

      cy.get('#register-form').submit();

      cy.get('#email:invalid').should('exist');
    });
  });

  describe('Funcionalidad adicional', () => {
    it('debe poder mostrar/ocultar la contraseña', () => {
      cy.get('#password').type('TestPassword123!');
      cy.get('#password').should('have.attr', 'type', 'password');

      cy.get('.password-toggle').first().click();
      cy.get('#password').should('have.attr', 'type', 'text');

      cy.get('.password-toggle').first().click();
      cy.get('#password').should('have.attr', 'type', 'password');
    });

    it('debe poder mostrar/ocultar la confirmación de contraseña', () => {
      cy.get('#confirmPassword').type('TestPassword123!');
      cy.get('#confirmPassword').should('have.attr', 'type', 'password');

      cy.get('.password-toggle').last().click();
      cy.get('#confirmPassword').should('have.attr', 'type', 'text');
    });
  });
});
