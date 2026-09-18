'use client';
import { FormImageInput, FormInput, SelectField } from '@/components/Form';
import FormErrorBox from '@/components/Form/FormErrorBox';
import { Button } from '@/components/Input';
import ReactQuill from '@/components/Input/QuillNoSSR';
import LoadingIndicator from '@/components/LoadingIndicator';
import ImagePreview from '@/components/ImagePreview';
import { ArchivedEvent, useEventArchiveItem } from '@/lib/hooks/useEvent';
import { imageToBase64 } from '@/lib/imageBlobUtil';
import { swalError, swalLoading, swalSuccess } from '@/lib/swal';
import {
  isoToOsloTimestring,
  osloTimeStringToUtcIso,
  putFetcher,
} from '@/lib/utils';
import { EventType as EventTypeOptions } from '@prisma/client';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { eventTypeOptions } from '../../schemaObjects';

type AdminArchiveProps = {
  params: {
    id: string;
  };
};

type ArchiveForm = Omit<ArchivedEvent, 'startTime' | 'endTime'> & {
  startTime: string;
  endTime: string;
};

// Archived events live in their own table with their own id sequence, so they
// get their own admin route rather than sharing /admin/events/[eventid] — the
// two id ranges overlap and would otherwise resolve to unrelated records.
function AdminArchivedEventView({ params }: AdminArchiveProps): JSX.Element {
  const { id } = params;
  const { data, isLoading, mutate } = useEventArchiveItem(id);
  const [image, setImage] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ArchiveForm>();

  const event = data?.event;

  useEffect(() => {
    if (event) {
      reset({
        ...event,
        startTime: isoToOsloTimestring(new Date(event.startTime)),
        endTime: isoToOsloTimestring(new Date(event.endTime)),
      });
    }
  }, [event, reset]);

  const onSubmit = useCallback(
    async (form: ArchiveForm) => {
      swalLoading('Oppdaterer...', async () => {
        try {
          const eventToSend: Record<string, unknown> = {
            title: form.title,
            description: form.description,
            location: form.location,
            eventType: form.eventType,
            maxRegistrations: form.maxRegistrations,
            registrations: form.registrations,
            startTime: osloTimeStringToUtcIso(form.startTime),
            endTime: osloTimeStringToUtcIso(form.endTime),
          };

          if (image) {
            eventToSend.image = await imageToBase64(image);
          }

          await putFetcher(`/api/events/archive/${id}`, eventToSend);
          await mutate();
          setImage(null);
          await swalSuccess('Arrangementet ble oppdatert!');
        } catch (error) {
          swalError('Kunne ikke oppdatere arrangementet', error as Error);
        }
      });
    },
    [id, image, mutate]
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!event) {
    return (
      <div className='flex h-screen w-full flex-col gap-6 p-6'>
        <div className='flex w-full rounded-xl bg-white p-6'>
          <h1 className='text-xl font-medium'>
            Fant ikke arkivert arrangement med id {id}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-screen w-full flex-col gap-6 p-6'>
      <div className='flex w-full flex-col gap-1 rounded-xl bg-white p-6'>
        <h1 className='text-xl font-medium'>
          Endre arkivert arrangement: {event.title}
        </h1>
        <p className='text-sm text-neutral-500'>
          Dette arrangementet er importert fra det gamle nettstedet og har ingen
          påmeldingsliste.{' '}
          <Link
            href={`/events/past/${id}`}
            className='font-medium text-primary hover:underline'
          >
            Se offentlig side
          </Link>
        </p>
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
            <div>
              <h2 className='text-xl'>Detaljer:</h2>
            </div>

            <FormInput
              label={'Tittel'}
              required
              {...register('title', { required: true })}
            />

            <div>
              <h2>Banner:</h2>
              <div className='max-h-70 flex-col gap-3'>
                <div className='w-[38%] flex-col justify-start'>
                  <h3 className='text-sm font-light italic'>
                    Forhåndsvisning:
                  </h3>
                  <ImagePreview
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : event.image || undefined
                    }
                    alt='Forhåndsvisning'
                  />
                </div>
                <div className='mt-1 w-1/2'>
                  <FormImageInput
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
                  defaultValue={event.description || ''}
                  onChange={(value) => setValue('description', value)}
                />
              </div>
            </div>

            <FormInput label={'Sted'} {...register('location')} />

            <SelectField
              label='Arrangementstype'
              name='arrType'
              defaultValue={event.eventType}
              options={eventTypeOptions}
              onChange={(e) =>
                setValue('eventType', e.target.value as EventTypeOptions)
              }
            />

            <FormInput
              label={'Maks antall påmeldinger'}
              type='number'
              {...register('maxRegistrations', { valueAsNumber: true, min: 0 })}
            />

            <FormInput
              label={'Antall påmeldte'}
              type='number'
              {...register('registrations', { valueAsNumber: true, min: 0 })}
            />
          </div>

          <div className='flex h-full w-1/3 flex-col justify-between rounded-xl border border-stone-300 p-6'>
            <div>
              <div>
                <h2 className='text-xl'>Dato og tid:</h2>
              </div>
              <div className='flex flex-col space-y-1 pb-2'>
                <h2 className='text-l p-2'>Starttid:</h2>
                <FormInput
                  label='Dato'
                  type='datetime-local'
                  required
                  {...register('startTime', { required: true })}
                />
              </div>
              <div className='flex flex-col space-y-1 pb-2'>
                <h2 className='text-l p-2'>Sluttid:</h2>
                <FormInput
                  label='Dato'
                  type='datetime-local'
                  required
                  {...register('endTime', { required: true })}
                />
              </div>
            </div>
            <div className='flex w-full flex-col justify-evenly space-y-4'>
              <Button
                type='submit'
                text='Lagre endringer'
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

export default AdminArchivedEventView;
