'use client';
import { Calendar, Place } from '@/components/icons';
import { useEventArchive } from '@/lib/hooks/useEvent';
import { imageToBase64 } from '@/lib/imageBlobUtil';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

// Gallery of events that have already happened. Display only for visitors
const PastEvents = () => {
  const { data, isLoading, mutate } = useEventArchive();
  const { data: session } = useSession({ required: false });
  const isAdmin = session?.user?.role === 'ADMIN';
  const [uploadingId, setUploadingId] = useState<number | null>(null);

  const handleUpload = async (id: number, file: File) => {
    try {
      setUploadingId(id);
      const image = await imageToBase64(file);
      const res = await fetch(`/api/events/archive/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      });
      if (!res.ok) throw new Error('Opplasting feilet');
      await mutate();
    } catch (error) {
      console.error(error);
      alert('Kunne ikke laste opp bildet. Prøv igjen.');
    } finally {
      setUploadingId(null);
    }
  };

  if (isLoading) {
    return <p className='my-10 text-center'>Laster inn...</p>;
  }

  if (!data?.events || data.events.length === 0) {
    return (
      <p className='my-10 text-center text-gray-600'>
        Ingen tidligere arrangementer å vise enda.
      </p>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {data.events.map((event) => (
        <div
          key={event.id}
          className='group flex flex-col overflow-hidden rounded-2xl border-2 border-primary bg-white shadow-lg'
        >
          <div className='relative h-44 w-full overflow-hidden'>
            <div className='h-full w-full opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0'>
              <Image
                src={event.image || '/placeholder.png'}
                alt={event.title}
                width={1352}
                height={564}
                sizes='100vw'
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {isAdmin && (
              <label
                className='absolute inset-0 flex cursor-pointer items-center justify-center bg-black/0 opacity-0 transition-all duration-200 hover:bg-black/40 hover:opacity-100'
                title='Last opp bilde'
              >
                <span className='rounded-md bg-white px-3 py-1 text-sm font-medium text-black shadow'>
                  {uploadingId === event.id
                    ? 'Laster opp...'
                    : event.image
                      ? 'Bytt bilde'
                      : 'Last opp bilde'}
                </span>
                <input
                  type='file'
                  accept='image/*'
                  className='hidden'
                  disabled={uploadingId === event.id}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(event.id, file);
                    e.target.value = '';
                  }}
                />
              </label>
            )}
          </div>

          <div className='flex flex-col gap-2 p-4 text-left'>
            <h3 className='text-lg font-bold'>{event.title}</h3>
            <div className='grid grid-cols-event gap-3'>
              <Calendar className='justify-self-center' />
              <p className='flex flex-col justify-center text-sm'>
                {new Date(event.startTime).toDateString()}
              </p>
            </div>
            {event.location && (
              <div className='grid grid-cols-event gap-3'>
                <Place className='justify-self-center' />
                <p className='flex flex-col justify-center text-sm'>
                  {event.location}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PastEvents;
