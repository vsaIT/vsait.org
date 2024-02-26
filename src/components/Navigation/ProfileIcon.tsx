'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { createAvatar } from '@dicebear/core';
import { bigSmile } from '@dicebear/collection';
import { UserType } from '@/types';

type ProfileIconProps = {
  user: UserType;
  onClick?: () => void;
};

function ProfileIcon({ user, onClick }: ProfileIconProps) {
  const { data: session } = useSession({ required: false });
  const pathname = usePathname();
  const avatar = createAvatar(bigSmile, {
    seed: user.profileIconSeed,
    flip: true,
  });
  return (
    <div className='flex w-auto'>
      {session ? (
        <>
          <>
            <Link
              href='/profile'
              onClick={onClick}
              className='flex items-center justify-end gap-2
               text-red-500 underline-offset-4 transition-all duration-300 
              hover:brightness-150 lg:text-white lg:hover:text-secondary'
            >
              <span
                className={`underline-offset-4 ${
                  pathname.includes('profile')
                    ? '!text-tertiary underline brightness-150 lg:!text-secondary'
                    : ''
                }`}
              >
                {user.firstName || 'Profil'}
              </span>
              <div className='flex items-center justify-center overflow-hidden rounded-full bg-white bg-opacity-50'>
                <div
                  className={`relative h-12 w-12 transition-all duration-700 lg:h-14 lg:w-14 ${
                    !user.profileIconSeed ? 'opacity-0' : ''
                  }`}
                >
                  <Image src={avatar.toDataUriSync()} alt='Profile icon' fill />
                </div>
              </div>
            </Link>
          </>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProfileIcon;
