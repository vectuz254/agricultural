
// ============================================
// AGROSENSE — mobile-nav.js
// Toggles the sidebar as a slide-in menu on small
// screens. Include on every page that has the
// dash-layout sidebar.
// ============================================
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('mobileNavToggle');
  const sidebar = document.querySelector('.sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (!toggle || !sidebar || !backdrop) return;

  function openMenu() {
    sidebar.classList.add('open');
    backdrop.classList.add('open');
  }
  function closeMenu() {
    sidebar.classList.remove('open');
    backdrop.classList.remove('open');
  }

  toggle.addEventListener('click', openMenu);
  backdrop.addEventListener('click', closeMenu);

  // Close the menu automatically when a nav link is tapped
  sidebar.querySelectorAll('.sb-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
});
