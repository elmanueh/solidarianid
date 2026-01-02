/* global axios */
/**
 * Módulo de validación de solicitudes
 * Maneja los clics en botones de aprobar/rechazar
 */
(function () {
  'use strict';

  const config = globalThis.APP_CONFIG || {
    apiBaseUrl: 'http://localhost:3000',
  };

  const axiosInstance = axios.create({
    baseURL: config.apiBaseUrl,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  /**
   * Envía una solicitud PATCH para cambiar el estado de una solicitud
   * @param {string} id - ID de la solicitud
   * @param {string} action - 'approve' o 'reject'
   */
  async function handleValidation(id, action) {
    const status = action === 'approve' ? 'approved' : 'rejected';

    try {
      await axiosInstance.patch(`/requests/${id}`, {
        status,
      });

      globalThis.AuthAPI?.showToast(`Solicitud ${status === 'approved' ? 'aprobada' : 'rechazada'} correctamente`, 200);

      // Eliminar la solicitud de la vista
      const article = document.querySelector(`[data-id="${id}"]`);
      if (article) {
        article.style.opacity = '0';
        article.style.transition = 'opacity 0.3s ease';
        setTimeout(() => article.remove(), 300);
      }
    } catch (error) {
      console.error('Error validating request:', error);
      globalThis.AuthAPI?.showToast('Error al procesar la solicitud', error.response?.status || 500);
    }
  }

  function initValidationListeners() {
    document.addEventListener('click', e => {
      const button = e.target.closest('button[data-action]');
      if (!button) return;

      const article = button.closest('article.request');
      if (!article) return;

      const id = article.dataset.id;
      const action = button.dataset.action;

      handleValidation(id, action);
    });
  }

  document.addEventListener('DOMContentLoaded', initValidationListeners);

  // Exponer función para recargar manualmente si es necesario
  globalThis.ValidationAPI = {
    handleValidation,
  };
})();
