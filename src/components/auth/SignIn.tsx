import { API_BASE_URL } from '@/config';
import { User } from '@/types/user';
import { useState } from 'react';
import { BsGoogle } from 'react-icons/bs';

type Props = {
  email: string;
  setError: (msg: string) => void;
  setUserId: (userId: string) => void;
  setShouldCreateProfile: (value: boolean) => void;
  onEmailChange: (email: string) => void;
  onAuthSuccess: () => void;
};

const UserNotFoundErrMsg = 'User not found';

const SignIn = ({
  email,
  onEmailChange,
  setUserId,
  setShouldCreateProfile,
  onAuthSuccess,
  setError
}: Props) => {
  const [otpSent, setOTPSent] = useState(false);
  const [otp, setOTP] = useState('');

  const handleSendOTP = async () => {
    console.log('sending otp...');

    const res = await fetch(`${API_BASE_URL}/auth/send-otp`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    }).catch(err => {
      console.log('send otp err:', err.message);
      setError("Couldn't send OTP. Please try again.");
    });

    if (!res?.ok) {
      console.log('send otp err:', res);
      setError("Couldn't send OTP. Please try again.");
      return;
    }

    setOTPSent(true);
  };

  const getUserProfile = async (): Promise<[User | null, Error | null]> => {
    const errMsg = "Couldn't get user profile. Please try again.";
    try {
      const res = await fetch(`${API_BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!res?.ok && res.status !== 404) {
        console.log('get user profile err:', res);
        return [null, new Error(errMsg)];
      }

      const resData = await res.json();

      if (res.status === 404 && resData.message === UserNotFoundErrMsg) {
        return [null, new Error(UserNotFoundErrMsg)];
      }

      if (!resData.success) {
        console.log('get user profile err:', resData?.message);
        return [null, new Error(errMsg)];
      }

      const user = resData.data as User;

      return [user, null];
    } catch (err) {
      console.log('get user profile err:', err);
      return [null, new Error(errMsg)];
    }
  };

  const handleVerifyOTP = async (): Promise<[string, boolean, Error | null]> => {
    const errMsg = "Couldn't verify OTP. Please try again.";
    try {
      const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp })
      });

      if (!res?.ok) {
        console.log('verify otp err:', res);
        return ['', false, new Error(errMsg)];
      }

      const resData = await res.json();

      if (!resData.success || !resData.data.userId || !resData.data.deviceId) {
        console.log('verify otp err:', resData?.message);
        return ['', false, new Error(errMsg)];
      }

      localStorage.setItem('deviceId', resData.data.deviceId);

      return [resData.data.userId, resData.data.isNewUser, null];
    } catch (err) {
      console.log('verify otp err:', err);
      return ['', false, new Error(errMsg)];
    }
  };

  const onVerifyOTPNavigate = async () => {
    const [userId, isNewUser, errVerifyOTP] = await handleVerifyOTP();

    if (errVerifyOTP) {
      setError(errVerifyOTP.message);
      return;
    }

    setUserId(userId);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userEmail', email);

    if (isNewUser) {
      setShouldCreateProfile(true);
      return;
    }

    // get user profile
    const [user, errUserProfile] = await getUserProfile();

    if (errUserProfile && errUserProfile.message !== UserNotFoundErrMsg) {
      setError(errUserProfile.message);
      return;
    }

    if (errUserProfile && errUserProfile.message === UserNotFoundErrMsg) {
      setShouldCreateProfile(true);
      return;
    }

    if (user) {
      const userStr = JSON.stringify(user);

      console.log('🚀 ~ file: SignIn.tsx:155 ~ onVerifyOTPNavigate ~ userStr:', userStr);

      localStorage.setItem('user', userStr);
    }
  };

  return (
    <div className='flex flex-col items-center w-full'>
      <button className='w-full bg-slate-800 text-slate-100/90 font-light py-2 rounded-md flex items-center justify-center '>
        <BsGoogle className='mr-2' /> Continue with Google
      </button>

      <span className='text-slate-500 opacity-40 scale-75 py-4'>–----------- OR -----------</span>
      {!otpSent && (
        <>
          <input
            type='text'
            value={email}
            onChange={e => onEmailChange(e.target.value)}
            placeholder='ex: "manish@tabsflow.com"'
            className='w-full border text-[14px] text-slate-800 border-slate-300/60 rounded-md py-2 px-3 outline-none mb-4'
          />

          <button
            disabled={!email}
            onClick={handleSendOTP}
            className='w-full bg-slate-800 text-slate-100 font-light px-8 py-2 rounded-md flex items-center justify-center mt-4 disabled:cursor-default disabled:text-slate-300/90 disabled:bg-opacity-95'
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
            onClick={onVerifyOTPNavigate}
            className='w-full bg-slate-800 text-slate-100 font-light px-8 py-2 rounded-md flex items-center justify-center mt-4 disabled:cursor-default disabled:bg-slate-800 disabled:text-slate-300/80'
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default SignIn;
