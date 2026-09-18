'use client';
import { useEffect, useState } from 'react';

export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard access can be blocked;
    }
  };

  return (
    <button
      type='button'
      onClick={copy}
      className='rounded-full border border-primary px-2.5 py-0.5 text-[0.625rem] text-primary transition-all duration-300 hover:bg-primary hover:text-white'
    >
      {copied ? 'Kopiert' : 'Kopier'}
    </button>
  );
}
