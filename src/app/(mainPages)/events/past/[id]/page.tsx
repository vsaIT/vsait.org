'use client';
import { EventsDetailedSkeleton } from '@/components/Events';
import { SmallHeader } from '@/components/Header';
import { useEventArchiveItem } from '@/lib/hooks/useEvent';
import { imageToBase64 } from '@/lib/imageBlobUtil';
import DOMPurify from 'isomorphic-dompurify';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Read-only detail page for an archived (past) event.
function PastEventDetail({ params }: { params: { id: string } }): JSX.Element {
  const { id } = params;
  const { data, isLoading, isError, mutate } = useEventArchiveItem(id);
  const { data: session } = useSession({ required: false });
  const isAdmin = session?.user?.role === 'ADMIN';
  const [uploading, setUploading] = useState(false);

  if (isError) window.location.href = '/500';

  // Admins can upload an image for past events that are missing one.
  const handleUpload = async (file: File) => {
    try {
      setUploading(true);
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
      setUploading(false);
    }
  };

  const event = data?.event;

  return (
    <>
      <SmallHeader />
      {isLoading || !event ? (
        <EventsDetailedSkeleton />
      ) : (
        <div className='z-10 mb-32 flex w-11/12 max-w-screen-xl -translate-y-10 transform flex-col gap-6'>
          <div className='mt-16 text-left'>
            <Link
              href='/events'
              className='font-medium text-primary hover:underline'
            >
              ← Tilbake til arrangementer
            </Link>
          </div>

          <div className='relative flex w-full rounded-2xl bg-white p-6 shadow-2xl'>
            <div className='relative w-full overflow-hidden'>
              <Image
                src={event.image || '/placeholder.png'}
                alt={event.title}
                width={1352}
                height={564}
                sizes='100vw'
                priority
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
              {isAdmin && (
                <label
                  className='absolute inset-0 flex cursor-pointer items-center justify-center bg-black/0 opacity-0 transition-all duration-200 hover:bg-black/40 hover:opacity-100'
                  title='Last opp bilde'
                >
                  <span className='rounded-md bg-white px-3 py-1 text-sm font-medium shadow'>
                    {uploading
                      ? 'Laster opp...'
                      : event.image
                        ? 'Bytt bilde'
                        : 'Last opp bilde'}
                  </span>
                  <input
                    type='file'
                    accept='image/*'
                    className='hidden'
                    disabled={uploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(file);
                      e.target.value = '';
                    }}
                  />
                </label>
              )}
            </div>
          </div>

          <div className='flex flex-col gap-6 text-left md:grid md:grid-cols-eventdetail'>
            <div className='flex w-full flex-col rounded-2xl bg-white p-6 shadow-2xl'>
              <h2 className='mb-4 text-2xl font-bold'>Detaljer</h2>
              <div className='flex flex-col gap-2'>
                <p>
                  <b>Starttid:</b> {new Date(event.startTime).toDateString()}
                </p>
                <p>
                  <b>Sluttid:</b> {new Date(event.endTime).toDateString()}
                </p>
                <p>
                  <b>Sted:</b> {event.location}
                </p>
                <p>
                  <b>Åpent for:</b>{' '}
                  {event.eventType === 'OPEN' ? 'Alle' : 'Medlemmer'}
                </p>
                <p>
                  <b>Antall påmeldte:</b> {event.registrations}
                  {event.maxRegistrations > 0
                    ? ` / ${event.maxRegistrations}`
                    : ''}
                </p>
              </div>
            </div>
            <div className='flex w-full flex-col rounded-2xl bg-white p-6 shadow-2xl'>
              <h2 className='mb-2 text-2xl font-bold'>{event.title}</h2>
              <p className='text-gray-500 mb-4 font-medium'>
                Dette arrangementet er avsluttet.
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(event.description),
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PastEventDetail;
