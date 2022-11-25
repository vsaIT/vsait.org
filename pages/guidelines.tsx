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
        <title>VSAiT | Retningslinjer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="flex w-full flex-1 flex-col items-center text-center">
        <CurvyHeader title="Retningslinjer" />

        <div className="flex flex-col z-10 max-w-screen-xl mb-12">
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
            </p>
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
            <div className="flex flex-col justify-center w-full p-4 text-left bg-white rounded-2xl">
              <h3 className="text-xl font-bold mb-3">DEL 1: MEDLEMSKAP</h3>
              <p className="mb-2"></p>
              <ul className="list-disc">
                <li className="ml-7">
                  Hovedmedlemskap i VSAiT er åpent for alle studenter i
                  Trondheim med interesse for eller tilknytning til Vietnam.
                </li>
                <li className="ml-7">
                  Støttemedlemskap i VSAiT er åpent for de som ikke er studenter
                  og som støtter organisasjonen retningslinjer.
                </li>
                <li className="ml-7">
                  Medlemskap innvilges ved å akseptere retningslinjene og betale
                  medlemsavgiften.
                </li>
                <li className="ml-7">
                  Medlemskapets varighet er ett skoleår og formidles av styret.
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center w-full p-4 text-left bg-white rounded-2xl">
              <h3 className="text-xl font-bold mb-3">
                DEL 2: TYPE MEDLEM OG DERES FORDELER
              </h3>
              <p className="mb-2">
                <b>Hovedmedlem:</b>
              </p>
              <ul className="list-disc">
                <li className="ml-7">
                  Kan komme med ideer og forslag som angår organisasjonen.
                </li>
                <li className="ml-7">
                  Alle forslag skal vurderes og tas opp til diskusjon i styret.
                </li>
                <li className="ml-7">
                  Har forslags- og stemmerett i generalforsamlingen til VSAiT.
                </li>
                <li className="ml-7">
                  Har rett til å delta, og skal prioriteres ved arrangementer i
                  regi av VSAiT, så lenge de vilkår og tidsfrister for
                  deltagelse satt i forbindelse med arrangementet er oppfylt.
                </li>
              </ul>
              <p className="mb-2">
                <b>Støttemedlem:</b>
              </p>
              <ul className="list-disc">
                <li className="ml-7">
                  Støttemedlemmer har forslags- og tale- men ingen stemmerett.
                </li>
                <li className="ml-7">
                  Kan komme med ideer og forslag som angår organisasjonen.
                </li>
                <li className="ml-7">
                  Alle forslag skal vurderes og tas opp til diskusjon i styret.
                </li>
                <li className="ml-7">
                  Kan delta på arrangement i regi av VSAiT, så lenge de vilkår
                  og tidsfrister for deltagelse satt i forbindelse med
                  arrangementet er oppfylt.
                </li>
              </ul>
              <p className="mb-2">
                <b>Styremedlem:</b>
              </p>
              <ul className="list-disc">
                <li className="ml-7">
                  Styret har fullmakt til å ta avgjørelser på vegne av
                  organisasjonen.
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center w-full p-4 text-left bg-white rounded-2xl">
              <h3 className="text-xl font-bold mb-3">
                DEL 3: STYREMEDLEMMER OG DERES OPPGAVER
              </h3>
              <p className="mb-2">
                Styremedlemmer har ansvar for å sette seg inn i foreningens
                retningslinjer. Styremedlemmer har i fellesskap ansvar for at
                styret skal fungere på en helhetlig måte. Alle som sitter i
                hovedstyret, må ha studie som hovedbeskjeftigelse, og
                kvalifisere til hovedmedlemsskap under styringsperiode.
              </p>
              <p className="mb-2">
                Følgende er de forskjellige stillingene i VSAiT. Under
                stillingstitlene er det definert veiledende oppgaver for
                stillingen. Dersom oppsatte oppgaver ikke kan utføres, må
                vedkommende selv overføre dem. VSAiTs stillinger deles inn i
                hovedstyret og øvrige stillinger. Hovedstyret er møtepliktig ved
                ordinære styremøter og øvrige styremedlemmer kalles inn til
                møter ved behov.
              </p>
              <div>
                <h4 className="font-bold">Hovedstyret</h4>
                <p className="font-medium">Leder</p>
                <ol className="list-decimal mb-2">
                  <li className="ml-7">
                    Overordnet ansvar for organisasjonen.
                  </li>
                  <li className="ml-7">Håndheve foreningens retningslinjer</li>
                  <li className="ml-7">Delegere arbeidsoppgaver.</li>
                  <li className="ml-7">
                    Ved forespørsel skrive attester for de øvrige styremedlemmer
                    etter endt periode og sørge for innlevert vervrapport.
                  </li>
                  <li className="ml-7">
                    Lage handlingsplan for skoleåret i fellesskap med styret.
                  </li>
                  <li className="ml-7">
                    Sørge for at godkjente vedtak iverksettes.
                  </li>
                  <li className="ml-7">Kalle inn til styremøte.</li>
                  <li className="ml-7">
                    Etter endt periode, overføre papir, utstyr og foreningens
                    løsøre til det nye styret iht. utstyrsliste.
                  </li>
                  <li className="ml-7">Talsmann for organisasjonen.</li>
                  <li className="ml-7">
                    Tolke uklarheter i retningslinjene i felleskap med styret, i
                    beste interesse for organisasjonen.
                  </li>
                </ol>
                <p className="font-medium">Nestleder</p>
                <ol className="list-decimal mb-2">
                  <li className="ml-7">
                    Bistå og avlaste leder med å styre VSAiT.
                  </li>
                  <li className="ml-7">
                    Overta lederens oppgaver ved leders fravær.
                  </li>
                  <li className="ml-7">
                    I fellesskap med økonomiansvarlig, utarbeide søknad om
                    økonomisk støtte fra ulike støtteordninger.
                  </li>
                  <li className="ml-7">
                    Etter arrangement med støtte fra LNU frifond, sende inn
                    rapport med bilag fra økonomiansvarlig innen gjeldende
                    frist.
                  </li>
                </ol>
                <p className="font-medium">Økonomiansvarlig</p>
                <ol className="list-decimal mb-2">
                  <li className="ml-7">
                    Ha oversikt over foreningens økonomi.
                  </li>
                  <li className="ml-7">
                    Utarbeide budsjett for arrangement sammen med
                    styremedlemmer.
                  </li>
                  <li className="ml-7">
                    Sammen med styret, koordinere innkjøp av mat og varer til
                    arrangementer.
                  </li>
                  <li className="ml-7">
                    Gi et overordnet regnskap til VSAiT-medlemmer ved endt
                    periode.
                  </li>
                  <li className="ml-7">
                    Sammen med nestleder og andre involverte styremedlemmer, ha
                    oversikt over sponsorinntekter.
                  </li>
                  <li className="ml-7">
                    Sammen med leder, ha ansvar for foreningens bankkonto.
                  </li>
                  <li className="ml-7">
                    Registrere nye medlemmer og motta medlemsavgift.
                  </li>
                  <li className="ml-7">Oppbevare VSAiTs verdier og løsøre.</li>
                </ol>
                <p className="font-medium">Sekretær</p>
                <ol className="list-decimal mb-2">
                  <li className="ml-7">
                    Føre referat under styremøter og årsmøter.
                  </li>
                  <li className="ml-7">
                    Gi en egen kort oppsummert oversikt over gjøremål og
                    oppgaver til øvrige styremedlemmer etter endte møter.
                  </li>
                  <li className="ml-7">
                    Holde medarbeidersamtaler minst en gang i semesteret.
                  </li>
                </ol>
                <p className="font-medium">
                  Øvrige styremedlemmer med følgende titler:
                </p>
                <ul className="list-disc mb-2">
                  <li className="ml-7">PR- og informasjonsansvarlig</li>
                  <li className="ml-7">IT-ansvarlig</li>
                  <li className="ml-7">Planleggingsansvarlig</li>
                  <li className="ml-7">Matansvarlig</li>
                  <li className="ml-7">Sportsansvarlig</li>
                </ul>
                <p className="mb-2">
                  Ovennevnte stillinger kan, i samlag med hovedstyret, opprette
                  flere stillinger ved behov.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center w-full p-4 text-left bg-white rounded-2xl">
              <h3 className="text-xl font-bold mb-3">
                DEL 4: EKSKLUSJON OG SANKSJONER
              </h3>
              <p className="mb-2">
                Har et medlem opptrådt slik at det ikke bør være medlem av VSAiT
                kan det ekskluderes ved ⅔ flertall vedtak av Styret. Medlemmer
                som har gjort seg skyldig i mindre forgåelse mot VSAiT regler,
                retningslinjer eller kollegiale bestemmelser kan, etter
                beslutning av styret, ilegges en mulkt.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center w-full p-8 mb-4 text-left bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">§ 5: VALG/AVSTEMNING</h2>
            <div className="flex flex-col justify-center w-full p-4 text-left bg-white rounded-2xl">
              <h3 className="text-xl font-bold mb-3">DEL 1: KVALIFISERING</h3>
              <ul className="list-disc mb-2">
                <li className="ml-7">
                  Alle kandidater som stiller til valg som styremedlem må være
                  student i Trondheim og hovedmedlem av VSAiT. Dersom det ikke
                  kan opprettes et nytt hovedstyre så åpnes det for et
                  hovedstyre med støttemedlemmer der flertallet må være
                  studenter. Da utvides ovennevnte kriterie til: Alle kandidater
                  må være student i Trondheim eller ha vært vært student i
                  Trondheim i løpet av de siste tre årene, i tillegg til å være
                  hovedmedlem eller støttemedlem av VSAiT. Ytterligere må
                  styreleder være hovedmedlem.
                </li>
                <li className="ml-7">
                  Kandidatene skal holde en kort presentasjon om seg selv, og
                  hva de kan tilby VSAiT.
                </li>
                <li className="ml-7">
                  Styret har ansvar for å utlyse verv og stillingsbeskrivelse
                  før valg.
                </li>
                <li className="ml-7">
                  Stiller man til valg for verv i hovedstyret skal vedkommende
                  gi beskjed til styret/valgkomité på forhånd.
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center w-full p-4 text-left bg-white rounded-2xl">
              <h3 className="text-xl font-bold mb-3">DEL 2: AVSTEMNING</h3>
              <ul className="list-disc mb-2">
                <li className="ml-7">
                  Alle med hovedmedlemskap har stemmerett. Forhåndsavstemning
                  med fullmakt tillates. Valg skal foregå anonymt dersom dette
                  forslaget fremmes.
                </li>
                <li className="ml-7">
                  Utfallet avgjøres ved simpel flertallsbestemmelse.
                </li>
                <li className="ml-7">
                  Først velges leder, deretter velges resten av hovedstyret og
                  øvrige styremedlemmer.
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center w-full p-4 text-left bg-white rounded-2xl">
              <h3 className="text-xl font-bold mb-3">
                DEL 3: STYREPERIODE / VERVPERIODE
              </h3>
              <p className="mb-2">
                Vervperiode er ett skoleår og valg av nytt styre skal finne sted
                i løpet av 1. Kvartal i året. Leder av VSAiT kan kun sitte
                sammenhengende i tre perioder.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center w-full p-8 mb-4 text-left bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">§ 6: KONTINUITET</h2>
            <p className="mb-2">
              Det avtroppende styret har ansvar for å holde et overtagelsesmøte
              snarest mulig etter valget, hvor foreningens papirer, økonomi og
              løsøre overføres til det nye styret. De enkelte styremedlemmene
              har ansvar for å sette sin arvtaker inn i sine oppgaver.
            </p>
          </div>

          <div className="flex flex-col justify-center w-full p-8 mb-4 text-left bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              § 7: FRATREDELSE AV STYREMEDLEM
            </h2>
            <div className="flex flex-col justify-center w-full p-4 text-left bg-white rounded-2xl">
              <h3 className="text-xl font-bold mb-3">DEL 1: OPPSIGELSE</h3>
              <p className="mb-2">
                Under spesielle forhold kan et styremedlem gå av. Det
                fratredende styremedlemmet må begrunne årsaken til oppsigelse
                til resten av styret. Beskjed skal bli gitt snarest mulig, minst
                3 uker før fratredelse. Ved ekstraordinære omstendigheter kan
                det gjøres unntak dersom hovedstyret godkjenner dette.
              </p>
            </div>
            <div className="flex flex-col justify-center w-full p-4 text-left bg-white rounded-2xl">
              <h3 className="text-xl font-bold mb-3">
                DEL 2: MISTILLITSFORSLAG
              </h3>
              <ul className="list-disc mb-2">
                <li className="ml-7">
                  Generalforsamlingen har myndighet til å avsette et styremedlem
                  dersom vedkommende misbruker sin posisjon, handler i strid med
                  retningslinjene eller fører VSAiT i vanry. Styremedlemmet kan
                  da bli fratatt sitt verv med øyeblikkelig virkning.
                </li>
                <li className="ml-7">
                  Styret har myndighet til å suspendere et styremedlem inntil
                  generalforsamling blir avholdt.
                </li>
                <li className="ml-7">
                  Den/de som rammes av forslag om mistillit, har rett til å
                  uttale seg for generalforsamling før vedtaket fattes.
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-center w-full p-8 mb-4 text-left bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">§ 8 GENERALFORSAMLING</h2>
            <p className="mb-2">
              Generalforsamlingen er VSAiTs høyeste organ, og skal avholdes
              årlig, tidlig i vårsemesteret, hvor tidspunkt og sted bestemmes av
              styret. Ekstraordinær generalforsamling avholdes dersom enten:
            </p>
            <ol className="list-decimal mb-2">
              <li className="ml-7">
                Minimum halvparten av VSAiT-medlemmer skriftlig krever det.
              </li>
              <li className="ml-7">2/3 av styret skriftlig krever det.</li>
            </ol>
            <p className="mb-2">
              Det må da avholdes senest 2 måneder etter at henstillingen er
              mottatt. Generalforsamlingen er åpen for alle VSAiT-medlemmer.
              Vedtak fattes med simpelt flertall blant de fremmøtte med
              stemmerett, unntatt endring av retningslinjer eller logo, som
              krever kvalifisert 2/3 flertall blant fremmøtte med stemmerett.
              Alle hovedmedlemmer kan stille til alle verv. Man kan stille sitt
              kandidatur in absentia.
            </p>
            <p>På generalforsamlingen behandles følgende saker:</p>
            <ol className="list-decimal mb-2">
              <li className="ml-7">
                1. Styrets melding om VSAiT virksomhet i det foregående skoleår.
              </li>
              <li className="ml-7">
                2. Vedta handlingsplan for det følgende skoleår.
              </li>
              <li className="ml-7">
                3. Gjennomgå og ta VSAiT regnskap til orientering.
              </li>
              <li className="ml-7">4. Vedta fastsettelse av kontigent.</li>
              <li className="ml-7">
                5. Vedta forslag til budsjett for kommende skoleår.
              </li>
              <li className="ml-7">
                6. Eventuelle vedtekts- og retningslinjeendringer.
              </li>
              <li className="ml-7">7. Valg av styrets medlemmer.</li>
              <li className="ml-7">8. Utnevnelse av komiteer.</li>
              <li className="ml-7">9. Saker som er satt opp på dagsorden.</li>
            </ol>
          </div>

          <div className="flex flex-col justify-center w-full p-8 mb-4 text-left bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              § 9: MØTER / ARRANGEMENTER
            </h2>
            <div className="flex flex-col justify-center w-full p-4 text-left bg-white rounded-2xl">
              <h3 className="text-xl font-bold mb-3">DEL 1: STYREMØTER</h3>
              <ul className="list-disc mb-2">
                <li className="ml-7">
                  Det er styrets oppgave å arrangere møter og bestemme antall
                  møter. Leder er ordstyrer ved de forskjellige møter dersom
                  ingen andre er satt til dette. Styremøte bør avholdes minst en
                  gang i måneden.
                </li>
                <li className="ml-7">
                  Styremedlemmene møtes for å diskutere saker og setter opp
                  agenda for eventuelle åpne styremøter.
                </li>
                <li className="ml-7">
                  Alle avgjørelser tas ved simpel flertallsbestemmelse. Ved
                  uavgjort har leder 2 stemmer.
                </li>
                <li className="ml-7">
                  Alle medlemmer kan delta på åpne styremøter. De har da
                  forslags og tale-, men ikke stemmerett.
                </li>
                <li className="ml-7">
                  Eventuelle observatører, dvs. inviterte
                  samarbeidspartnere/gjester har tale- og forslagsrett, men ikke
                  stemmerett på interne styremøter.
                </li>
                <li className="ml-7">
                  Styret plikter til å informere medlemmene om åpne styremøtene.
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center w-full p-4 text-left bg-white rounded-2xl">
              <h3 className="text-xl font-bold mb-3">DEL 2: ARRANGEMENTER</h3>
              <p>VSAiT har tradisjonelt følgende arrangementer:</p>
              <ul className="list-disc mb-2">
                <li className="ml-7">Immatrikuleringsarrangement</li>
                <li className="ml-7">Månefestival (Tết Trung thu)</li>
                <li className="ml-7">Juleavslutning</li>
                <li className="ml-7">Vietnamesisk nyttårsfeiring (Tết)</li>
                <li className="ml-7">Generalforsamling</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Organization;
