import { AdminEventsProps } from '../eventsTypes';

function AdminEventsEdit({ params }: AdminEventsProps): JSX.Element {
  const { eventid } = params;

  return (
    <>
      <div className='flex w-full rounded-2xl bg-white p-6 shadow-2xl'>
        <h1 className='text-6xl font-bold'>
          Welcome to the admin arrangementer {eventid}
        </h1>
      </div>
    </>
  );
}

export default AdminEventsEdit;
