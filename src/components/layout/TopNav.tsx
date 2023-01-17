import Link from 'next/link';
import React from 'react';

const TopNav = () => {
  return (
    <div className='relative bg-white'>
      <div className='flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10'>
        <div className='flex justify-start lg:w-0 lg:flex-1'>
          <Link href='/' className='text-2xl font-bold text-indigo-600'>
            Small
          </Link>
        </div>

        <div className='items-center justify-end md:flex md:flex-1 lg:w-0'>
          <Link
            href='/signin'
            className='whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900'
          >
            Sign in
          </Link>
          <Link
            href='/signup'
            className='ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
