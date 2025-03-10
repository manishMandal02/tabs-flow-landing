'use client';
import { API_BASE_URL } from '@/config';
import { publishMessage } from '@/utils/post-message';
import { useEffect, useState } from 'react';

const Logout = () => {
  const [error, setError] = useState('');
  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'GET',
        credentials: 'include'
      });

      const resData = await res.json();

      if (!res.ok) {
        console.log('logout err:', resData);
        setError("Couldn't logout. Please try again.");
      }

      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('deviceId');

      publishMessage('logout');

      window.location.href = '/';
    })();
  }, []);
  return <div className='text-slate-700 text-[22px] font-light'>Logging out...</div>;
};

export default Logout;
