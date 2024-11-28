import { useEffect, useState } from 'react';
import { BsGoogle } from 'react-icons/bs';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');

  const [otpSent, setOTPSent] = useState(false);

  const apiBaseURL = 'https://api.dev.tabsflow.com';

  const handlerSendOTP = async () => {
    console.log('sending otp...');

    const res = await fetch(`${apiBaseURL}/auth/send-otp`, {
      method: 'POST',
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, otp })
    }).catch(err => console.log('verify otp err:', err.message));

    if (!res?.ok) {
      console.log('verify otp err:', res);
      return;
    }

    console.log('verify otp success:', res);
  };

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
    handleGetPreferences();
  }, []);

  return (
    <div className='w-full pt-1 pb-2 text-center flex flex-col items-center'>
      <h1 className='text-lg text-slate-500/80 mb-4'>Start For Free</h1>

      <button className='w-[80%] bg-slate-800 text-slate-100/90 font-light py-2 rounded-md flex items-center justify-center '>
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
            className='w-[70%] border text-[14px] text-slate-800 border-slate-300/60 rounded-md py-2 px-3 outline-none mb-4'
          />

          <button
            disabled={!email}
            onClick={handlerSendOTP}
            className='w-[75%] bg-slate-800 text-slate-100 font-light px-8 py-2 rounded-md flex items-center justify-center mt-4 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-300/80'
          >
            Send OTP
          </button>
        </>
      )}

      {otpSent && (
        <div className='w-[75%] flex flex-col items-center'>
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
  );
};

export default Auth;
