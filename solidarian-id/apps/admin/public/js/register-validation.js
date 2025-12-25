(function () {
  'use strict';

  const PATTERNS = {
    name: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑàèìòùÀÈÌÒÙçÇ\s]+$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^(\+?34)?[6-9]\d{8}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    hasNumbers: /\d/,
    hasSpecialChars: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~0-9]/,
  };

  const ERROR_MESSAGES = {
    firstName: {
      required: 'El nombre es obligatorio',
      empty: 'El nombre no puede estar vacío',
      hasNumbers: 'El nombre no puede contener números',
      hasSpecialChars:
        'El nombre no puede contener signos especiales ni números',
      invalid:
        'El nombre solo puede contener letras y espacios. No se permiten números ni signos.',
    },
    lastName: {
      required: 'Los apellidos son obligatorios',
      empty: 'Los apellidos no pueden estar vacíos',
      hasNumbers: 'Los apellidos no pueden contener números',
      hasSpecialChars:
        'Los apellidos no pueden contener signos especiales ni números',
      invalid:
        'Los apellidos solo pueden contener letras y espacios. No se permiten números ni signos.',
    },
    email: {
      required: 'El correo electrónico es obligatorio',
      invalid:
        'Introduce un correo electrónico válido (ej: usuario@dominio.com)',
    },
    phone: {
      required: 'El teléfono es obligatorio',
      invalid:
        'Introduce un número de teléfono válido (ej: 612345678 o +34612345678)',
      tooShort: 'El número de teléfono debe tener 9 dígitos',
    },
    password: {
      required: 'La contraseña es obligatoria',
      tooShort: 'La contraseña debe tener al menos 8 caracteres',
      noUppercase: 'La contraseña debe contener al menos una letra mayúscula',
      noLowercase: 'La contraseña debe contener al menos una letra minúscula',
      noNumber: 'La contraseña debe contener al menos un número',
      invalid:
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
    },
    confirmPassword: {
      required: 'Debes confirmar tu contraseña',
      mismatch: 'Las contraseñas no coinciden',
    },
  };

  function validateNameField(value, fieldName) {
    const messages = ERROR_MESSAGES[fieldName];
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return { isValid: false, message: messages.required };
    }

    if (PATTERNS.hasNumbers.test(trimmedValue)) {
      return { isValid: false, message: messages.hasNumbers };
    }

    if (PATTERNS.hasSpecialChars.test(trimmedValue)) {
      return { isValid: false, message: messages.hasSpecialChars };
    }

    if (!PATTERNS.name.test(trimmedValue)) {
      return { isValid: false, message: messages.invalid };
    }

    return { isValid: true, message: '' };
  }

  function validateEmail(value) {
    const messages = ERROR_MESSAGES.email;
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return { isValid: false, message: messages.required };
    }

    if (!PATTERNS.email.test(trimmedValue)) {
      return { isValid: false, message: messages.invalid };
    }

    return { isValid: true, message: '' };
  }

  function validatePhone(value) {
    const messages = ERROR_MESSAGES.phone;
    const cleanPhone = value.replaceAll(/[\s\-()]/g, '');

    if (!cleanPhone) {
      return { isValid: false, message: messages.required };
    }

    const digitsOnly = cleanPhone.replaceAll(/\D/g, '');
    if (digitsOnly.length < 9) {
      return { isValid: false, message: messages.tooShort };
    }

    if (!PATTERNS.phone.test(cleanPhone)) {
      return { isValid: false, message: messages.invalid };
    }

    return { isValid: true, message: '' };
  }

  function validatePassword(value) {
    const messages = ERROR_MESSAGES.password;

    if (!value) {
      return { isValid: false, message: messages.required };
    }

    if (value.length < 8) {
      return { isValid: false, message: messages.tooShort };
    }

    if (!/[A-Z]/.test(value)) {
      return { isValid: false, message: messages.noUppercase };
    }

    if (!/[a-z]/.test(value)) {
      return { isValid: false, message: messages.noLowercase };
    }

    if (!/\d/.test(value)) {
      return { isValid: false, message: messages.noNumber };
    }

    return { isValid: true, message: '' };
  }

  function validateConfirmPassword(value, passwordValue) {
    const messages = ERROR_MESSAGES.confirmPassword;

    if (!value) {
      return { isValid: false, message: messages.required };
    }

    if (value !== passwordValue) {
      return { isValid: false, message: messages.mismatch };
    }

    return { isValid: true, message: '' };
  }

  function validateField(input) {
    const fieldName = input.name;
    const value = input.value;

    switch (fieldName) {
      case 'firstName':
        return validateNameField(value, 'firstName');

      case 'lastName':
        return validateNameField(value, 'lastName');

      case 'email':
        return validateEmail(value);

      case 'phone':
        return validatePhone(value);

      case 'password':
        return validatePassword(value);

      case 'confirmPassword': {
        const passwordInput = document.getElementById('password');
        return validateConfirmPassword(value, passwordInput?.value || '');
      }

      default:
        if (!value.trim()) {
          return { isValid: false, message: 'Este campo es obligatorio' };
        }
        return { isValid: true, message: '' };
    }
  }

  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup?.querySelector('.form-error');
    const iconStatus = formGroup?.querySelector('.input-icon-status');

    input.setAttribute('aria-invalid', 'true');

    input.classList.add('form-input-error');
    input.classList.remove('form-input-success');

    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.remove('hidden');
      errorElement.classList.add('form-error-visible');
      errorElement.setAttribute('aria-live', 'assertive');
    }

    if (iconStatus) {
      iconStatus.classList.remove('hidden', 'icon-[lucide--check-circle]');
      iconStatus.classList.add('icon-[lucide--alert-circle]');
      iconStatus.style.color = 'var(--color-dark-wine-600)';
      iconStatus.setAttribute('aria-hidden', 'false');
      iconStatus.setAttribute('aria-label', 'Error en el campo');
    }
  }

  function showSuccess(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup?.querySelector('.form-error');
    const iconStatus = formGroup?.querySelector('.input-icon-status');

    input.setAttribute('aria-invalid', 'false');

    input.classList.add('form-input-success');
    input.classList.remove('form-input-error');

    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.add('hidden');
      errorElement.classList.remove('form-error-visible');
    }

    if (iconStatus) {
      iconStatus.classList.remove('hidden', 'icon-[lucide--alert-circle]');
      iconStatus.classList.add('icon-[lucide--check-circle]');
      iconStatus.style.color = 'var(--color-sage-green-600)';
      iconStatus.setAttribute('aria-hidden', 'false');
      iconStatus.setAttribute('aria-label', 'Campo válido');
    }
  }

  function clearValidation(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup?.querySelector('.form-error');
    const iconStatus = formGroup?.querySelector('.input-icon-status');

    input.removeAttribute('aria-invalid');

    input.classList.remove('form-input-error', 'form-input-success');

    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.add('hidden');
      errorElement.classList.remove('form-error-visible');
    }

    if (iconStatus) {
      iconStatus.classList.add('hidden');
      iconStatus.classList.remove(
        'icon-[lucide--alert-circle]',
        'icon-[lucide--check-circle]',
      );
      iconStatus.style.color = '';
      iconStatus.setAttribute('aria-hidden', 'true');
    }
  }

  function validateAndUpdateUI(input) {
    const result = validateField(input);

    if (result.isValid) {
      showSuccess(input);
    } else {
      showError(input, result.message);
    }

    return result.isValid;
  }

  function initFormValidation() {
    const form = document.getElementById('register-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input[required]');

    inputs.forEach((input) => {
      input.addEventListener('blur', function () {
        if (this.value.trim()) {
          validateAndUpdateUI(this);
        }
      });

      input.addEventListener('input', function () {
        clearValidation(this);
      });
    });

    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    if (passwordInput && confirmPasswordInput) {
      passwordInput.addEventListener('input', function () {
        if (confirmPasswordInput.value) {
          validateAndUpdateUI(confirmPasswordInput);
        }
      });
    }

    form.addEventListener('submit', function (event) {
      let isFormValid = true;
      let firstInvalidInput = null;

      inputs.forEach((input) => {
        const isValid = validateAndUpdateUI(input);
        if (!isValid) {
          isFormValid = false;
          if (!firstInvalidInput) {
            firstInvalidInput = input;
          }
        }
      });

      if (!isFormValid) {
        event.preventDefault();

        announceError(
          'Por favor, corrige los errores en el formulario antes de continuar.',
        );

        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
      }
    });
  }

  function announceError(message) {
    const announcer = document.getElementById('form-announcer');
    if (announcer) {
      announcer.textContent = '';
      setTimeout(() => {
        announcer.textContent = message;
      }, 100);
    }
  }

  function initPasswordToggle() {
    const toggleButtons = document.querySelectorAll('.password-toggle');

    toggleButtons.forEach((button) => {
      button.addEventListener('click', function () {
        const inputId = this.getAttribute('aria-controls');
        const input = document.getElementById(inputId);
        const icon = this.querySelector('span[class*="icon-"]');

        if (input) {
          const isPassword = input.type === 'password';
          input.type = isPassword ? 'text' : 'password';

          this.setAttribute('aria-pressed', isPassword ? 'true' : 'false');
          this.setAttribute(
            'aria-label',
            isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña',
          );

          if (icon) {
            icon.className = isPassword
              ? 'icon-[lucide--eye-off] dark:text-white'
              : 'icon-[lucide--eye] dark:text-white';
          }
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initFormValidation();
    initPasswordToggle();
  });
})();
