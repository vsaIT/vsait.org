import { AboutUs } from '../types';

export default function AboutSection({
  title,
  heading,
  content,
}: AboutUs) {
  return (
    <article className='h-full rounded-2xl border-l-4 border-primary bg-white p-6 text-left shadow-sm sm:p-8'>
      <p className='text-xs uppercase tracking-[0.18em] text-primary'>
        {title}
      </p>

      <h3 className='mt-2 text-xl leading-snug  sm:text-2xl'>
        {heading}
      </h3>

      <p className='mt-3 text-sm leading-relaxed text-gray'>{content}</p>
    </article>
  );
}
