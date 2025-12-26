document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const menuLinks = document.querySelectorAll('.aside-menu a');
  const itemsAside = document.querySelectorAll('.targeteable');

  const hamburgerBtn = document.getElementById('hamburger-btn');
  const aside = document.getElementById('aside');
  const overlay = document.getElementById('aside-overlay');

  function accesibilityAside(itemsAside) {
    const isDesktop = window.innerWidth >= 768;
    const isMobileOpen = aside.classList.contains('open');

    itemsAside.forEach((link) => {
      if (isDesktop || isMobileOpen) {
        link.removeAttribute('tabindex');
      } else {
        link.setAttribute('tabindex', '-1');
      }
    });
  }

  function toggleMenu() {
    aside.classList.toggle('open');
    overlay.classList.toggle('active');

    accesibilityAside(itemsAside);

    const isOpen = aside.classList.contains('open');
    hamburgerBtn.setAttribute(
      'aria-label',
      isOpen ? 'Cerrar menú' : 'Abrir menú',
    );
  }

  function closeMenu() {
    aside.classList.remove('open');
    overlay.classList.remove('active');
    hamburgerBtn.setAttribute('aria-label', 'Abrir menú');
    accesibilityAside(itemsAside);
  }

  accesibilityAside(itemsAside);

  menuLinks.forEach((link) => {
    const href = link.getAttribute('href');
    const normalizedHref = href.startsWith('/') ? href : `/${href}`;

    if (currentPath.includes(href) || currentPath === normalizedHref) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  hamburgerBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        closeMenu();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && aside.classList.contains('open')) {
      closeMenu();
    }
  });

  const logoutBtn = document.getElementById('logout-btn');
  logoutBtn.addEventListener('click', async () => {
    const result = await globalThis.AuthAPI.logout();
    if (result.success) {
      globalThis.location.href = '/login';
    }
  });
});
