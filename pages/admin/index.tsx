import type { NextPage } from 'next';
import Head from 'next/head';
import { AdminNavigation } from '@lib/components/Navigation';
import { useState } from 'react';
import { Person } from '@lib/icons';
import Link from 'next/link';

const Admin: NextPage = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Administrasjon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center text-center bg-slate-100">
        <div className="flex flex-row z-10 w-full">
          <div
            className={`flex w-64 bg-slate-200 rounded-r-xl p-5 h-screen transition-all duration-700 ${
              !toggled ? '!w-20' : ''
            }`}
            onClick={() => setToggled(!toggled)}
          >
            <div className="flex flex-col gap-6 w-full items-start mt-24">
              <Link href="#">
                <a
                  className={`px-3 py-2 transition-all duration-300 hover:bg-slate-400 h-10 rounded-sm w-full`}
                >
                  <div className="grid items-center text-left grid-cols-sideNavigationButton overflow-hidden">
                    <Person className="h-4 w-4" />{' '}
                    <p className="ml-2 text-sm font-medium [transform:translateY(1.5px)]">
                      Arrangementer
                    </p>
                  </div>
                </a>
              </Link>
              <Link href="#">
                <a
                  className={`px-3 py-2 transition-all duration-300 hover:bg-slate-400 h-10 rounded-sm w-full`}
                >
                  <div className="grid items-center text-left w-full grid-cols-sideNavigationButton overflow-hidden">
                    <Person className="h-4 w-4" />{' '}
                    <p className="ml-2 text-sm font-medium [transform:translateY(1.5px)]">
                      Brukere
                    </p>
                  </div>
                </a>
              </Link>
              <Link href="#">
                <a
                  className={`px-3 py-2 transition-all duration-300 hover:bg-slate-400 h-10 rounded-sm w-full`}
                >
                  <div className="grid items-center text-left w-full grid-cols-sideNavigationButton overflow-hidden">
                    <Person className="h-4 w-4" />{' '}
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
            <div className="flex flex-col p-6 w-full mt-24 gap-6">
              <div className="flex w-full gap-6 bg-white p-6">
                <div className="bg-slate-200 rounded-xl w-1/3 h-44">
                  Events quickview
                </div>
                <div className="bg-slate-200 rounded-xl w-1/3 h-44">
                  Users quickview
                </div>
                <div className="bg-slate-200 rounded-xl w-1/3 h-44">
                  Memberships quickview
                </div>
              </div>
              <div className="bg-white rounded-xl w-full h-full">
                Some statistics here
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
