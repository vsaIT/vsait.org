import { atom } from 'jotai';
import { generateSalt } from './auth/passwords';
const profileIconAtom = atom({ seed: generateSalt(24), initial: false });
export { profileIconAtom };
