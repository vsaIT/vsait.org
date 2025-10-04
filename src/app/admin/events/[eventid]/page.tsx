'use client';
import { useEvent } from '@/lib/hooks/useEvent';
import { Button } from '@/components/Input';
import { FormInput, FormImageInput, SelectField } from '@/components/Form';
//import { TextEditor } from '@/components/Input';
import { useCallback, useState } from 'react';
import { timeEnd } from 'node:console';
import LoadingIndicator from '@/components/LoadingIndicator';
import { useForm } from 'react-hook-form';
import { EventType } from '@/types';
import { EventType as EventTypeOptions } from '@prisma/client';
import { isoToOsloTimestring, osloTimeStringToUtcIso } from '@/lib/utils';

type AdminEventsProps = {
  params: {
    eventid: string;
  };
};

type TimeDataInput = {
  name: string;
  attr: keyof Pick<
    EventType,
    'startTime' | 'endTime' | 'registrationDeadline' | 'cancellationDeadline'
  >;
  date: {
    label: string;
    type: string;
    defaultValue: string;
  };
};

function AdminEventsView({ params }: AdminEventsProps): JSX.Element {
  const { eventid } = params;
  const { data, isLoading } = useEvent(eventid);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EventType>({ defaultValues: data?.event });

  const timeDataInputs: Array<TimeDataInput> = [
    {
      name: 'Starttid:',
      attr: 'startTime',
      date: {
        label: 'Dato',
        type: 'datetime-local',
        defaultValue: data?.event.startTime
          ? isoToOsloTimestring(new Date(data.event.startTime))
          : '',
      },
    },
    {
      name: 'Sluttid:',
      attr: 'endTime',
      date: {
        label: 'Dato',
        type: 'datetime-local',
        defaultValue: data?.event.endTime
          ? isoToOsloTimestring(new Date(data.event.endTime))
          : '',
      },
    },
    {
      name: 'Registreringsfrist:',
      attr: 'registrationDeadline',
      date: {
        label: 'Dato',
        type: 'datetime-local',
        defaultValue: data?.event.registrationDeadline
          ? isoToOsloTimestring(new Date(data.event.registrationDeadline))
          : '',
      },
    },
    {
      name: 'Avmeldingsfrist:',
      attr: 'cancellationDeadline',
      date: {
        label: 'Dato',
        type: 'datetime-local',
        defaultValue: data?.event.cancellationDeadline
          ? isoToOsloTimestring(new Date(data.event.cancellationDeadline))
          : '',
      },
    },
  ];

  const eventTypeOptions: { value: EventTypeOptions; label: string }[] = [
    {
      value: 'OPEN',
      label: 'Åpent for alle',
    },
    {
      value: 'MEMBERSHIP',
      label: 'Medlemskap kreves',
    },
  ];

  const onSubmit = useCallback(
    async (event: EventType) => {
      timeDataInputs.forEach((input) => {
        event[input.attr] = new Date(
          osloTimeStringToUtcIso(event[input.attr]?.toString())
        );
      });
      console.log('Submitting event:', event);
    },
    [timeDataInputs, setValue]
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className='flex h-screen w-full flex-col gap-6 p-6'>
      <div className='flex w-full rounded-xl bg-white p-6'>
        <h1 className='text-center text-xl font-medium'>
          Endre arrangement: {data?.event.title}
        </h1>
      </div>

      <div className='flex w-full flex-col gap-6'>
        {errors && Object.keys(errors).length > 0 && (
          <div className='rounded-xl bg-red-100 p-4 text-red-700'>
            <h2 className='mb-2 font-bold'>Feil i skjemaet:</h2>
            <ul className='list-disc space-y-1 pl-5'>
              {Object.entries(errors).map(([field, error]) => (
                <li key={field}>
                  {field}: {error?.message || 'Ugyldig verdi'}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='rounded-xl bg-white p-6'
      >
        <div className='flex w-full flex-row items-stretch justify-evenly space-x-3'>
          <div className='col-span-full w-2/3 flex-col space-y-4 rounded-xl border border-stone-300 p-6'>
            <div className=''>
              <h2 className='text-xl'>Detaljer:</h2>
            </div>

            <FormInput
              key={'title'}
              label={'Tittel'}
              defaultValue={data?.event.title || ''}
              {...register('title', { required: true })}
            />

            <div>
              <h2>Banner:</h2>
              <div className='max-h-70 flex justify-evenly gap-3 border border-stone-300 p-2'>
                <div className={'w-1/2 flex-col'}>
                  <h3>Nåværende:</h3>
                  {/*<img src={event?.event.image || ''} alt="Forhåndsvisning" className="mt-2 max-h-45 rounded-lg object-contain" />*/}
                  {data?.event.image}
                </div>
                <div className={'w-1/2 flex-col'}>
                  <h3>Endre:</h3>
                  <FormImageInput
                    key={'image'}
                    label={'Bilde'}
                    type={'file'}
                    accept={'image/*'}
                    {...register('image')}
                  />
                </div>
              </div>
            </div>

            <div>
              <h2>Beskrivelse:</h2>
              <div className='border border-stone-300 p-2'>
                <div className='h-1/2'>{data?.event.description}</div>
              </div>
            </div>

            <FormInput
              key={'location'}
              label={'Sted'}
              defaultValue={data?.event.location || ''}
              {...register('location', { required: true })}
            />

            <div>
              <SelectField
                label='Arrangementstype'
                name='arrType'
                defaultValue={data?.event.eventType || ''}
                options={eventTypeOptions}
                onChange={(e) =>
                  setValue('eventType', e.target.value as EventTypeOptions)
                }
              />
            </div>
          </div>
          <div className='col-span-full w-1/3 flex-col space-y-4 rounded-xl border border-stone-300 p-6'>
            <div>
              <h2 className='text-xl'>Dato og tid:</h2>
            </div>
            {timeDataInputs.map((inputFieldData, index) => (
              <div key={index} className='flex flex-col space-y-1 pb-2'>
                <h2 className='text-l p-2'>{inputFieldData.name}</h2>
                <div className='flex flex-auto flex-row space-x-3'>
                  <FormInput
                    key={inputFieldData.attr}
                    {...inputFieldData.date}
                    {...register(inputFieldData.attr as keyof EventType, {
                      required: true,
                    })}
                  />
                </div>
              </div>
            ))}
            <div className='justify-left mt-6 flex w-full'>
              <Button
                type='submit'
                text='Lagre endringer'
                className='px-6 py-2'
              />
              <Button
                type='button'
                text='Slett arrangement'
                className='ml-4 px-6 py-2'
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdminEventsView;
