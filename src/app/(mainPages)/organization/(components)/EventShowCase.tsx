import Image from 'next/image';
import { EventInfo } from '../types';

const EventShowCase: React.FC<EventInfo> = ({
  direction,
  imageSrc,
  imageAlt,
  title,
  description,
}) => {
  const imageFirst = direction === 'right';

  return (
    <div className='grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-14'>
      <div className={`text-left ${imageFirst ? 'lg:order-2' : ''}`}>
        <h3 className='text-xl  sm:text-2xl'>{title}</h3>
        <p className='mt-3 text-sm leading-relaxed text-gray'>{description}</p>
      </div>

      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md ${
          imageFirst ? 'lg:order-1' : ''
        }`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes='(max-width: 1024px) 90vw, 45vw'
          className='object-cover'
        />
      </div>
    </div>
  );
};

export default EventShowCase;
