import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Footer from '@components/Footer';
import { EventType } from '@lib/types';
import { SmallHeader } from '@lib/components/Header';
import Navigation from '@lib/components/Navigation';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@lib/components/Button';
import { useSession } from 'next-auth/react';

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
  const [event, setEvent] = useState<EventType>(placeholderEvent);
  const { status, data: session } = useSession({
    required: false,
  });
  const { eventid } = router.query;
  console.log(eventid, session);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Arrangementer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="flex w-full flex-1 flex-col items-center text-center">
        <SmallHeader />

        <div className="flex flex-col z-10 max-w-screen-xl mb-32 w-full gap-6 transform -translate-y-10">
          <div className="flex w-full bg-white shadow-2xl rounded-2xl p-6">
            <div className="w-full overflow-hidden">
              <Image
                src={event.image}
                alt="Vercel Logo"
                width={1352}
                height={564}
                layout="responsive"
              />
            </div>
          </div>

          <div className="grid grid-cols-eventdetail text-left gap-6">
            <div className="flex flex-col w-full bg-white shadow-2xl rounded-2xl p-6">
              <h2 className="font-bold text-2xl mb-4">Detaljer</h2>

              <div className="flex flex-col gap-2">
                <p>
                  <b>Starttid:</b> {event.startTime.toDateString()}
                </p>
                <p>
                  <b>Sluttid:</b> {event.endTime.toDateString()}
                </p>
                <p>
                  <b>Påmeldingsfrist:</b>{' '}
                  {event.registrationDeadline.toDateString()}
                </p>
                <p>
                  <b>Avmeldingsfrist:</b>{' '}
                  {event.cancellationDeadline.toDateString()}
                </p>
                <p>
                  <b>Sted:</b> {event.location}
                </p>
                <p>
                  <b>Åpent for:</b>{' '}
                  {event.membershipRequired ? 'medlemmer' : 'alle'}
                </p>
              </div>
            </div>
            <div className="flex flex-col w-full bg-white shadow-2xl rounded-2xl p-6">
              <h2 className="font-bold text-2xl mb-4">{event.title}</h2>
              <p className="italic mb-2">
                Last edited: {new Date().toDateString()}
              </p>
              <p>{event.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-eventdetail text-left gap-6">
            <div className="flex flex-col">
              <div className="flex flex-col w-full bg-white shadow-2xl rounded-2xl p-6 mb-6">
                <h2 className="font-bold text-2xl mb-4">Påmelding</h2>
                <div className="flex flex-col gap-2">
                  <p>
                    <b>Antall påmeldte:</b> {event.registrationList.length} /{' '}
                    {event.maxRegistration}
                  </p>
                  <p>
                    <b>Venteliste:</b> {event.waitingList.length}
                  </p>
                  <div className="flex flex-col gap-3 mt-2">
                    <Button text="Se andre påmeldte" />
                    <Button text="Meld deg på" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full bg-white shadow-2xl rounded-2xl p-6">
                <h2 className="font-bold text-2xl mb-4">Innslipp</h2>
                <Button text="Gå til innslipp" />
              </div>
            </div>
            <div className="flex flex-col w-full bg-white shadow-2xl rounded-2xl p-6">
              <h2 className="font-bold text-2xl mb-4">Info</h2>
              <div className="flex flex-col gap-4">
                <p>
                  Til venstre kan man se antallet påmeldte. Hensikten bak dette
                  er hovedsakelig for å estimere hvor mye mat som skal kjøpes
                  inn. Det står også en maksgrense, som gjelder hovedsakelig for
                  mindre arrangementer der vi ikke kan være alt for mange
                  mennesker samlet (f. eks buldring, mini-golf og bowling).
                  Fortvil ikke dersom maksgrensen på et arrangement nås, da du
                  vil få muligheten til å melde deg på ventelista for
                  arrangementet - gitt at du er nummer 1 i køen, vil du få
                  plassen dersom noen melder seg av.
                </p>
                <p>
                  I boksen øverst til venstre, står det en oversikt over start-
                  og sluttid for arrangementet. Merk at det også står
                  påmeldings- og avmeldingsfrist som er viktige å forholde seg
                  til. Avmelding er spesielt viktig, dersom det er en venteliste
                  på arrangementet, slik at nestemann får plass.
                </p>
                <p>
                  PS! Husk å skriv ned mulige matvarer som kan forårsake
                  allergiske reaksjoner på profilen din, slik at vi kan tilpasse
                  mattilbudet på våre arrangementer etter deres matbehov ♥.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col text-left">
            <div className="flex flex-col w-full bg-white shadow-2xl rounded-2xl p-6">
              <h2 className="font-bold text-2xl mb-4">Liste over påmeldte</h2>
              <p></p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Event;
