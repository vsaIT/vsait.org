import { Button } from '@components/Button';
import { Select } from '@components/Select';
import { ApiResponseType, CardProps } from '@lib/types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type UserFormValues = {
  foodNeeds: string;
  student: string;
  publicProfile: boolean;
};

const studentSelectOptions = [
  { value: 'NTNU', label: 'Norges teknisk-naturvitenskapelige universitet' },
  { value: 'BI', label: 'Handelshøyskolen BI' },
  { value: 'DMMH', label: 'Dronning Mauds Minne Høgskole' },
  { value: 'Non-student', label: 'Ikke student' },
  { value: 'Other', label: 'Andre' },
];

const Card = ({ user, session }: CardProps) => {
  const { register, handleSubmit, setValue } = useForm<UserFormValues>();

  // Can wrap with useCallback
  const updateUserData = async (data: UserFormValues) => {
    console.log(data);
    await fetch(`/api/user/${session?.user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error(response.statusText);
        const data: ApiResponseType = await response.json();
        if (data.statusCode === 200) return data;
        else throw new Error(data.message);
      })
      .then((data) => {
        console.log(data);
      })
      .catch((_error) => {
        window.location.href = '/500';
      });
  };

  useEffect(() => {
    if (user.id === '') return;
    setValue('foodNeeds', user.foodNeeds);
    setValue('student', user.student);
    setValue('publicProfile', user.publicProfile);
  }, [user]);

  return (
    <>
      <div className="w-full border rounded-3xl border-stone-300">
        <form onSubmit={handleSubmit(updateUserData)}>
          <div className="flex flex-col border-stone-300">
            <div className="flex flex-col h-16 border-b border-stone-300  justify-center">
              <h1 className="text-xl font-medium text-left pl-4">
                Brukerinformasjon
              </h1>
            </div>
            <div className="flex flex-col sm:grid sm:grid-cols-2 border-b border-stone-300">
              <div className="grid grid-rows-3 border-r border-stone-300">
                <div className="border-b border-stone-300 text-left pl-4 py-5 h-fit">
                  <p className="text-stone-500">Navn:</p>
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <div className="border-b border-stone-300 text-left pl-4 py-5 h-fit">
                  <p className="text-stone-500">E-post:</p>
                  <p>{user.email}</p>
                </div>
                <div className="border-b border-stone-300 sm:border-0 text-left pl-4 py-5 h-fit">
                  <p className="text-stone-500">Fødselsdato:</p>
                  <p>{user.birthdate}</p>
                </div>
              </div>
              <div className="flex flex-col px-12 my-5">
                <div className="pb-3">
                  <label
                    htmlFor="foodNeeds"
                    className="block text-sm font-medium text-left text-stone-500 bg-white w-fit relative left-4 top-3 px-2"
                  >
                    Matbehov
                  </label>
                  <div>
                    <input
                      id="foodNeeds"
                      type="text"
                      {...register('foodNeeds')}
                      autoComplete="allergies"
                      placeholder={
                        user.foodNeeds === ''
                          ? 'Matallergi og intoleranse'
                          : user.foodNeeds
                      }
                      className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
                    />
                  </div>
                </div>

                <div className="pb-3">
                  <label
                    htmlFor="education"
                    className="block text-sm font-medium text-left text-stone-500 bg-white w-fit relative left-4 top-3 px-2"
                  >
                    Utdanningsinstutisjon*
                  </label>
                  <div>
                    <Select
                      id="student"
                      options={studentSelectOptions}
                      register={register}
                    />
                  </div>
                </div>

                <div className="w-full py-5 text-left">
                  <label
                    className="relative inline-flex items-center cursor-pointer"
                    htmlFor="publicProfile"
                  >
                    <input
                      id="publicProfile"
                      type="checkbox"
                      className="sr-only peer"
                      {...register('publicProfile')}
                    />
                    <div
                      className="w-11 h-6 bg-placeholder peer-focus:outline-none peer-focus:ring-4
                  rounded-full peer peer-checked:after:translate-x-full
                  peer-checked:after:border-white after:content-[''] after:absolute
                  after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300
                 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
                    ></div>
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      Synlig brukerprofil
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center h-16 my-5">
              <div className="my-10">
                <Button type="submit" text="Oppdater" className="bg-light" />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="flex flex-col w-full border rounded-3xl border-stone-300 mt-10">
        <div className="flex flex-col border-b h-16 border-stone-300 justify-center">
          <h1 className="text-xl font-medium text-left pl-4">Medlemskap</h1>
        </div>
        <div className="flex flex-col border-b border-stone-300 text-left pl-4 py-5 h-fit">
          <p className="text-stone-500">Status:</p>
          <p>Medlemskap bekreftet for 2022</p>
        </div>
        <div className="flex flex-col text-left pl-4 py-5 h-fit">
          <p className="text-stone-500">Tidligere medlemskap:</p>
          <p>2022</p>
        </div>
      </div>

      <div className="flex flex-col border rounded-3xl border-stone-300 mt-10">
        <div className="flex flex-col h-16 border-b border-stone-300 justify-center">
          <h1 className="text-xl font-medium text-left pl-4">Endre passord</h1>
        </div>

        <div className="sm:mx-28 py-4 px-4 sm:my-10">
          <div className="sm:mx-5">
            <label
              htmlFor="old-password"
              className="block text-sm font-medium text-left text-stone-500 bg-white w-fit left-4 top-3 px-2 relative"
            >
              Nåværende passord*
            </label>
            <input
              id="old-password"
              type="password"
              className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
            />
          </div>

          <div className="sm:mx-5">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-left text-stone-500 bg-white w-fit left-4 top-3 px-2 relative"
            >
              Nytt passord*
            </label>
            <input
              id="new-password"
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
              type="password"
              className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
            />
          </div>

          <div className="flex flex-col bg-red-100 text-left text-stone-500 sm:m-5 p-5 mt-5 rounded-2xl w-fit text-sm sm:text-base">
            <p>
              Passordet ditt kan ikke være for likt dine andre
              personopplysninger.
            </p>
            <p>Passordet ditt må bestå av minst 8 tegn.</p>
            <p>Passordet ditt kan ikke være et ofte brukt passord.</p>
            <p>Passordet ditt kan ikke inneholde bare tall.</p>
          </div>

          <div className="flex flex-col justify-center h-16 my-5">
            <div className="my-10">
              <Button
                // disabled={isSubmitting}
                onClick={() => console.log('submit')}
                type="submit"
                text="Bytt passord"
                className="bg-light"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col border rounded-3xl border-stone-300 mt-10">
        <div className="flex flex-col h-16 border-b border-stone-300 justify-center">
          <h1 className="text-xl font-medium text-left pl-4">Statistikk</h1>
        </div>

        <div className="px-4 py-4 h-60 flex flex-col  justify-evenly">
          <div className="">
            <p>Du har vært med på 16 arrangementer så langt!</p>
          </div>

          <div className="border rounded-3xl border-stone-200 bg-stone-200 shadow-md shadow-stone-300 py-3 w-full">
            Arrangement
          </div>

          <div className="flex flex-col justify-center h-16 my-5">
            <div className="my-10">
              <Button
                // disabled={isSubmitting}
                onClick={() => console.log('submit')}
                type="submit"
                text="Vis mer"
                className="border-light border-2"
                inverted
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-16 my-5">
        <div className="my-10">
          <Button
            // disabled={isSubmitting}
            onClick={() => console.log('submit')}
            type="submit"
            text="Logg ut"
            className="bg-light"
          />
        </div>
      </div>
    </>
  );
};

export default Card;
