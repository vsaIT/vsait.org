import { CalendarOutline, MapPin } from '@/components/icons';
import { getLocaleDateString } from '@/lib/utils';
import { bigSmile } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

export const AvatarStack = ({
  count,
  seed,
  max = 3,
}: {
  count: number;
  seed: string;
  max?: number;
}) => {
  const avatars = useMemo(
    () =>
      Array.from({ length: Math.min(count, max) }, (_, index) =>
        createAvatar(bigSmile, {
          seed: `${seed}-${index}`,
          flip: true,
        }).toDataUriSync()
      ),
    [count, seed, max]
  );

  if (!avatars.length) return null;

  return (
    <div className='flex -space-x-2'>
      {avatars.map((avatar, index) => (
        <Image
          key={index}
          src={avatar}
          alt=''
          aria-hidden
          width={24}
          height={24}
          className='h-6 w-6 rounded-full bg-secondary ring-2 ring-white'
        />
      ))}
    </div>
  );
};

type EventCardProps = {
  href: string;
  title: string;
  image?: string | null;
  startTime: Date | string;
  location: string;
  registrations: number;
  seed: string;
  isPast?: boolean;
  isCancelled?: boolean;
  compact?: boolean;
};

const EventCard = ({
  href,
  title,
  image,
  startTime,
  location,
  registrations,
  seed,
  isPast = false,
  isCancelled = false,
  compact = false,
}: EventCardProps) => {
  return (
    <Link
      href={href}
      className={`group flex flex-col overflow-hidden rounded-2xl bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 ${
        compact ? '' : 'sm:flex-row'
      }`}
    >
      <div
        className={`relative aspect-[1352/564] w-full shrink-0 overflow-hidden ${
          compact ? '' : 'sm:aspect-auto sm:w-3/5 sm:self-stretch'
        }`}
      >
        <Image
          src={image || '/placeholder.png'}
          alt={title}
          fill
          sizes={
            compact
              ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              : '(max-width: 640px) 100vw, (max-width: 1214px) 56vw, 668px'
          }
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
            isCancelled ? 'grayscale group-hover:grayscale-0' : ''
          }`}
        />
      </div>

      <div className={`flex flex-1 flex-col p-5 ${compact ? '' : 'sm:p-6'}`}>
        <span
          className={`w-fit rounded-full px-3 py-1 text-xs ${
            isCancelled
              ? 'bg-dark/10 text-dark'
              : isPast
                ? 'bg-gray/10 text-gray'
                : 'bg-primary/10 text-primary'
          }`}
        >
          {isCancelled ? 'Avlyst' : isPast ? 'Avsluttet' : 'Kommende'}
        </span>

        <h3 className='mt-3 text-lg '>{title}</h3>

        <div className='mt-3 flex flex-col gap-2 text-sm text-gray'>
          <span className='flex items-center gap-2'>
            <CalendarOutline color='#D5564D' className='h-4 w-4 shrink-0' />
            {getLocaleDateString(new Date(startTime))}
          </span>
          <span className='flex items-center gap-2'>
            <MapPin color='#D5564D' className='h-4 w-4 shrink-0' />
            {location}
          </span>
        </div>

        <div className='mt-auto flex flex-wrap items-center gap-3 pt-6'>
          <div className='flex items-center gap-2'>
            <AvatarStack count={registrations} seed={seed} />
            <span className='whitespace-nowrap text-sm text-gray'>
              {registrations} påmeldte
            </span>
          </div>
          <span className='w-full shrink-0 rounded-full border border-primary px-4 py-2 text-center text-sm text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white sm:ml-auto sm:w-auto'>
            {isPast || isCancelled ? 'Se detaljer' : 'Meld deg på'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export const EventCardSkeleton = ({ compact = false }) => (
  <div
    className={`flex animate-pulse flex-col overflow-hidden rounded-2xl bg-white shadow-sm ${
      compact ? '' : 'sm:flex-row'
    }`}
  >
    <div
      className={`aspect-[1352/564] w-full shrink-0 bg-secondary/30 ${
        compact ? '' : 'sm:aspect-auto sm:w-3/5 sm:self-stretch'
      }`}
    />
    <div className={`flex flex-1 flex-col gap-3 p-5 ${compact ? '' : 'sm:p-6'}`}>
      <div className='h-5 w-24 rounded-full bg-secondary/30' />
      <div className='h-5 w-3/4 rounded-md bg-secondary/30' />
      <div className='h-4 w-1/2 rounded-md bg-secondary/30' />
      <div className='h-4 w-2/3 rounded-md bg-secondary/30' />
      <div className='mt-3 h-9 w-full rounded-full bg-secondary/30' />
    </div>
  </div>
);

export default EventCard;
