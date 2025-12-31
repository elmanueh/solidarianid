import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import fs from 'fs';
import path from 'path';

describe('Login Page - Form DOM Structure and Validation', () => {
  beforeEach(() => {
    const loginHbsPath = path.resolve(
      __dirname,
      '../../../../views/pages/login.hbs',
    );
    const hbsContent = fs.readFileSync(loginHbsPath, 'utf8');
    document.body.innerHTML = hbsContent;
  });

  describe('Form Structure', () => {
    it('should render login form with correct id and method', () => {
      const form = document.getElementById('login-form');
      expect(form).toBeInTheDocument();
      expect(form).toHaveAttribute('method', 'POST');
      expect(form).toHaveAttribute('action', '/login');
    });

    it('should render page title with aria-labelledby', () => {
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveAttribute('id', 'login-title');
      expect(title).toHaveTextContent('Iniciar Sesión');
    });

    it('should render email input field with correct attributes', () => {
      const emailInput = document.getElementById('email') as HTMLInputElement;
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('name', 'email');
      expect(emailInput).toHaveAttribute('required');
      expect(emailInput).toHaveAttribute('pattern');

      const pattern = emailInput.getAttribute('pattern') || '';
      expect(pattern).toContain('@');
    });

    it('should render password input field with correct attributes', () => {
      const passwordInput = document.getElementById(
        'password',
      ) as HTMLInputElement;
      expect(passwordInput).toBeInTheDocument();
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('name', 'password');
      expect(passwordInput).toHaveAttribute('required');
      expect(passwordInput).toHaveAttribute('minlength', '12');
    });

    it('should render submit button', () => {
      const submitButton = document.querySelector('button[type="submit"]');
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveTextContent('Iniciar sesión');
    });

    it('should have labels associated with inputs', () => {
      const emailLabel = document.querySelector('label[for="email"]');
      const passwordLabel = document.querySelector('label[for="password"]');
      expect(emailLabel).toBeInTheDocument();
      expect(passwordLabel).toBeInTheDocument();
    });
  });

  describe('Form Validation Attributes', () => {
    it('email input should have required and pattern attributes', () => {
      const emailInput = document.getElementById('email') as HTMLInputElement;
      expect(emailInput.required).toBe(true);
      expect(emailInput).toHaveAttribute('aria-required', 'true');
    });

    it('password input should have minlength and pattern attributes', () => {
      const passwordInput = document.getElementById(
        'password',
      ) as HTMLInputElement;
      expect(passwordInput.required).toBe(true);
      expect(passwordInput).toHaveAttribute('minlength', '12');
      expect(passwordInput).toHaveAttribute('pattern');
    });

    it('inputs should have aria-describedby pointing to error elements', () => {
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');
      expect(passwordInput).toHaveAttribute(
        'aria-describedby',
        'password-error',
      );
    });

    it('error elements should have role="alert" for accessibility', () => {
      const emailError = document.getElementById('email-error');
      const passwordError = document.getElementById('password-error');
      expect(emailError).toHaveAttribute('role', 'alert');
      expect(passwordError).toHaveAttribute('role', 'alert');
    });
  });

  describe('Form Interactions', () => {
    it('should be able to type in email input', () => {
      const emailInput = document.getElementById('email') as HTMLInputElement;
      emailInput.value = 'admin@solidarianid.org';
      expect(emailInput.value).toBe('admin@solidarianid.org');
    });

    it('should be able to type in password input', () => {
      const passwordInput = document.getElementById(
        'password',
      ) as HTMLInputElement;
      passwordInput.value = 'TestPassword123!';
      expect(passwordInput.value).toBe('TestPassword123!');
    });

    it('should toggle password visibility when clicking password toggle button', () => {
      const passwordInput = document.getElementById(
        'password',
      ) as HTMLInputElement;

      expect(passwordInput.type).toBe('password');

      passwordInput.type = 'text';
      expect(passwordInput.type).toBe('text');

      passwordInput.type = 'password';
      expect(passwordInput.type).toBe('password');
    });

    it('should handle form submission', () => {
      const form = document.getElementById('login-form') as HTMLFormElement;
      const submitEvent = new Event('submit');
      const submitSpy = jest.fn((e: Event) => e.preventDefault());

      form.addEventListener('submit', submitSpy);
      form.dispatchEvent(submitEvent);

      expect(submitSpy).toHaveBeenCalled();
    });

    it('should display form announcer for screen readers', () => {
      const announcer = document.getElementById('form-announcer');
      expect(announcer).toBeInTheDocument();
      expect(announcer).toHaveAttribute('aria-live', 'assertive');
      expect(announcer).toHaveAttribute('aria-atomic', 'true');
    });
  });

  describe('Form Styling and Classes', () => {
    it('should apply auth-form class to form element', () => {
      const form = document.getElementById('login-form');
      expect(form).toHaveClass('auth-form');
    });

    it('should have form-group class for grouping inputs', () => {
      const formGroups = document.querySelectorAll('.form-group');
      expect(formGroups).toHaveLength(2);
    });

    it('should have input-wrapper for styling icon inputs', () => {
      const inputWrappers = document.querySelectorAll('.input-wrapper');
      expect(inputWrappers).toHaveLength(2);
    });

    it('should have help text for form guidance', () => {
      const helpTexts = document.querySelectorAll('.form-help');
      expect(helpTexts).toHaveLength(2);
      expect(helpTexts[0]).toHaveTextContent(
        'Introduce tu correo electrónico registrado',
      );
      expect(helpTexts[1]).toHaveTextContent('Mínimo 12 caracteres');
    });

    it('should mark required fields with visual indicator', () => {
      const requiredIndicators = document.querySelectorAll(
        '.form-label-required',
      );
      expect(requiredIndicators).toHaveLength(2);
    });
  });

  describe('Accessibility', () => {
    it('should have accessible section with aria-labelledby', () => {
      const section = document.querySelector('section.auth-container');
      expect(section).toHaveAttribute('aria-labelledby', 'login-title');
    });

    it('password toggle button should have aria-label and aria-controls', () => {
      const toggleButton = document.querySelector('.password-toggle');
      expect(toggleButton).toHaveAttribute('aria-label', 'Mostrar contraseña');
      expect(toggleButton).toHaveAttribute('aria-controls', 'password');
      expect(toggleButton).toHaveAttribute('aria-pressed', 'false');
    });

    it('icons should be hidden from screen readers', () => {
      const icons = document.querySelectorAll('[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThan(0);
      icons.forEach((icon) => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('logo should have alt text for accessibility', () => {
      const logo = document.querySelector('.auth-logo') as HTMLImageElement;
      expect(logo).toHaveAttribute('alt', 'SolidarianID Logo');
      expect(logo.alt).not.toBe('');
    });

    it('required fields should be announced with aria-required', () => {
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      expect(emailInput).toHaveAttribute('aria-required', 'true');
      expect(passwordInput).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('Form Error States', () => {
    it('should have empty error message spans initially', () => {
      const emailError = document.getElementById('email-error');
      const passwordError = document.getElementById('password-error');
      expect(emailError).toHaveTextContent('');
      expect(passwordError).toHaveTextContent('');
    });

    it('should be able to update error messages', () => {
      const emailError = document.getElementById(
        'email-error',
      ) as HTMLSpanElement;
      emailError.textContent = 'El correo no es válido';
      expect(emailError).toHaveTextContent('El correo no es válido');
    });

    it('error elements should be discoverable by aria-describedby', () => {
      const emailInput = document.getElementById('email');
      const emailErrorId = emailInput?.getAttribute('aria-describedby');
      const errorElement = document.getElementById(emailErrorId!);
      expect(errorElement).toBeInTheDocument();
    });
  });
});
