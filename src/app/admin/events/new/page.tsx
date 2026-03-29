'use client';
import { FormImageInput, FormInput, SelectField } from '@/components/Form';
import FormErrorBox from '@/components/Form/FormErrorBox';
import { Button } from '@/components/Input';
import SlideCheckbox from '@/components/Input/SlideCheckbox';
import { swalError, swalLoading, swalSuccess } from '@/lib/swal';
import { osloTimeStringToUtcIso, postFetcher } from '@/lib/utils';
import { EventType } from '@/types';
import { EventType as EventTypeOptions } from '@prisma/client';
import {
  sliderCheckboxes,
  eventTypeOptions,
  getTimeDataInputs,
} from '../schemaObjects';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import QuillNoSSR from '@/components/Input/QuillNoSSR';
import { imageToBase64 } from '@/lib/imageBlobUtil';
import ImagePreview from '@/components/ImagePreview';

export default function AdminEventsNew() {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<EventType>({ defaultValues: { description: '' } });

  const now = new Date().toISOString().slice(0, 16);
  const timeDataInputs = getTimeDataInputs(now);

  const onSubmit = useCallback(
    async (event: EventType) => {
      swalLoading('Oppretter...', async () => {
        try {
          const eventToSend = { ...event };
          if (image) {
            eventToSend.image = await imageToBase64(image);
          }

          timeDataInputs.forEach((input) => {
            const key = input.attr as keyof EventType;
            (eventToSend[key] as Date) = new Date(
              osloTimeStringToUtcIso((event[key] as string)?.toString())
            );
          });
          // Optionally handle image upload here if needed
          const response = await postFetcher<EventType>(
            '/api/events',
            eventToSend
          );
          await swalSuccess('Arrangementet ble opprettet!');
          reset();
          router.replace(`/admin/events/${response.id}`);
        } catch (error) {
          swalError('Kunne ikke opprette arrangementet', error as Error);
        }
      });
    },
    [reset, router, timeDataInputs, image]
  );
  return (
    <div className='flex h-screen w-full flex-col gap-6 p-6'>
      <div className='flex w-full rounded-xl bg-white p-6'>
        <h1 className='text-center text-xl font-medium'>
          Opprett nytt arrangement
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
              required
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
                    src={image ? URL.createObjectURL(image) : undefined}
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
                <QuillNoSSR
                  theme='snow'
                  onChange={(value) => setValue('description', value)}
                />
              </div>
            </div>
            <FormInput
              key={'location'}
              label={'Sted'}
              required
              {...register('location', { required: true })}
            />
            <SelectField
              label='Arrangementstype'
              name='arrType'
              defaultValue={''}
              options={eventTypeOptions}
              onChange={(e) =>
                setValue('eventType', e.target.value as EventTypeOptions)
              }
            />
            <FormInput
              key={'maxRegistrations'}
              label={'Maks antall påmeldinger'}
              type='number'
              required
              defaultValue={0}
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
                      required
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
                text='Opprett arrangement'
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
