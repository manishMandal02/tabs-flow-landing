import Image from 'next/image';
import React from 'react';

import { BsTwitterX, BsLinkedin, BsGithub, BsGlobe } from 'react-icons/bs';

const Footer = () => {
  return (
    <div className='px-16 h-[6%] bg-slate-100 flex items-center justify-between border-t border-slate-200/50 w-full relative'>
      <ul className='flex items-center select-none'>
        <Image src={'/icon.png'} alt='logo' width={22} height={16} className='opacity-55' />
        <span className='text-slate-500 ml-1 '>TabsFlow</span>
      </ul>
      <ul className='flex items-center gap-x-4 ml-16'>
        <a
          href='/privacy'
          className='text-slate-600 font-light text-sm transition-all duration-300 hover:underline'
        >
          Privacy
        </a>
        {/* <a
          href='/github'
          className='text-slate-600 font-light text-sm transition-all duration-300 hover:underline'
        >
          Open Source
        </a> */}
        <a
          href='/chrome'
          className='text-slate-600 font-light text-sm transition-all duration-300 hover:underline'
        >
          Chrome Web Store
        </a>
      </ul>

      <ul className='flex items-center gap-x-5 text-slate-700'>
        {/* <span className='text-slate-700 font-light text-sm -mb-px'>
          by{' '}
          <a
            target='_blank'
            href='https://manishmandal.com'
            className='transition-all duration-300 hover:underline'
          >
            Manish Mandal
          </a>
        </span> */}

        <a target='_blank' href='https://twitter.com/manishMandalJ' className='-ml-1'>
          <BsTwitterX />
        </a>
        <a target='_blank' href='https://www.linkedin.com/in/manish-mandal' className='scale-105'>
          <BsLinkedin />
        </a>
        <a target='_blank' href='https://github.com/manishMandal02' className='scale-110'>
          <BsGithub />
        </a>
        <a target='_blank' href='https://manishmandal.com' className=' scale-105 opacity-60 -ml-px'>
          <BsGlobe />
        </a>
      </ul>
    </div>
  );
};

export default Footer;
