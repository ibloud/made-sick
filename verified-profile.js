/*
 * Shared verified-profile state model.
 *
 * This module deliberately does NOT claim to perform authentication or
 * verification in the browser. It evaluates evidence returned by a trusted
 * authentication/verification service.
 */

export const VERIFICATION_METHODS = Object.freeze({
  EMAIL: 'email',
  DOMAIN: 'domain'
});

export function isVerifiedProfile(profile) {
  if (!profile || profile.atIdentity?.status !== 'verified') return false;
  return Boolean(
    profile.evidence?.email?.status === 'verified' ||
    profile.evidence?.domain?.status === 'verified'
  );
}

export function verificationLabels(profile) {
  if (!isVerifiedProfile(profile)) return [];
  const labels = [];
  if (profile.evidence?.email?.status === 'verified') labels.push('EMAIL VERIFIED');
  if (profile.evidence?.domain?.status === 'verified') labels.push('DOMAIN VERIFIED');
  return labels;
}

export function publicVerificationSummary(profile) {
  return {
    did: profile?.did || null,
    handle: profile?.handle || null,
    status: isVerifiedProfile(profile) ? 'VERIFIED PROFILE' : 'UNVERIFIED',
    methods: verificationLabels(profile)
  };
}
