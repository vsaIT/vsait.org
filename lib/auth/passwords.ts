import { HASH_ITERATIONS, SALT_LETTERS } from '../constants';
import crypto from 'crypto';

export const generateSalt = (length: number) => {
  return new Array(length)
    .fill('')
    .map((_) => SALT_LETTERS[Math.floor(Math.random() * SALT_LETTERS.length)])
    .join('');
};

export const hashPassword = (
  password: string,
  salt: string | number,
  iterations: number = HASH_ITERATIONS
) => {
  const generatedSalt = typeof salt === 'string' ? salt : generateSalt(salt);
  const hash = crypto.pbkdf2Sync(
    password,
    generatedSalt,
    iterations,
    32,
    'sha256'
  );
  const base64Hash = hash.toString('base64');
  return `pbkdf2_sha256$${iterations}$${generatedSalt}$${base64Hash}`;
};

export const verifyPassword = (password: string, hashedPassword: string) => {
  const [_algorithm, iterations, salt, _hash] = hashedPassword.split('$', 3);
  return hashPassword(password, salt, Number(iterations)) === hashedPassword;
};
