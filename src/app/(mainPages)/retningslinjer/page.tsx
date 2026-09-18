import { CurvyHeader } from '@/components/Header';
import { MembershipCallout } from '@/components/Home';
import Image from 'next/image';

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p>{children}</p>
);

const Section = ({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section className='rounded-2xl bg-white p-6 text-left shadow-sm sm:p-8'>
    <h2 className='text-sm text-primary'>
      {label} — {title}
    </h2>
    <div className='mt-3 flex flex-col gap-3 text-sm leading-relaxed text-gray'>
      {children}
    </div>
  </section>
);

const SubSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className='border-t border-primary/10 pt-4'>
    <h3 className='text-xs uppercase tracking-[0.18em] text-primary/80'>
      {title}
    </h3>
    <div className='mt-3 flex flex-col gap-3'>{children}</div>
  </div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className=''>{children}</p>
);

const Bullets = ({ children }: { children: React.ReactNode }) => (
  <ul className='list-disc space-y-1.5 pl-5 marker:text-primary/50'>
    {children}
  </ul>
);

const Numbers = ({ children }: { children: React.ReactNode }) => (
  <ol className='list-decimal space-y-1.5 pl-5 marker:text-primary/50'>
    {children}
  </ol>
);

export default function Page(): JSX.Element {
  return (
    <>
      <CurvyHeader waveColor='#FDF8F0'>
        <div className='relative z-20 px-6 text-center'>
          <h1 className='text-4xl text-white sm:text-5xl'>Retningslinjer</h1>
          <p className='mt-3 text-sm text-white/80'>Revidert 17. mars 2026</p>
        </div>
      </CurvyHeader>

      <section className='w-full bg-cream pb-12'>
        <div className='mx-auto flex w-11/12 max-w-3xl flex-col gap-5 py-16'>
          <Section label='§ 1' title='Navn'>
            <Paragraph>
              Det offisielle navnet på denne organisasjonen er Vietnamese
              Student Association in Trondheim, herunder VSAiT.
            </Paragraph>
          </Section>

          <Section label='§ 2' title='Logo'>
            <Paragraph>Følgende logo er VSAiT sin offisielle logo:</Paragraph>
            <div className='w-full max-w-xs rounded-xl p-4'>
              <Image
                src='/logo.svg'
                alt='VSAiT sin offisielle logo'
                width={256}
                height={256}
                className='h-auto w-full'
              />
            </div>
          </Section>

          <Section label='§ 3' title='Formål'>
            <Paragraph>
              VSAiT er en frivillig og nonprofitt organisasjon med formål:
            </Paragraph>
            <Bullets>
              <li>Å arbeide for studenter først og fremst i Trondheim.</li>
              <li>
                Skape et bånd i det vietnamesiske studentmiljøet i Trondheim.
              </li>
              <li>
                Fremme og bevare vietnamesisk kultur i det norske samfunn
                gjennom kulturelle arrangementer og prosjekter.
              </li>
            </Bullets>
          </Section>

          <Section label='§ 4' title='Struktur'>
            <div>
              <Image
                src='/vsait-struktur.png'
                alt='Organisasjonskart som viser strukturen i VSAiT'
                width={512}
                height={256}
                className='h-auto w-full'
              />
            </div>

            <SubSection title='Del 1: Medlemskap'>
              <Bullets>
                <li>
                  Hovedmedlemskap i VSAiT er åpent for alle studenter i
                  Trondheim med interesse for eller tilknytning til Vietnam.
                </li>
                <li>
                  Støttemedlemskap i VSAiT er åpent for de som ikke er studenter
                  og som støtter organisasjonen retningslinjer.
                </li>
                <li>
                  Medlemskap innvilges ved å akseptere retningslinjene og betale
                  medlemsavgiften.
                </li>
                <li>
                  Medlemskapets varighet er ett skoleår og formidles av styret.
                </li>
              </Bullets>
            </SubSection>

            <SubSection title='Del 2: Type medlem og deres fordeler'>
              <Label>Hovedmedlem:</Label>
              <Bullets>
                <li>
                  Kan komme med ideer og forslag som angår organisasjonen.
                </li>
                <li>
                  Alle forslag skal vurderes og tas opp til diskusjon i styret.
                </li>
                <li>
                  Har forslags- og stemmerett i generalforsamlingen til VSAiT.
                </li>
                <li>
                  Har rett til å delta, og skal prioriteres ved arrangementer i
                  regi av VSAiT, så lenge de vilkår og tidsfrister for
                  deltagelse satt i forbindelse med arrangementet er oppfylt.
                </li>
              </Bullets>

              <Label>Støttemedlem:</Label>
              <Bullets>
                <li>
                  Støttemedlemmer har forslags- og tale- men ingen stemmerett.
                </li>
                <li>
                  Kan komme med ideer og forslag som angår organisasjonen.
                </li>
                <li>
                  Alle forslag skal vurderes og tas opp til diskusjon i styret.
                </li>
                <li>
                  Kan delta på arrangement i regi av VSAiT, så lenge de vilkår
                  og tidsfrister for deltagelse satt i forbindelse med
                  arrangementet er oppfylt.
                </li>
              </Bullets>

              <Label>Styremedlem:</Label>
              <Bullets>
                <li>
                  Styret har fullmakt til å ta avgjørelser på vegne av
                  organisasjonen.
                </li>
              </Bullets>
            </SubSection>

            <SubSection title='Del 3: Styremedlemmer og deres oppgaver'>
              <Paragraph>
                Styremedlemmer har ansvar for å sette seg inn i foreningens
                retningslinjer. Styremedlemmer har i fellesskap ansvar for at
                styret skal fungere på en helhetlig måte. Alle som sitter i
                hovedstyret, må ha studie som hovedbeskjeftigelse, og
                kvalifisere til hovedmedlemsskap under styringsperiode.
              </Paragraph>
              <Paragraph>
                Følgende er de forskjellige stillingene i VSAiT. Under
                stillingstitlene er det definert veiledende oppgaver for
                stillingen. Dersom oppsatte oppgaver ikke kan utføres, må
                vedkommende selv overføre dem. VSAiTs stillinger deles inn i
                hovedstyret og øvrige stillinger. Hovedstyret er møtepliktig ved
                ordinære styremøter og øvrige styremedlemmer kalles inn til
                møter ved behov.
              </Paragraph>

              <Label>Hovedstyret — Leder</Label>
              <Numbers>
                <li>Overordnet ansvar for organisasjonen.</li>
                <li>Håndheve foreningens retningslinjer</li>
                <li>Delegere arbeidsoppgaver.</li>
                <li>
                  Ved forespørsel skrive attester for de øvrige styremedlemmer
                  etter endt periode og sørge for innlevert vervrapport.
                </li>
                <li>
                  Lage handlingsplan for skoleåret i fellesskap med styret.
                </li>
                <li>Sørge for at godkjente vedtak iverksettes.</li>
                <li>Kalle inn til styremøte.</li>
                <li>
                  Etter endt periode, overføre papir, utstyr og foreningens
                  løsøre til det nye styret iht. utstyrsliste.
                </li>
                <li>Talsmann for organisasjonen.</li>
                <li>
                  Tolke uklarheter i retningslinjene i felleskap med styret, i
                  beste interesse for organisasjonen.
                </li>
              </Numbers>

              <Label>Nestleder</Label>
              <Numbers>
                <li>Bistå og avlaste leder med å styre VSAiT.</li>
                <li>Overta lederens oppgaver ved leders fravær.</li>
                <li>
                  I fellesskap med økonomiansvarlig, utarbeide søknad om
                  økonomisk støtte fra ulike støtteordninger.
                </li>
                <li>
                  Etter arrangement med støtte fra LNU frifond, sende inn
                  rapport med bilag fra økonomiansvarlig innen gjeldende frist.
                </li>
              </Numbers>

              <Label>Økonomiansvarlig</Label>
              <Numbers>
                <li>Ha oversikt over foreningens økonomi.</li>
                <li>
                  Utarbeide budsjett for arrangement sammen med styremedlemmer.
                </li>
                <li>
                  Sammen med styret, koordinere innkjøp av mat og varer til
                  arrangementer.
                </li>
                <li>
                  Gi et overordnet regnskap til VSAiT-medlemmer ved endt
                  periode.
                </li>
                <li>
                  Sammen med nestleder og andre involverte styremedlemmer, ha
                  oversikt over sponsorinntekter.
                </li>
                <li>Sammen med leder, ha ansvar for foreningens bankkonto.</li>
                <li>Registrere nye medlemmer og motta medlemsavgift.</li>
                <li>Oppbevare VSAiTs verdier og løsøre.</li>
              </Numbers>

              <Label>Sekretær</Label>
              <Numbers>
                <li>Føre referat under styremøter og årsmøter.</li>
                <li>
                  Gi en egen kort oppsummert oversikt over gjøremål og oppgaver
                  til øvrige styremedlemmer etter endte møter.
                </li>
                <li>Holde medarbeidersamtaler minst en gang i semesteret.</li>
              </Numbers>

              <Label>Øvrige styremedlemmer med følgende titler:</Label>
              <Bullets>
                <li>SoMe-ansvarlig</li>
                <li>IT-ansvarlig</li>
                <li>Matansvarlig</li>
                <li>Designansvarlig</li>
              </Bullets>
              <Paragraph>
                Ovennevnte stillinger kan, i samlag med hovedstyret, opprette
                flere stillinger ved behov.
              </Paragraph>
            </SubSection>

            <SubSection title='Del 4: Eksklusjon og sanksjoner'>
              <Paragraph>
                Har et medlem opptrådt slik at det ikke bør være medlem av VSAiT
                kan det ekskluderes ved ⅔ flertall vedtak av Styret. Medlemmer
                som har gjort seg skyldig i mindre forgåelse mot VSAiT regler,
                retningslinjer eller kollegiale bestemmelser kan, etter
                beslutning av styret, ilegges en mulkt.
              </Paragraph>
            </SubSection>
          </Section>

          <Section label='§ 5' title='Valg/avstemning'>
            <SubSection title='Del 1: Kvalifisering'>
              <Bullets>
                <li>
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
                <li>
                  Kandidatene skal holde en kort presentasjon om seg selv, og
                  hva de kan tilby VSAiT.
                </li>
                <li>
                  Styret har ansvar for å utlyse verv og stillingsbeskrivelse
                  før valg.
                </li>
                <li>
                  Stiller man til valg for verv i hovedstyret skal vedkommende
                  gi beskjed til styret/valgkomité på forhånd.
                </li>
              </Bullets>
            </SubSection>

            <SubSection title='Del 2: Avstemning'>
              <Bullets>
                <li>
                  Alle med hovedmedlemskap har stemmerett. Forhåndsavstemning
                  med fullmakt tillates. Valg skal foregå anonymt dersom dette
                  forslaget fremmes.
                </li>
                <li>Utfallet avgjøres ved simpel flertallsbestemmelse.</li>
                <li>
                  Først velges leder, deretter velges resten av hovedstyret og
                  øvrige styremedlemmer.
                </li>
              </Bullets>
            </SubSection>

            <SubSection title='Del 3: Styreperiode / vervperiode'>
              <Paragraph>
                Vervperiode er ett skoleår og valg av nytt styre skal finne sted
                i løpet av 1. Kvartal i året. Leder av VSAiT kan kun sitte
                sammenhengende i tre perioder.
              </Paragraph>
            </SubSection>
          </Section>

          <Section label='§ 6' title='Kontinuitet'>
            <Paragraph>
              Det avtroppende styret har ansvar for å holde et overtagelsesmøte
              snarest mulig etter valget, hvor foreningens papirer, økonomi og
              løsøre overføres til det nye styret. De enkelte styremedlemmene
              har ansvar for å sette sin arvtaker inn i sine oppgaver.
            </Paragraph>
          </Section>

          <Section label='§ 7' title='Fratredelse av styremedlem'>
            <SubSection title='Del 1: Oppsigelse'>
              <Paragraph>
                Under spesielle forhold kan et styremedlem gå av. Det
                fratredende styremedlemmet må begrunne årsaken til oppsigelse
                til resten av styret. Beskjed skal bli gitt snarest mulig, minst
                3 uker før fratredelse. Ved ekstraordinære omstendigheter kan
                det gjøres unntak dersom hovedstyret godkjenner dette.
              </Paragraph>
            </SubSection>

            <SubSection title='Del 2: Mistillitsforslag'>
              <Bullets>
                <li>
                  Generalforsamlingen har myndighet til å avsette et styremedlem
                  dersom vedkommende misbruker sin posisjon, handler i strid med
                  retningslinjene eller fører VSAiT i vanry. Styremedlemmet kan
                  da bli fratatt sitt verv med øyeblikkelig virkning.
                </li>
                <li>
                  Styret har myndighet til å suspendere et styremedlem inntil
                  generalforsamling blir avholdt.
                </li>
                <li>
                  Den/de som rammes av forslag om mistillit, har rett til å
                  uttale seg for generalforsamling før vedtaket fattes.
                </li>
              </Bullets>
            </SubSection>
          </Section>

          <Section label='§ 8' title='Generalforsamling'>
            <Paragraph>
              Generalforsamlingen er VSAiTs høyeste organ, og skal avholdes
              årlig, tidlig i vårsemesteret, hvor tidspunkt og sted bestemmes av
              styret. Ekstraordinær generalforsamling avholdes dersom enten:
            </Paragraph>
            <Numbers>
              <li>
                Minimum halvparten av VSAiT-medlemmer skriftlig krever det.
              </li>
              <li>2/3 av styret skriftlig krever det.</li>
            </Numbers>
            <Paragraph>
              Det må da avholdes senest 2 måneder etter at henstillingen er
              mottatt. Generalforsamlingen er åpen for alle VSAiT-medlemmer.
              Vedtak fattes med simpelt flertall blant de fremmøtte med
              stemmerett, unntatt endring av retningslinjer eller logo, som
              krever kvalifisert 2/3 flertall blant fremmøtte med stemmerett.
              Alle hovedmedlemmer kan stille til alle verv. Man kan stille sitt
              kandidatur in absentia.
            </Paragraph>
            <Paragraph>
              På generalforsamlingen behandles følgende saker:
            </Paragraph>
            <Numbers>
              <li>
                Styrets melding om VSAiT virksomhet i det foregående skoleår.
              </li>
              <li>Vedta handlingsplan for det følgende skoleår.</li>
              <li>Gjennomgå og ta VSAiT regnskap til orientering.</li>
              <li>Vedta fastsettelse av kontigent.</li>
              <li>Vedta forslag til budsjett for kommende skoleår.</li>
              <li>Eventuelle vedtekts- og retningslinjeendringer.</li>
              <li>Valg av styrets medlemmer.</li>
              <li>Utnevnelse av komiteer.</li>
              <li>Saker som er satt opp på dagsorden.</li>
            </Numbers>
          </Section>

          <Section label='§ 9' title='Møter/arrangementer'>
            <SubSection title='Del 1: Styremøter'>
              <Bullets>
                <li>
                  Det er styrets oppgave å arrangere møter og bestemme antall
                  møter. Leder er ordstyrer ved de forskjellige møter dersom
                  ingen andre er satt til dette. Styremøte bør avholdes minst en
                  gang i måneden.
                </li>
                <li>
                  Styremedlemmene møtes for å diskutere saker og setter opp
                  agenda for eventuelle åpne styremøter.
                </li>
                <li>
                  Alle avgjørelser tas ved simpel flertallsbestemmelse. Ved
                  uavgjort har leder 2 stemmer.
                </li>
                <li>
                  Alle medlemmer kan delta på åpne styremøter. De har da
                  forslags og tale-, men ikke stemmerett.
                </li>
                <li>
                  Eventuelle observatører, dvs. inviterte
                  samarbeidspartnere/gjester har tale- og forslagsrett, men ikke
                  stemmerett på interne styremøter.
                </li>
                <li>
                  Styret plikter til å informere medlemmene om åpne styremøtene.
                </li>
              </Bullets>
            </SubSection>

            <SubSection title='Del 2: Arrangementer'>
              <Paragraph>
                VSAiT har tradisjonelt følgende arrangementer:
              </Paragraph>
              <Bullets>
                <li>Immatrikuleringsarrangement</li>
                <li>Månefestival (Tết Trung thu)</li>
                <li>Juleavslutning</li>
                <li>Vietnamesisk nyttårsfeiring (Tết)</li>
                <li>Generalforsamling</li>
              </Bullets>
            </SubSection>
          </Section>
        </div>

        <MembershipCallout />
      </section>
    </>
  );
}
