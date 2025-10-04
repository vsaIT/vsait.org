'use client';
import { useEvent } from '@/lib/hooks/useEvent';
import { Button } from '@/components/Input';
import { FormInput, FormImageInput, SelectField } from '@/components/Form';
import ImagePreview from '../../../../components/ImagePreview';
//import { TextEditor } from '@/components/Input';
import { useCallback, useState } from 'react';
import { putFetcher } from '@/lib/utils';
import { swalSuccess, swalError, swalLoading } from '@/lib/swal';
import FormErrorBox from '@/components/Form/FormErrorBox';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import LoadingIndicator from '@/components/LoadingIndicator';
import { useForm } from 'react-hook-form';
import { EventType } from '@/types';
import { EventType as EventTypeOptions } from '@prisma/client';
import { isoToOsloTimestring, osloTimeStringToUtcIso } from '@/lib/utils';
import SlideCheckbox from '@/components/Input/SlideCheckbox';
import StyledSwal from '@/components/StyledSwal';
import Swal from 'sweetalert2';
import { set } from 'lodash';

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
  const [image, setImage] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventType>({ defaultValues: data?.event });

  const sliderCheckboxes = [
    { id: 'isDraft', label: 'Kladd (ikke synlig for brukere)' },
    { id: 'isCancelled', label: 'Avlyst' },
  ];

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
      swalLoading('Oppdaterer...', async () => {
        try {
          // if (image) {
          //   const formData = new FormData();
          //   formData.append('file', image);
          //   const uploadResponse = await fetch('/api/upload', {
          //     method: 'POST',
          //     body: formData,
          //   });

          //   if (!uploadResponse.ok) {
          //     throw new Error('Failed to upload image');
          //   }

          //   const { url } = await uploadResponse.json();
          //   event.image = url;
          // }
          await new Promise((resolve) => setTimeout(resolve, 5000));
          timeDataInputs.forEach((input) => {
            event[input.attr] = new Date(
              osloTimeStringToUtcIso(event[input.attr]?.toString())
            );
          });
          await putFetcher(`/api/events/${eventid}`, event);
          await swalSuccess('Arrangementet ble oppdatert!');
        } catch (error) {
          swalError(
            'Kunne ikke oppdatere arrangementet',
            error as Error,
            5000,
            true
          );
        }
      });
    },
    [timeDataInputs, setValue, eventid]
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
        <FormErrorBox errors={errors} />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='rounded-xl bg-white p-6'
      >
        <div className='flex h-full w-full flex-row items-stretch justify-evenly space-x-3'>
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
              <div className='max-h-70 flex-col gap-3'>
                <div className={'w-[38%] flex-col justify-start'}>
                  <h3 className='text-sm font-light italic'>
                    Forhåndsvisning:
                  </h3>
                  <ImagePreview
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : data?.event.image || undefined
                    }
                    alt='Forhåndsvisning'
                  />
                </div>
                <div className='mt-1 w-1/2'>
                  <FormImageInput
                    key={'image'}
                    label={'Bilde'}
                    type={'file'}
                    accept={'image/*'}
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                  />
                </div>
              </div>
            </div>

            <div>
              <h2>Beskrivelse:</h2>
              <div className='py-2'>
                <ReactQuill
                  theme='snow'
                  defaultValue={data?.event.description || ''}
                  onChange={(value) => setValue('description', value)}
                />
              </div>
            </div>

            <FormInput
              key={'location'}
              label={'Sted'}
              defaultValue={data?.event.location || ''}
              {...register('location', { required: true })}
            />

            <SelectField
              label='Arrangementstype'
              name='arrType'
              defaultValue={data?.event.eventType || ''}
              options={eventTypeOptions}
              onChange={(e) =>
                setValue('eventType', e.target.value as EventTypeOptions)
              }
            />

            <FormInput
              key={'maxRegistrations'}
              label={'Maks antall påmeldinger'}
              type='number'
              defaultValue={data?.event.maxRegistrations || 0}
              {...register('maxRegistrations', {
                required: true,
                valueAsNumber: true,
                min: 0,
              })}
            />

            {/* Sliders */}
            <div className='grid grid-cols-2'>
              {sliderCheckboxes.map((checkbox) => (
                <SlideCheckbox
                  key={checkbox.id}
                  id={checkbox.id}
                  label={checkbox.label}
                  {...register(checkbox.id as keyof EventType)}
                />
              ))}
            </div>
          </div>
          <div className='flex h-full w-1/3 flex-col justify-between rounded-xl border border-stone-300 p-6'>
            <div>
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
            </div>
            <div className='flex w-full flex-col justify-evenly space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0'>
              <Button
                type='submit'
                text='Lagre endringer'
                className='px-6 py-3'
              />
              <Button
                type='button'
                text='Slett arrangement'
                className='px-6 py-3'
              />
            </div>
          </div>
        </div>
      </form>
      <div className='p-4'>&nbsp;</div>
    </div>
  );
}

export default AdminEventsView;
