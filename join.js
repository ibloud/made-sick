import { Agent } from "https://esm.sh/@atproto/api@0.20.44?bundle";
import { BrowserOAuthClient } from "https://esm.sh/@atproto/oauth-client-browser@0.5.7?bundle";

const CLIENT_ID = "https://made-sick.org/oauth-client-metadata.json";
const COLLECTION = "org.made-sick.participant";
const SCOPE = "atproto repo:org.made-sick.participant?action=create&action=update&action=delete";
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
let agent;

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
  agent = new Agent(session);
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

async function getParticipantRecordPublic() {
  // Reading a repo record does not require a repo OAuth read grant.
  // The join OAuth scope is intentionally limited to create/update/delete.
  return null;
}



async function logoutAndReload() {
  clearError();
  if (!session) return;
  setBusy(logoutButton, true, "Logging out…");
  try {
    await session.signOut();
  } catch (error) {
    showError(error);
  } finally {
    window.location.reload();
  }
}

async function switchAccount() {
  clearError();
  if (!session) {
    await signIn(ENTRYWAY, "login");
    return;
  }
  setBusy(switchButton, true, "Switching…");
  try {
    await session.signOut();
    await client.signIn(ENTRYWAY, { prompt: "login", scope: SCOPE });
  } catch (error) {
    showError(error);
    setBusy(switchButton, false);
  }
}

logoutButton?.addEventListener("click", logoutAndReload);
switchButton?.addEventListener("click", switchAccount);
