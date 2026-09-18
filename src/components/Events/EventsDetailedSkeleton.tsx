import { CurvyHeader } from '@/components/Header';

const EventsDetailedSkeleton = () => {
  return (
    <>
      <CurvyHeader waveColor='#FDF8F0' height='sm:h-[28rem]'>
        <div className='relative z-20 mx-auto w-11/12 max-w-[58rem] animate-pulse text-left'>
          <div className='h-4 w-52 rounded-full bg-white/30' />
          <div className='mt-6 h-12 w-3/4 max-w-xl rounded-2xl bg-white/30' />
          <div className='mt-6 h-4 w-72 rounded-full bg-white/30' />
        </div>
      </CurvyHeader>

      <section className='w-full bg-cream pb-20'>
        <div className='mx-auto mt-6 aspect-[1352/564] w-11/12 max-w-[58rem] animate-pulse rounded-3xl bg-secondary/30' />

        <div className='mx-auto grid w-11/12 max-w-[58rem] grid-cols-1 gap-8 py-8 text-left lg:grid-cols-[1.6fr_1fr]'>
          <div className='flex animate-pulse flex-col gap-8'>
            <div className='flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-sm sm:p-8'>
              <div className='h-6 w-48 rounded-md bg-secondary/30' />
              <div className='h-4 w-full rounded-md bg-secondary/30' />
              <div className='h-4 w-full rounded-md bg-secondary/30' />
              <div className='h-4 w-2/3 rounded-md bg-secondary/30' />
            </div>
          </div>

          <aside className='flex animate-pulse flex-col gap-6'>
            <div className='h-40 rounded-3xl bg-primary/30' />
            <div className='flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm'>
              <div className='h-5 w-24 rounded-md bg-secondary/30' />
              <div className='h-4 w-full rounded-md bg-secondary/30' />
              <div className='h-4 w-3/4 rounded-md bg-secondary/30' />
              <div className='h-4 w-2/3 rounded-md bg-secondary/30' />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};
export default EventsDetailedSkeleton;
