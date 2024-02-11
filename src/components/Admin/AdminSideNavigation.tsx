'use client';
import {
  Calendar,
  Chart,
  House,
  SquareCaretLeft,
  SquareCaretRight,
  Table,
  Users,
  UsersRectangle,
} from '@/components/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAtom } from 'jotai';
import { sideNavToggleAtom } from '@/lib/atoms';

const links = [
  {
    href: '/admin',
    text: 'Dashbord',
    icon: (
      <>
        <Table className='h-4 w-4' color='inherit' />
      </>
    ),
  },
  {
    href: '/admin/events',
    text: 'Arrangementer',
    icon: (
      <>
        <Calendar className='h-4 w-4' color='inherit' />
      </>
    ),
  },
  {
    href: '/admin/users',
    text: 'Brukere',
    icon: (
      <>
        <Users className='h-4 w-4' color='inherit' />
      </>
    ),
  },
  {
    href: '/admin/memberships',
    text: 'Medlemskap',
    icon: (
      <>
        <UsersRectangle className='h-4 w-4' color='inherit' />
      </>
    ),
  },
  {
    href: '/admin/statistics',
    text: 'Statistikk',

    icon: (
      <>
        <Chart className='h-4 w-4' color='inherit' />
      </>
    ),
  },
];

const AdminSideNavigation = () => {
  const pathname = usePathname();
  const [toggled, setToggled] = useAtom(sideNavToggleAtom);

  return (
    <div
      className={`flex h-screen w-64 rounded-r-xl bg-primary p-5 transition-all duration-700 [transition-property:width] ${
        !toggled ? '!w-20' : ''
      }`}
    >
      <div
        key='admin-nav-box2'
        className='flex w-full flex-col justify-between gap-2'
      >
        <div
          key='admin-nav-box'
          className='flex w-full flex-col items-start gap-2'
        >
          <button
            className='mb-12 h-10 w-full rounded-md fill-white px-2 py-1 text-white transition-all duration-300 hover:bg-[rgba(0,0,0,0.3)]'
            onClick={() => setToggled(!toggled)}
          >
            <div className='grid grid-cols-sideNavigationButton items-center overflow-hidden text-left'>
              {toggled ? (
                <>
                  <SquareCaretRight
                    className='ml-[2px] h-5 w-5'
                    color='inherit'
                  />
                </>
              ) : (
                <>
                  <SquareCaretLeft
                    className='ml-[2px] h-5 w-5'
                    color='inherit'
                  />
                </>
              )}
              <p className='ml-4 text-sm font-medium [transform:translateY(0.5px)]'>
                Lukk
              </p>
            </div>
          </button>
          {links.map((link) => (
            <Link
              href={link.href}
              key={`admin-nav-${link.href}`}
              className={`h-10 w-full rounded-md fill-white px-3 py-2 text-white transition-all duration-300 hover:bg-[rgba(0,0,0,0.3)] ${
                pathname.split('/').slice(0, 3).join('/') === link.href
                  ? 'bg-[rgba(0,0,0,0.3)]'
                  : ''
              }`}
            >
              <div className='grid grid-cols-sideNavigationButton items-center overflow-hidden text-left'>
                {link.icon}
                <p className='ml-2 text-sm font-medium [transform:translateY(1.5px)]'>
                  {link.text}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className='flex w-full flex-col items-start gap-2'>
          <Link
            href='/'
            className='h-10 w-full rounded-md fill-white px-3 py-2 text-white transition-all duration-300 hover:bg-[rgba(0,0,0,0.3)]'
          >
            <div className='grid grid-cols-sideNavigationButton items-center overflow-hidden text-left'>
              <House className='h-4 w-4' color='inherit' />
              <p className='ml-2 text-sm font-medium [transform:translateY(2px)]'>
                Til nettsiden
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AdminSideNavigation;
