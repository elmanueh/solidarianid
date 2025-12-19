document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const menuLinks = document.querySelectorAll('.aside-menu a');

  menuLinks.forEach((link) => {
    const href = link.getAttribute('href');

    const normalizedHref = href.startsWith('/') ? href : `/${href}`;

    if (currentPath.includes(href) || currentPath === normalizedHref) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
});
