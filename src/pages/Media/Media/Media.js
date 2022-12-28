import React from 'react';
import { useQuery } from '@tanstack/react-query';
import MediaPostCard from '../MediaPostCard/MediaPostCard';

const Media = () => {
    const { data: posts = [] } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/posts');
            const data = await res.json();
            return data;
        }
    });

    return (
        <div className='w-10/12 mx-auto my-8 grid grid-cols-3 gap-6'>
            {
                posts.map((post) => <MediaPostCard key={post._id} post={post}></MediaPostCard>)
            }
        </div>
    );
};

export default Media;