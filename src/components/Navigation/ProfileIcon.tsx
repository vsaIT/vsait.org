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
};

function ProfileIcon({ user }: ProfileIconProps) {
  const { data: session } = useSession({ required: false });
  const pathname = usePathname();
  const avatar = createAvatar(bigSmile, {
    seed: user.profileIconSeed,
    flip: true,
  });
  return (
    <div className='absolute right-8 hidden w-auto sm:flex'>
      {session ? (
        <>
          <>
            <Link
              href='/profile'
              className='flex items-center justify-end gap-2 fill-white text-white transition-all duration-300 hover:fill-[#ffffb1] hover:text-[#ffffb1]'
            >
              <span
                className={`underline-offset-4 ${
                  pathname.includes('profile')
                    ? '!fill-secondary !text-secondary underline brightness-150'
                    : ''
                }`}
              >
                {user.firstName || 'Profil'}
              </span>
              <div className='flex items-center justify-center overflow-hidden rounded-full bg-white bg-opacity-50 p-1'>
                <div
                  className={`relative h-14 w-14 transition-all duration-700 ${
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
