'use client';
import { useState } from 'react';
import Link from 'next/link';
import AnimateHeight from 'react-animate-height';
import { ChevronDown } from '@/components/icons';

type FaqItem = {
  question: string;
  answer: React.ReactNode;
};

const faqs: FaqItem[] = [
  {
    question: 'Hvor mange arrangementer har dere i året?',
    answer: 'Hvert semester har vi rundt 2 arrangementer per måned. Dette inkluderer vår små arrangementer og våre hovedarrangementer som Tết.',
  },
  {
    question: 'Kan hvem som helst bli med?',
    answer: 'Alle kan bli med, uavhengig av om du er vietnamesisk eller ikke. Vi ønsker å skape et inkluderende miljø for alle studenter som ønsker å bli kjent med det vietnamesiske kulturen.',
  },
  {
    question: 'Hvordan blir jeg medlem?',
    answer: (
      <>
        <Link
          href='/medlemskap'
          className='text-primary transition-all duration-300 hover:brightness-80'
        >
          Medlemskap siden
        </Link>{' '}
        har alt informasjon om hvordan du kan bli medlem. Du kan betale med Vipps og sende kvitteringen til styret, som vil registrere deg som medlem.
      </>
    ),
  },
  {
    question: 'Hva koster medlemskapet?',
    answer: (
      <>
        <Link
          href='/medlemskap'
          className='text-primary transition-all duration-300 hover:brightness-90'
        >
          Medlemskapet
        </Link>{' '}
        koster 100 kr for ett semester og 175 kr for hele studieåret. Dette gir
        deg tilgang til alle våre arrangementer og aktiviteter. Tết (Nyttårsfeiring) og Tết Trung Thu (Månefestival) har egne
        inngangsbillett som koster 100 kr i tillegg til medlemskapet.
      </>
    ),
  },
  {
    question: 'Hvordan tar jeg kontakt hvis jeg har andre spørsmål?',
    answer: 'Du kan ta kontakt med oss via e-post på vsait@vsait.org. Vi svarer så raskt vi kan!',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className='mt-10 flex flex-col gap-3'>
      <h2 className='mb-2 text-center text-2xl  sm:text-3xl'>
        Ofte stilte spørsmål
      </h2>

      {faqs.map((faq, index) => {
        const isOpen = index === openIndex;

        return (
          <div
            key={faq.question}
            className='overflow-hidden rounded-2xl bg-white shadow-sm'
          >
            <button
              type='button'
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className='flex w-full items-center justify-between gap-5 px-6 py-5 text-left transition-all duration-300 hover:bg-primary/[0.06] sm:px-8'
            >
              <span className='text-sm '>{faq.question}</span>
              <ChevronDown
                color='currentColor'
                className={`h-3 w-3 shrink-0 text-primary transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimateHeight duration={300} height={isOpen ? 'auto' : 0}>
              <p className='px-6 pb-6 text-left text-sm leading-relaxed text-gray sm:px-8'>
                {faq.answer || 'Svar kommer.'}
              </p>
            </AnimateHeight>
          </div>
        );
      })}
    </div>
  );
}
