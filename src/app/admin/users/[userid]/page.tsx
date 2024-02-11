import { Accordion } from '@/components/Accordion';
import { Button } from '@/components/Input';

type AdminUsersViewProps = {
  params: { userid: string };
};

function AdminUsersView({ params }: AdminUsersViewProps): JSX.Element {
  const userid = params.userid;
  console.log(userid);

  return (
    <>
      <div className='flex h-screen w-full flex-col gap-6 p-6'>
        <div className='flex w-full justify-between gap-6 rounded-xl bg-white p-6'>
          <div className='flex flex-col'>
            <h1 className='text-xl font-medium'>Brukere</h1>
            <p className='text-sm'>Endre brukeren</p>
          </div>
        </div>
        <div className='h-fit w-full rounded-xl bg-white p-6'>
          <div className='flex w-full flex-col gap-3 sm:flex-row'>
            <div className='rounded-xl border border-stone-300 sm:w-1/2'>
              <div className='flex flex-col gap-5 p-6'>
                <p>Brukerinformasjon</p>
                <div className='relative w-full'>
                  <label
                    htmlFor='firstname'
                    className='absolute -top-2 left-4 block bg-white px-2 text-left text-sm font-medium text-stone-500'
                  >
                    Fornavn
                  </label>
                  <div className='mt-1'>
                    <input
                      id='firstname'
                      type='text'
                      autoComplete='first-name'
                      placeholder='Fornavn'
                      required
                      className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
                    />
                  </div>
                </div>

                <div className='relative w-full'>
                  <label
                    htmlFor='lastname'
                    className='absolute -top-2 left-4 block bg-white px-2 text-left text-sm font-medium text-stone-500'
                  >
                    Etternavn
                  </label>
                  <div className='mt-1'>
                    <input
                      id='lastname'
                      type='text'
                      autoComplete='last-name'
                      placeholder='Etternavn'
                      required
                      className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
                    />
                  </div>
                </div>

                <div className='relative w-full'>
                  <label
                    htmlFor='email'
                    className='absolute -top-2 left-4 block bg-white px-2 text-left text-sm font-medium text-stone-500'
                  >
                    E-post
                  </label>
                  <div className='mt-1'>
                    <input
                      id='email'
                      type='email'
                      autoComplete='email'
                      placeholder='E-post'
                      required
                      className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
                    />
                  </div>
                </div>

                <div className='relative'>
                  <label
                    htmlFor='birthdate'
                    className='absolute -top-2 left-4 block bg-white px-2 text-left text-sm font-medium text-stone-500'
                  >
                    Fødselsdato
                  </label>
                  <div className='mt-1'>
                    <input
                      id='birthdate'
                      type='date'
                      autoComplete='birthdate'
                      placeholder='Fødselsdato'
                      required
                      className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
                    />
                  </div>
                </div>

                <div className='relative'>
                  <label
                    htmlFor='foodNeeds'
                    className='absolute -top-2 left-4 block bg-white px-2 text-left text-sm font-medium text-stone-500'
                  >
                    Matbehov
                  </label>
                  <div className='mt-1'>
                    <input
                      id='foodNeeds'
                      type='text'
                      autoComplete='allergies'
                      placeholder='Matbehov'
                      className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
                    />
                  </div>
                </div>

                <div className='relative'>
                  <label
                    htmlFor='student'
                    className='absolute -top-2 left-4 block bg-white px-2 text-left text-sm font-medium text-stone-500'
                  >
                    Student
                  </label>
                  <div className='mt-1'>
                    <select
                      id='student'
                      required
                      className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out invalid:text-placeholder'
                      defaultValue=''
                    >
                      <option value='' disabled hidden>
                        Velg student informasjon
                      </option>
                      <option value='NTNU'>
                        Norges teknisk-naturvitenskapelige universitet
                      </option>
                      <option value='BI'>Handelshøyskolen BI</option>
                      <option value='DMMH'>
                        Dronning Mauds Minne Høgskole
                      </option>
                      <option value='Other'>Andre</option>
                      <option value='Non-student'>Ikke student</option>
                    </select>
                  </div>
                </div>

                <div className='flex flex-col gap-2'>
                  <p>Medlemskap informasjon</p>
                  <div className='flex gap-4'>
                    <div className='rounded-2xl bg-neutral-100 px-6 py-2'>
                      2021
                    </div>
                  </div>
                </div>

                <div className='flex flex-col'>
                  <p>Avventende medlemskap</p>
                  <div className='w-full py-5 text-left'>
                    <label
                      className='relative inline-flex cursor-pointer items-center'
                      htmlFor='publicProfile'
                    >
                      <input
                        id='publicProfile'
                        type='checkbox'
                        className='peer sr-only'
                      />
                      <div
                        className="after:border-gray-300 peer h-6 w-11 rounded-full
                  bg-placeholder after:absolute after:left-[2px]
                  after:top-[2px] after:h-5 after:w-5
                  after:rounded-full after:bg-white after:transition-all after:content-['']
                 peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4"
                      ></div>
                      <span className='text-gray-900 ml-3 text-sm font-medium'>
                        Avventende medlemskap
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className='h-fit rounded-xl border border-stone-300 p-6 sm:w-1/2'>
              <div>
                <div>
                  <p>E-postbekreftelse</p>
                  <div className='w-full py-5 text-left'>
                    <label
                      className='relative inline-flex cursor-pointer items-center'
                      htmlFor='membership'
                    >
                      <input
                        id='membership'
                        type='checkbox'
                        className='peer sr-only'
                      />
                      <div
                        className="after:border-gray-300 peer h-6 w-11 rounded-full
                  bg-placeholder after:absolute after:left-[2px]
                  after:top-[2px] after:h-5 after:w-5
                  after:rounded-full after:bg-white after:transition-all after:content-['']
                 peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4"
                      ></div>
                      <span className='text-gray-900 ml-3 text-sm font-medium'>
                        Ikke bekreftet/Bekreftet
                      </span>
                    </label>
                  </div>
                  <p>E-postbekreftelses URL:</p>
                  <input
                    id='email-confirm'
                    type='text'
                    className='w-full rounded-xl border-2 border-stone-300 bg-transparent p-1 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
                  />
                  <div>Rolle</div>
                </div>

                <Accordion
                  label='Endre passord'
                  labelClassName='text-xl font-medium text-left pl-2 py-4'
                  buttonClassName='bg-neutral-50 shadow-md'
                >
                  <form className='px-4 py-4 sm:mx-28 sm:my-10'>
                    <div className='sm:mx-5'>
                      <label
                        htmlFor='new-password'
                        className='relative left-4 top-3 block w-fit bg-white px-2 text-left text-sm font-medium text-stone-500'
                      >
                        Nytt passord*
                      </label>
                      <input
                        id='new-password'
                        minLength={8}
                        type='password'
                        className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
                      />
                    </div>

                    <div className='sm:mx-5'>
                      <label
                        htmlFor='confirm-password'
                        className='relative left-4 top-3 block w-fit bg-white px-2 text-left text-sm font-medium text-stone-500'
                      >
                        Bekreft nytt passord*
                      </label>
                      <input
                        id='confirm-password'
                        minLength={8}
                        type='password'
                        className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
                      />
                    </div>

                    <div className='my-5 flex h-16 flex-col justify-center'>
                      <div className='my-10'>
                        <Button
                          type='submit'
                          text='Bytt passord'
                          className='bg-light'
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
  );
}

export default AdminUsersView;
