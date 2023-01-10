import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import router from 'next/router';

const WithAuth = ({ children, options }: any) => {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  useEffect(() => {
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

  return children;
};

export default WithAuth;
