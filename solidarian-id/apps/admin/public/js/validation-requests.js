/* global axios */
/**
 * Módulo de validación de solicitudes
 * Maneja los clics en botones de aprobar/rechazar y el modal de la razón
 */
(function () {
  'use strict';

  const config = globalThis.APP_CONFIG || {
    apiBaseUrl: 'http://localhost:8090',
  };

  const axiosInstance = axios.create({
    baseURL: config.apiBaseUrl,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  let pendingValidation = { id: null, action: null };

  /**
   * Envía una solicitud PATCH para cambiar el estado de una solicitud
   * @param {string} id - ID de la solicitud
   * @param {string} action - 'approve' o 'reject'
   * @param {string} reason - Motivo o comentario
   */
  async function handleValidation(id, action, reason = '') {
    const status = action === 'approve' ? 'approved' : 'rejected';

    try {
      const payload = { status };

      if (reason) {
        payload.reason = reason;
      }

      await axiosInstance.patch(`/requests/${id}`, payload);

      globalThis.AuthAPI?.showToast(`Solicitud ${status === 'approved' ? 'aprobada' : 'rechazada'} correctamente`, 200);

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

  function showReasonModal(id, action) {
    pendingValidation = { id, action };

    const modal = document.getElementById('reason_modal');
    const textarea = modal.querySelector('textarea');
    const errorElement = document.getElementById('reason-error');

    textarea.value = '';
    errorElement.classList.add('hidden');
    modal.showModal();
  }

  function initValidationListeners() {
    document.addEventListener('click', e => {
      const button = e.target.closest('button[data-action]');
      if (!button) return;

      const article = button.closest('article.request');
      if (!article) return;

      const id = article.dataset.id;
      const action = button.dataset.action;

      showReasonModal(id, action);
    });

    const confirmBtn = document.querySelector('#reason_modal .btn-success');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        const modal = document.getElementById('reason_modal');
        const reason = modal.querySelector('textarea').value;
        const errorElement = document.getElementById('reason-error');
        const { id, action } = pendingValidation;

        if (action === 'reject' && reason.trim().length < 20) {
          errorElement.textContent = `El motivo debe tener mínimo 20 caracteres (${reason.trim().length}/20)`;
          errorElement.classList.remove('hidden');
          return;
        }

        errorElement.classList.add('hidden');
        modal.close();
        handleValidation(id, action, reason);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initValidationListeners);

  globalThis.ValidationAPI = {
    handleValidation,
  };
})();
