import { CurvyHeader } from '@/components/Header';
import SectionHeading from '@/components/SectionHeading';
import {
  Briefcase,
  CircleCheck,
  CircleExclamation,
  Envelope,
} from '@/components/icons';
import { getMembershipYear } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import CopyButton from './(components)/CopyButton';
import MembershipStatusLink from './(components)/MembershipStatusLink';
import {
  CONTACT_EMAIL,
  VIPPS_NAME,
  VIPPS_NUMBER,
  emailChecklist,
  membershipTiers,
  summarySteps,
} from './constants';

const summaryIcons = {
  wallet: Briefcase,
  envelope: Envelope,
  check: CircleCheck,
};

const LABEL = 'text-[0.625rem] uppercase tracking-[0.18em] ';
const OUTLINE_BUTTON =
  'mt-4 block w-full rounded-full border border-primary px-5 py-2 text-center text-xs text-primary transition-all duration-300 hover:bg-primary hover:text-white sm:inline-block sm:w-fit';

const Check = ({ children }: { children: React.ReactNode }) => (
  <li className='flex items-start gap-2 text-xs leading-relaxed '>
    <CircleCheck color='#D5564D' className='mt-0.5 h-3 w-3 shrink-0' />
    {children}
  </li>
);

const Hint = ({ children }: { children: React.ReactNode }) => (
  <p className='mt-3 flex items-start gap-2 text-[0.625rem] leading-relaxed '>
    <CircleExclamation color='#F2CF76' className='mt-0.5 h-3 w-3 shrink-0' />
    <span>{children}</span>
  </p>
);

const Details = ({ children }: { children: React.ReactNode }) => (
  <div className='mt-4 flex flex-col gap-3 rounded-xl bg-primary/[0.06] p-4'>
    {children}
  </div>
);

const DetailRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4'>
    <span className={`shrink-0 sm:w-32 ${LABEL}`}>{label}</span>
    <span className='flex flex-wrap items-center gap-2 text-xs '>
      {children}
    </span>
  </div>
);

const Step = ({
  number,
  title,
  description,
  children,
}: {
  number: number;
  title: string;
  description: string;
  children?: React.ReactNode;
}) => (
  <li className='flex flex-col gap-4 rounded-2xl bg-white p-6 text-left shadow-sm sm:flex-row sm:gap-5'>
    <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm text-white'>
      {number}
    </span>
    <div className='flex flex-1 flex-col'>
      <h3 className='text-sm '>{title}</h3>
      <p className='mt-2 text-xs leading-relaxed '>{description}</p>
      {children}
    </div>
  </li>
);

export default function Membership(): JSX.Element {
  const membershipYear = getMembershipYear();
  const emailSubject = `Medlemskap ${membershipYear}/${
    membershipYear + 1
  } – ditt navn`;

  return (
    <>
      <CurvyHeader waveColor='#FDF8F0'>
        <div className='relative z-20 px-6 text-center'>
          <h1 className='text-4xl text-white sm:text-5xl'>Medlemskap</h1>
          <p className='mt-3 text-sm text-white/80'>
            Det du trenger å vite for å bli medlem i VSAiT.
          </p>
        </div>
      </CurvyHeader>

      <section className='w-full overflow-hidden bg-cream pb-16'>
        <div className='mx-auto flex w-11/12 max-w-[58rem] flex-col gap-32 py-20 sm:gap-40 sm:py-24'>
          <section>
            <SectionHeading title='Slik fungerer det'>
              <p className='mt-4 max-w-xl text-sm leading-relaxed'>
                Medlemskap registreres manuelt av styret. Det tar normalt noen
                få dager.
              </p>
            </SectionHeading>

            <div className='mt-10 grid gap-4 sm:grid-cols-3'>
              {summarySteps.map((step) => {
                const Icon = summaryIcons[step.icon];
                return (
                  <div
                    key={step.title}
                    className='rounded-2xl bg-white p-5 text-left shadow-sm'
                  >
                    <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-primary/[0.06]'>
                      <Icon color='#D5564D' className='h-4 w-4' />
                    </div>
                    <h3 className='mt-4 text-sm '>{step.title}</h3>
                    <p className='mt-2 text-xs leading-relaxed '>
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <SectionHeading title='Hva koster det?'>
              <p className='mt-4 max-w-xl text-sm leading-relaxed'>
                Medlemskapet gir deg tilgang til arrangementene våre gjennom
                perioden.
              </p>
            </SectionHeading>

            <div className='relative mt-10'>
              <Image
                src='/mascot.png'
                alt=''
                aria-hidden
                width={600}
                height={600}
                className='pointer-events-none absolute -bottom-26 -right-32 hidden w-[11rem] select-none xl:block min-[1440px]:-bottom-24 min-[1440px]:-right-48 min-[1440px]:w-[16rem] min-[1700px]:-bottom-32 min-[1700px]:-right-60 min-[1700px]:w-[21rem]'
              />

              <div className='grid gap-5 sm:grid-cols-3'>
                {membershipTiers.map((tier) => (
                <div
                  key={`${tier.label}-${tier.period}`}
                  className={`relative flex min-h-[24rem] flex-col rounded-2xl bg-white p-7 text-left shadow-sm ${
                    tier.badge ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  {tier.badge && (
                    <span className='absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-[0.625rem] uppercase tracking-[0.14em] text-white'>
                      {tier.badge}
                    </span>
                  )}

                  <p className='text-[0.625rem] uppercase tracking-[0.18em] text-primary'>
                    {tier.label}
                  </p>
                  <p className='mt-3 text-4xl leading-none '>
                    {tier.price}
                    <span className='ml-1 text-base '>kr</span>
                  </p>
                  <p className='mt-3 text-sm '>{tier.period}</p>

                  <ul className='mt-6 flex flex-col gap-3 border-t border-primary/10 pt-6'>
                    {tier.perks.map((perk) => (
                      <Check key={perk}>{perk}</Check>
                    ))}
                  </ul>

                  <p className='mt-auto border-t border-primary/10 pt-6 text-xs leading-relaxed '>
                    {tier.note}
                  </p>
                </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <SectionHeading title='Slik blir du medlem'>
              <p className='mt-4 max-w-xl text-sm leading-relaxed'>
                Følg de fire stegene under. Har du spørsmål underveis, ta
                kontakt med styret.
              </p>
            </SectionHeading>

            <ol className='mt-10 flex flex-col gap-4'>
              <Step
                number={1}
                title='Opprett en konto'
                description='Registrer deg på nettsiden med navn, e-post og utdanningsinstitusjon. Brukeren brukes til å knytte medlemskapet til deg.'
              >
                <Link href='/register' className={OUTLINE_BUTTON}>
                  Registrer deg →
                </Link>
              </Step>

              <Step
                number={2}
                title='Betal med Vipps'
                description='Send beløpet for medlemskapet du ønsker til VSAiTs offisielle Vipps-bruker.'
              >
                <Details>
                  <DetailRow label='Vipps til'>
                    {VIPPS_NAME}
                  </DetailRow>
                  <DetailRow label='Vippsnummer'>{'#830746'}
                    <CopyButton value={VIPPS_NUMBER} />
                  </DetailRow>
                  <DetailRow label='Beløp'>
                    100 kr (ett semester) eller 175 kr (hele året)
                  </DetailRow>
                </Details>
              </Step>

              <Step
                number={3}
                title='Send skjermbilde som bevis'
                description='Ta et skjermbilde av den fullførte Vipps-betalingen og send det som vedlegg på e-post til styret.'
              >
                <Details>
                  <DetailRow label='Send til'>
                    <span className='text-primary'>{CONTACT_EMAIL}</span>
                    <CopyButton value={CONTACT_EMAIL} />
                  </DetailRow>
                  <DetailRow label='Emnefelt'>{emailSubject}</DetailRow>
                </Details>

                <p className='mt-4 text-xs '>Ta med i e-posten:</p>
                <ul className='mt-2 flex flex-col gap-2'>
                  {emailChecklist.map((item) => (
                    <Check key={item}>{item}</Check>
                  ))}
                </ul>

                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                    emailSubject
                  )}`}
                  className={OUTLINE_BUTTON}
                >
                  Åpne e-post →
                </a>
              </Step>

              <Step
                number={4}
                title='Styret registrerer medlemskapet'
                description='Når styret har bekreftet betalingen, aktiverer de medlemskapet direkte på kontoen din. Du trenger ikke gjøre noe mer.'
              >
                <Hint>
                  Du ser status under «Medlemskap» på profilsiden din. Har det
                  ikke dukket opp etter noen dager, send oss en påminnelse.
                </Hint>
                <MembershipStatusLink />
              </Step>
            </ol>
          </section>
        </div>
      </section>
    </>
  );
}
