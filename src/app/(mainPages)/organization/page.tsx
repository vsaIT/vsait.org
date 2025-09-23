import { CurvyHeader } from '@/components/Header';
import Image from 'next/image';
import ImageWithText from './(components)/EventShowCase';
import MemberBox from './(components)/BoardMemberBox';
import { board, eventInfos, aboutInfos } from './constants';

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
        <div className='mb-4 flex w-full flex-col justify-center rounded-2xl bg-white p-8 text-left shadow-xl'>
          {aboutInfos.map((info) => (
            <BigTextBox
              key={info.title}
              title={info.title}
              content={info.content}
            />
          ))}
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
                  Bevare og fremme vietnamesisk kultur blant studenter i
                  Trondheim
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
          <div className='mb-4 flex w-full flex-col justify-center rounded-2xl bg-white p-8 text-left shadow-xl'>
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
          <div className='flex w-full flex-col'>
            {eventInfos.map((event) => (
              <ImageWithText key={event.title} {...event} />
            ))}

            <div className='mb-3 mt-12 rounded-2xl bg-white px-24 py-10 shadow-xl'>
              <h3 className='mb-3 text-2xl font-medium'>Småarrangement</h3>
              <p className='m-auto w-1/2 text-center'>
                I løpet av året så holder vi mindre arrangement som f.eks.
                spillkvelder, karaokekveld, sportsaktiviteter.
              </p>
            </div>
          </div>
        </div>

        <div className='my-8 rounded-2xl bg-white px-6 py-10 shadow-xl md:px-24'>
          <h2 className='mb-4 text-center text-3xl font-bold'>Styret</h2>
          <p className='m-auto w-11/12 text-center md:w-1/2'>
            Vi tar imot innmeldinger, spørsmål og andre henvendelser på mail:{' '}
            <a href='mailto:vsait@vsait.org'>vsait@vsait.org</a>
          </p>
          <div className='my-8 grid grid-cols-2 gap-8 lg:grid-cols-3'>
            {board.map((member) => (
              <MemberBox
                key={member.name}
                name={member.name}
                role={member.role}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
