'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { SignIn, SignUp } from '@/components/auth';

const page = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const [shouldCreateProfile, setShouldCreateProfile] = useState(false);

  const [error, setError] = useState('');

  const { push } = useRouter();
  const query = useSearchParams();
  const authType = query.get('type');

  useEffect(() => {
    let user = localStorage.getItem('user') as string;
    user = JSON.parse(user);
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');

    if (user) {
      window.postMessage(user, '*');
      push('/');
      return;
    }

    if (!user && userEmail && userId) {
      setUserId(userId);
      setEmail(userEmail);
      setShouldCreateProfile(true);
    }
  }, []);

  const handleAuthSuccess = () => {
    let user = localStorage.getItem('user') as string;
    user = JSON.parse(user);

    window.postMessage(user, '*');

    push('/');
  };

  return (
    <div className='w-screen h-screen bg-slate-100 flex'>
      {/* left: app info section */}
      <div className='w-[60%] h-full bg-gradient-to-br from-teal-600 to-emerald-600 flex items-center justify-center'>
        <div className='text-4xl font-medium text-slate-200 tracking-wide flex items-center justify-center'>
          <Image src={'/icon.png'} alt='logo' width={28} height={52} className='mr-2' />
          TabsFlow
        </div>
      </div>

      {/* right: auth form */}
      <div className='w-[40%] h-full flex items-center justify-start flex-col pt-24'>
        {false ? (
          <div className='w-[300px] flex items-center justify-center flex-col'>
            <h1 className='text-lg text-slate-500/80 mb-16'>
              {authType === 'signup' ? 'Start For Free' : 'Welcome back!!'}
            </h1>

            {!shouldCreateProfile ? (
              <SignIn
                email={email}
                onEmailChange={setEmail}
                setError={setError}
                setUserId={setUserId}
                onAuthSuccess={handleAuthSuccess}
                setShouldCreateProfile={setShouldCreateProfile}
              />
            ) : (
              <SignUp
                setError={setError}
                setFirstName={setFirstName}
                setLastName={setLastName}
                onAuthSuccess={handleAuthSuccess}
                user={{ id: userId, email, firstName, lastName, profilePic }}
              />
            )}

            {/* error */}
            {error ? (
              <div className='bg-rose-400 text-slate-700 px-4 py-2 rounded-sm text-[14px] mt-4'>{error}</div>
            ) : null}
          </div>
        ) : (
          <p className='text-slate-700 text-[16px] mt-12'>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default page;
