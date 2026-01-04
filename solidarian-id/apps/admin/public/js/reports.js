/* global axios */
/**
 * Módulo de reportes de usuarios (Progressive Enhancement)
 * Gestiona únicamente la interacción del drawer de detalles y descarga de PDFs
 * La lista de usuarios y paginación se renderizan en el servidor (SSR)
 */
(function () {
  'use strict';

  // ════════════════════════════════════════════════════════════════
  // CONFIGURACIÓN
  // ════════════════════════════════════════════════════════════════
  const config = globalThis.APP_CONFIG || {
    apiBaseUrl: '', // Axios usará el mismo origen automáticamente
  };

  // ════════════════════════════════════════════════════════════════
  // ESTADO
  // ════════════════════════════════════════════════════════════════
  let selectedUserId = null;

  // ════════════════════════════════════════════════════════════════
  // ELEMENTOS DEL DOM
  // ════════════════════════════════════════════════════════════════
  const elements = {
    detailPanel: document.getElementById('user-detail-panel'),
    detailContent: document.getElementById('detail-content'),
    closeDetail: document.getElementById('close-detail'),
    panelOverlay: document.getElementById('panel-overlay'),
    downloadPdf: document.getElementById('download-pdf'),
  };

  // ════════════════════════════════════════════════════════════════
  // API CLIENT (AXIOS)
  // ════════════════════════════════════════════════════════════════
  const api = axios.create({
    baseURL: config.apiBaseUrl,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
  });

  // ════════════════════════════════════════════════════════════════
  // FUNCIONES DE API
  // ════════════════════════════════════════════════════════════════

  /**
   * Obtiene detalle de un usuario específico
   */
  async function fetchUserDetail(userId) {
    try {
      const response = await api.get(`/api/reports/users/${userId}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching user detail:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Error al cargar detalle del usuario',
      };
    }
  }

  /**
   * Descarga el PDF de un usuario
   */
  async function downloadUserPdf(userId) {
    try {
      const response = await api.get(`/api/reports/users/${userId}/pdf`, {
        responseType: 'blob',
      });

      // Crear URL temporal del blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `user-report-${userId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      return { success: true };
    } catch (error) {
      console.error('Error downloading PDF:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Error al descargar PDF',
      };
    }
  }

  // ════════════════════════════════════════════════════════════════
  // FUNCIONES DE RENDERIZADO
  // ════════════════════════════════════════════════════════════════

  /**
   * Renderiza el detalle de un usuario en el panel
   */
  function renderUserDetail(userData) {
    let communitiesHtml = '';
    if (userData.communities && userData.communities.length > 0) {
      communitiesHtml = userData.communities
        .map(
          community => `
        <div class="community-item">
          <span class="community-name">${community.name}</span>
          <span class="community-role-badge ${community.isAdmin ? 'community-role-admin' : 'community-role-member'}">
            ${community.isAdmin ? 'Administrador' : 'Miembro'}
          </span>
        </div>
      `,
        )
        .join('');
    } else {
      communitiesHtml = '<p class="text-gray-500 text-sm">No pertenece a ninguna comunidad</p>';
    }

    elements.detailContent.innerHTML = `
      <div class="detail-section">
        <h3 class="detail-section-title">
          <span class="icon-[lucide--user]" aria-hidden="true"></span>
          Información Personal
        </h3>
        <div class="detail-info-grid">
          <div class="detail-info-item">
            <span class="detail-info-label">ID</span>
            <span class="detail-info-value">${userData.id}</span>
          </div>
          <div class="detail-info-item">
            <span class="detail-info-label">Nombre de usuario</span>
            <span class="detail-info-value">@${userData.username}</span>
          </div>
          <div class="detail-info-item">
            <span class="detail-info-label">Teléfono</span>
            <span class="detail-info-value">${userData.phone}</span>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <h3 class="detail-section-title">
          <span class="icon-[lucide--map-pin]" aria-hidden="true"></span>
          Ubicación
        </h3>
        <div class="detail-info-grid">
          <div class="detail-info-item">
            <span class="detail-info-label">Ciudad</span>
            <span class="detail-info-value">${userData.city}</span>
          </div>
          <div class="detail-info-item">
            <span class="detail-info-label">País</span>
            <span class="detail-info-value">${userData.countryCode}</span>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <h3 class="detail-section-title">
          <span class="icon-[lucide--users]" aria-hidden="true"></span>
          Comunidades (${userData.communities.length})
        </h3>
        ${communitiesHtml}
      </div>
    `;
  }

  // ════════════════════════════════════════════════════════════════
  // FUNCIONES DE UI
  // ════════════════════════════════════════════════════════════════

  function showDetailPanel() {
    elements.detailPanel.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Forzar reflow antes de aplicar la transición
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const panelContent = document.getElementById('panel-content');
        const overlay = elements.panelOverlay;

        if (panelContent) {
          panelContent.classList.remove('translate-x-full');
        }
        if (overlay) {
          overlay.classList.remove('opacity-0');
          overlay.classList.add('opacity-100');
        }
      });
    });
  }

  function hideDetailPanel() {
    const panelContent = document.getElementById('panel-content');
    const overlay = elements.panelOverlay;

    if (panelContent) {
      panelContent.classList.add('translate-x-full');
    }
    if (overlay) {
      overlay.classList.remove('opacity-100');
      overlay.classList.add('opacity-0');
    }

    // Esperar a que termine la transición antes de ocultar
    setTimeout(() => {
      elements.detailPanel.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);

    selectedUserId = null;
  }

  function showToast(message, type = 'error') {
    // Reutilizar la función de toasts del sistema si existe
    if (globalThis.AuthAPI && globalThis.AuthAPI.showToast) {
      globalThis.AuthAPI.showToast(message, type === 'error' ? 500 : 200);
    } else {
      alert(message);
    }
  }

  // ════════════════════════════════════════════════════════════════
  // HANDLERS DE EVENTOS
  // ════════════════════════════════════════════════════════════════

  async function handleUserCardClick(userId) {
    selectedUserId = userId;
    showDetailPanel();

    // Mostrar loading en el panel
    elements.detailContent.innerHTML = `
      <div class="flex items-center justify-center py-12">
        <span class="icon-[lucide--loader-2] animate-spin text-4xl text-primary"></span>
      </div>
    `;

    elements.downloadPdf.disabled = true;

    const result = await fetchUserDetail(userId);

    if (result.success) {
      renderUserDetail(result.data);
      elements.downloadPdf.disabled = false;
    } else {
      elements.detailContent.innerHTML = `
        <div class="flex flex-col items-center justify-center py-12">
          <span class="icon-[lucide--alert-circle] text-6xl text-error"></span>
          <p class="mt-4 text-gray-600">${result.error}</p>
        </div>
      `;
    }
  }

  async function handleDownloadPdf() {
    if (!selectedUserId) return;

    elements.downloadPdf.disabled = true;
    elements.downloadPdf.innerHTML = `
      <span class="icon-[lucide--loader-2] animate-spin"></span>
      Descargando...
    `;

    const result = await downloadUserPdf(selectedUserId);

    if (!result.success) {
      showToast(result.error, 'error');
    }

    elements.downloadPdf.disabled = false;
    elements.downloadPdf.innerHTML = `
      <span class="icon-[lucide--download]"></span>
      Descargar PDF
    `;
  }

  // ════════════════════════════════════════════════════════════════
  // PROGRESSIVE ENHANCEMENT: INTERCEPTAR CLICKS EN TARJETAS
  // ════════════════════════════════════════════════════════════════

  /**
   * Intercepta clicks en tarjetas de usuarios ya renderizadas por SSR
   * Abre el drawer en lugar de navegar a la ruta
   */
  function setupUserCardsInterception() {
    // Seleccionar todas las tarjetas ya renderizadas en HTML
    const userCards = document.querySelectorAll('[data-user-id]');

    userCards.forEach(card => {
      const userId = card.dataset.userId;
      if (!userId) return;

      // Interceptar click en la tarjeta completa
      card.addEventListener('click', e => {
        // Permitir Ctrl+Click o Cmd+Click para abrir en nueva pestaña
        if (e.ctrlKey || e.metaKey) return;

        e.preventDefault();
        handleUserCardClick(userId);
      });

      // Interceptar Enter/Space en la tarjeta
      card.addEventListener('keypress', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleUserCardClick(userId);
        }
      });

      // Interceptar click en el link interno (si existe)
      const link = card.querySelector('.user-detail-link');
      if (link) {
        link.addEventListener('click', e => {
          // Permitir Ctrl+Click o Cmd+Click para abrir en nueva pestaña
          if (e.ctrlKey || e.metaKey) return;

          e.preventDefault();
          handleUserCardClick(userId);
        });
      }
    });
  }

  // ════════════════════════════════════════════════════════════════
  // INICIALIZACIÓN
  // ════════════════════════════════════════════════════════════════

  function init() {
    // Progressive enhancement: interceptar tarjetas ya renderizadas
    setupUserCardsInterception();

    // Event listeners del drawer
    if (elements.closeDetail) {
      elements.closeDetail.addEventListener('click', hideDetailPanel);
    }

    if (elements.panelOverlay) {
      elements.panelOverlay.addEventListener('click', hideDetailPanel);
    }

    if (elements.downloadPdf) {
      elements.downloadPdf.addEventListener('click', handleDownloadPdf);
    }

    // ESC para cerrar panel
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !elements.detailPanel.classList.contains('hidden')) {
        hideDetailPanel();
      }
    });
  }

  // Iniciar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
