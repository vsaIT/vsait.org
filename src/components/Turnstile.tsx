'use client';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      'expired-callback': () => void;
      'error-callback': () => void;
    }
  ) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type TurnstileProps = {
  // Public site key, passed down from the server. Without one nothing renders
  siteKey?: string;
  // Gets the token once the check passes, and null when it expires or fails
  onToken: (token: string | null) => void;
};

// Cloudflare's bot check.
const Turnstile = ({ siteKey, onToken }: TurnstileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!siteKey || !scriptReady || !container || !window.turnstile) return;
    const widgetId = window.turnstile.render(container, {
      sitekey: siteKey,
      callback: (token) => onToken(token),
      'expired-callback': () => onToken(null),
      'error-callback': () => onToken(null),
    });
    return () => window.turnstile?.remove(widgetId);
  }, [siteKey, scriptReady, onToken]);

  if (!siteKey) return null;

  return (
    <>
      <Script
        src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
        onReady={() => setScriptReady(true)}
      />
      <div ref={containerRef} className='mt-5' />
    </>
  );
};

export default Turnstile;
