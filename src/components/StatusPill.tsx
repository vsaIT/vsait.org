export default function StatusPill({
  active = false,
  children,
}: {
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-xs ${
        active ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-100 text-gray'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
          active ? 'bg-emerald-500' : 'bg-stone-400'
        }`}
      />
      {children}
    </span>
  );
}
