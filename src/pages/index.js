import React from 'react';

import { supabase } from '@/supabase/api';
import dayjs from 'dayjs';
import Link from 'next/link';;

import TopNav from '@/components/layout/TopNav';

export default function HomePage() {
  const [posts, setposts] = React.useState([]);

  const fetchPosts = async () => {
    const fetchedposts = await supabase
      .from('posts')
      .select('*').eq('published', true)
      .order('id');
    setposts(fetchedposts.data);
  };


  React.useEffect(() => {
    fetchPosts();
  }, []);


  return (
    <main>
      <TopNav />
      <h1 className='mb-10 text-2xl font-medium text-gray-400'>Latest posts</h1>

      <div className='flex flex-col gap-10'>
        {posts?.map(post => (
          <div key={post.id}>
            <Link href={`/post/${post.id}`} className='text-2xl font-bold text-blue-500'>{post.title}</Link>
            <div className='flex gap-2 items-center text-sm'>
              <div>
                <span>Created</span>
                <span className='ml-2 text-gray-400'>{dayjs(post.created_at).format('DD MMM, YYYY')}</span>
              </div>
            </div>
            <p className='text-gray-600'>{post.body}...</p>
          </div>
        ))}
      </div>
    </main>
  );
}
