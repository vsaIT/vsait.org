import React from 'react';
import { Button } from '@components/Button';

const Card = () => {
  return (
    <div className="w-full border rounded-3xl border-stone-300">
      <div className="grid grid-rows-[75px_minmax(0,_1fr)_100px] border-stone-300">
        <div className="flex flex-col h-full border-b border-stone-300  justify-center">
          <h1 className="text-xl font-medium text-left pl-4">Brukerinfo</h1>
        </div>
        <div className="grid grid-cols-2 border-b border-stone-300">
          <div className="grid grid-rows-3 border-r border-stone-300">
            <div className="border-b border-stone-300 text-left pl-4 py-3">
              <p className="text-stone-500">Email:</p>
              <p>epost</p>
            </div>
            <div className="border-b border-stone-300 text-left pl-4 py-3">
              <p className="text-stone-500">Navn:</p>
              <p>navn</p>
            </div>
            <div className="text-left pl-4 py-3">
              <p className="text-stone-500">Fødselsdato:</p>
              <p>fødsels</p>
            </div>
          </div>
          <div className="flex flex-col px-7">
            <div className="py-5 w-full">
              <label
                htmlFor="foodNeeds"
                className="block text-sm font-medium text-left text-stone-500 bg-white w-fit relative left-4 top-4 px-2"
              >
                Matbehov*
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

            <div className="w-full">
              <label
                htmlFor="utd"
                className="block text-sm font-medium text-left text-stone-500 bg-white w-fit relative left-4 top-4 px-2"
              >
                Utdanninginstutisjon*
              </label>
              <div className="mt-1">
                <select
                  id="utd"
                  required
                  className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out invalid:text-placeholder"
                  defaultValue=""
                >
                  <option value="" disabled hidden>
                    Velg sted
                  </option>
                  <option value="NTNU">
                    Norges teknisk-naturvitenskapelige universitet
                  </option>
                  <option value="BI">Handelshøyskolen BI</option>
                  <option value="DMMH">Dronning Mauds Minne Høgskole</option>
                  <option value="Other">Andre</option>
                  <option value="Non-student">Ikke student</option>
                </select>
              </div>
            </div>

            <div className="w-full py-5 text-left">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="foodNeeds"
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-placeholder peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Synlig brukerprofil
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div>
            <Button
              // disabled={isSubmitting}
              onClick={() => console.log('submit')}
              type="submit"
            >
              <p>Oppdater</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
