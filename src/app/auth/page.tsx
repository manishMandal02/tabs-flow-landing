'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { SignIn, SignUp } from '@/components/auth';

const Page = () => {
  const { push } = useRouter();
  const query = useSearchParams();
  const authType = query.get('type');
  const refQuery = query.get('ref');

  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePic] = useState('');

  const [shouldCreateProfile, setShouldCreateProfile] = useState<boolean | undefined>(undefined);

  const [error, setError] = useState('');

  useEffect(() => {
    const userStr = localStorage.getItem('user') as string;
    const userObj = JSON.parse(userStr);
    const userIdStorage = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');
    const deviceId = localStorage.getItem('deviceId');

    if (userObj) {
      window.postMessage({ ...userObj, deviceId }, '*');
      if (refQuery) {
        push(`/?ref=${refQuery}`);
      } else {
        push('/');
      }
      return;
    }

    if (!userStr && userEmail && userIdStorage) {
      setUserId(userIdStorage);
      setEmail(userEmail);
      setShouldCreateProfile(true);
    } else {
      setShouldCreateProfile(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {shouldCreateProfile != undefined ? (
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

export default Page;
