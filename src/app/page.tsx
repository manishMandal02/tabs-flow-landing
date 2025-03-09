'use client';

import Footer from '@/components/footer';
import HeaderNav from '@/components/header-nav';
import { User } from '@/types/user';
import { publishMessage } from '@/utils/post-message';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const apiBaseURL = 'https://api.dev.tabsflow.com';

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const ref = searchParams.get('ref');

  const handleGetPreferences = async () => {
    const res = await fetch(`${apiBaseURL}/users/preferences`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch(err => console.log('get preferences err:', err));

    if (!res?.ok) {
      console.log('get preferences err:', res);
      return;
    }

    const data = await res.json();

    console.log('get preferences success:', data);
  };

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      setIsAuthenticated(true);
      if (ref === 'extension') {
        const parsedUser = JSON.parse(user);
        const deviceId = localStorage.getItem('deviceId');

        publishMessage('login', { ...parsedUser, deviceId });

        const q = new URLSearchParams(searchParams.toString());
        q.delete('ref');
        const newPath = q.size > 0 ? `${pathname}?${q}` : pathname;
        router.replace(newPath);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [pathname, searchParams, ref, router]);

  useEffect(() => {
    if (!isAuthenticated) return;

    handleGetPreferences();
  }, [isAuthenticated]);

  return (
    <>
      {/* seo */}
      <HeaderNav isAuthed={isAuthenticated} />
      <div className='bg-slate-100/90 h-screen'>Landing Page</div>
      <Footer />
    </>
  );
}
