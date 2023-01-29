import { atom } from 'jotai';
import { generateSalt } from './auth/passwords';
import { UserType } from './types';
const profileIconAtom = atom({ seed: generateSalt(24), initial: false });
const userAtom = atom<UserType>({
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  birthdate: '',
  foodNeeds: '',
  student: '',
  publicProfile: false,
  profileIconSeed: '',
});
export { profileIconAtom, userAtom };
