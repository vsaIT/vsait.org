import { Button } from '@components/Button';
import Image from 'next/image';

const events = [
  {
    title: 'Julekos med VSAiT!',
    image: '/placeholder.png',
    location: 'KJL4, Gløshaugen',
    date: 'Fredag 11.11.2022',
    membership: true,
    registrations: 14,
    max_registrations: 30,
  },
];

const EventsDisplay = () => {
  return (
    <div className="flex w-full flex-1 flex-col items-center text-center my-6 mb-8">
      <h2 className="text-lg mb-1.5 font-bold text-black">
        Kommende arrangementer
      </h2>
      <div className="w-full mb-2">
        {events.map((event, index) => (
          <div
            key={index}
            className="w-8/12 mx-auto my-4 items-center justify-center relative rounded-xl overflow-hidden max-w-screen-lg"
          >
            <a href="#" className="flex flex-col">
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
                {event.date}
              </p>
              <p className="absolute bottom-10 right-4 bg-opacity-80 bg-black text-white text-base px-2 py-1 font-bold rounded-sm">
                {event.membership ? 'Krever medlemsskap' : 'Åpen for alle'}
              </p>
              <div className="w-full bg-light">
                <p className="w-full text-white m-1 box-border">
                  Antall påmeldte {event.registrations}/
                  {event.max_registrations}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
      <Button text="Se alle arrangementer"></Button>
    </div>
  );
};
export default EventsDisplay;
