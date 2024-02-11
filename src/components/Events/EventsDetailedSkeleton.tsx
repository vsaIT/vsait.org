import Image from 'next/image';

const EventsDetailedSkeleton = () => {
  return (
    <div className='z-10 mb-32 flex w-11/12 max-w-screen-xl -translate-y-10 transform flex-col gap-6'>
      <div className='flex h-full w-full rounded-2xl bg-white p-6 shadow-2xl'>
        <div className='w-full animate-pulse overflow-hidden'>
          <div className='w-full animate-pulse rounded-md bg-slate-400 p-2'>
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

      <div className='grid grid-cols-eventdetail gap-6 text-left'>
        <div className='flex w-full flex-col rounded-2xl bg-white p-6 shadow-2xl'>
          <h2 className='mb-4 w-5/12 animate-pulse rounded-md bg-slate-400 p-4 text-2xl font-bold'></h2>

          <div className='flex flex-col gap-2'>
            <p className='w-11/12 animate-pulse rounded-md bg-slate-400 p-2'></p>
            <p className='w-11/12 animate-pulse rounded-md bg-slate-400 p-2'></p>
            <p className='w-full animate-pulse rounded-md bg-slate-400 p-2'></p>
            <p className='w-full animate-pulse rounded-md bg-slate-400 p-2'></p>
            <p className='w-8/12 animate-pulse rounded-md bg-slate-400 p-2'></p>
            <p className='w-8/12 animate-pulse rounded-md bg-slate-400 p-2'></p>
          </div>
        </div>
        <div className='flex w-full flex-col rounded-2xl bg-white p-6 shadow-2xl'>
          <h2 className='mb-4 w-4/12 animate-pulse rounded-md bg-slate-400 p-4 text-2xl font-bold'></h2>
          <p className='mb-4 w-4/12 animate-pulse rounded-md bg-slate-400 p-2'></p>
          <div className='flex flex-col gap-2'>
            <p className='w-11/12 animate-pulse rounded-md bg-slate-400 p-2'></p>
            <p className='w-11/12 animate-pulse rounded-md bg-slate-400 p-2'></p>
            <p className='w-full animate-pulse rounded-md bg-slate-400 p-2'></p>
            <p className='w-full animate-pulse rounded-md bg-slate-400 p-2'></p>
            <p className='w-8/12 animate-pulse rounded-md bg-slate-400 p-2'></p>
            <p className='w-8/12 animate-pulse rounded-md bg-slate-400 p-2'></p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-eventdetail gap-6 text-left'>
        <div className='flex flex-col'>
          <div className='mb-6 flex w-full flex-col rounded-2xl bg-white p-6 shadow-2xl'>
            <h2 className='mb-4 w-8/12 animate-pulse rounded-md bg-slate-400 p-4 text-2xl font-bold'></h2>
            <div className='flex flex-col gap-2'>
              <p className='w-10/12 animate-pulse rounded-md bg-slate-400 p-2'></p>
              <p className='w-10/12 animate-pulse rounded-md bg-slate-400 p-2'></p>
              <p className='w-full animate-pulse rounded-md bg-slate-400 p-2'></p>
            </div>
          </div>
        </div>
        <div className='flex w-full flex-col rounded-2xl bg-white p-6 shadow-2xl'>
          <h2 className='mb-4 w-3/12 animate-pulse rounded-md bg-slate-400 p-4 text-2xl font-bold'></h2>
          <div className='flex flex-col gap-2'>
            <p className='w-8/12 animate-pulse rounded-md bg-slate-400 p-2'></p>
            <p className='mb-2 w-8/12 animate-pulse rounded-md bg-slate-400 p-2'></p>
            <p className='w-full animate-pulse rounded-md bg-slate-400 p-2'></p>
            <p className='mb-2 w-full animate-pulse rounded-md bg-slate-400 p-2'></p>
            <p className='w-11/12 animate-pulse rounded-md bg-slate-400 p-2'></p>
            <p className='w-11/12 animate-pulse rounded-md bg-slate-400 p-2'></p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventsDetailedSkeleton;
