'use client';
import Card from '@/components/Card';
import { bigSmile } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { profileIconAtom, userAtom } from '@/lib/atoms';
import { generateSalt } from '@/lib/auth/passwords';
import { CurvyHeader } from '@/components/Header';
import { MembershipCallout } from '@/components/Home';
import { Button } from '@/components/Input';
import StatusPill from '@/components/StatusPill';
import StyledSwal from '@/components/StyledSwal';
import { UserType } from '@/types';
import { getErrorMessage, getMembershipYear } from '@/lib/utils';
import { useAtom } from 'jotai';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function Profile(): JSX.Element {
  const { data: session, status } = useSession({
    required: true,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [profileIcon, setProfileIcon] = useAtom(profileIconAtom);
  const [user, setUser] = useAtom(userAtom);

  const avatar = createAvatar(bigSmile, {
    seed: profileIcon.seed,
    radius: 50,
    backgroundColor: ['f5f5f5'],
  });

  const updateProfileIcon = useCallback(async () => {
    if (isModalOpen || !session?.user?.id) return;
    let seed = generateSalt(24);
    const oldProfileIcon = { ...profileIcon };
    // Disable registration spamming
    setIsModalOpen(true);
    StyledSwal.fire({
      title: <p></p>,
      html: (
        <>
          <div
            id='modal-display'
            className='flex h-full max-h-128 w-full flex-col overflow-y-hidden transition-all duration-500'
          >
            <div className='flex items-center justify-center rounded-full'>
              <div className='relative h-28 w-28'>
                <Image
                  id='modal-icon'
                  src={avatar.toDataUriSync()}
                  alt='Profile icon'
                  fill
                />
              </div>
            </div>
            <div className='mx-auto my-5 flex w-full flex-col gap-1 sm:w-8/12'>
              <Button
                className='w-full border border-primary !text-primary bg-white !rounded-full !px-8 !py-2.5 mb-3 text-sm sm:w-auto'
                onClick={() => {
                  // Generate new seed
                  seed = generateSalt(24);
                  // Update profile icon atom
                  setProfileIcon((oldProfileIcon) => {
                    return { ...oldProfileIcon, seed };
                  });
                  // Update profile icon display
                  const newAvatar = createAvatar(bigSmile, {
                    seed: seed,
                    radius: 50,
                    backgroundColor: ['f5f5f5'],
                  });
                  const icon = document.querySelector(
                    '#modal-icon'
                  ) as HTMLImageElement;
                  if (icon) icon.src = newAvatar.toDataUriSync();
                }}
                text='Generer nytt ikon'
              />

              <Button
                className='w-full !rounded-full !px-8 !py-2.5 text-sm'
                onClick={() => {
                  StyledSwal.getConfirmButton()?.click();
                }}
                text='Lagre endringer'
              />
            </div>
          </div>
        </>
      ),
      showConfirmButton: false,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        // Hide display on confirm
        const display = document.querySelector(
          '#modal-display'
        ) as HTMLDivElement;
        if (display) {
          display.style.pointerEvents = 'none';
          display.style.maxHeight = '0';
        }
        // Update user profile icon with new seed
        await fetch(`/api/user/${session.user.id}/icon`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            seed: seed,
          }),
        })
          .then(async (response) => {
            if (!response.ok) throw new Error(response.statusText);
            return await response.json();
          })
          .then(async (data: UserType) => {
            setUser((prevState: UserType) => ({ ...prevState, ...data }));
            await StyledSwal.fire({
              icon: 'success',
              title: <p>Endret profil ikon</p>,
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error: unknown) => {
            return StyledSwal.fire({
              icon: 'error',
              title: <p>Mislykket!</p>,
              html: (
                <>
                  <p>Endring av profil ikon mislykket</p>
                  <code className='mt-2 w-full'>{getErrorMessage(error)}</code>
                </>
              ),
              showConfirmButton: false,
              timer: 5000,
            });
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
      .then((result) => {
        if (!result.isConfirmed) setProfileIcon(oldProfileIcon);
      })
      .finally(() => setIsModalOpen(false));
  }, [
    session?.user?.id,
    isModalOpen,
    setIsModalOpen,
    avatar,
    setProfileIcon,
    profileIcon,
    setUser,
  ]);

  useEffect(() => {
    if (!session?.user?.id) return;
    const fetchUser = async () => {
      setFetching(true);
      await fetch(`/api/user/${session.user.id}`)
        .then(async (response) => {
          if (!response.ok) throw new Error(response.statusText);
          return await response.json();
        })
        .then((data: UserType) => {
          setUser((prevState: UserType) => ({ ...prevState, ...data }));
          setProfileIcon({ seed: data.profileIconSeed, initial: true });
        })
        .catch((error) => {
          console.log(error);
          throw new Error(getErrorMessage(error));
        })
        .finally(() => {
          setFetching(false);
        });
    };
    fetchUser().finally();
  }, [session?.user?.id, setFetching, setUser, setProfileIcon]);

  const membershipYear = getMembershipYear();
  const isMember = !!user.membership?.some(
    ({ year }) => year === membershipYear
  );

  return (
    <>
      <CurvyHeader waveColor='#FDF8F0'>
        <div className='relative z-20 px-6 text-center'>
          <h1 className='text-4xl text-white sm:text-5xl'>Min profil</h1>
        </div>
      </CurvyHeader>

      <section className='w-full bg-cream pb-12'>
        <div className='mx-auto flex w-11/12 max-w-2xl flex-col gap-4'>
          {status === 'loading' && fetching ? (
            <p className='text-sm text-gray'>Laster inn ...</p>
          ) : (
            <>
              <div className='flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-5 text-left shadow-sm'>
                <div className='flex items-center gap-4'>
                  <button
                    type='button'
                    onClick={updateProfileIcon}
                    aria-label='Endre profilikon'
                    className='shrink-0 rounded-full transition-all duration-300 hover:brightness-95'
                  >
                    <div
                      className={`relative h-14 w-14 transition-all duration-700 ${
                        !profileIcon.initial ? 'opacity-0' : ''
                      }`}
                    >
                      <Image
                        src={avatar.toDataUriSync()}
                        alt='Profilikon'
                        fill
                      />
                    </div>
                  </button>
                  <div className='flex flex-col'>
                    <p className='text-lg '>
                      {user.firstName} {user.lastName}
                    </p>
                    <p className='text-xs text-primary'>Medlem</p>
                  </div>
                </div>

                <StatusPill active={isMember}>
                  {isMember
                    ? `Aktiv ${membershipYear}/${membershipYear + 1}`
                    : 'Ingen aktiv medlemskap'}
                </StatusPill>
              </div>

              <Card user={user} session={session} />
              <div className='px-6 pb-10 pt-4 text-center sm:px-0'>
                <Button
                  onClick={() =>
                    signOut().then(() => (window.location.href = '/'))
                  }
                  text='Logg ut'
                  className='w-full !rounded-full !px-8 !py-2.5 text-sm sm:w-44'
                />
              </div>
            </>
          )}
          {!user.id && (
            <div className='px-6 pt-4 text-center sm:px-0'>
              <Button
                onClick={() =>
                  signOut().then(() => (window.location.href = '/'))
                }
                text='Logg ut'
                className='w-full !rounded-full !px-8 !py-2.5 text-sm sm:w-44'
              />
            </div>
          )}
        </div>

        <MembershipCallout />
      </section>
    </>
  );
}

export default Profile;
