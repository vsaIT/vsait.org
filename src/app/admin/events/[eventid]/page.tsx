'use client';
import { useEvent } from '@/lib/hooks/useEvent';
import { AdminEventsProps } from './eventsTypes';
import { FormInput, FormImageInput, SelectField } from '@/components/Form';
//import { TextEditor } from '@/components/Input';
import { useState } from 'react';
import { timeEnd } from 'node:console';

function AdminEventsView({ params }: AdminEventsProps): JSX.Element {
  const { eventid } = params;
  const { event, isLoading } = useEvent('2');

  function handleChange<T>(attr: string, value: T) {
    // if (editUser) {
    //   setEditEvent({
    //     ...editUser,
    //     [attr]: value,
    //   });
    // }
    console.log(attr, value);
  }

  function handleTimeChange<T>(attr: string, value: T) {
    // if (editUser) {
    //   setEditEvent({
    //     ...editUser,
    //     [attr]: value,
    //   });
    // }
    console.log(attr, value);
  }

  function handleImageUpload<T>(attr: string, value: T) {
    // if (editUser) {
    //   setEditEvent({
    //     ...editUser,
    //     [attr]: value,
    //   });
    // }
    console.log(attr, value);
  }

  if (isLoading) return <div>Loading...</div>;

  const timeDataInputs = [
    {
      name: 'Starttid:',
      attr: 'startTime',
      date: {
        key: 'start-date',
        label: 'Dato',
        type: 'date',
        defaultValue: event?.event.startTime
          ? new Date(event.event.startTime).toISOString().split('T')[0]
          : '',
      },
      time: {
        key: 'start-time',
        label: 'Tid',
        type: 'time',
        defaultValue: event?.event.startTime
          ? new Date(event.event.startTime)
              .toISOString()
              .split('T')[1]
              .slice(0, 5)
          : '',
      },
    },
    {
      name: 'Sluttid:',
      attr: 'endTime',
      date: {
        key: 'end-date',
        label: 'Dato',
        type: 'date',
        defaultValue: event?.event.endTime
          ? new Date(event.event.endTime).toISOString().split('T')[0]
          : '',
      },
      time: {
        key: 'end-time',
        label: 'Tid',
        type: 'time',
        defaultValue: event?.event.endTime
          ? new Date(event.event.endTime)
              .toISOString()
              .split('T')[1]
              .slice(0, 5)
          : '',
      },
    },
    {
      name: 'Registreringsfrist:',
      attr: 'registrationDeadline',
      date: {
        key: 'registration-date',
        label: 'Dato',
        type: 'date',
        defaultValue: event?.event.registrationDeadline
          ? new Date(event.event.registrationDeadline)
              .toISOString()
              .split('T')[0]
          : '',
      },
      time: {
        key: 'registration-time',
        label: 'Tid',
        type: 'time',
        defaultValue: event?.event.registrationDeadline
          ? new Date(event.event.registrationDeadline)
              .toISOString()
              .split('T')[1]
              .slice(0, 5)
          : '',
      },
    },
    {
      name: 'Avmeldingsfrist:',
      attr: 'cancellationDeadline',
      date: {
        key: 'cancellation-date',
        label: 'Dato',
        type: 'date',
        defaultValue: event?.event.cancellationDeadline
          ? new Date(event.event.cancellationDeadline)
              .toISOString()
              .split('T')[0]
          : '',
      },
      time: {
        key: 'cancellation-time',
        label: 'Tid',
        type: 'time',
        defaultValue: event?.event.cancellationDeadline
          ? new Date(event.event.cancellationDeadline)
              .toISOString()
              .split('T')[1]
              .slice(0, 5)
          : '',
      },
    },
  ];

  const eventTypeOptions = [
    {
      value: 'OPEN',
      label: 'Åpent for alle',
    },
    {
      value: 'MEMBERSHIP',
      label: 'Medlemskap kreves',
    },
  ];

  console.log(event?.event.startTime);
  console.log(
    new Date(event?.event.startTime || '')
      .toISOString()
      .split('T')[1]
      .slice(0, 5)
  );

  return (
    <div className='flex h-screen w-full flex-col gap-6 p-6'>
      <div className='flex w-full rounded-xl bg-white p-6'>
        <h1 className='text-center text-xl font-medium'>
          Endre arrangement: {event?.event.title}
        </h1>
      </div>
      <div className='flex w-full flex-row items-stretch justify-evenly space-x-3 rounded-xl bg-white p-6'>
        <div className='col-span-full w-2/3 flex-col space-y-4 rounded-xl border border-stone-300 p-6'>
          <div className=''>
            <h2 className='text-xl'>Detaljer:</h2>
          </div>

          <FormInput
            key={'tittle'}
            label={'Tittel'}
            defaultValue={event?.event.title || ''}
            onChange={(e) => handleChange('tittle', e.target.value)}
          />

          <div>
            <h2>Banner:</h2>
            <div className='max-h-70 flex justify-evenly gap-3 border border-stone-300 p-2'>
              <div className={'w-1/2 flex-col'}>
                <h3>Nåværende:</h3>
                {/*<img src={event?.event.image || ''} alt="Forhåndsvisning" className="mt-2 max-h-45 rounded-lg object-contain" />*/}
                {event?.event.image}
              </div>
              <div className={'w-1/2 flex-col'}>
                <h3>Endre:</h3>
                <FormImageInput
                  key={'image'}
                  label={'Bilde'}
                  type={'file'}
                  accept={'image/*'}
                  onChange={(e) => handleImageUpload('image', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <h2>Beskrivelse:</h2>
            <div className='border border-stone-300 p-2'>
              <div className='h-1/2'>{event?.event.description}</div>
            </div>
          </div>

          <FormInput
            key={'location'}
            label={'Sted'}
            defaultValue={event?.event.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
          />

          <div>
            <SelectField
              label='Arrangementstype'
              name='arrType'
              defaultValue={event?.event.eventType || ''}
              options={eventTypeOptions}
              onChange={(e) => handleChange('student', e.target.value)}
            />
          </div>
        </div>
        <div className='col-span-full w-1/3 flex-col space-y-4 rounded-xl border border-stone-300 p-6'>
          <div>
            <h2 className='text-xl'>Dato og tid:</h2>
          </div>
          {timeDataInputs.map((inputFieldData) => (
            <div className='flex flex-col space-y-1 pb-2'>
              <h2 className='text-l p-2'>{inputFieldData.name}</h2>
              <div className='flex flex-auto flex-row space-x-3'>
                <FormInput
                  {...inputFieldData.date}
                  onChange={(e) =>
                    handleTimeChange(inputFieldData.attr, e.target.value)
                  }
                />
                <FormInput
                  {...inputFieldData.time}
                  onChange={(e) =>
                    handleTimeChange(inputFieldData.attr, e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminEventsView;
