import { BrowserOAuthClient } from "https://esm.sh/@atproto/oauth-client-browser@0.5.7?bundle";

const CLIENT_ID = "https://made-sick.org/oauth-client-metadata.json";
const COLLECTION = "org.made-sick.participant";
const SCOPE = "atproto repo:org.made-sick.participant?action=read&action=create&action=update&action=delete";
const ENTRYWAY = "https://bsky.social";
const PIXIE_OS = "https://holdings.loptrlab.com/";
const ADMIN_HANDLE = "made-sick.org";
const JOIN_RETURN_URL = "https://made-sick.org/join.html";

const signedOut = document.querySelector("#signed-out");
const signedIn = document.querySelector("#signed-in");
const identityForm = document.querySelector("#identity-form");
const handleInput = document.querySelector("#handle");
const connectButton = document.querySelector("#connect-button");
const createButton = document.querySelector("#create-button");
const participantForm = document.querySelector("#participant-form");
const joinButton = document.querySelector("#join-button");
const withdrawButton = document.querySelector("#withdraw-button");
const logoutButton = document.querySelector("#logout-button");
const switchButton = document.querySelector("#switch-button");
const status = document.querySelector("#join-status");
const errorBox = document.querySelector("#join-error");
const didEl = document.querySelector("#identity-did");
const resultBox = document.querySelector("#join-result");
const recordUri = document.querySelector("#record-uri");

const client = new BrowserOAuthClient({
  clientMetadata: {
    client_id: CLIENT_ID,
    client_name: "Made Sick",
    client_uri: "https://made-sick.org",
    redirect_uris: ["https://made-sick.org/join.html"],
    grant_types: ["authorization_code", "refresh_token"],
    response_types: ["code"],
    scope: SCOPE,
    token_endpoint_auth_method: "none",
    application_type: "web",
    dpop_bound_access_tokens: true
  },
  handleResolver: ENTRYWAY
});

let session;

async function resolveHandle(handle) {
  const response = await fetch(ENTRYWAY + "/xrpc/com.atproto.identity.resolveHandle?handle=" + encodeURIComponent(handle));
  if (!response.ok) throw new Error("Could not resolve the Made Sick administrative identity (" + response.status + ").");
  const data = await response.json();
  if (!data.did) throw new Error("The Made Sick administrative handle did not resolve to a DID.");
  return data.did;
}

function openPixie(params) {
  const query = new URLSearchParams({ source: "made-sick", return_to: JOIN_RETURN_URL, ...params });
  // Participant onboarding lives in the PIXIE desktop, not the Holdings landing page.
  const destination = params.role === "participant" ? PIXIE_OS + "radar-core.html" : PIXIE_OS;
  window.location.assign(destination + "?" + query.toString());
}

async function saveParticipantRecord(displayName, milestone) {
  const record = {
    $type: COLLECTION,
    version: 1,
    directory: true,
    displayName: displayName.trim(),
    consentedAt: new Date().toISOString()
  };
  if (milestone.trim()) record.milestone = milestone.trim();
  const existing = await fetchRecord();
  let response;
  if (existing && existing.uri) {
    const rkey = existing.uri.split("/").pop();
    response = await session.fetchHandler("/xrpc/com.atproto.repo.putRecord", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repo: session.did, collection: COLLECTION, rkey, record })
    });
  } else {
    response = await session.fetchHandler("/xrpc/com.atproto.repo.createRecord", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repo: session.did, collection: COLLECTION, rkey: "self", record })
    });
  }
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error("The PDS rejected the participant record (" + response.status + ")" + (detail ? ": " + detail.slice(0, 180) : "."));
  }
  return response.json();
}

async function handlePixieReturn() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("pixie_onboarding") !== "1") return false;
  const displayName = params.get("displayName") || "";
  const milestone = params.get("milestone") || "";
  const consent = params.get("consent") === "1";
  if (!consent || !displayName.trim()) throw new Error("PIXIE OS returned without the required participant consent and display name.");
  const saved = await saveParticipantRecord(displayName, milestone);
  window.history.replaceState({}, document.title, window.location.pathname);
  resultBox.hidden = false;
  recordUri.textContent = saved.uri || "Participant record saved.";
  withdrawButton.hidden = false;
  participantForm.reset();
  status.textContent = "Participant card created through PIXIE OS and published to your AT Protocol repository.";
  return true;
}

function showError(error) {
  console.error(error);
  errorBox.hidden = false;
  errorBox.textContent = error && error.message ? error.message : String(error);
}

function clearError() {
  errorBox.hidden = true;
  errorBox.textContent = "";
}

function setBusy(button, busy, label) {
  button.disabled = busy;
  if (busy) button.dataset.originalLabel = button.textContent;
  button.textContent = busy ? label : (button.dataset.originalLabel || button.textContent);
}

async function init() {
  try {
    const result = await client.init();
    if (result && result.session) {
      session = result.session;
      await renderSession();
    }
  } catch (error) {
    showError(error);
  }
}

async function renderSession() {
  signedOut.hidden = true;
  signedIn.hidden = false;
  didEl.textContent = session.did;
  document.querySelector("#session-actions").hidden = false;
  const returned = await handlePixieReturn();
  if (returned) return;
  const adminDid = await resolveHandle(ADMIN_HANDLE);
  if (session.did === adminDid) {
    status.textContent = "Made Sick administrative identity detected · opening PIXIE OS admin workspace.";
    openPixie({ role: "admin", card: "none", did: session.did });
    return;
  }
  const existing = await fetchRecord();
  if (existing && existing.value) {
    status.textContent = "Participant card found · opening PIXIE OS."; 
    openPixie({
      role: "participant",
      card: "existing",
      did: session.did,
      displayName: existing.value.displayName || "",
      milestone: existing.value.milestone || ""
    });
    return;
  }
  status.textContent = "No participant card found · opening PIXIE OS onboarding."; 
  openPixie({ role: "participant", card: "missing", onboarding: "1", did: session.did });
}

async function signIn(handle, prompt) {
  clearError();
  const button = prompt === "create" ? createButton : connectButton;
  setBusy(button, true, "Opening identity provider…");
  try {
    await client.signIn(handle, { prompt: prompt, scope: SCOPE });
  } catch (error) {
    showError(error);
    setBusy(button, false);
  }
}

identityForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const handle = handleInput.value.trim().replace(/^@/, "");
  if (!handle) {
    handleInput.focus();
    return;
  }
  await signIn(handle, "consent");
});

createButton.addEventListener("click", () => signIn(ENTRYWAY, "create"));

async function fetchRecord() {
  const query = new URLSearchParams({
    repo: session.did,
    collection: COLLECTION,
    rkey: "self"
  });
  const response = await session.fetchHandler("/xrpc/com.atproto.repo.getRecord?" + query.toString());
  if (response.status === 404) return null;
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    let errorCode;
    try { errorCode = JSON.parse(detail).error; } catch { /* Keep the original response for other errors. */ }
    // Some PDS implementations return 400 rather than 404 for an absent record.
    if (response.status === 400 && errorCode === "RecordNotFound") return null;
    throw new Error("Could not read the participant record (" + response.status + ")" + (detail ? ": " + detail.slice(0, 180) : "."));
  }
  return response.json();
}

async function loadExistingRecord() {
  try {
    const existing = await fetchRecord();
    if (!existing || !existing.value) return;
    document.querySelector("#display-name").value = existing.value.displayName || "";
    document.querySelector("#milestone").value = existing.value.milestone || "";
    document.querySelector("#directory-consent").checked = Boolean(existing.value.directory);
    document.querySelector("#public-record-consent").checked = true;
    resultBox.hidden = false;
    recordUri.textContent = existing.uri;
    withdrawButton.hidden = false;
    status.textContent = existing.value.directory
      ? "Participant record found · Made Sick participation is active."
      : "Participant record found · directory participation is paused.";
  } catch (error) {
    showError(error);
  }
}

participantForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearError();
  if (!session) return;
  setBusy(joinButton, true, "Publishing participant record…");
  try {
    const displayName = document.querySelector("#display-name").value.trim();
    const milestone = document.querySelector("#milestone").value.trim();
    if (!displayName) throw new Error("A public display name is required.");
    const saved = await saveParticipantRecord(displayName, milestone);
    resultBox.hidden = false;
    recordUri.textContent = saved.uri || "Participant record saved.";
    withdrawButton.hidden = false;
    status.textContent = "Participant record is active."; 
  } catch (error) {
    showError(error);
  } finally {
    setBusy(joinButton, false);
  }
});


 
withdrawButton.addEventListener("click", async () => {
  clearError();
  if (!session || !confirm("Withdraw your Made Sick participant record from your AT Protocol repository?")) return;
  setBusy(withdrawButton, true, "Withdrawing…");
  try {
    const existing = await fetchRecord();
    if (!existing || !existing.uri) return;
    const rkey = existing.uri.split("/").pop();
    const response = await session.fetchHandler("/xrpc/com.atproto.repo.deleteRecord", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repo: session.did, collection: COLLECTION, rkey })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error("The PDS rejected the withdrawal (" + response.status + ")" + (detail ? ": " + detail.slice(0, 180) : "."));
    }
    participantForm.reset();
    resultBox.hidden = true;
    withdrawButton.hidden = true;
    status.textContent = "Withdrawn · the participant record was deleted from your repository.";
  } catch (error) {
    showError(error);
  } finally {
    setBusy(withdrawButton, false);
  }
});

async function clearSession({ focusHandle = false } = {}) {
  clearError();
  if (!session) return;
  try {
    await client.revoke(session.did);
  } catch (error) {
    console.warn("OAuth revoke failed; clearing local session anyway.", error);
  }
  session = undefined;
  signedIn.hidden = true;
  signedOut.hidden = false;
  document.querySelector("#session-actions").hidden = true;
  participantForm.reset();
  resultBox.hidden = true;
  withdrawButton.hidden = true;
  status.textContent = "Not connected.";
  if (focusHandle) {
    handleInput.value = "";
    handleInput.focus();
  }
}

logoutButton?.addEventListener("click", () => clearSession());
switchButton?.addEventListener("click", () => clearSession({ focusHandle: true }));

init();
