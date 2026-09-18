import {
  AboutUs,
  BoardMemberType,
  EventInfo,
  FocusArea,
  TimelineEntry,
} from './types';

export const aboutInfos: AboutUs[] = [
  {
    title: 'Hvem er vi',
    heading: 'En frivillig og nonprofitt forening',
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
    heading: 'Fra 1990 til i dag',
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
    heading: 'Drevet av et frivillig styre',
    content: `
            VSAiT består av et frivillig styre som har ansvaret for å drive
            organisasjonen og planlegge arrangementer. Medlemmene i styret
            blir valgt på den årlige generalforsamlingen, som holdes i starten av
            vårsemesteret.`,
  },
];

const TIMELINE_FIRST_YEAR = 1996;
const TIMELINE_LAST_YEAR = 2026;
const TIMELINE_YEARS_WITHOUT_PHOTO = [2011];

const timelinePlaceholder = {
  title: 'Tittel kommer',
  description: 'Kort beskrivelse av bildet og hva som skjedde dette året.',
};

// The years that have their own copy 
const timelineCopy: Record<string, Omit<TimelineEntry, 'year'>> = {
  '1996': {
    title: 'VSAiT i de tidligere årene 1996',
    description:
      'VSAiT medlemmer stiller opp for bilde i Trondheim.',
  },
  '1997': {
    title: 'Tết Trung Thu feiring 1997',
    description:
      'Styre medlemmer i VSAiT feirer Tết Trung Thu.',
  },
  '1998': {
    title: 'Tết tigerens år 1998',
    description:
      'Underholdning på Tết arrangement, der medlemmer danser.',
  },
  '1999': {
    title: 'VSAiT fotball cup 1999',
    description:
      'VSAiT medlemmer spiller i fotball turnering.',
  },
  '2000': {
    title: 'Juleball 2000',
    description:
      'VSAiT medlemmer i tradisjonelle áo dài og nón lá under en danseopptreden.',
  },
  '2001': {
    title: 'Juleball 2001',
    description:
      'Studenter under VSAiT juleball.',
  },
  '2002': {
    title: 'Immatrikuleringsfest 2002',
    description:
      'Medlemmer feirer immatrikuleringsfest.',
  },
  '2003': {
    title: 'Immatrikuleringsfest 2003',
    description:
      'VSAiT medlemmer feirer immatrikuleringsfest på hytte på Lian.',
  },
  '2004': {
    title: 'Grillfest 2004',
    description:
      'Studenter har det artig på VSAiT grillfest.',
  },
  '2005': {
    title: 'VSAiT Cup 2005',
    description:
      'VSAiT sin idrettslag feirer etter seier.',
  },
  '2006': {
    title: 'Juleball 2006',
    description:
      'Vietnamesiske kvinner med fine kjoler under VSAiT juleball.',
  },
  '2007': {
    title: 'Grillfest 2007',
    description:
      'VSAiT arrangerer grillfest ved Moholt studentby.',
  },
  '2008': {
    title: 'Maskaradeball 2008',
    description:
      'Studenter i kostymer under VSAiT maskaradeball.',
  },
  '2009': {
    title: 'Hyttetur 2009',
    description:
      'VSAiT medlemmer på hyttetur ved Ellingsvatnet.',
  },
  '2010': {
    title: 'Hyttetur 2010',
    description:
      'Medlemmer spiller kortspill på hyttetur.',
  },
  '2012': {
    title: 'Grilling 2012',
    description:
      'VSAiT arrangerer grilling for medlemmer ved Berg Studentby.',
  },

  '2013': {
    title: 'Tết slangens år 2013',
    description:
      'Studenter feirer Tết i en liten lokal (aka felles studentbolig).',
  },

  '2014': {
    title: 'Tết Trung Thu 2014',
    description:
      'Studenter deltar med i en lek under Tết Trung Thu arrangement.',
  },

  '2015': {
    title: 'Tết geitens år 2015',
    description:
      'Styremedlemmer i VSAiT feirer Tết.',
  },

  '2016': {
    title: 'Julebord 2016',
    description:
      'VSAiT band spiller på julebordet.',
  },
  
  '2017': {
    title: 'Tur 2017',
    description:
      'Medlemmer arrangerer en gåtur til Geitfjellet i Trondheim.',
  },

  '2018': {
    title: 'Tết Trung Thu 2018',
    description:
      'Studenter lager lanterne til lanterne konkurranse under Tết Trung Thu.',
  },

  '2019': {
    title: 'Spillturnering 2019',
    description:
      'VSAiT arrangerer spillturnering for medlemmer der de konkurrer med hverandre.',
  },

  '2020': {
    title: 'Tết rottens år 2020',
    description:
      'Her blir det utført en tradisjonell dragedans med Ông Địa.',
  },

  '2021': {
    title: 'Julekos 2021',
    description:
      'Asian julenisse kommer på besøk til VSAiT julekos arrangement.',
  },

  '2022': {
    title: 'Spillkveld Tết Edition 2022',
    description:
      'Spillkveld med Tết tema, der medlemmer spiller diverse spill, nyter god mat, og vinner premier.',
  },

  '2023': {
    title: 'Buldring 2023',
    description:
      'VSAiT arrangerer buldring for medlemmer. Her sitter de og spiser god mat etter en hard økt.',
  },

  '2024': {
    title: 'Tết Trung Thu 2024',
    description:
      'Fellesbildet av medlemmer som viser fram premier de vant under Tết Trung Thu.',
  },

  '2025': {
    title: 'Rebus 2025',
    description:
      'Fellesbildet med medlemmer fra VSAiT, ISAT og TSAiT som deltok i rebusløp arrangert av alle tre organisasjonene.',
  },

  '2026': {
    title: 'Styremedlemmer 2026',
    description:
      'Årets chả giò laging med styremedlemmer i VSAiT.',
  },
};

export const timelineEntries: TimelineEntry[] = Array.from(
  { length: TIMELINE_LAST_YEAR - TIMELINE_FIRST_YEAR + 1 },
  (_, index) => TIMELINE_FIRST_YEAR + index,
)
  .filter((year) => !TIMELINE_YEARS_WITHOUT_PHOTO.includes(year))
  .map((year) => {
    const key = String(year);
    return {
      year: key,
      imageSrc: `/timeline/${key}.jpg`,
      imageAlt: `Bilde fra VSAiT i ${key}`,
      ...(timelineCopy[key] ?? timelinePlaceholder),
    };
  });

export const focusAreas: FocusArea[] = [
  {
    title: 'Sosialt miljø',
    description:
      'Skape sosiale bånd i det vietnamesiske studentmiljøet i Trondheim',
    iconSrc: '/fokus1.png',
    iconAlt: 'Sosialt miljø ikon',
    iconWidth: 2248,
    iconHeight: 1769,
  },
  {
    title: 'Kultur',
    description:
      'Bevare og fremme vietnamesisk kultur blant studenter i Trondheim',
    iconSrc: '/fokus2.png',
    iconAlt: 'Kultur ikon',
    iconWidth: 2248,
    iconHeight: 1769,
  },
  {
    title: 'Arrangement',
    description: 'Holde arrangement for medlemmer og bekjente',
    iconSrc: '/fokus3.png',
    iconAlt: 'Arrangement ikon',
    iconWidth: 2248,
    iconHeight: 1769,
  },
];

export const board: BoardMemberType[] = [
  { name: 'Linh Dan Bui', role: 'Styreleder' },
  { name: 'Vernice Dang', role: 'Nestleder' },
  { name: 'Supattra Wongsamal', role: 'Sekretær og Økonomiansvarlig' },
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
    title: 'Tết Trung Thu',
    description:
      'Den vietnamesiske månefestivalen “Tết Trung Thu”, også kalt “Midthøstfestivalen” er den nest største kulturdagen i Vietnam, og feires i store deler av Asia. Denne dagen feires med vietnamesiske retter og leker. Her blir medlemmer informert om festivalens symbolske betydning.',
    imageSrc: '/cover6.jpg',
    imageAlt: 'Bilde av Tet Trung Thu arrangement',
    direction: 'right',
  },
  {
    title: 'Tết', 
    description:
      'Den vietnamesiske nyttårsfeiringen Tết er den største feiringen i Vietnam. For mange vietnamesere i Norge er dette en mye større feiring enn selve nyttårsaften.',
    imageSrc: '/cover3.jpg',
    imageAlt: 'Bilde av Tet arrangement',
    direction: 'left',
  },
  {
    title: 'Eksamensavbrekk',
    description:
      'Slutten av skoleåret nærmer seg, og det gjør også eksamensnervene. Vi samler medlemmer for et lite avbrekk fra eksamenslesningen med grilling.',
    imageSrc: '/cover4.jpg',
    imageAlt: 'Bilde av Eksamensgrilling arrangement',
    direction: 'right',
  },
];
