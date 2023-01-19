import React from 'react';

import DashboardLayout from '@/components/layout/Layout';
import { supabase } from '@/supabase/api';
import dayjs from 'dayjs';
import { useUser } from '@/context/UserContext';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/router';

const DashboardPage = () => {
  const [posts, setposts] = React.useState([]);
  const { user } = useUser();
  const router = useRouter()

  const fetchPosts = async () => {
    if (user) {
      const fetchedposts = await supabase
        .from('posts')
        .select('*')
        .eq('created_by', user?.id)
        .order('id');
      setposts(fetchedposts.data);
    }
  };

  React.useEffect(() => {
    fetchPosts();
  }, [user]);

  const deletePost = async (post) => {
    await supabase
      .from('posts')
      .delete()
      .match({ id: post.id, created_by: user?.id });
    toast.success('Post deleted');
    fetchPosts();
  };

  const toggleStatus = async (post) => {
    await supabase
      .from('posts')
      .update({ published: !post.published })
      .eq('id', post.id, 'created_by', user?.id);
    toast.success(`Post ${!post.published ? 'published' : 'Unpublished'}`);
    fetchPosts();
  };

  return (
    <DashboardLayout>
      <Toaster />
      <h1 className='mb-4 text-2xl font-medium text-gray-400'>My posts</h1>

      <table className='mt-10 w-full table-fixed'>
        <thead>
          <tr className='bg-gray-100 text-left'>
            <th className='py-4 px-4'>Title</th>
            <th className='py-4'>Date created</th>
            <th className='py-4'>Status</th>
            <th className='py-4 px-4 text-right'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post) => (
            <tr key={post.id} className='border-b'>
              <td className='py-4 px-4 text-blue-500'>
                <Link href={`/post/${post.id}`}>{post.title}</Link>
              </td>
              <td className='py-4'>
                {dayjs(post.created_at).format('DD MMM, YYYY')}
              </td>
              <td
                className={`py-4 ${!post.published ? 'text-black' : 'text-green-500'
                  }`}
              >
                {!post.published ? 'Draft' : 'Published'}
              </td>
              <td className='flex justify-end gap-2 px-4 py-4'>
                <button onClick={() => router.push(`/post/${post.id}/update`)} className='rounded bg-blue-300 px-3 py-1'>
                  Update
                </button>
                <button
                  className={`rounded bg-black px-3 py-1 text-white`}
                  onClick={() => toggleStatus(post)}
                >
                  {!post.published ? 'Publish' : 'Unpublish'}
                </button>
                <button
                  className='rounded bg-red-400 px-2 py-1 text-white'
                  onClick={() => deletePost(post)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
};

export default DashboardPage;
