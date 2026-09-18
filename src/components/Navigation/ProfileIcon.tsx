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
      {session && (
        <Link
          href='/profile'
          onClick={onClick}
          className='-ml-2 -mt-2 flex items-center gap-2 rounded-full border border-green-600 pl-3 pr-0.5 transition-all duration-300 hover:border-green-900 hover:bg-neutral-50 lg:my-0.5 lg:-ml-2'
        >
          <span
            className={`underline-offset-4 ${pathname.includes('profile') ? '!text-primary underline brightness-150' : ''}`}
          >
            {user.firstName || 'Profil'}
          </span>
          <div className='flex items-center justify-center overflow-hidden rounded-full bg-white bg-opacity-50'>
            <div
              className={`relative h-9 w-9 transition-all duration-700 ${!user.profileIconSeed ? 'opacity-0' : ''}`}
            >
              <Image src={avatar.toDataUriSync()} alt='Profile icon' fill />
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

export default ProfileIcon;
