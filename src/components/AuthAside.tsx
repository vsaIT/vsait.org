import FloatingIcon from '@/components/FloatingIcon';
import { Sprout, Star } from '@/components/icons';
import { getMembershipYear } from '@/lib/utils';

type AuthAsideProps = {
  title: string;
  description: string;
  showMembershipNote?: boolean;
};

const AuthAside = ({
  title,
  description,
  showMembershipNote = false,
}: AuthAsideProps) => {
  const membershipYear = getMembershipYear();

  return (
    <section className='relative flex w-full flex-col justify-end overflow-hidden bg-gradient-to-bl from-secondary via-primary via-45% to-primary px-8 pb-14 pt-36 text-left sm:px-12 lg:sticky lg:top-0 lg:h-screen lg:w-1/2 lg:pb-20'>
      <div
        aria-hidden
        className='pointer-events-none absolute -right-20 -top-32 aspect-square w-[26rem] rounded-full bg-white/10'
      />
      <FloatingIcon className='right-24 top-40 opacity-70'>
        <Sprout color='#FFFFFF' className='h-8 w-8' />
      </FloatingIcon>
      <FloatingIcon className='right-16 top-1/2 opacity-80 lg:right-40'>
        <Star color='#FFFFFF' className='h-7 w-7' />
      </FloatingIcon>

      <div className='relative max-w-md'>
        {showMembershipNote && (
          <p className='mt-8 flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs text-white'>
            <Star color='#FFFFFF' className='h-3 w-3 shrink-0' />
            {`Medlemskap for ${membershipYear}/${membershipYear + 1} er nå åpent`}
          </p>
        )}

        <h1
          className={`text-4xl leading-snug text-white sm:text-5xl ${
            showMembershipNote ? 'mt-5' : 'mt-8'
          }`}
        >
          {title}
        </h1>

        <p className='mt-6 max-w-sm text-sm leading-relaxed text-white/85'>
          {description}
        </p>

        <p className='mt-12 text-xs text-white/70'>
          Vietnamese Student Association in Trondheim · vsait@vsait.org
        </p>
      </div>
    </section>
  );
};

export default AuthAside;
