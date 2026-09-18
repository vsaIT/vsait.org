import { BoardMemberType } from '../types';

export default function MemberBox({ name, role }: BoardMemberType) {
  return (
    <div className='relative flex h-full flex-col overflow-hidden rounded-2xl bg-primary p-5 text-left text-white'>
      <div
        aria-hidden
        className='pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-white/20'
      />
      <div className='relative min-h-[3.625rem]'>
        <p className='text-sm leading-5'>{name}</p>
        <p className='mt-0.5 text-xs text-white/75'>{role}</p>
      </div>
    </div>
  );
}
