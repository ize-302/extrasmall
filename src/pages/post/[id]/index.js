import React from 'react';
import DashboardLayout from '@/components/layout/Layout';
import { supabase } from '@/supabase/api';
import { useRouter } from 'next/router';
import { FiSave, FiSend, FiEdit3 } from 'react-icons/fi';
import { useUser } from '@/context/UserContext';
import toast, { Toaster } from 'react-hot-toast';

const ViewPostPage = () => {
  const { query } = useRouter();
  const [post, setpost] = React.useState({});
  const { user } = useUser();
  const router = useRouter()

  const fetchPost = async () => {
    if (query.id) {
      const fetchedpost = await supabase
        .from('posts')
        .select('*')
        .eq('id', query.id)
        .single();
      setpost(fetchedpost.data);
    }
  };

  React.useEffect(() => {
    fetchPost();
  }, [query]);

  const toggleStatus = async () => {
    await supabase
      .from('posts')
      .update({ published: !post?.published })
      .eq('id', post?.id, 'created_by', user?.id);
    toast.success(`Post ${!post?.published ? 'published' : 'Unpublished'}`);
    fetchPost();
  };

  return (
    <DashboardLayout>
      <Toaster />
      {post.created_by === user?.id && (
        <div className='flex items-center justify-end gap-4'>
          <button
            onClick={() => toggleStatus()}
            className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent bg-black px-4 py-2 text-base font-medium text-white shadow-sm'
          >
            {post.published ? (
              <>
                <FiSave /> Unpublish
              </>
            ) : (
              <>
                <FiSend /> Publish
              </>
            )}
          </button>
          <button
            onClick={() => router.push(`/post/${post.id}/update`)}
            className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent bg-green-500 px-4 py-2 text-base font-medium text-white shadow-sm'
          >
            <FiEdit3 /> Edit
          </button>
        </div>
      )}
      <h1 className='mb-4 text-2xl font-medium'>{post.title}</h1>
      <p>{post.body}</p>
    </DashboardLayout>
  );
};

export default ViewPostPage;
