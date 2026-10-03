(() => {
  const header = document.querySelector('.grouped-header');
  if (!header) return;
  const toggle = header.querySelector('.menu-toggle');
  const menu = header.querySelector('#primary-menu');
  const mobile = matchMedia('(max-width: 850px)');
  const groups = [...menu.querySelectorAll('.nav-group')];
  function layout() {
    toggle.hidden = !mobile.matches;
    menu.hidden = mobile.matches && toggle.getAttribute('aria-expanded') !== 'true';
    if (mobile.matches) groups.forEach(group => { group.open = true; });
    else groups.forEach(group => { group.open = false; });
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
  });
  groups.forEach(group => group.addEventListener('toggle', () => {
    if (group.open && !mobile.matches) groups.forEach(other => { if (other !== group) other.open = false; });
  }));
  document.addEventListener('click', event => {
    if (!header.contains(event.target) && !mobile.matches) groups.forEach(group => { group.open = false; });
  });
  header.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const current = groups.find(group => group.open && group.contains(document.activeElement));
    if (mobile.matches) {
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    } else {
      groups.forEach(group => { group.open = false; });
      current?.querySelector('summary').focus();
    }
  });
  function revealTarget() {
    if (!location.hash) return;
    let id; try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    for (let ancestor = target.parentElement; ancestor; ancestor = ancestor.parentElement) {
      if (ancestor.matches('details')) ancestor.open = true;
    }
    target.scrollIntoView();
  }
  menu.addEventListener('click', event => {
    if (!event.target.closest('a')) return;
    if (mobile.matches) {
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    } else groups.forEach(group => { group.open = false; });
    // Also reveal an already-current anchor inside collapsed project details.
    setTimeout(revealTarget, 0);
  });
  window.addEventListener('hashchange', revealTarget);
  mobile.addEventListener('change', layout);
  layout();
  revealTarget();
  const query = document.getElementById('site-query');
  if (query) {
    const rows = [...document.querySelectorAll('#search-results li')];
    const count = document.getElementById('search-count');
    function search() {
      const terms = query.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
      let visible = 0;
      rows.forEach(row => {
        row.hidden = !terms.every(term => row.textContent.toLowerCase().includes(term));
        if (!row.hidden) visible++;
      });
      count.textContent = visible ? `${visible} destinations` : 'No matches. Try travel, stories, projects or consent.';
    }
    query.addEventListener('input', search);
    search();
  }
})();
