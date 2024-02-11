'use client';
import Card from '@/components/Card';
import { bigSmile } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { profileIconAtom, userAtom } from '@/lib/atoms';
import { generateSalt } from '@/lib/auth/passwords';
import { SmallHeader } from '@/components/Header';
import { Button } from '@/components/Input';
import StyledSwal from '@/components/StyledSwal';
import { UserType } from '@/types';
import { getErrorMessage } from '@/lib/utils';
import { useAtom } from 'jotai';
import { useSession } from 'next-auth/react';
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
            <div className='mx-auto my-5 flex w-8/12 flex-col gap-1'>
              <Button
                className='text-base'
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
                className='text-base'
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
  }, [session?.user?.id, setFetching, setUser]);

  return (
    <>
      <SmallHeader />
      <div className='z-10 mb-32 flex w-full max-w-screen-xl -translate-y-10 transform flex-col gap-6'>
        {status === 'loading' && fetching ? (
          <>&apos;Loading or not authenticated...&apos;</>
        ) : (
          <div className='mx-auto box-border flex w-[calc(100%-3rem)] flex-col gap-6 rounded-2xl bg-white p-6 shadow-2xl'>
            <div className='flex items-center'>
              <div
                className='flex cursor-pointer items-center justify-center p-1'
                onClick={updateProfileIcon}
              >
                <div
                  className={`relative h-28 w-28 transition-all duration-700 ${
                    !profileIcon.initial ? 'opacity-0' : ''
                  }`}
                >
                  <Image src={avatar.toDataUriSync()} alt='Profile icon' fill />
                </div>
              </div>
              <div className='ml-5 flex flex-col text-left'>
                <p>
                  {user.firstName} {user.lastName}
                </p>
                <p className='text-slate-500'>Medlem</p>
              </div>
            </div>
            <div>
              <Card user={user} session={session} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
