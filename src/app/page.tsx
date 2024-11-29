'use client';

import Footer from '@/components/footer';
import HeaderNav from '@/components/header-nav';
import { useEffect, useState } from 'react';

const apiBaseURL = 'https://api.dev.tabsflow.com';

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleGetPreferences = async () => {
    const res = await fetch(`${apiBaseURL}/users/preferences`, {
      method: 'GET',
      credentials: 'include'
    }).catch(err => console.log('get preferences err:', err));

    if (!res?.ok) {
      console.log('get preferences err:', res);
      return;
    }

    const data = await res.json();

    console.log('get preferences success:', data);
  };
  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      setIsAuthenticated(true);
    }
  }, []);

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
