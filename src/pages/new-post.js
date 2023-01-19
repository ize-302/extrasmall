import { useFormik } from 'formik';
import * as React from 'react';
import { FiSave, FiSend } from 'react-icons/fi';
import { withZodSchema } from 'formik-validator-zod';

import DashboardLayout from '@/components/layout/Layout';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/supabase/api';

import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import PostSchema from 'schemas/post.schema';

const NewPostPage = () => {
  const { user } = useUser();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
      published: false,
    },
    validate: withZodSchema(PostSchema),
    onSubmit: async (values) => {
      await supabase.from('posts').insert([
        {
          title: values.title,
          body: values.body,
          published: values.published,
          created_by: user?.id,
        },
      ]);
      toast.success('Post created');
      router.push('/dashboard');
    },
  });

  return (
    <DashboardLayout>
      <Toaster />
      <h1 className='mb-4 text-2xl font-medium text-gray-400'>
        Create new post
      </h1>

      <form
        className='mt-10 flex flex-col gap-6'
        onSubmit={formik.handleSubmit}
      >
        <div>
          <label className='mb-2 block text-2xl font-semibold'>Title</label>
          <input
            className='w-full rounded-md border px-5 py-3'
            placeholder='Title'
            name='title'
            onChange={formik.handleChange}
          />
          {formik.errors.title && <p>{formik.errors.title}</p>}
        </div>
        <div>
          <label className='mb-2 block text-2xl font-semibold'>Post</label>
          <textarea
            className='w-full rounded-md border px-5 py-3'
            placeholder='Body'
            rows={10}
            name='body'
            onChange={formik.handleChange}
          ></textarea>
          {formik.errors.body && <p>{formik.errors.body}</p>}
        </div>
        <div className='flex items-center justify-end gap-4'>
          <button
            onClick={() => formik.setFieldValue('published', false)}
            className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent bg-black px-4 py-2 text-base font-medium text-white shadow-sm'
          >
            <FiSave /> Save
          </button>
          <button
            onClick={() => formik.setFieldValue('published', true)}
            className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent bg-green-500 px-4 py-2 text-base font-medium text-white shadow-sm'
          >
            <FiSend /> Publish
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default NewPostPage;
