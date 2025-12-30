/* global axios */
/**
 * Módulo de reportes de usuarios
 * Gestiona la carga de usuarios paginados, visualización de detalles y descarga de PDFs
 */
(function () {
  'use strict';

  // ════════════════════════════════════════════════════════════════
  // CONFIGURACIÓN
  // ════════════════════════════════════════════════════════════════
  const config = globalThis.APP_CONFIG || {
    apiBaseUrl: '', // Axios usará el mismo origen automáticamente
  };
  // const USERS_PER_PAGE = 5; // Fijo en el backend

  // ════════════════════════════════════════════════════════════════
  // ESTADO
  // ════════════════════════════════════════════════════════════════
  let currentPage = 1;
  // let totalPages = 1; // Se actualiza dinámicamente
  let totalUsers = 0;
  let selectedUserId = null;

  // ════════════════════════════════════════════════════════════════
  // ELEMENTOS DEL DOM
  // ════════════════════════════════════════════════════════════════
  const elements = {
    usersList: document.getElementById('users-list'),
    pagination: document.getElementById('pagination'),
    loading: document.getElementById('loading'),
    emptyState: document.getElementById('empty-state'),
    errorState: document.getElementById('error-state'),
    retryBtn: document.getElementById('retry-btn'),
    detailPanel: document.getElementById('user-detail-panel'),
    detailContent: document.getElementById('detail-content'),
    closeDetail: document.getElementById('close-detail'),
    panelOverlay: document.getElementById('panel-overlay'),
    downloadPdf: document.getElementById('download-pdf'),
    totalUsersSpan: document.getElementById('total-users'),
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
   * Obtiene usuarios paginados desde la API
   */
  async function fetchUsers(page) {
    try {
      const response = await api.get('/api/reports/users', {
        params: { page },
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching users:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Error al cargar usuarios',
      };
    }
  }

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
        error:
          error.response?.data?.message ||
          'Error al cargar detalle del usuario',
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
   * Renderiza la lista de usuarios
   */
  function renderUsersList(users) {
    elements.usersList.innerHTML = '';

    users.forEach((user) => {
      const card = createUserCard(user);
      elements.usersList.appendChild(card);
    });
  }

  /**
   * Crea una tarjeta de usuario
   */
  function createUserCard(user) {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Ver detalles de ${user.username}`);
    card.dataset.userId = user.id;

    // Obtener nombre del país desde el código
    const countryName = getCountryName(user.countryCode);

    card.innerHTML = `
      <div class="user-card-header">
        <div class="user-card-info">
          <div class="user-card-username">@${user.username}</div>
          <div class="user-card-location">
            <span class="icon-[lucide--map-pin]" aria-hidden="true"></span>
            <span>${user.city}, ${countryName}</span>
          </div>
        </div>
      </div>
      <div class="user-card-meta">
        <div class="user-card-communities">
          <span class="icon-[lucide--users]" aria-hidden="true"></span>
          <span>${user.communitiesCount} ${user.communitiesCount === 1 ? 'comunidad' : 'comunidades'}</span>
        </div>
      </div>
    `;

    // Event listeners
    card.addEventListener('click', () => handleUserCardClick(user.id));
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleUserCardClick(user.id);
      }
    });

    return card;
  }

  /**
   * Renderiza los controles de paginación
   */
  function renderPagination(paginationData) {
    elements.pagination.innerHTML = '';

    const { page, totalPages: total, hasPrev, hasNext } = paginationData;

    // Botón anterior
    const prevBtn = document.createElement('button');
    prevBtn.className = `btn btn-sm ${!hasPrev ? 'btn-disabled' : ''}`;
    prevBtn.disabled = !hasPrev;
    prevBtn.innerHTML = '<span class="icon-[lucide--chevron-left]"></span>';
    prevBtn.setAttribute('aria-label', 'Página anterior');
    if (hasPrev) {
      prevBtn.addEventListener('click', () => handlePageChange(page - 1));
    }
    elements.pagination.appendChild(prevBtn);

    // Botones de números de página
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(total, page + 2);

    if (startPage > 1) {
      const firstBtn = createPageButton(1);
      elements.pagination.appendChild(firstBtn);
      if (startPage > 2) {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'px-2 text-gray-500';
        ellipsis.textContent = '...';
        elements.pagination.appendChild(ellipsis);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageBtn = createPageButton(i, i === page);
      elements.pagination.appendChild(pageBtn);
    }

    if (endPage < total) {
      if (endPage < total - 1) {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'px-2 text-gray-500';
        ellipsis.textContent = '...';
        elements.pagination.appendChild(ellipsis);
      }
      const lastBtn = createPageButton(total);
      elements.pagination.appendChild(lastBtn);
    }

    // Botón siguiente
    const nextBtn = document.createElement('button');
    nextBtn.className = `btn btn-sm ${!hasNext ? 'btn-disabled' : ''}`;
    nextBtn.disabled = !hasNext;
    nextBtn.innerHTML = '<span class="icon-[lucide--chevron-right]"></span>';
    nextBtn.setAttribute('aria-label', 'Página siguiente');
    if (hasNext) {
      nextBtn.addEventListener('click', () => handlePageChange(page + 1));
    }
    elements.pagination.appendChild(nextBtn);
  }

  /**
   * Crea un botón de página
   */
  function createPageButton(pageNumber, isActive = false) {
    const btn = document.createElement('button');
    btn.className = `btn btn-sm ${isActive ? 'btn-active btn-primary' : ''}`;
    btn.textContent = pageNumber;
    btn.setAttribute('aria-label', `Ir a página ${pageNumber}`);
    if (isActive) {
      btn.setAttribute('aria-current', 'page');
    }
    if (!isActive) {
      btn.addEventListener('click', () => handlePageChange(pageNumber));
    }
    return btn;
  }

  /**
   * Renderiza el detalle de un usuario en el panel
   */
  function renderUserDetail(userData) {
    // Obtener nombre del país
    const countryName = getCountryName(userData.countryCode);

    let communitiesHtml = '';
    if (userData.communities && userData.communities.length > 0) {
      communitiesHtml = userData.communities
        .map(
          (community) => `
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
      communitiesHtml =
        '<p class="text-gray-500 text-sm">No pertenece a ninguna comunidad</p>';
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
            <span class="detail-info-value">${countryName} (${userData.countryCode})</span>
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

  function showLoading() {
    elements.usersList.classList.add('hidden');
    elements.emptyState.classList.add('hidden');
    elements.errorState.classList.add('hidden');
    elements.loading.classList.remove('hidden');
    elements.pagination.classList.add('hidden');
  }

  function hideLoading() {
    elements.loading.classList.add('hidden');
  }

  function showEmptyState() {
    hideLoading();
    elements.usersList.classList.add('hidden');
    elements.errorState.classList.add('hidden');
    elements.emptyState.classList.remove('hidden');
    elements.pagination.classList.add('hidden');
  }

  function showErrorState() {
    hideLoading();
    elements.usersList.classList.add('hidden');
    elements.emptyState.classList.add('hidden');
    elements.errorState.classList.remove('hidden');
    elements.pagination.classList.add('hidden');
  }

  function showUsersList() {
    hideLoading();
    elements.errorState.classList.add('hidden');
    elements.emptyState.classList.add('hidden');
    elements.usersList.classList.remove('hidden');
    elements.pagination.classList.remove('hidden');
  }

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

  async function handlePageChange(page) {
    currentPage = page;
    await loadUsers(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
  // FUNCIÓN PRINCIPAL DE CARGA
  // ════════════════════════════════════════════════════════════════

  async function loadUsers(page = 1) {
    showLoading();

    const result = await fetchUsers(page);

    if (!result.success) {
      showErrorState();
      return;
    }

    const { data, pagination } = result.data;

    if (data.length === 0) {
      showEmptyState();
      return;
    }

    totalUsers = pagination.total;
    // totalPages = pagination.totalPages;
    currentPage = pagination.page;

    // Actualizar UI
    elements.totalUsersSpan.textContent = totalUsers;
    renderUsersList(data);
    renderPagination(pagination);
    showUsersList();
  }

  // ════════════════════════════════════════════════════════════════
  // UTILIDADES
  // ════════════════════════════════════════════════════════════════

  /**
   * Obtiene el nombre del país desde el código ISO
   */
  function getCountryName(countryCode) {
    const countries = {
      ES: 'España',
      MX: 'México',
      AR: 'Argentina',
      CO: 'Colombia',
      CL: 'Chile',
      PE: 'Perú',
      EC: 'Ecuador',
    };
    return countries[countryCode] || countryCode;
  }

  // ════════════════════════════════════════════════════════════════
  // INICIALIZACIÓN
  // ════════════════════════════════════════════════════════════════

  function init() {
    // Cargar primera página
    loadUsers(1);

    // Event listeners
    if (elements.closeDetail) {
      elements.closeDetail.addEventListener('click', hideDetailPanel);
    }

    if (elements.panelOverlay) {
      elements.panelOverlay.addEventListener('click', hideDetailPanel);
    }

    if (elements.downloadPdf) {
      elements.downloadPdf.addEventListener('click', handleDownloadPdf);
    }

    if (elements.retryBtn) {
      elements.retryBtn.addEventListener('click', () => loadUsers(currentPage));
    }

    // ESC para cerrar panel
    document.addEventListener('keydown', (e) => {
      if (
        e.key === 'Escape' &&
        !elements.detailPanel.classList.contains('hidden')
      ) {
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
