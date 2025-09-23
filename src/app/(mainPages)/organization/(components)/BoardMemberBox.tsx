import { BoardMemberType } from '../types';

export default function MemberBox({ name, role }: BoardMemberType) {
  return (
    <div className='min-w-[20vw] rounded-2xl bg-primary p-8 text-white'>
      <p className='text-xl font-bold'>{name}</p>
      <p>{role}</p>
    </div>
  );
}
