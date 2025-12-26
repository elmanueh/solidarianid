(function () {
  'use strict';

  function updateFieldUI(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup?.querySelector('.form-error');
    const iconStatus = formGroup?.querySelector('.input-icon-status');
    const isValid = input.validity.valid;

    input.setAttribute('aria-invalid', String(!isValid));
    input.classList.toggle('form-input-error', !isValid);
    input.classList.toggle('form-input-success', isValid);

    if (errorElement) {
      errorElement.textContent = isValid ? '' : input.validationMessage;
      errorElement.classList.toggle('hidden', isValid);
      errorElement.classList.toggle('form-error-visible', !isValid);
    }

    if (iconStatus) {
      iconStatus.classList.remove('hidden');
      iconStatus.classList.toggle('icon-[lucide--alert-circle]', !isValid);
      iconStatus.classList.toggle('icon-[lucide--check-circle]', isValid);
      iconStatus.style.color = isValid
        ? 'var(--color-sage-green-600)'
        : 'var(--color-dark-wine-600)';
      iconStatus.setAttribute('aria-hidden', 'false');
      iconStatus.setAttribute(
        'aria-label',
        isValid ? 'Campo válido' : 'Error en el campo',
      );
    }
  }

  function clearFieldUI(input) {
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

  function initFormValidation() {
    const form = document.getElementById('login-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input[required]');

    inputs.forEach((input) => {
      input.addEventListener('blur', function () {
        if (this.value.trim()) {
          updateFieldUI(this);
        }
      });

      input.addEventListener('input', function () {
        clearFieldUI(this);
      });

      input.addEventListener('invalid', function (event) {
        event.preventDefault();
        updateFieldUI(this);
      });
    });

    form.addEventListener('submit', async function (event) {
      event.preventDefault();

      const firstInvalid = form.querySelector('input:invalid');

      if (firstInvalid) {
        inputs.forEach((input) => updateFieldUI(input));

        const announcer = document.getElementById('form-announcer');
        if (announcer) {
          announcer.textContent = '';
          setTimeout(() => {
            announcer.textContent =
              'Por favor, corrige los errores en el formulario antes de continuar.';
          }, 100);
        }

        firstInvalid.focus();
        return;
      }

      const loginData = {
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value,
      };

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<span class="icon-[lucide--loader-2] animate-spin" aria-hidden="true"></span><span>Iniciando sesión...</span>';

      let restored = false;
      const restoreTimeout = setTimeout(() => {
        if (!restored) {
          submitBtn.innerHTML = originalBtnText;
        }
      }, 1500);

      const result = await globalThis.AuthAPI.login(loginData);

      clearTimeout(restoreTimeout);
      restored = true;

      if (result.success) {
        const announcer = document.getElementById('form-announcer');
        if (announcer) {
          announcer.textContent = '¡Sesión iniciada! Redirigiendo...';
        }
        globalThis.location.href = '/dashboard';
      } else {
        const announcer = document.getElementById('form-announcer');
        if (announcer) {
          announcer.textContent = '';
          setTimeout(() => {
            announcer.textContent = result.error;
          }, 100);
        }
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }

  function initPasswordToggle() {
    document.querySelectorAll('.password-toggle').forEach((button) => {
      button.addEventListener('click', function () {
        const input = document.getElementById(
          this.getAttribute('aria-controls'),
        );
        const icon = this.querySelector('span[class*="icon-"]');

        if (input) {
          const isPassword = input.type === 'password';
          input.type = isPassword ? 'text' : 'password';
          this.setAttribute('aria-pressed', String(isPassword));
          this.setAttribute(
            'aria-label',
            isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña',
          );

          if (icon) {
            icon.className = isPassword
              ? 'icon-[lucide--eye-off]'
              : 'icon-[lucide--eye]';
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
