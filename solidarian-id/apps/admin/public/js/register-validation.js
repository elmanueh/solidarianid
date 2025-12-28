(function () {
  'use strict';

  const FULLNAME_MIN_LENGTH = 3;
  const FULLNAME_MAX_LENGTH = 50;
  const PASSWORD_MIN_LENGTH = 12;

  const PATTERNS = {
    name: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑàèìòùÀÈÌÒÙçÇ\s]+$/,

    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    phone: /^\+\d{1,3}\d{9}$/,

    password: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/,
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
        'Introduce un número en formato internacional (ej: +34612345678)',
      tooShort: 'El número de teléfono debe tener al menos 10 dígitos',
    },
    password: {
      required: 'La contraseña es obligatoria',
      tooShort: `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`,
      noUppercase: 'La contraseña debe contener al menos una letra mayúscula',
      noSpecialChar:
        'La contraseña debe contener al menos un carácter especial',
      noNumber: 'La contraseña debe contener al menos un número',
      invalid: `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres, una mayúscula, un número y un carácter especial`,
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

    if (trimmedValue.length < FULLNAME_MIN_LENGTH) {
      return {
        isValid: false,
        message: `Debe tener al menos ${FULLNAME_MIN_LENGTH} caracteres`,
      };
    }

    if (trimmedValue.length > FULLNAME_MAX_LENGTH) {
      return {
        isValid: false,
        message: `No puede exceder ${FULLNAME_MAX_LENGTH} caracteres`,
      };
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
    if (digitsOnly.length < 10) {
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

    if (value.length < PASSWORD_MIN_LENGTH) {
      return { isValid: false, message: messages.tooShort };
    }

    if (!/[A-Z]/.test(value)) {
      return { isValid: false, message: messages.noUppercase };
    }

    if (!/\d/.test(value)) {
      return { isValid: false, message: messages.noNumber };
    }

    if (!/[\W_]/.test(value)) {
      return { isValid: false, message: messages.noSpecialChar };
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

    form.addEventListener('submit', async function (event) {
      event.preventDefault();

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
        announceError(
          'Por favor, corrige los errores en el formulario antes de continuar.',
        );

        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
        return;
      }

      // Preparar datos para enviar
      const registerData = {
        fullName: `${document.getElementById('firstName').value.trim()} ${document.getElementById('lastName').value.trim()}`,
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        password: document.getElementById('password').value,
      };

      // Deshabilitar botón mientras se envía
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<span class="icon-[lucide--loader-2] animate-spin" aria-hidden="true"></span><span>Registrando...</span>';

      // Enviar petición usando AuthAPI
      const result = await globalThis.AuthAPI.register(registerData);

      if (result.success) {
        globalThis.location.href = '/dashboard';
      } else {
        announceError(result.error || 'Error al registrar. Intenta de nuevo.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
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
