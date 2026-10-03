(() => {
 const load = document.getElementById('load-pixie-demo');
 if (!load) return;
 const close = document.getElementById('close-pixie-demo');
 const panel = document.getElementById('pixie-demo-panel');
 const frame = document.getElementById('pixie-demo-frame');
 const status = document.getElementById('pixie-demo-status');
 load.addEventListener('click', () => {
   frame.src = 'https://ibloud.github.io/50-ways-to-leave-another/pixie/demo/index.html';
   panel.hidden = false;
   close.hidden = false;
   load.hidden = true;
   load.setAttribute('aria-expanded', 'true');
   status.textContent = 'Demo opened. If it cannot display here, use the new-tab link.';
   close.focus();
 });
 close.addEventListener('click', () => {
   frame.removeAttribute('src');
   panel.hidden = true;
   close.hidden = true;
   load.hidden = false;
   load.setAttribute('aria-expanded', 'false');
   status.textContent = 'Demo closed and unloaded.';
   load.focus();
 });
})();
