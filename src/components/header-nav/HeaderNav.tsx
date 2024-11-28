'use client';

import Image from 'next/image';
import Link from 'next/link';

// import { scrollTo } from '@/utils/scrollTo';
// import Image from 'next/image';

const HeaderNav = () => {
  const handleMenuClick = (menuId: string) => {
    console.log('clicked!!:', menuId);
    // scrollTo(menuId);
  };
  return (
    <div className='px-24  flex justify-between items-center border-b border-slate-200/60 sticky top-0 bg-slate-50 z-[60] h-[10%]'>
      {/* logo */}
      <a href='/' className='flex items-center select-none'>
        <Image src={'/icon.png'} alt='logo' width={22} height={16} className='opacity-80' />/
        <span className='text-slate-600 font-medium ml-1 text-xl'>TabsFlow</span>
      </a>

      {/* menu */}
      <ul className='flex gap-x-6'>
        <span
          className='cursor-pointer transition-all duration-200 hover:opacity-80 text-slate-700 font-light'
          onClick={() => handleMenuClick('features')}
        >
          Features
        </span>

        <span
          className='cursor-pointer transition-all duration-200 hover:opacity-80 text-slate-700 font-light'
          onClick={() => handleMenuClick('testimonials')}
        >
          Testimonials
        </span>
        <span
          className='cursor-pointer transition-all duration-200 hover:opacity-80 text-slate-700 font-light'
          onClick={() => handleMenuClick('faqs')}
        >
          Faqs
        </span>
      </ul>

      {/* auth  */}
      <ul className='flex gap-x-4'>
        <Link
          href={'/?auth=login'}
          className='text-emerald-500 tracking-wide text-sm font-medium shadow-sm shadow-slate-400/60 px-6 py-3 rounded-md '
        >
          Login
        </Link>
        <Link
          href={'/?auth=start'}
          className='text-slate-50 tracking-wide text-sm font-medium shadow-sm shadow-slate-400/50 bg-slate-800 px-7 py-3 rounded-md'
        >
          Start For Free
        </Link>
      </ul>
    </div>
  );
};

export default HeaderNav;
