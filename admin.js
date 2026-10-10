import { BrowserOAuthClient } from "https://esm.sh/@atproto/oauth-client-browser@0.5.7?bundle";

const CLIENT_ID = "https://made-sick.org/oauth-client-metadata.json";
const SCOPE = "atproto repo:org.made-sick.participant?action=read&action=create&action=update&action=delete";
const ENTRYWAY = "https://bsky.social";
const ADMIN_HANDLE = "made-sick.org";

const status = document.querySelector("#admin-status");
const errorBox = document.querySelector("#admin-error");
const content = document.querySelector("#admin-content");
const didEl = document.querySelector("#admin-did");

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

async function resolveAdminDid() {
  const response = await fetch(ENTRYWAY + "/xrpc/com.atproto.identity.resolveHandle?handle=" + encodeURIComponent(ADMIN_HANDLE));
  if (!response.ok) throw new Error("Could not verify the administrative handle (" + response.status + ").");
  const data = await response.json();
  if (!data.did) throw new Error("The administrative handle did not resolve to a DID.");
  return data.did;
}

async function init() {
  try {
    const result = await client.init();
    if (!result || !result.session) {
      status.textContent = "Sign in with the Made Sick administrative identity to continue.";
      window.location.replace("join.html");
      return;
    }
    const adminDid = await resolveAdminDid();
    if (result.session.did !== adminDid) {
      status.textContent = "This identity is not authorized for the admin workspace. Returning to participant controls.";
      window.location.replace("join.html");
      return;
    }
    didEl.textContent = result.session.did;
    status.textContent = "Administrative identity verified.";
    content.hidden = false;
  } catch (error) {
    console.error(error);
    status.textContent = "Could not verify administrative access.";
    errorBox.textContent = error && error.message ? error.message : String(error);
    errorBox.hidden = false;
  }
}

init();
