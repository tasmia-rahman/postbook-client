import { useQuery } from '@tanstack/react-query';
import React from 'react';
import PostCard from './../../Media/PostCard/PostCard';

const TopPosts = () => {
    const { data: topPosts = [] } = useQuery({
        queryKey: ['topPosts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/topPosts');
            const data = await res.json();
            return data;
        }
    });

    return (
        <div>
            <h3 className='text-center'>Top Posts</h3>
            <div className='w-10/12 mx-auto my-8 grid grid-cols-3 gap-6'>
                {
                    // topPosts && topPosts.map((topPost) => <PostCard key={topPost._id} post={topPost}></PostCard>)
                }
            </div>
        </div>
    );
};

export default TopPosts;