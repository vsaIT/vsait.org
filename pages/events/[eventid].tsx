import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Footer from '@components/Footer';
import { EventType } from '@lib/types';

const placeholderEvent: EventType = {
  id: '1',
  title: 'Julekos med VSAiT!',
  description:
    'Nå nærmer vinteren seg og vi gjør oss klare til JULEKOS med VSAiT!😍Det vil være masse BANGING pizza, varm drikke, juleworkshop, klementiner, pepperkaker og god julemusikk!🥳 Dersom du har vært snill i år så det være at vi får besøk av julenissen🙈! Det blir super lavterskel, mye smil og latter, og vi håper så mange som mulig vil komme! Kom med cozy wozy klær, og det er også mulig å spille brettspill, strikking, lekser og mingle med andre senere utover kvelden <3 🌈',
  image: '/placeholder.png',
  location: 'KJL4, Gløshaugen',
  maxRegistration: 30,
  membershipRequired: true,
  startTime: new Date('11-11-2022 17:00'),
  endTime: new Date('11-11-2022 17:00'),
  registrationDeadline: new Date('11-11-2022 17:00'),
  cancellationDeadline: new Date('11-11-2022 17:00'),
  registrationList: [],
  waitingList: [],
  checkinId: 'test',
  checkinList: [],
  draft: false,
};

const Event: NextPage = () => {
  const router = useRouter();
  const { eventid } = router.query;
  console.log(eventid);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Arrangementer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">Welcome to the event {eventid}</h1>
      </main>

      <Footer />
    </div>
  );
};

export default Event;
