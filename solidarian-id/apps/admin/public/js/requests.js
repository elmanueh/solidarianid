/**
 * Módulo de peticiones HTTP usando Axios
 * Configurado con la URL base desde APP_CONFIG
 */
(function () {
  'use strict';

  // Obtener configuración inyectada desde el servidor
  const config = globalThis.APP_CONFIG || {
    apiBaseUrl: 'http://localhost:3000',
  };

  // Crear instancia configurada de axios
  const axiosInstance = axios.create({
    baseURL: config.apiBaseUrl,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

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
      const message =
        error.response?.data?.message ||
        'Error al iniciar sesión. Intenta de nuevo.';
      return { success: false, error: message };
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
      const message =
        error.response?.data?.message ||
        'Error al registrar. Intenta de nuevo.';
      return { success: false, error: message };
    }
  }

  // Exponer funciones globalmente
  globalThis.AuthAPI = {
    login: sendLoginRequest,
    register: sendRegisterRequest,
  };
})();
