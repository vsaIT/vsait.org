'use client';
import FormErrorBox from '@/components/Form/FormErrorBox';
import FormInput from "@/components/Form/FormInput";
import Button from "@/components/Input/Button";
import { swalError, swalLoading, swalSuccess } from '@/lib/swal';
import { postFetcher } from '@/lib/utils';
import { MembershipType } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

export default function AdminMembershipNew() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm<MembershipType>();

    const onSubmit = useCallback(
        async (membership: MembershipType) => {
            swalLoading('Oppretter...', async () => {
                try {
                    const response = await postFetcher<MembershipType>(
                        `/api/memberships/${membership.year}`,
                        null
                    );
                    await swalSuccess('Medlemskapsåret ble opprettet!');
                    reset();
                    router.replace(`/admin/memberships/${membership.year}`);
                } catch (error) {
                    swalError('Kunne ikke opprette medlemskapsåret', error as Error);
                }
            });
        },
        [reset, router]
    );
    return (
        <div className='flex h-screen w-full flex-col gap-6 p-6'>
            <div className='flex w-full rounded-xl bg-white p-6'>
                <h1 className='text-center text-xl font-medium'>
                    Opprett nytt medlemskapsår
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
                    <div className='col-span-full w-full flex-col space-y-4 rounded-xl border border-stone-300 p-6'>
                        <div className=''>
                            <h2 className='text-xl'>Detaljer:</h2>
                        </div>
                        <FormInput
                            key={'year'}
                            label={'År'}
                            required
                            {...register('year', { required: true })}
                        />
                        <Button
                            type='submit'
                            text='Opprett medlemskapsår'
                            className='px-6 py-3'
                        />
                    </div>
                </div>
            </form>
            <div className='p-4'>&nbsp;</div>
        </div>
    );
}