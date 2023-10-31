import { useSession, signIn } from 'next-auth/react';
import { useLayoutEffect } from 'react';
import router from 'next/router';
import { AuthenticatedPage } from '@lib/types';

type WithAuthProps = {
  children: React.ReactNode;
  options?: AuthenticatedPage;
};

const WithAuth = ({ children, options }: WithAuthProps) => {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  useLayoutEffect(() => {
    // Do nothing while loading
    if (status === 'loading') {
      return;
    }

    // If not authenticated, redirect to provided url or
    if (!isUser) {
      if (options?.redirectTo) {
        router.push(options.redirectTo);
      } else {
        signIn();
      }
    }
  }, [isUser, status]);

  return <>{children}</>;
};

export default WithAuth;
