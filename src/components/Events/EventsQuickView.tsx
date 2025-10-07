import { Button } from '@/components/Input';
import { useEvents } from '@/lib/hooks/useEvent';
import { ExtendedComponentProps } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';

const EventsDisplay = ({ className = '' }: ExtendedComponentProps) => {
  const { data, isLoading, isError } = useEvents('page=1&upcomming=true');

  if (!isLoading && !data) window.location.href = '/404';
  if (isError) throw new Error('Failed to load events');
  console.log(data);

  return (
    <div
      className={`my-6 mb-8 flex w-full flex-1 items-center text-center ${className}`}
    >
      <h2 className='mb-1.5 text-lg font-bold text-black'>
        Kommende arrangementer
      </h2>
      <div className='mb-2 px-6'>
        {isLoading ? (
          <p className='my-10'>
            Det ser ikke ut som vi har noen planlagte arrangementer annonsert
            enda. Kom gjerne tilbake igjen senere!
          </p>
        ) : (
          data?.events?.map((event, index) => (
            <div
              key={index}
              className='relative mx-auto my-4 w-full max-w-screen-lg items-center justify-center overflow-hidden rounded-xl'
            >
              <Link href={`/events/${event.id}`} className='flex flex-col'>
                <Image
                  src={event.image as string}
                  alt='image src'
                  width={1352}
                  height={564}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                />
                <p className='absolute left-4 top-4 rounded-md bg-black bg-opacity-50 px-2 py-1 text-2xl font-bold text-white'>
                  {event.title}
                </p>
                <p className='absolute bottom-10 right-4 -translate-y-20 transform rounded-sm bg-black bg-opacity-80 px-2 py-1 text-base font-bold text-white'>
                  {event.location}
                </p>
                <p className='absolute bottom-10 right-4 -translate-y-10 transform rounded-sm bg-black bg-opacity-80 px-2 py-1 text-base font-bold text-white'>
                  {new Date(event.startTime).toDateString()}
                </p>
                <p className='absolute bottom-10 right-4 rounded-sm bg-black bg-opacity-80 px-2 py-1 text-base font-bold text-white'>
                  {event.eventType === 'MEMBERSHIP'
                    ? 'Krever medlemsskap'
                    : 'Åpen for alle'}
                </p>
                <div className='w-full bg-light'>
                  <p className='m-1 box-border w-full text-white'>
                    Antall påmeldte {event._count?.registrationList}/
                    {event.maxRegistrations}
                  </p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
      <Link href='/events'>
        <Button text='Se alle arrangementer'></Button>
      </Link>
    </div>
  );
};
export default EventsDisplay;
