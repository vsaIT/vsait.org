import Image from 'next/image';

interface ImagePreviewProps {
  src?: string;
  alt?: string;
  className?: string;
}

export default function ImagePreview({
  src,
  alt = 'Bilde',
  className = '',
}: ImagePreviewProps) {
  if (!src) {
    return (
      <div
        className={`flex h-40 w-full items-center justify-center rounded-lg border-2 border-stone-300 ${className}`}
      >
        Ingen bilde
      </div>
    );
  }
  return (
    <div
      className={`relative h-40 w-full overflow-hidden rounded-lg ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'contain' }}
        className='bg-white'
      />
    </div>
  );
}
