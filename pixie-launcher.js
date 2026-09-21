(() => {
  const PIXIE_OS = 'https://holdings.loptrlab.com/';
  if (document.querySelector('.pixie-launcher')) return;

  const launcher = document.createElement('a');
  launcher.className = 'pixie-launcher';
  launcher.href = PIXIE_OS + '?source=made-sick';
  launcher.setAttribute('aria-label', 'Open PIXIE OS');
  launcher.textContent = 'PIXIE';
  document.body.appendChild(launcher);
})();
