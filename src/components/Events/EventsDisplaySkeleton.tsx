import { Calendar, Person, Place } from 'src/lib/icons';
import Image from 'next/image';

const EventsDisplaySkeleton = () => {
  return (
    <div className="p-3 border-2 border-primary rounded-2xl">
      <div className="relative grid grid-cols-layout w-full mx-auto bg-white shadow-lg rounded-2xl p-3 gap-3">
        <div className="flex w-full">
          <div className="w-full rounded-l-2xl overflow-hidden">
            <div className="bg-slate-400 rounded-md animate-pulse w-full">
              <Image
                src="/placeholder.png"
                alt="Vercel Logo"
                width={1352}
                height={564}
                layout="responsive"
                className="opacity-0"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-full bg-primary rounded-lg"></div>
        <div className="flex flex-col w-full text-left">
          <h2 className="font-bold text-2xl mb-3 bg-slate-400 p-4 rounded-md animate-pulse w-7/12"></h2>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-event gap-3">
              <Calendar className="justify-self-center" />
              <p className="flex flex-col justify-center bg-slate-400 p-2 rounded-md animate-pulse w-8/12"></p>
            </div>

            <div className="grid grid-cols-event gap-3">
              <Place className="justify-self-center" />
              <p className="flex flex-col justify-center bg-slate-400 p-2 rounded-md animate-pulse w-8/12"></p>
            </div>
            <div className="grid grid-cols-event gap-3">
              <Person className="justify-self-center" />
              <p className="flex flex-col justify-center bg-slate-400 p-2 rounded-md animate-pulse w-8/12"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventsDisplaySkeleton;
