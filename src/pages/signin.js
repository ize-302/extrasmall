import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useRouter } from 'next/router';
import SignupSchema from 'schemas/signup.schema';
import toast, { Toaster } from 'react-hot-toast';

import { supabase } from '@/supabase/api';

const LginPage = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: withZodSchema(SignupSchema),
    onSubmit: async (values) => {
      // eslint-disable-next-line no-console
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) {
        toast.error(error.message);
      } else {
        router.push('/dashboard');
      }
    },
  });
  return (
    <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <Toaster />
      <div className='w-full max-w-md space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            Log into your account
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={formik.handleSubmit}>
          <input type='hidden' name='remember' value='true' />
          <div className='-space-y-px rounded-md shadow-sm'>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                id='email-address'
                name='email'
                type='text'
                onChange={formik.handleChange}
                className='w-full rounded-md border border-gray-300 px-3 py-2'
                placeholder='Email address'
              />
              {formik.errors.email && <p>{formik.errors.email}</p>}
            </div>
            <br />
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                onChange={formik.handleChange}
                className='w-full rounded-md border border-gray-300 px-3 py-2'
                placeholder='Password'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='w-full rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white'
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LginPage;
