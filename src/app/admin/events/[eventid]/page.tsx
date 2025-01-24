'use client';
import { AdminEventsProps } from './eventsTypes';
import { EventType } from '@/types';
import { Accordion } from '@/components/Accordion';
import { FormInput, SelectField } from '@/components/Form';
import { Button } from '@/components/Input';
import SlideCheckbox from '@/components/Input/SlideCheckbox';
import { useEvent } from '@/lib/hooks/useEvent';
import { useCallback, useEffect, useState, use } from 'react';

const eventTypeOptions = [
  {
    value: 'MEMBERSHIP',
    label: 'Kun for medlemmer',
  },
  {
    value: 'OPEN',
    label: 'Åpent for alle',
  }
]

function AdminEventsView({ params }: AdminEventsProps): JSX.Element {
  const { eventid } = params;
  const { event, isLoading } = useEvent(params.eventid);
  const [editEvent, setEditEvent] = useState<EventType | undefined>(undefined);

  const eventDataInput = [
    {
      label: 'Tittel',
      defaultValue: event?.title!,
      attr: 'title',
      type: 'text',
    },
    {
      label: 'Sted',
      defaultValue: event?.location!,
      attr: 'location',
      type: 'text',
    },
    {
      label: 'Maks antall deltakere',
      defaultValue: event?.maxRegistrations!,
      attr: 'maxPeople',
      type: 'number',
    },
  ]

  const eventDateInput = [
    {
      label: 'Startdato',
      defaultValue: event?.startTime ?? new Date(),
      attr: 'startTime',
      type: 'date',
    },
    {
      label: 'Slutdato',
      defaultValue: event?.endTime ?? new Date(),
      attr: 'endTime',
      type: 'date',
    },
    {
      label: 'Påmeldingsfrist - dato',
      defaultValue: event?.registrationDeadline ?? new Date(),
      attr: 'registrationDeadline',
      type: 'date',
    },
    {
      label: 'Avmeldingsfrist - dato',
      defaultValue: event?.cancellationDeadline ?? new Date(),
      attr: 'cancellationDeadline',
      type: 'date',
    },
  ]

  function handleChange<T>(attr: string, value: T) {
    if (editEvent) {
      setEditEvent({
        ...editEvent,
        [attr]: value,
      });
    }
  }

  useEffect(() => {
    if (!isLoading) {
      setEditEvent(event);
    }
  }, [isLoading, event]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='flex h-screen w-full flex-col gap-6 p-6'>
      <div className='flex w-full justify-between gap-6 rounded-xl bg-white p-6'>
        <div className='flex flex-col items-center'>
          <h1 className='text-xl font-medium'>
            Endre event
          </h1>
        </div>
      </div>

      <div className='w-full rounded-xl bg-white p-6'>
        <div className='flex w-full flex-col gap-3 sm:flex-row'>
          <div className='rounded-xl border border-stone-300 sm:w-1/2'>
            <div className='flex flex-col gap-5 p-6'>
              <h2>Generell info:</h2>
              {eventDataInput.map((inputFieldData, index) => (
                <FormInput
                  key={index.toString()}
                  {...inputFieldData}
                  onChange={(e) =>
                    handleChange(inputFieldData.attr, e.target.value)
                  }
                />
              ))}

              <SelectField
                label='Event type'
                name='eventType'
                defaultValue={event?.eventType!}
                options={eventTypeOptions}
                onChange={(e) => handleChange('eventType', e.target.value)}
              />

              <h2>Dato info:</h2> //TODO: Add time input + fix error
              {eventDateInput.map((inputFieldData, index) => (
                <FormInput
                  key={index.toString()}
                  {...inputFieldData}
                  onChange={(e) =>
                    handleChange(inputFieldData.attr, e.target.value)
                  }
                />
              ))}

              <SlideCheckbox
                id='is-draft'
                label='Er skisse'
                checked={editEvent?.isDraft ? true : false}
                onChange={() =>
                  handleChange(
                    'isDraft',
                    !editEvent?.isDraft
                  )
                }
              />
              //TODO: Publiseringsdato + tid


            </div>
          </div>
          <div className='flex flex-col justify-between rounded-xl border border-stone-300 p-6 sm:w-1/2'>
            <div>
              <div className='flex flex-col'>
                <p>Beskrivelse:</p>
                <p>Bilde:</p>
              </div>
            </div>
            <Accordion
              label='Påmeldte'
              labelClassName='text-l font-medium text-left pl-2 py-4'
              buttonClassName='bg-neutral-50 shadow-md'
              className='mb-5'
            >

            </Accordion>

            <Accordion
              label='Venteliste'
              labelClassName='text-l font-medium text-left pl-2 py-4'
              buttonClassName='bg-neutral-50 shadow-md'
              className='mb-5'
            >

            </Accordion>

            <Accordion
              label='Oppmøte'
              labelClassName='text-l font-medium text-left pl-2 py-4'
              buttonClassName='bg-neutral-50 shadow-md'
              className='mb-5'
            >

            </Accordion>
            <div className='my-4 flex w-full flex-col justify-start space-x-0 space-y-4 lg:flex-row lg:space-x-10 lg:space-y-0'>
              <Button
                type='submit'
                form='user-form'
                text='Lagre og legg til ny'
                className='bg-light'
                onClick={() => console.log("hi")}//updateUser(editEvent)}
              />
              <Button
                type='submit'
                form='user-form'
                text='Lagre og fortsett å redigere'
                className='bg-light'
                onClick={() => console.log("hi")}//updateUser(editEvent)}
              />
            </div>
            <div className='my-4 flex w-full flex-col justify-start space-x-0 space-y-4 lg:flex-row lg:space-x-10 lg:space-y-0'>
              <Button
                type='submit'
                form='user-form'
                text='Lagre'
                className='bg-light'
                onClick={() => console.log("hi")}//updateUser(editEvent)}
              />
              <Button
                type='submit'
                form='user-form'
                text='Slett'
                className='bg-medium'
                onClick={() => console.log("hi")}//updateUser(editEvent)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminEventsView;
