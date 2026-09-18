export default function InfoBox() {
  return (
    <div className='rounded-3xl bg-white p-6'>
      <h2 className='text-lg'>Godt å vite</h2>
      <div className='mt-4 flex flex-col gap-4 text-xs leading-relaxed'>
        <p>
          Antallet påmeldte brukes hovedsakelig for å estimere hvor mye mat som
          skal kjøpes inn. Maksgrensen gjelder hovedsakelig for mindre
          arrangementer der vi ikke kan være alt for mange mennesker samlet (f.
          eks buldring, mini-golf og bowling). Fortvil ikke dersom maksgrensen
          på et arrangement nås, da du vil få muligheten til å melde deg på
          ventelista for arrangementet - gitt at du er nummer 1 i køen, vil du
          få plassen dersom noen melder seg av.
        </p>
        <p>
          Merk påmeldings- og avmeldingsfristen i detaljene, som er viktige å
          forholde seg til. Avmelding er spesielt viktig dersom det er en
          venteliste på arrangementet, slik at nestemann får plass.
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
