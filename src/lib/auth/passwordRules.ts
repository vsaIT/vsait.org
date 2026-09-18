// Kept apart from passwords.ts, which imports Node's crypto. The sign-up form
// reads these limits too, and should not pull hashing code into the browser

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;

export const checkNewPassword = (password: string): string | null => {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Passordet må være minst ${PASSWORD_MIN_LENGTH} tegn`;
  }
  if (password.length > PASSWORD_MAX_LENGTH) {
    return `Passordet kan være maks ${PASSWORD_MAX_LENGTH} tegn`;
  }
  if (!password.trim()) {
    return 'Passordet kan ikke bare bestå av mellomrom';
  }
  return null;
};
