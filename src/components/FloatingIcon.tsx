type FloatingIconProps = {
  className?: string;
  children: React.ReactNode;
};

export default function FloatingIcon({
  className = '',
  children,
}: FloatingIconProps) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute block motion-safe:animate-float motion-safe:will-change-transform ${className}`}
    >
      {children}
    </span>
  );
}
