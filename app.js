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

const pilotForm = document.querySelector('#pilot-console');

if (pilotForm) {
  const storageKey = 'made-sick:pilot:ibloud.xyz:v1';
  const recordToggle = pilotForm.elements.sessionRecord;
  const inviteToggle = pilotForm.elements.duetInvite;
  const sessionFields = document.querySelector('#session-fields');
  const duetLink = document.querySelector('#duet-link');
  const message = document.querySelector('#pilot-message');
  const exportButton = document.querySelector('#export-pilot');
  const deleteButton = document.querySelector('#delete-pilot');

  function setConditionalFields() {
    sessionFields.hidden = !recordToggle.checked;
    duetLink.hidden = !inviteToggle.checked;
  }

  function readRecord() {
    try {
      return JSON.parse(localStorage.getItem(storageKey));
    } catch (_error) {
      return null;
    }
  }

  function restoreRecord() {
    const record = readRecord();
    if (!record) return;
    pilotForm.elements.directory.checked = Boolean(record.consent.directory);
    inviteToggle.checked = Boolean(record.consent.duetInvite);
    recordToggle.checked = Boolean(record.consent.sessionRecord);
    pilotForm.elements.sessionId.value = record.session?.reference || '';
    pilotForm.elements.sessionNote.value = record.session?.note || '';
    message.textContent = `Pilot choices restored from this device · ${new Date(record.updatedAt).toLocaleString()}`;
    setConditionalFields();
  }

  recordToggle.addEventListener('change', setConditionalFields);
  inviteToggle.addEventListener('change', setConditionalFields);

  pilotForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const record = {
      schema: 'org.made-sick.pilot-consent/1',
      subject: {
        handle: 'ibloud.xyz',
        did: 'did:plc:b5uem672ci23lqrcz6j6bs2c'
      },
      consent: {
        directory: pilotForm.elements.directory.checked,
        duetInvite: inviteToggle.checked,
        sessionRecord: recordToggle.checked
      },
      session: recordToggle.checked ? {
        reference: pilotForm.elements.sessionId.value.trim(),
        note: pilotForm.elements.sessionNote.value.trim()
      } : null,
      storage: 'device-local',
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(storageKey, JSON.stringify(record));
    message.textContent = 'Pilot choices saved on this device. No invitation or data was sent.';
  });

  exportButton.addEventListener('click', () => {
    const record = readRecord();
    if (!record) {
      message.textContent = 'Save your pilot choices before exporting.';
      return;
    }
    const blob = new Blob([`${JSON.stringify(record, null, 2)}\n`], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'made-sick-ibloud-pilot.json';
    link.click();
    URL.revokeObjectURL(url);
    message.textContent = 'Participant-controlled pilot record exported.';
  });

  deleteButton.addEventListener('click', () => {
    localStorage.removeItem(storageKey);
    pilotForm.reset();
    pilotForm.elements.directory.checked = true;
    setConditionalFields();
    message.textContent = 'Pilot choices deleted from this device.';
  });

  setConditionalFields();
  restoreRecord();
}

const toolButtons = [...document.querySelectorAll('[data-tool]')];
const toolPanels = [...document.querySelectorAll('[data-panel]')];

toolButtons.forEach((button) => {
  button.addEventListener('click', () => {
    toolButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    toolPanels.forEach((panel) => {
      const active = panel.dataset.panel === button.dataset.tool;
      panel.classList.toggle('active', active);
      panel.hidden = !active;
    });
  });
});

const streamConsent = document.querySelector('#stream-consent');
const loadStream = document.querySelector('#load-stream');
const unloadStream = document.querySelector('#unload-stream');
const streamFrame = document.querySelector('#stream-frame');
const streamState = document.querySelector('#stream-state');

if (streamConsent && loadStream && unloadStream && streamFrame) {
  streamConsent.addEventListener('change', () => {
    loadStream.disabled = !streamConsent.checked;
  });

  loadStream.addEventListener('click', () => {
    if (!streamConsent.checked || streamFrame.querySelector('iframe')) return;
    const iframe = document.createElement('iframe');
    iframe.src = 'https://stream.place/embed/ibloud.xyz';
    iframe.title = 'Public Streamplace profile for ibloud.xyz';
    iframe.loading = 'lazy';
    iframe.allowFullscreen = true;
    streamFrame.append(iframe);
    streamFrame.hidden = false;
    unloadStream.hidden = false;
    loadStream.disabled = true;
    streamState.textContent = 'Connected by viewer';
  });

  unloadStream.addEventListener('click', () => {
    streamFrame.replaceChildren();
    streamFrame.hidden = true;
    unloadStream.hidden = true;
    streamConsent.checked = false;
    loadStream.disabled = true;
    streamState.textContent = 'Player locked';
  });
}

const germForm = document.querySelector('#germ-settings');

if (germForm) {
  const storageKey = 'made-sick:germ-draft:ibloud.xyz:v1';
  const state = document.querySelector('#germ-state');
  const message = document.querySelector('#germ-message');
  const exportButton = document.querySelector('#export-germ');
  const clearButton = document.querySelector('#clear-germ');

  function readDraft() {
    try {
      return JSON.parse(localStorage.getItem(storageKey));
    } catch (_error) {
      return null;
    }
  }

  function policyLabel(policy) {
    return {
      none: 'Closed by creator',
      card: 'Direct exchange only',
      following: 'Published policy draft'
    }[policy] || 'Closed by creator';
  }

  function restoreDraft() {
    const draft = readDraft();
    if (!draft) return;
    const selected = germForm.querySelector(`[name="germPolicy"][value="${draft.policy}"]`);
    if (selected) selected.checked = true;
    germForm.elements.germBoundary.checked = Boolean(draft.boundaryAcknowledged);
    state.textContent = `${policyLabel(draft.policy)} · local draft`;
    message.textContent = `Private draft restored · ${new Date(draft.updatedAt).toLocaleString()}. Public contact remains unchanged.`;
  }

  germForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const policy = germForm.elements.germPolicy.value;
    if (policy !== 'none' && !germForm.elements.germBoundary.checked) {
      message.textContent = 'Acknowledge the care boundary before drafting an open contact policy.';
      germForm.elements.germBoundary.focus();
      return;
    }
    const draft = {
      schema: 'org.made-sick.germ-contact-draft/1',
      subject: { handle: 'ibloud.xyz', did: 'did:plc:b5uem672ci23lqrcz6j6bs2c' },
      policy,
      boundaryAcknowledged: germForm.elements.germBoundary.checked,
      storesMessages: false,
      storage: 'device-local',
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(storageKey, JSON.stringify(draft));
    state.textContent = `${policyLabel(policy)} · local draft`;
    message.textContent = 'Draft saved on this device. Germ and the public profile were not changed.';
  });

  exportButton.addEventListener('click', () => {
    const draft = readDraft();
    if (!draft) {
      message.textContent = 'Save the private draft before exporting.';
      return;
    }
    const blob = new Blob([`${JSON.stringify(draft, null, 2)}\n`], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'made-sick-germ-policy-draft.json';
    link.click();
    URL.revokeObjectURL(url);
    message.textContent = 'Contact-policy draft exported. No messages were included.';
  });

  clearButton.addEventListener('click', () => {
    localStorage.removeItem(storageKey);
    germForm.reset();
    state.textContent = 'Closed by creator';
    message.textContent = 'Local draft removed. Public contact remains closed.';
  });

  restoreDraft();
}
