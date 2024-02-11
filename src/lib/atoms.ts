import { atom } from 'jotai';
import { generateSalt } from './auth/passwords';
import { UserType } from '../types';

const profileIconAtom = atom({ seed: generateSalt(24), initial: false });
const userAtom = atom<UserType>({} as UserType);
const sideNavToggleAtom = atom(false);

export { profileIconAtom, userAtom, sideNavToggleAtom };
