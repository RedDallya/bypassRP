const CONFIG = {
  discord: 'https://discord.gg/TU-INVITACION',
  cfx: 'https://cfx.re/join/TU-CODIGO',
  connect: 'connect play.bypassrp.com'
};

const pages = [...document.querySelectorAll('[data-page]')];
const routeLinks = [...document.querySelectorAll('[data-route]')];
const menu = document.querySelector('.nav');
const menuToggle = document.querySelector('.menu-toggle');
const toast = document.getElementById('toast');

function openPage(route) {
  const target = pages.find(p => p.dataset.page === route) || pages[0];
  pages.forEach(p => p.classList.toggle('active', p === target));
  routeLinks.forEach(a => a.classList.toggle('active', a.dataset.route === target.dataset.page));
  menu?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function routeFromHash() {
  return (location.hash || '#inicio').replace('#','');
}

window.addEventListener('hashchange', () => openPage(routeFromHash()));
routeLinks.forEach(link => link.addEventListener('click', () => openPage(link.dataset.route)));
openPage(routeFromHash());

menuToggle?.addEventListener('click', () => {
  const opened = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(opened));
});

document.querySelectorAll('[data-link="discord"]').forEach(a => a.href = CONFIG.discord);
document.querySelectorAll('[data-link="cfx"]').forEach(a => a.href = CONFIG.cfx);
document.getElementById('connectText').textContent = CONFIG.connect;

document.getElementById('copyConnect')?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(CONFIG.connect);
    toast.textContent = 'Conexión copiada: ' + CONFIG.connect;
  } catch {
    toast.textContent = CONFIG.connect;
  }
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2300);
});
