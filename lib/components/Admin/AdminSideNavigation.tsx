import {
  Calendar,
  CaretLeft,
  CaretRight,
  House,
  Person,
  PowerOff,
  SquareCaretLeft,
  SquareCaretRight,
  Users,
  UsersRectangle,
} from '@lib/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { sideNavToggleAtom } from '@lib/atoms';

const links = [
  {
    href: '/admin',
    text: 'Dashbord',
    icon: <Person className="h-4 w-4" color="inherit" />,
  },
  {
    href: '/admin/events',
    text: 'Arrangementer',
    icon: <Calendar className="h-4 w-4" color="inherit" />,
  },
  {
    href: '/admin/users',
    text: 'Brukere',
    icon: <Users className="h-4 w-4" color="inherit" />,
  },
  {
    href: '/admin/memberships',
    text: 'Medlemskap',
    icon: <UsersRectangle className="h-4 w-4" color="inherit" />,
  },
  {
    href: '/admin/statistics',
    text: 'Statistikk',
    icon: <Person className="h-4 w-4" color="inherit" />,
  },
];

const AdminSideNavigation = () => {
  const router = useRouter();
  const [toggled, setToggled] = useAtom(sideNavToggleAtom);

  return (
    <div
      className={`flex w-64 bg-primary rounded-r-xl p-5 h-screen transition-all duration-700 ${
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
                <SquareCaretRight
                  className="h-5 w-5 ml-[2px]"
                  color="inherit"
                />
              ) : (
                <SquareCaretLeft className="h-5 w-5 ml-[2px]" color="inherit" />
              )}
              <p className="ml-4 text-sm font-medium [transform:translateY(1.5px)]">
                Lukk
              </p>
            </div>
          </button>
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              <a
                className={`px-3 py-2 transition-all duration-300 hover:bg-[rgba(0,0,0,0.3)] h-10 rounded-md w-full fill-white text-white ${
                  router.pathname === link.href ? 'bg-[rgba(0,0,0,0.3)]' : ''
                }`}
              >
                <div className="grid items-center text-left grid-cols-sideNavigationButton overflow-hidden">
                  {link.icon}
                  <p className="ml-2 text-sm font-medium [transform:translateY(1.5px)]">
                    {link.text}
                  </p>
                </div>
              </a>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2 w-full items-start">
          <button className="px-3 py-2 transition-all duration-300 hover:bg-[rgba(0,0,0,0.3)] h-10 rounded-md w-full fill-white text-white">
            <div className="grid items-center text-left grid-cols-sideNavigationButton overflow-hidden">
              <House className="h-4 w-4" color="inherit" />
              <p className="ml-4 text-sm font-medium [transform:translateY(1.5px)]">
                Til nettsiden
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
export default AdminSideNavigation;
