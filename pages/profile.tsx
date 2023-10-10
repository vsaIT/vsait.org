import Card from '@components/Card';
import { bigSmile } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { profileIconAtom, userAtom } from '@lib/atoms';
import { generateSalt } from '@lib/auth/passwords';
import { SmallHeader } from '@lib/components/Header';
import { Button } from '@lib/components/Input';
import StyledSwal from '@lib/components/StyledSwal';
import { UserType } from '@lib/types';
import { getErrorMessage } from '@lib/utils';
import { useAtom } from 'jotai';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Profile: NextPage = () => {
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
            id="modal-display"
            className="flex flex-col w-full h-full max-h-128 overflow-y-hidden transition-all duration-500"
          >
            <div className="flex items-center justify-center rounded-full">
              <div className="relative w-28 h-28">
                {/* @ts-expect-error Server Component */}
                <Image
                  id="modal-icon"
                  src={avatar.toDataUriSync()}
                  alt="Profile icon"
                  fill
                />
              </div>
            </div>
            <div className="flex flex-col w-8/12 gap-1 mx-auto my-5">
              {/* @ts-expect-error Server Component */}
              <Button
                className="text-base"
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
                text="Generer nytt ikon"
              />
              {/* @ts-expect-error Server Component */}
              <Button
                className="text-base"
                onClick={() => {
                  StyledSwal.getConfirmButton()?.click();
                }}
                text="Lagre endringer"
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
                  <code className="mt-2 w-full">{getErrorMessage(error)}</code>
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
  }, [session?.user?.id, isModalOpen, setIsModalOpen, avatar, setProfileIcon]);

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
          window.location.href = '/500';
        })
        .finally(() => {
          setFetching(false);
        });
    };
    fetchUser().finally();
  }, [session?.user?.id, setFetching]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Profil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center text-center">
        {/* @ts-expect-error Server Component */}
        <SmallHeader />

        <div className="flex flex-col z-10 max-w-screen-xl mb-32 w-full gap-6 transform -translate-y-10">
          {status === 'loading' && fetching ? (
            <>'Loading or not authenticated...'</>
          ) : (
            <div className="flex flex-col gap-6 w-[calc(100%-3rem)] bg-white shadow-2xl rounded-2xl p-6 mx-auto box-border">
              <div className="flex items-center">
                <div
                  className="flex items-center justify-center p-1 cursor-pointer"
                  onClick={updateProfileIcon}
                >
                  <div
                    className={`relative w-28 h-28 transition-all duration-700 ${
                      !profileIcon.initial ? 'opacity-0' : ''
                    }`}
                  >
                    {/* @ts-expect-error Server Component */}
                    <Image
                      src={avatar.toDataUriSync()}
                      alt="Profile icon"
                      fill
                    />
                  </div>
                </div>
                <div className="flex flex-col ml-5 text-left">
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-slate-500">Medlem</p>
                </div>
              </div>

              <div>
                {/* @ts-expect-error Server Component */}
                <Card user={user} session={session} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
