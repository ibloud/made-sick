(() => {
  if (document.getElementById('open-pixie-os')) return;
  const open = document.createElement('button');
  open.className = 'pixie-launcher';
  open.id = 'open-pixie-os';
  open.type = 'button';
  open.setAttribute('aria-controls','pixie-radar-overlay');
  open.setAttribute('aria-expanded','false');
  open.innerHTML = '<img class="pixie-launcher-icon" src="assets/gemini-svg-2.svg" alt=""> PIXIE';

  const overlay = document.createElement('div');
  overlay.className = 'pixie-radar-overlay';
  overlay.id = 'pixie-radar-overlay';
  overlay.setAttribute('aria-hidden','true');
  overlay.innerHTML = '<div class="pixie-radar-shell" role="dialog" aria-modal="true" aria-label="PIXIE OS desktop"><div class="pixie-radar-head"><span>PIXIE OS // DESKTOP // LOPTR LAB</span><button class="pixie-radar-close" type="button">[ CLOSE OS ]</button></div><iframe class="pixie-radar-frame" src="https://holdings.loptrlab.com/radar.html" title="PIXIE OS desktop"></iframe></div>';

  document.body.append(open, overlay);
  const close = overlay.querySelector('.pixie-radar-close');
  let previousFocus = null;
  function showRadar(){ previousFocus=document.activeElement; overlay.classList.add('open'); overlay.setAttribute('aria-hidden','false'); open.setAttribute('aria-expanded','true'); document.body.style.overflow='hidden'; close.focus(); }
  function hideRadar(){ overlay.classList.remove('open'); overlay.setAttribute('aria-hidden','true'); open.setAttribute('aria-expanded','false'); document.body.style.overflow=''; previousFocus?.focus(); }
  open.addEventListener('click',showRadar);
  close.addEventListener('click',hideRadar);
  overlay.addEventListener('click',e=>{if(e.target===overlay)hideRadar()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open'))hideRadar()});
})();
