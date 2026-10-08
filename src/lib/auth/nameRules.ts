// Kept free of server code so the sign-up form can read these limits too.

export const NAME_MAX_LENGTH = 50;

// Built with RegExp
const NAME_PATTERN = new RegExp(
  "^[\\p{L}\\p{M}]+(?:[ '’-][\\p{L}\\p{M}]+)*$",
  'u'
);

export const checkName = (name: string): string | null => {
  const trimmed = name.trim();
  if (!trimmed) {
    return 'Navn mangler';
  }
  if (trimmed.length > NAME_MAX_LENGTH) {
    return `Navn kan være maks ${NAME_MAX_LENGTH} tegn`;
  }
  if (!NAME_PATTERN.test(trimmed)) {
    return 'Navn kan bare inneholde bokstaver, mellomrom, bindestrek og apostrof';
  }
  return null;
};
