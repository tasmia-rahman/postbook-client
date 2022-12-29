import React from 'react';
import { useQuery } from '@tanstack/react-query';
import PostCard from './../PostCard/PostCard';

const Media = () => {
    const { data: posts = [], refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/posts');
            const data = await res.json();
            return data;
        }
    });

    return (
        <div className='mt-16 mb-28'>
            <h3 className='text-center mb-10'>All Posts</h3>
            <div className='w-11/12 mx-auto grid grid-col-1 lg:grid-cols-3 gap-10'>
                {
                    posts.map((post) => <PostCard key={post._id} post={post} refetch={refetch}></PostCard>)
                }
            </div>
        </div>
    );
};

export default Media;