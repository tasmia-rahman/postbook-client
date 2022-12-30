import { useQuery } from '@tanstack/react-query';
import React from 'react';
import PostCard from './../../Media/PostCard/PostCard';
import { Spinner } from 'react-bootstrap';

const TopPosts = () => {
    const { data: topPosts = [], isLoading } = useQuery({
        queryKey: ['topPosts'],
        queryFn: async () => {
            const res = await fetch('https://postbook-server.vercel.app/topPosts');
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <div className='text-center my-12'>
            <Spinner animation="border" />
        </div>;
    }

    return (
        topPosts?.length > 0 ?
            <div className='mb-28'>
                <h3 className='text-center'>Top Posts</h3>
                <div className='w-10/12 mx-auto my-8 grid grid-col-1 lg:grid-cols-3 gap-10'>
                    {
                        topPosts?.map((topPost) => <PostCard key={topPost._id} post={topPost}></PostCard>)
                    }
                </div>
            </div>
            :
            ''
    );
};

export default TopPosts;