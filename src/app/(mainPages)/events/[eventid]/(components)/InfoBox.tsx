export default function InfoBox() {
  return (
    <div className='flex w-full flex-col rounded-2xl bg-white p-6 shadow-2xl'>
      <h2 className='mb-4 text-2xl font-bold'>Info</h2>
      <div className='flex flex-col gap-4'>
        <p>
          Til venstre kan man se antallet påmeldte. Hensikten bak dette er
          hovedsakelig for å estimere hvor mye mat som skal kjøpes inn. Det står
          også en maksgrense, som gjelder hovedsakelig for mindre arrangementer
          der vi ikke kan være alt for mange mennesker samlet (f. eks buldring,
          mini-golf og bowling). Fortvil ikke dersom maksgrensen på et
          arrangement nås, da du vil få muligheten til å melde deg på ventelista
          for arrangementet - gitt at du er nummer 1 i køen, vil du få plassen
          dersom noen melder seg av.
        </p>
        <p>
          I boksen øverst til venstre, står det en oversikt over start- og
          sluttid for arrangementet. Merk at det også står påmeldings- og
          avmeldingsfrist som er viktige å forholde seg til. Avmelding er
          spesielt viktig, dersom det er en venteliste på arrangementet, slik at
          nestemann får plass.
        </p>
        <p>
          PS! Husk å skriv ned mulige matvarer som kan forårsake allergiske
          reaksjoner på profilen din, slik at vi kan tilpasse mattilbudet på
          våre arrangementer etter deres matbehov ♥.
        </p>
      </div>
    </div>
  );
}
