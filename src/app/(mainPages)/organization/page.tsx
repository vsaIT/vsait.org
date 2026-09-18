import Image from 'next/image';
import AboutHero from './(components)/AboutHero';
import AboutSection from './(components)/AboutSection';
import MemberBox from './(components)/BoardMemberBox';
import EventShowCase from './(components)/EventShowCase';
import Faq from './(components)/Faq';
import { MembershipCallout } from '@/components/Home';
import Reveal from './(components)/Reveal';
import SectionHeading from '@/components/SectionHeading';
import Timeline from './(components)/Timeline';
import { aboutInfos, board, eventInfos, focusAreas } from './constants';

export default function Organization(): JSX.Element {
  return (
    <>
      <AboutHero />
      <div className='relative z-10 w-full bg-cream'>
        <div className='mx-auto flex w-11/12 max-w-[60rem] flex-col gap-36 py-28 sm:gap-44 sm:py-36'>
          <section className='grid grid-cols-1 gap-10 text-left lg:grid-cols-[1fr_2.2fr] lg:gap-16'>
            <Reveal>
              <div className='lg:sticky lg:top-28'>
                <p className='flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-primary'>
                  <span className='h-0.5 w-6 rounded-full bg-primary' />
                  Om foreningen
                </p>
                <h2 className='mt-3 text-3xl leading-snug  sm:text-4xl'>
                  Hvem vi er
                </h2>
                <p className='mt-4 text-sm leading-relaxed text-gray'>
                  Tre ting som forklarer hva VSAiT er, hvor vi kommer fra, og
                  hvordan vi drives.
                </p>
              </div>
            </Reveal>

            <div className='flex flex-col gap-5'>
              {aboutInfos.map((info, index) => (
                <Reveal
                  key={info.title}
                  delay={([0, 100, 200] as const)[index % 3]}
                >
                  <AboutSection {...info} />
                </Reveal>
              ))}
            </div>
          </section>

          <section>
            <Reveal>
              <SectionHeading title='Vår reise, år for år'>
                <p className='mt-4 text-sm text-gray'>
                  Bla sidelengs for å utforske viktige øyeblikk i VSAiTs
                  historie.
                </p>
              </SectionHeading>
              <Timeline />
            </Reveal>
          </section>

          <section>
            <Reveal>
              <SectionHeading title='Tre ting vi bryr oss om' />
            </Reveal>
            <div className='mt-10 grid gap-5 sm:grid-cols-3'>
              {focusAreas.map((area, index) => (
                <Reveal
                  key={area.title}
                  delay={([0, 100, 200] as const)[index % 3]}
                  className='h-full'
                >
                  <div className='h-full rounded-2xl bg-white p-8 shadow-sm'>
                    <div className='mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 sm:h-32 sm:w-32'>
                      <Image
                        src={area.iconSrc}
                        alt={area.iconAlt}
                        width={area.iconWidth}
                        height={area.iconHeight}
                        className='h-14 w-auto sm:h-16'
                      />
                    </div>
                    <h3 className='mt-5 text-lg '>{area.title}</h3>
                    <p className='mt-2 text-xs leading-relaxed text-gray'>
                      {area.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section>
            <Reveal>
              <SectionHeading title='Våre arrangementer'>
                <p className='mt-4 max-w-2xl text-sm leading-relaxed text-gray'>
                  VSAiTs hensikt er å skape et bånd for det vietnamesiske
                  studentmiljøet i Trondheim. Dette oppnår vi med ulike sosiale
                  arrangementer gjennom skoleåret. Vi har både større og mindre
                  arrangementer der studenter har muligheten til å bli kjent med
                  hverandre.
                </p>
              </SectionHeading>
            </Reveal>

            <div className='mt-12 flex flex-col gap-14'>
              {eventInfos.map((event) => (
                <Reveal key={event.title}>
                  <EventShowCase {...event} />
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className='mt-14 rounded-2xl bg-primary/[0.06] px-6 py-8 sm:px-12'>
                <h3 className='text-xl '>Småarrangement</h3>
                <p className='mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray'>
                  I løpet av året så holder vi mindre arrangementer som f.eks.
                  spillkvelder, gameshow, origamikveld eller julekos.
                </p>
              </div>
            </Reveal>
          </section>

          <section>
            <Reveal>
              <SectionHeading title='Menneskene bak VSAiT'>
                <p className='mt-4 text-sm text-gray'>
                  Vi tar imot innmeldinger, spørsmål og andre henvendelser på{' '}
                  <a
                    href='mailto:vsait@vsait.org'
                    className='text-primary transition-all duration-300 hover:brightness-90'
                  >
                    vsait@vsait.org
                  </a>
                </p>
              </SectionHeading>
            </Reveal>

            <div className='mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
              {board.map((member, index) => (
                <Reveal
                  key={member.name}
                  delay={([0, 100, 200, 300] as const)[index % 4]}
                  className='h-full'
                  once
                >
                  <MemberBox name={member.name} role={member.role} />
                </Reveal>
              ))}
            </div>
          </section>

          <Reveal once>
            <Faq />
          </Reveal>
        </div>

        <MembershipCallout />
      </div>
    </>
  );
}
