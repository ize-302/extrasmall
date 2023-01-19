import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useRouter } from 'next/router';
import SignupSchema from 'schemas/signup.schema';

import { supabase } from '@/supabase/api';

const SignupPage = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: withZodSchema(SignupSchema),
    onSubmit: async (values) => {
      // eslint-disable-next-line no-console
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) {
        alert(JSON.stringify(error));
      } else {
        router.push('/signin');
      }
    },
  });
  return (
    <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            Create an account
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
                type='email'
                onChange={formik.handleChange}
                required
                className='w-full rounded-md border border-gray-300 px-3 py-2'
                placeholder='Email address'
              />
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
                required
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
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
