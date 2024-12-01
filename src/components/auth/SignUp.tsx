import { API_BASE_URL } from '@/config';
import { User } from '@/types/user';
import React from 'react';

type Props = {
  user: User;
  onAuthSuccess: () => void;
  setError: (msg: string) => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
};

const createUserProfile = async (user: User): Promise<[boolean, Error | null]> => {
  const errMsg = "Couldn't create user profile. Please try again.";

  try {
    const res = await fetch(`${API_BASE_URL}/users/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).catch(err => console.log('create user profile err:', err.message));

    if (!res?.ok) {
      console.log('create user profile err:', res);
      return [false, new Error(errMsg)];
    }

    const resData = await res.json();

    if (!resData.success) {
      console.log('create user profile err:', resData?.message);
      return [false, new Error(errMsg)];
    }

    return [true, null];
  } catch (err) {
    console.log('create user profile err:', err);
    return [false, new Error(errMsg)];
  }
};

const SignUp = ({ user, setFirstName, setLastName, setError, onAuthSuccess }: Props) => {
  const handleCreateUserProfile = async () => {
    const [success, err] = await createUserProfile(user);

    if (err) {
      setError(err.message);
      return;
    }

    if (!success) {
      setError("Couldn't create profile, try again.");
    }

    localStorage.setItem('user', JSON.stringify(user));
    onAuthSuccess();
  };
  return (
    <div>
      <input
        type='text'
        readOnly
        disabled
        value={user.email}
        placeholder='ex: "manish@tabsflow.com"'
        className='w-full border text-[14px] text-slate-800 border-slate-300/60 rounded-md py-2 px-3 outline-none mb-4 disabled:cursor-default'
      />
      <input
        type='text'
        value={user.firstName}
        onChange={e => setFirstName(e.target.value)}
        placeholder='ex: "Manish"'
        className='w-full border text-[14px] text-slate-800 border-slate-300/60 rounded-md py-2 px-3 outline-none mb-4'
      />
      <input
        type='text'
        value={user.lastName}
        onChange={e => setLastName(e.target.value)}
        placeholder='ex: "Mandal"'
        className='w-full border text-[14px] text-slate-800 border-slate-300/60 rounded-md py-2 px-3 outline-none mb-4'
      />
      <button
        disabled={!user.firstName || !user.lastName}
        onClick={handleCreateUserProfile}
        className='w-full bg-slate-800 text-slate-100 font-light px-8 py-2 rounded-md flex items-center justify-center mt-4 disabled:cursor-default disabled:bg-slate-800 disabled:text-slate-300/80'
      >
        Create Profile
      </button>
    </div>
  );
};

export default SignUp;
