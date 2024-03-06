import React from 'react'
import { getAuthSession } from '@/lib/auth';
import {prisma} from '@/lib/prisma'
import { getLatestPosts } from '@/src/theme/query/post.query';
import { Post } from '@/src/theme/features/post/Post';

export default async function Home() {
  const session = await getAuthSession();

  const posts = await getLatestPosts();


  return <div className='divide-y divide-muted'>
    {posts.map((p) => (
        <Post  post={p} key={p.id} />
    ))}
  </div>






}