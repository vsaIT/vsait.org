import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '@components/Footer';
import Navigation from '@lib/components/Navigation';
import { CurvyHeader } from '@lib/components/Header';
import { EventType } from '@lib/types';
import Image from 'next/image';
import { Calendar, Person, Place } from '@lib/icons';
import { useQuery } from '@tanstack/react-query';

const Events: NextPage = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetch('/api/events').then((res) => res.json()),
  });

  if (isLoading) return <>{'Loading...'}</>;
  if (error) return <>{'An error has occurred: ' + error}</>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Arrangementer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="flex w-full flex-1 flex-col items-center text-center">
        <CurvyHeader title="Arrangementer" />

        <div className="events relative flex flex-col z-10 max-w-screen-xl mb-32 gap-6 w-11/12">
          {data.map((event: EventType, index: number) => (
            <a href={`/events/${event.id}`} key={index}>
              <div className="p-3 border-2 border-primary rounded-2xl">
                <div className="relative grid grid-cols-layout w-full mx-auto bg-white shadow-lg rounded-2xl p-3 gap-3">
                  <div className="flex w-full">
                    <div className="w-full rounded-l-2xl overflow-hidden">
                      <Image
                        src={event.image}
                        alt="Vercel Logo"
                        width={1352}
                        height={564}
                        layout="responsive"
                      />
                    </div>
                  </div>
                  <div className="w-full h-full bg-primary rounded-lg"></div>
                  <div className="flex flex-col w-full text-left">
                    <h2 className="font-bold text-2xl mb-3">{event.title}</h2>
                    <div className="flex flex-col gap-3">
                      <div className="grid grid-cols-event gap-3">
                        <Calendar className="justify-self-center" />
                        <p className="flex flex-col justify-center">
                          {new Date(event.startTime).toDateString()} -{' '}
                          {new Date(event.endTime).toDateString()}
                        </p>
                      </div>

                      <div className="grid grid-cols-event gap-3">
                        <Place className="justify-self-center" />
                        <p className="flex flex-col justify-center">
                          {event.location}
                        </p>
                      </div>
                      <div className="grid grid-cols-event gap-3">
                        <Person className="justify-self-center" />
                        <p className="flex flex-col justify-center">
                          Antall påmeldte: {event.registrationList.length}/
                          {event.maxRegistrations}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
