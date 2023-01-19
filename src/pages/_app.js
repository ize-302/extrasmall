import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import * as React from 'react';
import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';
import { supabase } from '@/supabase/api';

import '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [supabaseClient] = React.useState(() => createBrowserSupabaseClient());
  const [user, setuser] = React.useState({});
  const router = useRouter();

  React.useEffect(() => {
    const getProfile = async () => {
      const profile = await supabase.auth.getUser();

      if (profile) {
        setuser(profile?.data?.user);
      } else {
        router.push('/signin');
      }
    };

    getProfile();
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <UserContext.Provider
        value={{
          user,
          setuser,
          logout,
        }}
      >
        <Component {...pageProps} />
      </UserContext.Provider>
    </SessionContextProvider>
  );
}

export default MyApp;
