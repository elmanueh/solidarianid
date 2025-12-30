/* global axios */
/**
 * Módulo de peticiones HTTP usando Axios
 * Configurado con la URL base desde APP_CONFIG
 */
(function () {
  'use strict';

  // Obtener configuración inyectada desde el servidor
  const config = globalThis.APP_CONFIG || {
    apiBaseUrl: '', // Axios usará el mismo origen automáticamente
  };

  // Crear instancia configurada de axios
  const axiosInstance = axios.create({
    baseURL: config.apiBaseUrl,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  /**
   * Muestra un toast con el mensaje de error
   * @param {string} message - Mensaje a mostrar
   * @param {number} statusCode - Código de estado HTTP
   */
  function showToast(message, statusCode = 500) {
    // Crear contenedor de toasts si no existe
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'toast toast-top toast-end';
      toastContainer.setAttribute('aria-live', 'polite');
      toastContainer.setAttribute('aria-atomic', 'true');
      document.body.appendChild(toastContainer);
    }

    // Determinar el tipo de alerta según el statusCode
    let alertClass = 'alert-error';
    let iconClass = 'icon-[lucide--alert-circle]';
    let title = 'Error';

    switch (statusCode) {
      case 400:
        alertClass = 'alert-warning';
        iconClass = 'icon-[lucide--alert-triangle]';
        title = 'Error de validación';
        break;
      case 401:
        alertClass = 'alert-error';
        iconClass = 'icon-[lucide--lock]';
        title = 'No autorizado';
        break;
      case 404:
        alertClass = 'alert-info';
        iconClass = 'icon-[lucide--search-x]';
        title = 'No encontrado';
        break;
      case 409:
        alertClass = 'alert-warning';
        iconClass = 'icon-[lucide--octagon-alert]';
        title = 'Conflicto';
        break;
      case 500:
        alertClass = 'alert-error';
        iconClass = 'icon-[lucide--server-crash]';
        title = 'Error del servidor';
        break;
      default:
        alertClass = 'alert-error';
        iconClass = 'icon-[lucide--alert-circle]';
        title = 'Error';
    }

    // Crear el elemento del toast
    const toast = document.createElement('div');
    toast.className = `alert ${alertClass} shadow-lg`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <div class="flex items-start gap-3">
        <span class="${iconClass} text-xl shrink-0" aria-hidden="true"></span>
        <div class="flex-1">
          <div class="font-bold">${title}</div>
          <div class="text-sm">${message}</div>
        </div>
        <button class="btn btn-ghost btn-sm btn-circle" aria-label="Cerrar notificación">
          <span class="icon-[lucide--x]" aria-hidden="true"></span>
        </button>
      </div>
    `;

    toastContainer.appendChild(toast);

    const closeBtn = toast.querySelector('button');
    closeBtn.addEventListener('click', () => {
      toast.remove();
    });

    setTimeout(() => {
      toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 5000);
  }

  /**
   * Envía la petición de login al servidor
   * @param {Object} loginData - Datos del formulario de login
   * @returns {Promise} - Respuesta del servidor
   */
  async function sendLoginRequest(loginData) {
    try {
      const response = await axiosInstance.post('/api/auth/login', loginData);
      return { success: true, data: response.data };
    } catch (error) {
      // Los filtros del backend devuelven { statusCode, message, timestamp }
      const message =
        error.response?.data?.message ||
        'Error al iniciar sesión. Intenta de nuevo.';
      const statusCode = error.response?.status || 500;

      // Mostrar toast con el error
      showToast(message, statusCode);

      return { success: false, error: message, statusCode };
    }
  }

  /**
   * Envía la petición de registro al servidor
   * @param {Object} registerData - Datos del formulario de registro
   * @returns {Promise} - Respuesta del servidor
   */
  async function sendRegisterRequest(registerData) {
    try {
      const response = await axiosInstance.post(
        '/api/auth/register',
        registerData,
      );
      return { success: true, data: response.data };
    } catch (error) {
      // Los filtros del backend devuelven { statusCode, message, timestamp }
      const message =
        error.response?.data?.message ||
        'Error al registrar. Intenta de nuevo.';
      const statusCode = error.response?.status || 500;

      // Mostrar toast con el error
      showToast(message, statusCode);

      return { success: false, error: message, statusCode };
    }
  }

  async function sendLogoutRequest() {
    try {
      const response = await axiosInstance.post('/api/auth/logout');
      return { success: true, data: response.data };
    } catch (error) {
      // Los filtros del backend devuelven { statusCode, message, timestamp }
      const message =
        error.response?.data?.message ||
        'Error al cerrar sesión. Intenta de nuevo.';
      const statusCode = error.response?.status || 500;

      // Mostrar toast con el error
      showToast(message, statusCode);

      return { success: false, error: message, statusCode };
    }
  }

  // Exponer funciones globalmente
  globalThis.AuthAPI = {
    login: sendLoginRequest,
    register: sendRegisterRequest,
    logout: sendLogoutRequest,
    showToast,
  };
})();
