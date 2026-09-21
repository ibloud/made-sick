(() => {
  const form = document.querySelector('#pixie-checkin');
  if (!form) return;
  const storageKey = 'made-sick:pixie-cue:v1';
  const state = document.querySelector('#pixie-state');
  const message = document.querySelector('#pixie-message');

  function readCue() {
    try { return JSON.parse(localStorage.getItem(storageKey)); } catch (_error) { return null; }
  }

  function restoreCue() {
    const cue = readCue();
    if (!cue) return;
    form.elements.cue.value = cue.cue || '';
    form.elements.action.value = cue.action || '';
    const response = form.querySelector(`[name="response"][value="${cue.response}"]`);
    if (response) response.checked = true;
    state.textContent = cue.paused ? 'Paused by you' : 'Active on this device';
    message.textContent = cue.paused ? 'Your cue is paused. Edit and save whenever you want it back.' : `Saved locally · ${new Date(cue.updatedAt).toLocaleString()}. No reminder was sent.`;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const record = { schema:'org.made-sick.pixie-cue/1', cue:form.elements.cue.value.trim(), action:form.elements.action.value.trim(), response:form.elements.response.value || null, paused:false, storage:'device-local', updatedAt:new Date().toISOString() };
    localStorage.setItem(storageKey, JSON.stringify(record));
    state.textContent = 'Active on this device';
    message.textContent = 'Cue saved here. No notification, score, message, or health data was sent.';
  });

  document.querySelector('#pause-pixie').addEventListener('click', () => {
    const cue = readCue();
    if (!cue) { message.textContent = 'There is no saved cue to pause.'; return; }
    cue.paused = true; cue.updatedAt = new Date().toISOString();
    localStorage.setItem(storageKey, JSON.stringify(cue));
    state.textContent = 'Paused by you';
    message.textContent = 'Paused. Your cue stays on this device until you edit or delete it.';
  });

  document.querySelector('#delete-pixie').addEventListener('click', () => {
    localStorage.removeItem(storageKey); form.reset();
    state.textContent = 'Paused until you choose';
    message.textContent = 'Deleted from this device. Nothing remains for PIXIE to act on.';
  });

  restoreCue();
})();
