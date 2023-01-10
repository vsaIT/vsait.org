import { Button } from '@components/Button';
import { CustomComponentProps, EventType } from '@lib/types';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

const EventsDisplay = ({ className = '' }: CustomComponentProps) => {
  const { isSuccess, isLoading, error, data } = useQuery({
    queryKey: ['quickEvents'],
    queryFn: () =>
      fetch(`/api/events?page=1&upcoming=true`).then((res) => res.json()),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60000,
  });
  const events: EventType[] = data?.events;

  // Redirect to 404 if event not found
  if (!isLoading && !events) window.location.href = '/404';
  // Redirect to 500 if error
  if (error) window.location.href = '/500';

  return (
    <div
      className={`flex w-full flex-1 flex-col items-center text-center my-6 mb-8 ${className}`}
    >
      <h2 className="text-lg mb-1.5 font-bold text-black">
        Kommende arrangementer
      </h2>
      <div className="w-full mb-2">
        {isLoading || !isSuccess || data?.statusCode ? (
          <p className="my-10">
            Det ser ikke ut som vi har noen planlagte arrangementer annonsert
            enda. Kom gjerne tilbake igjen senere!
          </p>
        ) : (
          events?.map((event, index) => (
            <div
              key={index}
              className="w-8/12 mx-auto my-4 items-center justify-center relative rounded-xl overflow-hidden max-w-screen-lg"
            >
              <Link href={`/events/${event.id}`}>
                <a className="flex flex-col">
                  <Image
                    src={event.image}
                    alt="image src"
                    width={1352}
                    height={564}
                    objectFit="cover"
                  />
                  <p className="absolute top-4 left-4 bg-opacity-50 bg-black text-white text-2xl px-2 py-1 font-bold rounded-md">
                    {event.title}
                  </p>
                  <p className="absolute bottom-10 transform -translate-y-20 right-4 bg-opacity-80 bg-black text-white text-base px-2 py-1 font-bold rounded-sm">
                    {event.location}
                  </p>
                  <p className="absolute bottom-10 transform -translate-y-10 right-4 bg-opacity-80 bg-black text-white text-base px-2 py-1 font-bold rounded-sm">
                    {new Date(event.startTime).toDateString()}
                  </p>
                  <p className="absolute bottom-10 right-4 bg-opacity-80 bg-black text-white text-base px-2 py-1 font-bold rounded-sm">
                    {event.eventType === 'MEMBERSHIP'
                      ? 'Krever medlemsskap'
                      : 'Åpen for alle'}
                  </p>
                  <div className="w-full bg-light">
                    <p className="w-full text-white m-1 box-border">
                      Antall påmeldte {event.registrationList.length}/
                      {event.maxRegistrations}
                    </p>
                  </div>
                </a>
              </Link>
            </div>
          ))
        )}
      </div>
      <a href="/events">
        <Button text="Se alle arrangementer"></Button>
      </a>
    </div>
  );
};
export default EventsDisplay;
