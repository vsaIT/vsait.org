import { AboutUs, BoardMemberType, EventInfo } from './types';

export const aboutInfos: AboutUs[] = [
  {
    title: 'Hvem er vi?',
    content: `
            VSAiT er en frivillig og nonprofitt organisasjon, der hensikten er
            å skape et bånd i det vietnamesiske studentmiljøet i Trondheim.
            Organisasjonen er hovedsakelig rettet mot studenter ved NTNU og
            andre utdanningsinstitusjoner i Trondheim. Vi sørger for en god
            integrering av norsk-vietnamesiske studenter i et norsk miljø,
            samtidig som den vietnamesiske kulturen blir bevart og ivaretatt
            med den unge generasjonen.`,
  },
  {
    title: 'Vår historie',
    content: `
            VSAiT ble opprettet i 1990, og var en voksende organisasjon inntil
            2009. I 2009 hadde VSAiT problemer med å finne nye styremedlemmer
            som kunne overta driften av organisasjonen, og det endte med at
            organisasjonen ble lagt på is. To år senere i 2011, samlet en
            gruppe med interesse for å gjenopprette VSAiT seg, og
            organisasjonen kom til liv igjen. VSAiT var en veldig liten
            organisasjon i begynnelsen av gjenopprettelsen, men siden da har
            VSAiT opplevd stor vekst.`,
  },
  {
    title: 'Struktur',
    content: `
            VSAiT består av et frivillig styre som har ansvaret for å drive
            organisasjonen og planlegge arrangementer. Medlemmene i styret
            blir valgt på den årlige generalforsamlingen ved slutten av
            vårsemesteret.`,
  },
];

export const board: BoardMemberType[] = [
  { name: 'Linh Dan Bui', role: 'Styreleder' },
  { name: 'Vernice Dang', role: 'Nestleder' },
  { name: 'Martin Hylland Mediås', role: 'Økonomiansvarlig' },
  { name: 'Supattra Wongsamal', role: 'Sekretær' },
  { name: 'Thomas Nguyen', role: 'IT-ansvarlig' },
  { name: 'Tran Huyen Huynh Alvarstein', role: 'Matansvarlig' },
  { name: 'Benedicte Bachmann', role: 'SoMe-ansvarlig' },
  { name: 'Jenny Luong', role: 'Designansvarlig' },
  { name: 'Thien Phi Tran', role: 'Styremedlem' },
  { name: 'David Tri Pham', role: 'Styremedlem' },
  { name: 'Ban Masri', role: 'Styremedlem' },
];

export const eventInfos: EventInfo[] = [
  {
    title: 'Bli-kjent-grilling',
    description:
      'Årets første arrangement. Vi inviterer gamle og nye studenter på grilling. Det blir lek og morro!',
    imageSrc: '/cover1.jpg',
    imageAlt: 'Bilde av Bli kjent grilling arrangement',
    direction: 'left',
  },
  {
    title: 'Tet Trung Thu',
    description:
      'Den vietnamesiske månefestivalen “Tết Trung Thu”, også kalt “Midthøstfestivalen” er den nest største kulturdagen i Vietnam, og feires i store deler av Asia. Denne dagen feires med vietnamesiske retter og leker. Her blir medlemmer informert om festivalens symbolske betydning.',
    imageSrc: '/cover2.jpg',
    imageAlt: 'Bilde av Tet Trung Thu arrangement',
    direction: 'right',
  },
  {
    title: 'Tet',
    description:
      'Den vietnamesiske nyttårsfeiringen Tết er den største feiringen i Vietnam. For mange vietnamesere i Norge er dette en mye større feiring enn selve nyttårsaften.',
    imageSrc: '/cover3.jpg',
    imageAlt: 'Bilde av Tet arrangement',
    direction: 'left',
  },
  {
    title: 'Eksamensgrilling',
    description:
      'Slutten av skoleåret nærmer seg, og det gjør også eksamensnervene. Vi samler medlemmer for et lite avbrekk fra eksamenslesningen med grilling.',
    imageSrc: '/cover4.jpg',
    imageAlt: 'Bilde av Eksamensgrilling arrangement',
    direction: 'right',
  },
];
