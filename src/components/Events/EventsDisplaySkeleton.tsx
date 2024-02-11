import { Calendar, Person, Place } from '@/components/icons';
import Image from 'next/image';

const EventsDisplaySkeleton = () => {
  return (
    <div className='rounded-2xl border-2 border-primary p-3'>
      <div className='relative mx-auto grid w-full grid-cols-layout gap-3 rounded-2xl bg-white p-3 shadow-lg'>
        <div className='flex w-full'>
          <div className='w-full overflow-hidden rounded-l-2xl'>
            <div className='w-full animate-pulse rounded-md bg-slate-400'>
              <Image
                src='/placeholder.png'
                alt='Vercel Logo'
                width={1352}
                height={564}
                className='opacity-0'
                sizes='100vw'
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </div>
        </div>
        <div className='h-full w-full rounded-lg bg-primary'></div>
        <div className='flex w-full flex-col text-left'>
          <h2 className='mb-3 w-7/12 animate-pulse rounded-md bg-slate-400 p-4 text-2xl font-bold'></h2>
          <div className='flex flex-col gap-3'>
            <div className='grid grid-cols-event gap-3'>
              <Calendar className='justify-self-center' />
              <p className='flex w-8/12 animate-pulse flex-col justify-center rounded-md bg-slate-400 p-2'></p>
            </div>

            <div className='grid grid-cols-event gap-3'>
              <Place className='justify-self-center' />
              <p className='flex w-8/12 animate-pulse flex-col justify-center rounded-md bg-slate-400 p-2'></p>
            </div>
            <div className='grid grid-cols-event gap-3'>
              <Person className='justify-self-center' />
              <p className='flex w-8/12 animate-pulse flex-col justify-center rounded-md bg-slate-400 p-2'></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventsDisplaySkeleton;
