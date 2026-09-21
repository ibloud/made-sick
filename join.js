import { BrowserOAuthClient } from "https://esm.sh/@atproto/oauth-client-browser@0.5.7?bundle";

const CLIENT_ID = "https://made-sick.org/oauth-client-metadata.json";
const COLLECTION = "org.made-sick.participant";
const SCOPE = "atproto repo:org.made-sick.participant?action=read&action=create&action=update&action=delete";
const ENTRYWAY = "https://bsky.social";

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
  status.textContent = "Identity authenticated · directory participation still requires your choice.";
  document.querySelector("#session-actions").hidden = false;

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
