(() => {
  const list = document.getElementById('story-list');
  if (!list) return;
  const cards = [...list.querySelectorAll('.story-card')];
  const filters = document.getElementById('story-filters');
  const buttons = [...filters.querySelectorAll('button')];
  const more = document.getElementById('load-stories');
  const count = document.getElementById('story-count');
  let topic = 'All';
  let limit = 6;
  function render() {
    const matching = cards.filter(card => topic === 'All' || card.dataset.topic === topic);
    cards.forEach(card => { card.hidden = !matching.slice(0, limit).includes(card); });
    count.textContent = `${Math.min(limit, matching.length)} of ${matching.length} stories`;
    more.hidden = matching.length <= limit;
    buttons.forEach(button => {
      const selected = button.dataset.topicFilter === topic;
      button.setAttribute('aria-pressed', String(selected));
      button.classList.toggle('active', selected);
    });
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    topic = button.dataset.topicFilter;
    limit = 6;
    render();
  }));
  more.addEventListener('click', () => {
    const firstNew = cards.filter(card => (topic === 'All' || card.dataset.topic === topic) && card.hidden)[0];
    limit += 6;
    render();
    firstNew?.querySelector('a').focus();
  });
  filters.hidden = false;
  render();
})();
