import Image from 'next/image';
import { EventInfo } from '../types';

const ImageWithText: React.FC<EventInfo> = ({
  direction,
  imageSrc,
  imageAlt,
  title,
  description,
}) => {
  const isLeft = direction === 'left';

  return (
    <div
      className={`mx-10 my-2 flex flex-col space-y-4 py-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} justify-between px-6 md:mx-0 md:space-y-0 md:px-24 md:py-12`}
    >
      <div className='flex w-full flex-col justify-center text-left md:justify-start'>
        <h3 className='mb-3 text-2xl font-medium'>{title}</h3>
        <p className='w-full'>{description}</p>
      </div>
      <div className='flex w-full justify-center md:justify-start'>
        <div className='mb-4 w-full max-w-sm overflow-hidden rounded-2xl md:mb-0'>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1024}
            height={683}
            sizes='100vw'
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageWithText;
