import crypto from 'crypto';

// How long a password reset link stays valid after it is requested
export const RESET_TOKEN_TTL_MS = 60 * 60 * 1000;

export const generateResetToken = () =>
  crypto.randomBytes(32).toString('base64url');

export const hashResetToken = (token: string) =>
  crypto.createHash('sha256').update(token).digest('hex');

// The lookup for a reset token that is still usable right now
export const activeResetTokenWhere = (token: string) => ({
  passwordResetUrl: hashResetToken(token),
  passwordResetExpires: { gt: new Date() },
});
