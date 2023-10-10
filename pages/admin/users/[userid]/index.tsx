import { Accordion } from '@components/Accordion';
import { Button } from '@components/Input';
import { AdminLayout } from '@lib/components/Admin';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

const AdminUsersView: NextPage = () => {
  const router = useRouter();
  const { userid } = router.query;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Administrasjon brukere</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center">
        {/* @ts-expect-error Server Component */}
        <AdminLayout>
          <>
            <div className="flex flex-col p-6 w-full gap-6 h-screen">
              <div className="flex w-full gap-6 bg-white p-6 rounded-xl justify-between">
                <div className="flex flex-col">
                  <h1 className="text-xl font-medium">Brukere</h1>
                  <p className="text-sm">Endre brukeren</p>
                </div>
              </div>
              <div className="bg-white rounded-xl w-full h-fit p-6">
                <div className="flex flex-col sm:flex-row w-full gap-3">
                  <div className="border border-stone-300 rounded-xl sm:w-1/2">
                    <div className="flex flex-col gap-5 p-6">
                      <p>Brukerinformasjon</p>
                      <div className="relative w-full">
                        <label
                          htmlFor="firstname"
                          className="block text-sm font-medium text-left text-stone-500 absolute bg-white left-4 -top-2 px-2"
                        >
                          Fornavn
                        </label>
                        <div className="mt-1">
                          <input
                            id="firstname"
                            type="text"
                            autoComplete="first-name"
                            placeholder="Fornavn"
                            required
                            className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
                          />
                        </div>
                      </div>

                      <div className="relative w-full">
                        <label
                          htmlFor="lastname"
                          className="block text-sm font-medium text-left text-stone-500 absolute bg-white left-4 -top-2 px-2"
                        >
                          Etternavn
                        </label>
                        <div className="mt-1">
                          <input
                            id="lastname"
                            type="text"
                            autoComplete="last-name"
                            placeholder="Etternavn"
                            required
                            className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
                          />
                        </div>
                      </div>

                      <div className="relative w-full">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-left text-stone-500 absolute bg-white left-4 -top-2 px-2"
                        >
                          E-post
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="E-post"
                            required
                            className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label
                          htmlFor="birthdate"
                          className="block text-sm font-medium text-left text-stone-500 absolute bg-white left-4 -top-2 px-2"
                        >
                          Fødselsdato
                        </label>
                        <div className="mt-1">
                          <input
                            id="birthdate"
                            type="date"
                            autoComplete="birthdate"
                            placeholder="Fødselsdato"
                            required
                            className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label
                          htmlFor="foodNeeds"
                          className="block text-sm font-medium text-left text-stone-500 absolute bg-white left-4 -top-2 px-2"
                        >
                          Matbehov
                        </label>
                        <div className="mt-1">
                          <input
                            id="foodNeeds"
                            type="text"
                            autoComplete="allergies"
                            placeholder="Matbehov"
                            className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label
                          htmlFor="student"
                          className="block text-sm font-medium text-left text-stone-500 absolute bg-white left-4 -top-2 px-2"
                        >
                          Student
                        </label>
                        <div className="mt-1">
                          <select
                            id="student"
                            required
                            className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out invalid:text-placeholder"
                            defaultValue=""
                          >
                            <option value="" disabled hidden>
                              Velg student informasjon
                            </option>
                            <option value="NTNU">
                              Norges teknisk-naturvitenskapelige universitet
                            </option>
                            <option value="BI">Handelshøyskolen BI</option>
                            <option value="DMMH">
                              Dronning Mauds Minne Høgskole
                            </option>
                            <option value="Other">Andre</option>
                            <option value="Non-student">Ikke student</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <p>Medlemskap informasjon</p>
                        <div className="flex gap-4">
                          <div className="rounded-2xl bg-neutral-100 px-6 py-2">
                            2021
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <p>Avventende medlemskap</p>
                        <div className="w-full py-5 text-left">
                          <label
                            className="relative inline-flex items-center cursor-pointer"
                            htmlFor="publicProfile"
                          >
                            <input
                              id="publicProfile"
                              type="checkbox"
                              className="sr-only peer"
                            />
                            <div
                              className="w-11 h-6 bg-placeholder peer-focus:outline-none peer-focus:ring-4
                  rounded-full peer peer-checked:after:translate-x-full
                  peer-checked:after:border-white after:content-[''] after:absolute
                  after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300
                 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
                            ></div>
                            <span className="ml-3 text-sm font-medium text-gray-900">
                              Avventende medlemskap
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border border-stone-300 rounded-xl p-6 h-fit sm:w-1/2">
                    <div>
                      <div>
                        <p>E-postbekreftelse</p>
                        <div className="w-full py-5 text-left">
                          <label
                            className="relative inline-flex items-center cursor-pointer"
                            htmlFor="membership"
                          >
                            <input
                              id="membership"
                              type="checkbox"
                              className="sr-only peer"
                            />
                            <div
                              className="w-11 h-6 bg-placeholder peer-focus:outline-none peer-focus:ring-4
                  rounded-full peer peer-checked:after:translate-x-full
                  peer-checked:after:border-white after:content-[''] after:absolute
                  after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300
                 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
                            ></div>
                            <span className="ml-3 text-sm font-medium text-gray-900">
                              Ikke bekreftet/Bekreftet
                            </span>
                          </label>
                        </div>
                        <p>E-postbekreftelses URL:</p>
                        <input
                          id="email-confirm"
                          type="text"
                          className="border-2 border-stone-300 rounded-xl w-full outline-none p-1 text-sm text-left leading-6 bg-transparent transition duration-150 ease-in-out"
                        />
                        <div>Rolle</div>
                      </div>
                      {/* @ts-expect-error Server Component */}
                      <Accordion
                        label="Endre passord"
                        labelClassName="text-xl font-medium text-left pl-2 py-4"
                        buttonClassName="bg-neutral-50 shadow-md"
                      >
                        <form className="sm:mx-28 py-4 px-4 sm:my-10">
                          <div className="sm:mx-5">
                            <label
                              htmlFor="new-password"
                              className="block text-sm font-medium text-left text-stone-500 bg-white w-fit left-4 top-3 px-2 relative"
                            >
                              Nytt passord*
                            </label>
                            <input
                              id="new-password"
                              minLength={8}
                              type="password"
                              className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
                            />
                          </div>

                          <div className="sm:mx-5">
                            <label
                              htmlFor="confirm-password"
                              className="block text-sm font-medium text-left text-stone-500 bg-white w-fit left-4 top-3 px-2 relative"
                            >
                              Bekreft nytt passord*
                            </label>
                            <input
                              id="confirm-password"
                              minLength={8}
                              type="password"
                              className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
                            />
                          </div>

                          <div className="flex flex-col justify-center h-16 my-5">
                            <div className="my-10">
                              {/* @ts-expect-error Server Component */}
                              <Button
                                type="submit"
                                text="Bytt passord"
                                className="bg-light"
                              />
                            </div>
                          </div>
                        </form>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </AdminLayout>
      </main>
    </div>
  );
};

export default AdminUsersView;
