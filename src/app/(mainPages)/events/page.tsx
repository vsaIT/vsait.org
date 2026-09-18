'use client';
import { PastEvents, UpcomingEvents } from '@/components/Events';
import { CurvyHeader } from '@/components/Header';
import { MembershipBanner } from '@/components/Home';
import { useShowMembershipBanner } from '@/lib/hooks/useMembership';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const TABS = [
  { id: 'upcoming', text: 'Kommende' },
  { id: 'past', text: 'Tidligere' },
] as const;

function Events(): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') === 'past' ? 'past' : 'upcoming';
  const showMembershipBanner = useShowMembershipBanner();

  const selectTab = (next: (typeof TABS)[number]['id']) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next === 'upcoming') params.delete('tab');
    else params.set('tab', next);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  return (
    <>
      <CurvyHeader waveColor='#FDF8F0'>
        <div className='relative z-20 px-6 text-center'>
          <h1 className='text-4xl text-white sm:text-5xl'> Arrangementer</h1>
          <p className='mt-3 text-sm text-white/80'>
            Større og mindre sammenkomster gjennom hele skoleåret.
          </p>
        </div>
      </CurvyHeader>

      <section className='w-full bg-cream pb-12'>
        <div className='mx-auto flex w-11/12 max-w-[58rem] flex-col py-6'>
          <div className='mx-auto flex rounded-full bg-white p-1 shadow-sm'>
            {TABS.map(({ id, text }) => (
              <button
                key={id}
                type='button'
                onClick={() => selectTab(id)}
                aria-pressed={tab === id}
                className={`rounded-full px-6 py-2.5 text-sm transition-all duration-300 ${
                  tab === id
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray hover:text-primary'
                }`}
              >
                {text}
              </button>
            ))}
          </div>

          <div className='mt-12'>
            {tab === 'upcoming' ? <UpcomingEvents /> : <PastEvents />}
          </div>
        </div>

        {showMembershipBanner && (
          <div className='px-3 sm:px-4'>
            <MembershipBanner />
          </div>
        )}
      </section>
    </>
  );
}

export default Events;
