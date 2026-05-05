type Size = 'sm' | 'md' | 'lg';

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-2xl',
  md: 'px-6 py-2 text-3xl',
  lg: 'px-8 py-3 text-4xl',
};

const CancelledBadge = ({
  size = 'md',
  className = '',
}: {
  size?: Size;
  className?: string;
}) => (
  <div
    className={`-rotate-12 rounded-lg border-4 border-white bg-red-700 font-bold text-white shadow-xl ${sizeClasses[size]} ${className}`}
  >
    AVLYST
  </div>
);

export default CancelledBadge;
