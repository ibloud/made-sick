(() => {
  if (document.getElementById('open-pixie-os')) return;
  const destination = 'https://holdings.loptrlab.com/radar.html?source=made-sick&tool=care';
  const launcher = document.createElement('button');
  launcher.type = 'button';
  launcher.className = 'pixie-launcher';
  launcher.id = 'open-pixie-os';
  launcher.setAttribute('aria-label', 'Open PIXIE OS care workspace');
  launcher.setAttribute('aria-haspopup', 'dialog');
  launcher.innerHTML = '<img class="pixie-launcher-icon" src="assets/gemini-svg-2.svg" alt=""> PIXIE';

  const overlay = document.createElement('div');
  overlay.className = 'pixie-radar-overlay';
  overlay.id = 'pixie-radar-overlay';
  overlay.hidden = true;
  overlay.innerHTML = `
    <section class="pixie-radar-shell" role="dialog" aria-modal="true" aria-label="PIXIE OS care workspace">
      <header class="pixie-radar-head"><span>PIXIE OS · MADE SICK CARE</span><button class="pixie-radar-close" type="button">Close</button></header>
      <iframe class="pixie-radar-frame" title="PIXIE OS care workspace" data-src="${destination}"></iframe>
    </section>`;

  const closeButton = overlay.querySelector('.pixie-radar-close');
  const frame = overlay.querySelector('.pixie-radar-frame');
  let previousFocus = null;

  function openPixie() {
    previousFocus = document.activeElement;
    if (!frame.src) frame.src = frame.dataset.src;
    overlay.hidden = false;
    overlay.classList.add('open');
    document.body.classList.add('pixie-overlay-open');
    closeButton.focus();
  }

  function closePixie() {
    overlay.classList.remove('open');
    overlay.hidden = true;
    document.body.classList.remove('pixie-overlay-open');
    if (previousFocus) previousFocus.focus();
  }

  launcher.addEventListener('click', openPixie);
  closeButton.addEventListener('click', closePixie);
  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-open-pixie-os]')) openPixie();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !overlay.hidden) closePixie();
  });
  document.body.appendChild(launcher);
  document.body.appendChild(overlay);
})();
