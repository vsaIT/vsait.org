import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '@components/Footer';
import Navigation from '@lib/components/Navigation';
import { CurvyHeader } from '@lib/components/Header';
import Image from 'next/image';

const Organization: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | For bedrifter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="flex w-full flex-1 flex-col items-center text-center">
        <CurvyHeader title="Retningslinjer" />

        <div className="flex flex-col z-10">
          <h1 className="text-2xl font-bold">RETNINGSLINJER FOR VSAiT</h1>
          <p>Revidert dato: 22. februar 2022</p>

          <div className="flex flex-col justify-center w-full p-8 mb-4 text-left bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">§ 1: NAVN</h2>
            <p>
              Det offisielle navnet på denne organisasjonen er Vietnamese
              Student Association in Trondheim, herunder VSAiT.
            </p>
          </div>

          <div className="flex flex-col justify-center w-full p-8 mb-4 text-left bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">§ 2: LOGO</h2>
            <p className="mb-2">Følgende logo er VSAiT sin offisielle logo:</p>
            <div className="max-w-sm">
              <Image
                src="https://medlem.vsait.org/static/home/logo.svg"
                alt="Vercel Logo"
                width={256}
                height={256}
                layout="responsive"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center w-full p-8 mb-4 text-left bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">§ 3: FORMÅL</h2>
            <p className="mb-2">
              VSAiT er en frivillig og nonprofitt organisasjon med formål:
              <ul className="list-disc">
                <li className="ml-7">
                  Å arbeide for studenter først og fremst i Trondheim.
                </li>
                <li className="ml-7">
                  Skape et bånd i det vietnamesiske studentmiljøet i Trondheim.
                </li>
                <li className="ml-7">
                  Fremme og bevare vietnamesisk kultur i det norske samfunn
                  gjennom kulturelle arrangementer og prosjekter.
                </li>
              </ul>
            </p>
          </div>

          <div className="flex flex-col justify-center w-full p-8 mb-4 text-left bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">§ 4: STRUKTUR</h2>
            <div className="max-w-xl">
              <Image
                src="/vsait-struktur.png"
                alt="Vercel Logo"
                width={512}
                height={256}
                layout="responsive"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">DEL 1: MEDLEMSKAP</h3>
              <p className="mb-2">
                <ul className="list-disc">
                  <li className="ml-7">
                    Hovedmedlemskap i VSAiT er åpent for alle studenter i
                    Trondheim med interesse for eller tilknytning til Vietnam.
                  </li>
                  <li className="ml-7">
                    Støttemedlemskap i VSAiT er åpent for de som ikke er
                    studenter og som støtter organisasjonen retningslinjer.
                  </li>
                  <li className="ml-7">
                    Medlemskap innvilges ved å akseptere retningslinjene og
                    betale medlemsavgiften.
                  </li>
                  <li className="ml-7">
                    Medlemskapets varighet er ett skoleår og formidles av
                    styret.
                  </li>
                </ul>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">
                DEL 2: TYPE MEDLEM OG DERES FORDELER
              </h3>
              <p className="mb-2">
                <b>Hovedmedlem:</b>
                <ul className="list-disc">
                  <li className="ml-7">
                    Kan komme med ideer og forslag som angår organisasjonen.
                  </li>
                  <li className="ml-7">
                    Alle forslag skal vurderes og tas opp til diskusjon i
                    styret.
                  </li>
                  <li className="ml-7">
                    Har forslags- og stemmerett i generalforsamlingen til VSAiT.
                  </li>
                  <li className="ml-7">
                    Har rett til å delta, og skal prioriteres ved arrangementer
                    i regi av VSAiT, så lenge de vilkår og tidsfrister for
                    deltagelse satt i forbindelse med arrangementet er oppfylt.
                  </li>
                </ul>
              </p>
              <p className="mb-2">
                <b>Støttemedlem:</b>
                <ul className="list-disc">
                  <li className="ml-7">
                    Støttemedlemmer har forslags- og tale- men ingen stemmerett.
                  </li>
                  <li className="ml-7">
                    Kan komme med ideer og forslag som angår organisasjonen.
                  </li>
                  <li className="ml-7">
                    Alle forslag skal vurderes og tas opp til diskusjon i
                    styret.
                  </li>
                  <li className="ml-7">
                    Kan delta på arrangement i regi av VSAiT, så lenge de vilkår
                    og tidsfrister for deltagelse satt i forbindelse med
                    arrangementet er oppfylt.
                  </li>
                </ul>
              </p>
              <p className="mb-2">
                <b>Styremedlem:</b>
                <ul className="list-disc">
                  <li className="ml-7">
                    Styret har fullmakt til å ta avgjørelser på vegne av
                    organisasjonen.
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Organization;
