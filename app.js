const buttons = [...document.querySelectorAll('.filter')];
const cards = [...document.querySelectorAll('.profile-card')];
const count = document.querySelector('#result-count');

function applyFilter(filter) {
  let visible = 0;
  cards.forEach((card) => {
    const kinds = card.dataset.kind.split(' ');
    const show = filter === 'all' || kinds.includes(filter);
    card.classList.toggle('hidden', !show);
    if (show) visible += 1;
  });
  count.textContent = `${visible} ${visible === 1 ? 'entry' : 'entries'}`;
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    buttons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    applyFilter(button.dataset.filter);
  });
});

applyFilter('all');
