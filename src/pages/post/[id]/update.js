import { useFormik } from 'formik';
import * as React from 'react';
import { FiSave } from 'react-icons/fi';
import { withZodSchema } from 'formik-validator-zod';

import DashboardLayout from '@/components/layout/Layout';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/supabase/api';

import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import PostSchema from 'schemas/post.schema';

const UpdatePost = () => {
  const { user } = useUser();
  const router = useRouter();
  const { query } = useRouter();

  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
    },
    validate: withZodSchema(PostSchema),
    onSubmit: async (values) => {
      console.log(values)
      await supabase
        .from('posts')
        .update({ title: values.title, body: values.body })
        .eq('id', query.id)
      toast.success('Post updated');
      router.push(`/post/${query.id}`);
    },
  });

  const fetchPost = async () => {
    if (query.id) {
      const fetchedpost = await supabase
        .from('posts')
        .select('*')
        .eq('id', query.id)
        .single();
      formik.setFieldValue('title', fetchedpost.data.title)
      formik.setFieldValue('body', fetchedpost.data.body)
    }
  };

  React.useEffect(() => {
    fetchPost();
  }, [query]);


  return (
    <DashboardLayout>
      <Toaster />
      <h1 className='mb-4 text-2xl font-medium text-gray-400'>
        Update post
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
            value={formik.values.title}
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
            value={formik.values.body}
          ></textarea>
          {formik.errors.body && <p>{formik.errors.body}</p>}
        </div>
        <div className='flex items-center justify-end gap-4'>
          <button
            type='submit'
            className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent bg-black px-4 py-2 text-base font-medium text-white shadow-sm'
          >
            <FiSave /> Update
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}

export default UpdatePost;