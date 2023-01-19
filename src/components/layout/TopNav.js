import Link from 'next/link';
import React from 'react';
import { FiEdit3, FiLogOut } from 'react-icons/fi';

import { useUser } from '@/context/UserContext';

const TopNav = () => {
  const { user, logout } = useUser();

  return (
    <div className='relative mb-6 bg-white'>
      <div className='flex items-center justify-between border-b-2 border-gray-100 py-6'>
        <div className='flex justify-start'>
          <Link href='/' className='text-2xl font-bold text-black'>
            Small
          </Link>
        </div>

        <div className='flex items-center justify-end gap-10'>
          {!user ? (
            <>
              <Link
                href='/signin'
                className='whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900'
              >
                Sign in
              </Link>
              <Link
                href='/signup'
                className='inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-black px-4 py-2 text-base font-medium text-white shadow-sm'
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link href='/dashboard' className=' text-base font-medium'>
                My Posts
              </Link>
              <div className='flex gap-4'>
                <Link
                  href='/new-post'
                  className='flex items-center gap-2 whitespace-nowrap rounded-md bg-green-500 px-4 py-2 text-base font-medium text-white'
                >
                  <FiEdit3 /> New Post
                </Link>
                <button
                  onClick={() => logout()}
                  className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent bg-black px-4 py-2 text-base font-medium text-white shadow-sm'
                >
                  <FiLogOut />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;
