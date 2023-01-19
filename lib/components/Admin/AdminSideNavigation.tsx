import { Person } from '@lib/icons';
import Link from 'next/link';
import { useState } from 'react';

const links = [
  {
    href: '/admin',
    text: 'Dashbord',
    icon: <Person className="h-4 w-4" color="inherit" />,
  },
  {
    href: '/admin/events',
    text: 'Arrangementer',
    icon: <Person className="h-4 w-4" color="inherit" />,
  },
  {
    href: '/admin/users',
    text: 'Brukere',
    icon: <Person className="h-4 w-4" color="inherit" />,
  },
  {
    href: '/admin/memberships',
    text: 'Medlemskap',
    icon: <Person className="h-4 w-4" color="inherit" />,
  },
  {
    href: '/admin/statistics',
    text: 'Statistikk',
    icon: <Person className="h-4 w-4" color="inherit" />,
  },
];

const AdminSideNavigation = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <div
      className={`flex w-64 bg-primary rounded-r-xl p-5 h-screen transition-all duration-700 ${
        !toggled ? '!w-20' : ''
      }`}
      onClick={() => setToggled(!toggled)}
    >
      <div className="flex flex-col gap-2 w-full justify-between">
        <div className="flex flex-col gap-2 w-full items-start mt-24">
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              <a className="px-3 py-2 transition-all duration-300 hover:bg-[rgba(0,0,0,0.3)] h-10 rounded-md w-full fill-white text-white">
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
              <Person className="h-4 w-4" color="inherit" />
              <p className="ml-2 text-sm font-medium [transform:translateY(1.5px)]">
                Log ut
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
export default AdminSideNavigation;
