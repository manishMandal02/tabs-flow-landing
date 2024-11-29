'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BsGoogle } from 'react-icons/bs';

const apiBaseURL = 'https://api.dev.tabsflow.com';

const page = () => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');

  const [otpSent, setOTPSent] = useState(false);

  const { push } = useRouter();

  const handlerSendOTP = async () => {
    console.log('sending otp...');

    const res = await fetch(`${apiBaseURL}/auth/send-otp`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    }).catch(err => console.log('sent otp err:', err.message));

    if (!res?.ok) {
      console.log('otp sent successfully.');

      return;
    }

    setOTPSent(true);
  };

  const handleVerifyOTP = async () => {
    const res = await fetch(`${apiBaseURL}/auth/verify-otp`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, otp })
    }).catch(err => console.log('verify otp err:', err.message));

    if (!res?.ok) {
      console.log('verify otp err:', res);
      return;
    }

    const resData = await res.json();

    if (!resData.success) {
      console.log('verify otp err:', resData?.message);
      return;
    }

    localStorage.setItem('userId', resData.data.userId);

    console.log('is new user:', resData.data.isNewUser);

    // setTimeout(() => {
    //   push('/');
    // }, 3000);
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
        <div className='w-[300px] flex items-center justify-center flex-col'>
          <h1 className='text-lg text-slate-500/80 mb-16'>Start For Free</h1>

          <button className='w-full bg-slate-800 text-slate-100/90 font-light py-2 rounded-md flex items-center justify-center '>
            <BsGoogle className='mr-2' /> Continue with Google
          </button>

          <span className='text-slate-500 opacity-40 scale-75 py-4'>–----------- OR -----------</span>
          {!otpSent && (
            <>
              <input
                type='text'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Enter your email'
                className='w-full border text-[14px] text-slate-800 border-slate-300/60 rounded-md py-2 px-3 outline-none mb-4'
              />

              <button
                disabled={!email}
                onClick={handlerSendOTP}
                className='w-full bg-slate-800 text-slate-100 font-light px-8 py-2 rounded-md flex items-center justify-center mt-4 disabled:cursor-not-allowed disabled:text-slate-300/90 disabled:bg-opacity-95'
              >
                Send OTP
              </button>
            </>
          )}

          {otpSent && (
            <div className='w-full flex flex-col items-center'>
              <input
                value={otp}
                onChange={e => setOTP(e.target.value)}
                type='text'
                placeholder='Enter OTP'
                className='w-full border text-[14px] text-slate-800 border-slate-300/60 rounded-md py-2 px-3 outline-none mb-4'
              />
              <button
                disabled={!otp}
                onClick={handleVerifyOTP}
                className='w-full bg-slate-800 text-slate-100 font-light px-8 py-2 rounded-md flex items-center justify-center mt-4 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-300/80'
              >
                Verify OTP
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
