'use client';
import { useEvent } from '@/lib/hooks/useEvent';
import { AdminEventsProps } from './eventsTypes';
import { FormInput } from '@/components/Form';

function AdminEventsView({ params }: AdminEventsProps): JSX.Element {
  const { eventid } = params;
  const { event, isLoading } = useEvent('11');
  console.log(isLoading);
  console.log(event);

  function handleChange<T>(attr: string, value: T) {
    // if (editUser) {
    //   setEditEvent({
    //     ...editUser,
    //     [attr]: value,
    //   });
    // }
    console.log(attr, value);
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='flex h-screen w-full flex-col gap-6 p-6'>
      <div className='flex w-full rounded-xl bg-white p-6'>
        <h1 className='text-center text-xl font-medium'>
          Arrangement: {event?.event.title}
        </h1>
      </div>
      <div className='w-full rounded-xl bg-white p-6'>
        <div className='flex-col space-y-4 rounded-xl border border-stone-300 p-6'>
          <h2 className='text-2xl'>Detaljer</h2>

          <div>
            <h2>Beskrivelse</h2>
            <div className='border border-stone-300 p-2'>
              <div className='h-1/2'>{event?.event.description}</div>
            </div>
          </div>

          <FormInput
            key={'location'}
            label={'Lokasjon'}
            defaultValue={event?.event.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminEventsView;
