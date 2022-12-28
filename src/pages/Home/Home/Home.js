import React from 'react';
import Banner from '../Banner/Banner';
import AddPost from './../AddPost/AddPost';
import TopPosts from './../TopPosts/TopPosts';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AddPost></AddPost>
            <TopPosts></TopPosts>
        </div>
    );
};

export default Home;