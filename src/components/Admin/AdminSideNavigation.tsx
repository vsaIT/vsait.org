import {
  Calendar,
  Chart,
  House,
  SquareCaretLeft,
  SquareCaretRight,
  Table,
  Users,
  UsersRectangle,
} from 'src/lib/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { sideNavToggleAtom } from 'src/lib/atoms';

const links = [
  {
    href: '/admin',
    text: 'Dashbord',
    icon: (
      <>
        {/* @ts-expect-error Server Component */}
        <Table className="h-4 w-4" color="inherit" />
      </>
    ),
  },
  {
    href: '/admin/events',
    text: 'Arrangementer',
    icon: (
      <>
        {/* @ts-expect-error Server Component */}
        <Calendar className="h-4 w-4" color="inherit" />
      </>
    ),
  },
  {
    href: '/admin/users',
    text: 'Brukere',
    icon: (
      <>
        {/* @ts-expect-error Server Component */}
        <Users className="h-4 w-4" color="inherit" />
      </>
    ),
  },
  {
    href: '/admin/memberships',
    text: 'Medlemskap',
    icon: (
      <>
        {/* @ts-expect-error Server Component */}
        <UsersRectangle className="h-4 w-4" color="inherit" />
      </>
    ),
  },
  {
    href: '/admin/statistics',
    text: 'Statistikk',

    icon: (
      <>
        {/* @ts-expect-error Server Component */}
        <Chart className="h-4 w-4" color="inherit" />
      </>
    ),
  },
];

const AdminSideNavigation = () => {
  const router = useRouter();
  const [toggled, setToggled] = useAtom(sideNavToggleAtom);

  return (
    <div
      className={`flex w-64 bg-primary rounded-r-xl p-5 h-screen transition-all [transition-property:width] duration-700 ${
        !toggled ? '!w-20' : ''
      }`}
    >
      <div className="flex flex-col gap-2 w-full justify-between">
        <div className="flex flex-col gap-2 w-full items-start">
          <button
            className="mb-12 px-2 py-1 transition-all duration-300 hover:bg-[rgba(0,0,0,0.3)] h-10 rounded-md w-full fill-white text-white"
            onClick={() => setToggled(!toggled)}
          >
            <div className="grid items-center text-left grid-cols-sideNavigationButton overflow-hidden">
              {toggled ? (
                <>
                  {/* @ts-expect-error Server Component */}
                  <SquareCaretRight
                    className="h-5 w-5 ml-[2px]"
                    color="inherit"
                  />
                </>
              ) : (
                <>
                  {/* @ts-expect-error Server Component */}
                  <SquareCaretLeft
                    className="h-5 w-5 ml-[2px]"
                    color="inherit"
                  />
                </>
              )}
              <p className="ml-4 text-sm font-medium [transform:translateY(0.5px)]">
                Lukk
              </p>
            </div>
          </button>
          {links.map((link) => (
            <>
              {/* @ts-expect-error Server Component */}
              <Link
                href={link.href}
                key={link.href}
                className={`px-3 py-2 transition-all duration-300 hover:bg-[rgba(0,0,0,0.3)] h-10 rounded-md w-full fill-white text-white ${
                  router.pathname.split('/').slice(0, 3).join('/') === link.href
                    ? 'bg-[rgba(0,0,0,0.3)]'
                    : ''
                }`}
              >
                <div className="grid items-center text-left grid-cols-sideNavigationButton overflow-hidden">
                  {link.icon}
                  <p className="ml-2 text-sm font-medium [transform:translateY(1.5px)]">
                    {link.text}
                  </p>
                </div>
              </Link>
            </>
          ))}
        </div>
        <div className="flex flex-col gap-2 w-full items-start">
          {/* @ts-expect-error Server Component */}
          <Link
            href="/"
            className="px-3 py-2 transition-all duration-300 hover:bg-[rgba(0,0,0,0.3)] h-10 rounded-md w-full fill-white text-white"
          >
            <div className="grid items-center text-left grid-cols-sideNavigationButton overflow-hidden">
              {/* @ts-expect-error Server Component */}
              <House className="h-4 w-4" color="inherit" />
              <p className="ml-2 text-sm font-medium [transform:translateY(2px)]">
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
