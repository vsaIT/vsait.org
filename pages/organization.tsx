import { CurvyHeader } from '@lib/components/Header';
import type { NextPage } from 'next';
import Image from 'next/image';

type BoardType = {
  name: string;
  role: string;
};
const board: BoardType[] = [
  { name: 'Daniel Nguyen', role: 'Styreleder' },
  { name: 'Elvis T. D. Le', role: 'Nestleder' },
  { name: 'Minh Dinh', role: 'Økonomiansvarlig' },
  { name: 'Gia Hy Nguyen', role: 'Sekretær' },
  { name: 'Adelin Evergreen', role: 'IT-ansvarlig' },
  { name: 'Rajneel Patil', role: 'Logistikkansvarlig' },
  { name: 'Aina Vy', role: 'Matansvarlig' },
  { name: 'Ninni Chen', role: 'PR-ansvarlig' },
  { name: 'Nina Hoang', role: 'Designansvarlig' },
  { name: 'Younes Bouhmidi', role: 'Styremedlem' },
  { name: 'Kasper Li', role: 'Styremedlem' },
  { name: 'Yara Masri', role: 'Styremedlem' },
];

const Organization: NextPage = () => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <CurvyHeader title="Om oss" />

      <div className="flex flex-col z-10 max-w-screen-xl mb-12">
        <h1 className="text-center font-bold text-6xl text-black">VSAiT</h1>

        <div className="flex flex-col justify-center w-full p-8 mb-4 text-left bg-white shadow-lg rounded-2xl">
          <div className="mb-6">
            <h2 className="text-xl font-bold italic text-gray">Hvem er vi?</h2>
            <p>
              VSAiT er en frivillig og nonprofitt organisasjon, der hensikten er
              å skape et bånd i det vietnamesiske studentmiljøet i Trondheim.
              Organisasjonen er hovedsakelig rettet mot studenter ved NTNU og
              andre utdanningsinstitusjoner i Trondheim. Vi sørger for en god
              integrering av norsk-vietnamesiske studenter i et norsk miljø,
              samtidig som den vietnamesiske kulturen blir bevart og ivaretatt
              med den unge generasjonen.
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-bold italic text-gray">Vår historie</h2>
            <p>
              VSAiT ble opprettet i 1990, og var en voksende organisasjon inntil
              2009. I 2009 hadde VSAiT problemer med å finne nye styremedlemmer
              som kunne overta driften av organisasjonen, og det endte med at
              organisasjonen ble lagt på is. To år senere i 2011, samlet en
              gruppe med interesse for å gjenopprette VSAiT seg, og
              organisasjonen kom til liv igjen. VSAiT var en veldig liten
              organisasjon i begynnelsen av gjenopprettelsen, men siden da har
              VSAiT opplevd stor vekst.
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-bold italic text-gray">Struktur</h2>
            <p>
              VSAiT består av et frivillig styre som har ansvaret for å drive
              organisasjonen og planlegge arrangementer. Medlemmene i styret
              blir valgt på den årlige generalforsamlingen ved slutten av
              vårsemesteret.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center w-full p-8 my-12">
          <h2 className="text-3xl font-bold text-center mb-4">Vårt fokus</h2>
          <div className="flex justify-between w-full gap-4">
            <div className="grid grid-rows-organizationfocus w-full max-w-xs">
              <div className="justify-items-center w-3/4 m-auto mb-3">
                {/* @ts-expect-error Server Component */}
                <Image
                  src="/fokus1.png"
                  alt="Sosialt miljø icon"
                  width={2048}
                  height={1569}
                  layout="responsive"
                />
              </div>
              <div className="w-3/4 m-auto">
                <h3 className="font-bold text-xl">Sosialt Miljø</h3>
                <p>
                  Skape sosiale bånd i det vietnamesiske studentmiljøet i
                  Trondheim
                </p>
              </div>
            </div>
            <div className="grid grid-rows-organizationfocus w-full max-w-xs">
              <div className="justify-items-center w-3/4 m-auto mb-3">
                {/* @ts-expect-error Server Component */}
                <Image
                  src="/fokus2.png"
                  alt="Kultur icon"
                  width={2048}
                  height={1609}
                  layout="responsive"
                />
              </div>
              <div className="w-3/4 m-auto">
                <h3 className="font-bold text-xl">Kultur</h3>
                <p>
                  Bevare og fremme vietnamesisk kultur blant studenter i Trondheim
                </p>
              </div>
            </div>
            <div className="grid grid-rows-organizationfocus w-full max-w-xs">
              <div className="justify-items-center w-3/4 m-auto mb-3">
                {/* @ts-expect-error Server Component */}
                <Image
                  src="/fokus3.png"
                  alt="Arrangement icon"
                  width={2048}
                  height={1941}
                  layout="responsive"
                />
              </div>
              <div className="w-3/4 m-auto">
                <h3 className="font-bold text-xl">Arrangement</h3>
                <p>Holde arrangement for medlemmer og bekjente</p>
              </div>
            </div>
          </div>
        </div>

        <div className="organization relative my-16">
          <div className="flex flex-col justify-center w-full p-8 mb-4 text-left bg-white shadow-lg rounded-2xl">
            <h2 className="text-3xl font-bold text-center mb-4">
              Arrangementer
            </h2>
            <p className="w-10/12 m-auto text-center">
              VSAiTs hensikt er å skape et bånd for det vietnamesiske
              studentmiljøet i Trondheim. Dette oppnår vi med ulike sosiale
              arrangementer gjennom skoleåret. Vi har både større og mindre
              arrangementer der studenter har muligheten til å bli kjent med
              hverandre.
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between px-24 py-12 my-2">
              <div className="flex w-full justify-start">
                <div className="w-3/4 max-w-sm rounded-2xl overflow-hidden">
                  {/* @ts-expect-error Server Component */}
                  <Image
                    src="/cover1.jpg"
                    alt="Bilde av Bli kjent grilling arrangement"
                    width={1024}
                    height={683}
                    layout="responsive"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full text-left">
                <h3 className="text-2xl font-medium mb-3">
                  Bli-kjent-grilling
                </h3>
                <p className="w-8/12">
                  Årets første arrangement. Vi inviterer gamle og nye studenter
                  på grilling. Det blir lek og morro!
                </p>
              </div>
            </div>

            <div className="flex justify-between px-24 py-16 bg-white shadow-lg rounded-2xl my-2">
              <div className="flex w-full justify-end order-1">
                <div className="w-3/4 max-w-sm rounded-2xl overflow-hidden">
                  {/* @ts-expect-error Server Component */}
                  <Image
                    src="/cover2.jpg"
                    alt="Bilde av Tet Trung Thu arrangement"
                    width={1024}
                    height={683}
                    layout="responsive"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full text-left">
                <h3 className="text-2xl font-medium mb-3">Tet Trung Thu</h3>
                <p className="w-8/12">
                  Den vietnamesiske månefestivalen “Tết Trung Thu”, også kalt
                  “Midthøstfestivalen” er den nest største kulturdagen i
                  Vietnam, og feires i store deler av Asia. Denne dagen feires
                  med vietnamesiske retter og leker. Her blir medlemmer
                  informert om festivalens symbolske betydning.
                </p>
              </div>
            </div>

            <div className="flex justify-between px-24 py-12 my-2">
              <div className="flex w-full justify-start">
                <div className="w-3/4 max-w-sm rounded-2xl overflow-hidden">
                  {/* @ts-expect-error Server Component */}
                  <Image
                    src="/cover3.jpg"
                    alt="Bilde av Tet arrangement"
                    width={1270}
                    height={683}
                    layout="responsive"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full text-left">
                <h3 className="text-2xl font-medium mb-3">Tet</h3>
                <p className="w-8/12">
                  Den vietnamesiske nyttårsfeiringen Tết er den største
                  feiringen i Vietnam. For mange vietnamesere i Norge er dette
                  en mye større feiring enn selve nyttårsaften
                </p>
              </div>
            </div>

            <div className="flex justify-between px-24 py-16 bg-white shadow-lg rounded-2xl my-2">
              <div className="flex w-full justify-end order-1">
                <div className="w-3/4 max-w-sm rounded-2xl overflow-hidden">
                  {/* @ts-expect-error Server Component */}
                  <Image
                    src="/cover4.jpg"
                    alt="Bilde av Eksamensgrilling arrangement"
                    width={1024}
                    height={683}
                    layout="responsive"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full text-left">
                <h3 className="text-2xl font-medium mb-3">Eksamensgrilling</h3>
                <p className="w-8/12">
                  Slutten av skoleåret nærmer seg, og det gjør også
                  eksamensnervene. Vi samler medlemmer for et lite avbrekk fra
                  eksamenslesningen med grilling.
                </p>
              </div>
            </div>

            <div className="px-24 py-10 bg-white shadow-lg rounded-2xl mt-12 mb-3">
              <h3 className="text-2xl font-medium mb-3">Småarrangement</h3>
              <p className="w-1/2 m-auto text-center">
                I løpet av året så holder vi mindre arrangement som f.eks.
                spillkvelder, karaokekveld, sportsaktiviteter.
              </p>
            </div>
          </div>
        </div>

        <div className="px-24 py-10 bg-white shadow-lg rounded-2xl my-8">
          <h2 className="text-3xl font-bold text-center mb-4">Styret</h2>
          <p className="w-1/2 m-auto text-center">
            Vi tar imot innmeldinger, spørsmål og andre henvendelser på mail:{' '}
            <a href="mailto:vsait@vsait.org">vsait@vsait.org</a>
          </p>
          <div className="grid grid-cols-3 gap-8 my-8">
            {board.map((member: BoardType) => (
              <div
                key={member.name}
                className="rounded-2xl bg-primary text-white p-8"
              >
                <p className="text-xl font-bold">{member.name}</p>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Organization;
