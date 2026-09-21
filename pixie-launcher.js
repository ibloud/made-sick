(() => {
  if (document.getElementById('open-pixie-os')) return;
  const launcher = document.createElement('a');
  launcher.className = 'pixie-launcher';
  launcher.id = 'open-pixie-os';
  launcher.href = 'https://holdings.loptrlab.com/radar.html?source=made-sick';
  launcher.setAttribute('aria-label', 'Open PIXIE OS desktop');
  launcher.innerHTML = '<img class="pixie-launcher-icon" src="assets/gemini-svg-2.svg" alt=""> PIXIE';
  document.body.appendChild(launcher);
})();
