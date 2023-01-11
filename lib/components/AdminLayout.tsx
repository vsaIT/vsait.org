import { Person } from '@lib/icons';
import { ChildrenProps } from '@lib/types';
import Link from 'next/link';
import { useState } from 'react';
import { AdminNavigation } from './Navigation';

const AdminLayout = ({ children }: ChildrenProps) => {
  const [toggled, setToggled] = useState(false);

  return (
    <div className="flex flex-row z-10 w-full bg-stone-100">
      <div
        className={`flex w-64 bg-primary rounded-r-xl p-5 h-screen transition-all duration-700 ${
          !toggled ? '!w-20' : ''
        }`}
        onClick={() => setToggled(!toggled)}
      >
        <div className="flex flex-col gap-2 w-full items-start mt-24">
          <Link href="/admin/events">
            <a
              className={`px-3 py-2 transition-all duration-300 hover:bg-[rgba(0,0,0,0.3)] h-10 rounded-md w-full fill-white text-white`}
            >
              <div className="grid items-center text-left grid-cols-sideNavigationButton overflow-hidden">
                <Person className="h-4 w-4" color="inherit" />{' '}
                <p className="ml-2 text-sm font-medium [transform:translateY(1.5px)]">
                  Arrangementer
                </p>
              </div>
            </a>
          </Link>
          <Link href="/admin/users">
            <a
              className={`px-3 py-2 transition-all duration-300 hover:bg-[rgba(0,0,0,0.3)] h-10 rounded-md w-full fill-white text-white`}
            >
              <div className="grid items-center text-left w-full grid-cols-sideNavigationButton overflow-hidden">
                <Person className="h-4 w-4" color="inherit" />{' '}
                <p className="ml-2 text-sm font-medium [transform:translateY(1.5px)]">
                  Brukere
                </p>
              </div>
            </a>
          </Link>
          <Link href="/admin/memberships">
            <a
              className={`px-3 py-2 transition-all duration-300 hover:bg-[rgba(0,0,0,0.3)] h-10 rounded-md w-full fill-white text-white`}
            >
              <div className="grid items-center text-left w-full grid-cols-sideNavigationButton overflow-hidden">
                <Person className="h-4 w-4" color="inherit" />{' '}
                <p className="ml-2 text-sm font-medium [transform:translateY(1.5px)]">
                  Medlemsskap
                </p>
              </div>
            </a>
          </Link>
        </div>
      </div>
      <div className="flex relative w-full box-border h-screen">
        <AdminNavigation />
        <div className="flex flex-col p-6 w-full mt-24 gap-6">{children}</div>
      </div>
    </div>
  );
};
export default AdminLayout;
