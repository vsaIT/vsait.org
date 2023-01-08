import Image from 'next/image';

const EventsDetailedSkeleton = () => {
  return (
    <div className="flex flex-col z-10 max-w-screen-xl mb-32 gap-6 transform -translate-y-10 w-11/12">
      <div className="flex w-full bg-white shadow-2xl rounded-2xl p-6 h-full">
        <div className="w-full overflow-hidden animate-pulse">
          <div className="bg-slate-400 p-2 rounded-md animate-pulse w-full">
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

      <div className="grid grid-cols-eventdetail text-left gap-6">
        <div className="flex flex-col w-full bg-white shadow-2xl rounded-2xl p-6">
          <h2 className="font-bold text-2xl mb-4 bg-slate-400 p-4 rounded-md animate-pulse w-5/12"></h2>

          <div className="flex flex-col gap-2">
            <p className="bg-slate-400 p-2 rounded-md animate-pulse w-11/12"></p>
            <p className="bg-slate-400 p-2 rounded-md animate-pulse w-11/12"></p>
            <p className="bg-slate-400 p-2 rounded-md animate-pulse w-full"></p>
            <p className="bg-slate-400 p-2 rounded-md animate-pulse w-full"></p>
            <p className="bg-slate-400 p-2 rounded-md animate-pulse w-8/12"></p>
            <p className="bg-slate-400 p-2 rounded-md animate-pulse w-8/12"></p>
          </div>
        </div>
        <div className="flex flex-col w-full bg-white shadow-2xl rounded-2xl p-6">
          <h2 className="font-bold text-2xl mb-4 bg-slate-400 p-4 rounded-md animate-pulse w-4/12"></h2>
          <p className="bg-slate-400 p-2 rounded-md animate-pulse w-4/12 mb-4"></p>
          <div className="flex flex-col gap-2">
            <p className="bg-slate-400 p-2 rounded-md animate-pulse w-11/12"></p>
            <p className="bg-slate-400 p-2 rounded-md animate-pulse w-11/12"></p>
            <p className="bg-slate-400 p-2 rounded-md animate-pulse w-full"></p>
            <p className="bg-slate-400 p-2 rounded-md animate-pulse w-full"></p>
            <p className="bg-slate-400 p-2 rounded-md animate-pulse w-8/12"></p>
            <p className="bg-slate-400 p-2 rounded-md animate-pulse w-8/12"></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-eventdetail text-left gap-6">
        <div className="flex flex-col">
          <div className="flex flex-col w-full bg-white shadow-2xl rounded-2xl p-6 mb-6">
            <h2 className="font-bold text-2xl mb-4 bg-slate-400 p-4 rounded-md animate-pulse w-8/12"></h2>
            <div className="flex flex-col gap-2">
              <p className="bg-slate-400 p-2 rounded-md animate-pulse w-10/12"></p>
              <p className="bg-slate-400 p-2 rounded-md animate-pulse w-10/12"></p>
              <p className="bg-slate-400 p-2 rounded-md animate-pulse w-full"></p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full bg-white shadow-2xl rounded-2xl p-6">
          <h2 className="font-bold text-2xl mb-4 bg-slate-400 p-4 rounded-md animate-pulse w-3/12"></h2>
          <div className="flex flex-col gap-2">
            <p className="bg-slate-400 p-2 rounded-md animate-pulse w-8/12"></p>
            <p className="bg-slate-400 p-2 rounded-md animate-pulse w-8/12 mb-2"></p>
            <p className="bg-slate-400 p-2 rounded-md animate-pulse w-full"></p>
            <p className="bg-slate-400 p-2 rounded-md animate-pulse w-full mb-2"></p>
            <p className="bg-slate-400 p-2 rounded-md animate-pulse w-11/12"></p>
            <p className="bg-slate-400 p-2 rounded-md animate-pulse w-11/12"></p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventsDetailedSkeleton;
