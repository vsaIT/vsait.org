import { CurvyHeader } from '@/components/Header';
import Image from 'next/image';

type BoardType = {
  name: string;
  role: string;
};
const board: BoardType[] = [
  { name: 'Yara Masri', role: 'Styreleder' },
  { name: 'Anton Tran', role: 'Nestleder' },
  { name: 'Minh Dinh', role: 'Økonomiansvarlig' },
  { name: 'Vivi Thi Pham', role: 'Sekretær' },
  { name: 'Tommy Luu', role: 'IT-ansvarlig' },
  { name: 'Daniel Duy Nguyen', role: 'Planleggingsansvarlig' },
  { name: 'Aina Vy', role: 'Matansvarlig' },
  { name: 'Gia Hy Nguyen', role: 'PR-ansvarlig' },
  { name: 'Nina Hoang', role: 'Designansvarlig' },
  { name: 'Younes Bouhmidi', role: 'Styremedlem' },
  { name: 'Adelin Evergreen', role: 'Styremedlem' },
  { name: 'Sofia Kamali', role: 'Styremedlem' },
  { name: 'Elvis T. D. Le', role: 'Styremedlem' },
];

const BigTextBox = ({ title, content }: { title: string; content: string }) => (
  <div className='mb-6'>
    <h2 className='text-xl font-bold italic text-gray'>{title}</h2>
    <p>{content}</p>
  </div>
);

export default function Organization(): JSX.Element {
  return (
    <>
      <CurvyHeader title='Om oss' />
      <div className='z-10 mb-12 flex max-w-screen-xl flex-col'>
        <h1 className='text-center text-6xl font-bold text-black'>VSAiT</h1>
        <div className='mb-4 flex w-full flex-col justify-center rounded-2xl bg-white p-8 text-left shadow-lg'>
          <BigTextBox
            title='Hvem er vi?'
            content={`
            VSAiT er en frivillig og nonprofitt organisasjon, der hensikten er
            å skape et bånd i det vietnamesiske studentmiljøet i Trondheim.
            Organisasjonen er hovedsakelig rettet mot studenter ved NTNU og
            andre utdanningsinstitusjoner i Trondheim. Vi sørger for en god
            integrering av norsk-vietnamesiske studenter i et norsk miljø,
            samtidig som den vietnamesiske kulturen blir bevart og ivaretatt
            med den unge generasjonen.`}
          />
          <BigTextBox
            title='Vår historie'
            content={`
            VSAiT ble opprettet i 1990, og var en voksende organisasjon inntil
            2009. I 2009 hadde VSAiT problemer med å finne nye styremedlemmer
            som kunne overta driften av organisasjonen, og det endte med at
            organisasjonen ble lagt på is. To år senere i 2011, samlet en
            gruppe med interesse for å gjenopprette VSAiT seg, og
            organisasjonen kom til liv igjen. VSAiT var en veldig liten
            organisasjon i begynnelsen av gjenopprettelsen, men siden da har
            VSAiT opplevd stor vekst.
        `}
          />
          <BigTextBox
            title='Struktur'
            content={`
            VSAiT består av et frivillig styre som har ansvaret for å drive
            organisasjonen og planlegge arrangementer. Medlemmene i styret
            blir valgt på den årlige generalforsamlingen ved slutten av
            vårsemesteret.
        `}
          />
        </div>

        <div className='my-12 flex w-full flex-col justify-center p-8'>
          <h2 className='mb-4 text-center text-3xl font-bold'>Vår fokus</h2>
          <div className='flex w-full justify-between gap-4'>
            <div className='grid w-full max-w-xs grid-rows-organizationfocus'>
              <div className='m-auto mb-3 w-3/4 justify-items-center'>
                <Image
                  src='/fokus1.png'
                  alt='Sosialt miljø icon'
                  width={2048}
                  height={1569}
                  sizes='100vw'
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </div>
              <div className='m-auto w-3/4'>
                <h3 className='text-xl font-bold'>Sosialt Miljø</h3>
                <p>
                  Skape sosiale bånd i det vietnamesiske studentmiljøet i
                  Trondheim
                </p>
              </div>
            </div>
            <div className='grid w-full max-w-xs grid-rows-organizationfocus'>
              <div className='m-auto mb-3 w-3/4 justify-items-center'>
                <Image
                  src='/fokus2.png'
                  alt='Kultur icon'
                  width={2048}
                  height={1609}
                  sizes='100vw'
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </div>
              <div className='m-auto w-3/4'>
                <h3 className='text-xl font-bold'>Kultur</h3>
                <p>
                  Bevare og fremme vietnamesisk kultur blant vietnamesiske
                  studenter
                </p>
              </div>
            </div>
            <div className='grid w-full max-w-xs grid-rows-organizationfocus'>
              <div className='m-auto mb-3 w-3/4 justify-items-center'>
                <Image
                  src='/fokus3.png'
                  alt='Arrangement icon'
                  width={2048}
                  height={1941}
                  sizes='100vw'
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </div>
              <div className='m-auto w-3/4'>
                <h3 className='text-xl font-bold'>Arrangement</h3>
                <p>Holde arrangement for medlemmer og bekjente</p>
              </div>
            </div>
          </div>
        </div>

        <div className='organization relative my-16'>
          <div className='mb-4 flex w-full flex-col justify-center rounded-2xl bg-white p-8 text-left shadow-lg'>
            <h2 className='mb-4 text-center text-3xl font-bold'>
              Arrangementer
            </h2>
            <p className='m-auto w-10/12 text-center'>
              VSAiTs hensikt er å skape et bånd for det vietnamesiske
              studentmiljøet i Trondheim. Dette oppnår vi med ulike sosiale
              arrangementer gjennom skoleåret. Vi har både større og mindre
              arrangementer der studenter har muligheten til å bli kjent med
              hverandre.
            </p>
          </div>
          <div className='flex flex-col'>
            <div className='my-2 flex justify-between px-24 py-12'>
              <div className='flex w-full justify-start'>
                <div className='w-3/4 max-w-sm overflow-hidden rounded-2xl'>
                  <Image
                    src='/cover1.jpg'
                    alt='Bilde av Bli kjent grilling arrangement'
                    width={1024}
                    height={683}
                    sizes='100vw'
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                </div>
              </div>
              <div className='flex w-full flex-col text-left'>
                <h3 className='mb-3 text-2xl font-medium'>
                  Bli-kjent-grilling
                </h3>
                <p className='w-8/12'>
                  Årets første arrangement. Vi inviterer gamle og nye studenter
                  på grilling. Det blir lek og morro!
                </p>
              </div>
            </div>

            <div className='my-2 flex justify-between rounded-2xl bg-white px-24 py-16 shadow-lg'>
              <div className='order-1 flex w-full justify-end'>
                <div className='w-3/4 max-w-sm overflow-hidden rounded-2xl'>
                  <Image
                    src='/cover2.jpg'
                    alt='Bilde av Tet Trung Thu arrangement'
                    width={1024}
                    height={683}
                    sizes='100vw'
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                </div>
              </div>
              <div className='flex w-full flex-col text-left'>
                <h3 className='mb-3 text-2xl font-medium'>Tet Trung Thu</h3>
                <p className='w-8/12'>
                  Den vietnamesiske månefestivalen “Tết Trung Thu”, også kalt
                  “Midthøstfestivalen” er den nest største kulturdagen i
                  Vietnam, og feires i store deler av Asia. Denne dagen feires
                  med vietnamesiske retter og leker. Her blir medlemmer
                  informert om festivalens symbolske betydning.
                </p>
              </div>
            </div>

            <div className='my-2 flex justify-between px-24 py-12'>
              <div className='flex w-full justify-start'>
                <div className='w-3/4 max-w-sm overflow-hidden rounded-2xl'>
                  <Image
                    src='/cover3.jpg'
                    alt='Bilde av Tet arrangement'
                    width={1270}
                    height={683}
                    sizes='100vw'
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                </div>
              </div>
              <div className='flex w-full flex-col text-left'>
                <h3 className='mb-3 text-2xl font-medium'>Tet</h3>
                <p className='w-8/12'>
                  Den vietnamesiske nyttårsfeiringen Tết er den største
                  feiringen i Vietnam. For mange vietnamesere i Norge er dette
                  en mye større feiring enn selve nyttårsaften
                </p>
              </div>
            </div>

            <div className='my-2 flex justify-between rounded-2xl bg-white px-24 py-16 shadow-lg'>
              <div className='order-1 flex w-full justify-end'>
                <div className='w-3/4 max-w-sm overflow-hidden rounded-2xl'>
                  <Image
                    src='/cover4.jpg'
                    alt='Bilde av Eksamensgrilling arrangement'
                    width={1024}
                    height={683}
                    sizes='100vw'
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                </div>
              </div>
              <div className='flex w-full flex-col text-left'>
                <h3 className='mb-3 text-2xl font-medium'>Eksamensgrilling</h3>
                <p className='w-8/12'>
                  Slutten av skoleåret nærmer seg, og det gjør også
                  eksamensnervene. Vi samler medlemmer for et lite avbrekk fra
                  eksamenslesningen med grilling.
                </p>
              </div>
            </div>

            <div className='mb-3 mt-12 rounded-2xl bg-white px-24 py-10 shadow-lg'>
              <h3 className='mb-3 text-2xl font-medium'>Småarrangement</h3>
              <p className='m-auto w-1/2 text-center'>
                I løpet av året så holder vi mindre arrangement som f.eks.
                spillkvelder, karaokekveld, sportsaktiviteter.
              </p>
            </div>
          </div>
        </div>

        <div className='my-8 rounded-2xl bg-white px-24 py-10 shadow-lg'>
          <h2 className='mb-4 text-center text-3xl font-bold'>Styret</h2>
          <p className='m-auto w-1/2 text-center'>
            Vi tar imot innmeldinger, spørsmål og andre henvendelser på mail:{' '}
            <a href='mailto:vsait@vsait.org'>vsait@vsait.org</a>
          </p>
          <div className='my-8 grid grid-cols-3 gap-8'>
            {board.map((member: BoardType) => (
              <div
                key={member.name}
                className='rounded-2xl bg-primary p-8 text-white'
              >
                <p className='text-xl font-bold'>{member.name}</p>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
