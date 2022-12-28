import React from 'react';
import bannerImg from '../../../assets/images/undraw_social_serenity_vhix.svg';
import { FaHeart } from "react-icons/fa";

const Banner = () => {
    return (
        <section className="bg-gray-100 text-gray-800">
            <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                    <img src={bannerImg} alt="banner" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
                </div>
                <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                    <h2 className="font-bold leading-none mb-4">
                        Post What You <FaHeart className="text-indigo-600 inline"></FaHeart> The Most At Any Moment!
                    </h2>
                    <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                        <a href="#addpost" className="px-8 py-2 text-lg font-semibold rounded bg-indigo-600 hover:bg-indigo-800 hover:text-white text-gray-50 no-underline mx-auto">Add Post</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;