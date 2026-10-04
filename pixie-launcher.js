(() => {
  if (document.getElementById('open-pixie-os')) return;
  // The care page can also run inside Holdings. Avoid recursive launchers there.
  if (location.pathname.endsWith('/pixie-care.html') && window.self !== window.top) return;
  const destination = 'https://holdings.loptrlab.com/radar.html?source=made-sick&tool=care';
  const launcher = document.createElement('button');
  launcher.type = 'button';
  launcher.className = 'pixie-launcher';
  launcher.id = 'open-pixie-os';
  launcher.setAttribute('aria-label', 'Open PIXIE OS care workspace');
  launcher.setAttribute('aria-haspopup', 'dialog');
  launcher.setAttribute('aria-controls', 'pixie-radar-overlay');
  launcher.setAttribute('aria-expanded', 'false');
  launcher.innerHTML = '<img class="pixie-launcher-icon" src="assets/gemini-svg-2.svg" alt=""> PIXIE';

  const overlay = document.createElement('div');
  overlay.className = 'pixie-radar-overlay';
  overlay.id = 'pixie-radar-overlay';
  overlay.hidden = true;
  overlay.innerHTML = `
    <section class="pixie-radar-shell" role="dialog" aria-modal="true" aria-label="PIXIE OS care workspace" aria-describedby="pixie-radar-help">
      <header class="pixie-radar-head"><span>PIXIE OS · MADE SICK CARE</span><a href="${destination}" target="_blank" rel="noopener noreferrer">Open in a new tab</a><button class="pixie-radar-close" type="button">Close</button></header>
      <p id="pixie-radar-help" class="pixie-radar-help">External workspace. Save or export your work before closing; Close unloads it. If it cannot display here, open it in a new tab.</p>
      <iframe class="pixie-radar-frame" title="PIXIE OS care workspace" referrerpolicy="no-referrer" data-src="${destination}"></iframe>
    </section>`;

  const closeButton = overlay.querySelector('.pixie-radar-close');
  const frame = overlay.querySelector('.pixie-radar-frame');
  let previousFocus = null;
  const background = new Map();

  function openPixie() {
    if (!overlay.hidden) return;
    previousFocus = document.activeElement;
    frame.src = frame.dataset.src;
    for (const element of document.body.children) {
      if (element === overlay) continue;
      background.set(element, element.inert);
      element.inert = true;
    }
    overlay.hidden = false;
    overlay.classList.add('open');
    document.body.classList.add('pixie-overlay-open');
    launcher.setAttribute('aria-expanded', 'true');
    closeButton.focus();
  }

  function closePixie() {
    if (overlay.hidden) return;
    overlay.classList.remove('open');
    overlay.hidden = true;
    document.body.classList.remove('pixie-overlay-open');
    frame.removeAttribute('src');
    for (const [element, inert] of background) element.inert = inert;
    background.clear();
    launcher.setAttribute('aria-expanded', 'false');
    if (previousFocus) previousFocus.focus();
  }

  launcher.addEventListener('click', openPixie);
  closeButton.addEventListener('click', closePixie);
  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-open-pixie-os]')) openPixie();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !overlay.hidden) { event.preventDefault(); closePixie(); }
  });
  document.addEventListener('focusin', event => {
    if (!overlay.hidden && !overlay.contains(event.target)) closeButton.focus();
  });
  overlay.addEventListener('click', event => { if (event.target === overlay) closePixie(); });
  document.body.appendChild(launcher);
  document.body.appendChild(overlay);
})();
