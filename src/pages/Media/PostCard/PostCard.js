import React, { useContext, useEffect, useState } from 'react';
import loveSvg from '../../../assets/images/love-svgrepo-com.svg';
// import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';

const PostCard = ({ post, refetch }) => {
    const { user } = useContext(AuthContext);
    const { _id, userPhotoURL, userName, image, postText } = post;

    // const { data: singlePost = {}, refetch } = useQuery({
    //     queryKey: ['singlePost'],
    //     queryFn: async () => {
    //         const res = await fetch(`https://postbook-server.vercel.app/posts/${_id}`);
    //         const data = await res.json();
    //         return data;
    //     }
    // });

    // const { data: comments = [] } = useQuery({
    //     queryKey: ['comments'],
    //     queryFn: async () => {
    //         const res = await fetch(`https://postbook-server.vercel.app/comments/${_id}`);
    //         const data = await res.json();
    //         return data;
    //     }
    // });

    const [love, setLove] = useState(false);
    const [loveCount, setLoveCount] = useState(null);
    const [comments, setComments] = useState([]);
    const [addComment, setAddComment] = useState(false);

    useEffect(() => {
        fetch(`https://postbook-server.vercel.app/posts/${_id}`)
            .then(res => res.json())
            .then(data => {
                setLoveCount(data.loveCount);
                // setLoading(false);
            })
            .catch(err => console.error(err))
    }, [_id, love]);

    useEffect(() => {
        fetch(`https://postbook-server.vercel.app/comments/${_id}`)
            .then(res => res.json())
            .then(data => {
                setComments(data);
                setAddComment(false);
                // setLoading(false);
            })
            .catch(err => console.error(err))
    }, [_id, addComment]);

    const handleAddComment = (event) => {
        event.preventDefault();

        const form = event.target;
        const comment = form.comment.value;

        const commentInfo = { postId: _id, commentedUserName: user?.displayName, commentedUserEmail: user?.email, commentedUserPhotoURL: user?.photoURL, comment };

        fetch('https://postbook-server.vercel.app/comments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(commentInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success('Comment added!');
                    form.reset();
                    setAddComment(true);
                }
                else {
                    toast.error('Comment can not be added!');
                }
            })
    }

    const handleAddLove = () => {
        if (!user) {
            toast.error('You can not give react without login!');
        }
        else {
            fetch(`https://postbook-server.vercel.app/posts/addLove/${_id}`, {
                method: 'PUT'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        setLove(true);
                    }
                })
        }
    }

    const handleRemoveLove = () => {
        fetch(`https://postbook-server.vercel.app/posts/removeLove/${_id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    setLove(false);
                }
            })
    }

    return (
        <div className="rounded-md shadow-md w-full bg-gray-50 text-gray-800">
            <div className="flex items-center justify-between p-3 bg-gray-100">
                <div className="flex items-center space-x-2">
                    <img src={userPhotoURL} alt="" referrerPolicy='no-referrer' className="object-cover object-center w-8 h-8 rounded-full shadow-sm bg-gray-500 border-gray-300" />
                    <div className="-space-y-1">
                        <h2 className="text-sm font-semibold leading-none mb-0">{userName}</h2>
                        <span className="inline-block text-xs leading-none text-gray-600">Somewhere</span>
                    </div>
                </div>
            </div>
            <div className="pt-3 pb-1 px-4">
                {postText}
            </div>
            <img src={image} alt="" className="object-contain object-center w-full h-52" />
            <div className="p-3 bg-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {
                            love ?
                                <>
                                    <div className="flex items-center space-x-3">
                                        <button onClick={handleRemoveLove} type="button" title="Like post" className="flex items-center justify-center mr-1">
                                            <img src={loveSvg} alt='love' className="w-5 h-5" />
                                        </button>
                                        {loveCount}
                                    </div>
                                </>
                                :
                                <>
                                    <div className="flex items-center space-x-3">
                                        <button onClick={handleAddLove} type="button" title="Like post" className="flex items-center justify-center mr-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                                                <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                                            </svg>
                                        </button>
                                        {loveCount}
                                    </div>
                                </>
                        }
                        <div className="flex items-center space-x-3">
                            <button type="button" title="Add a comment" className="flex items-center justify-center mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                                    <path d="M496,496H480a273.39,273.39,0,0,1-179.025-66.782l-16.827-14.584C274.814,415.542,265.376,416,256,416c-63.527,0-123.385-20.431-168.548-57.529C41.375,320.623,16,270.025,16,216S41.375,111.377,87.452,73.529C132.615,36.431,192.473,16,256,16S379.385,36.431,424.548,73.529C470.625,111.377,496,161.975,496,216a171.161,171.161,0,0,1-21.077,82.151,201.505,201.505,0,0,1-47.065,57.537,285.22,285.22,0,0,0,63.455,97L496,457.373ZM294.456,381.222l27.477,23.814a241.379,241.379,0,0,0,135,57.86,317.5,317.5,0,0,1-62.617-105.583v0l-4.395-12.463,9.209-7.068C440.963,305.678,464,262.429,464,216c0-92.636-93.309-168-208-168S48,123.364,48,216s93.309,168,208,168a259.114,259.114,0,0,0,31.4-1.913Z"></path>
                                </svg>
                            </button>
                            {comments.length}
                        </div>
                    </div>
                    <button className='flex items-center justify-center bg-indigo-600 px-2 py-1 rounded'>
                        <Link to={`/details/${_id}`} className="no-underline text-white">
                            Details
                        </Link>
                    </button>
                </div>

                <div className="space-y-3 my-3">
                    {
                        user?.email &&
                        <form onSubmit={handleAddComment} className='flex justify-between items-center'>
                            <input type="text" name='comment' placeholder="Add a comment..." className="w-full py-2 px-2 my-2 bg-transparent border rounded text-sm pl-0 text-gray-800" data-ms-editor="true" />
                            <button type='submit' className="h-9 px-2 py-1 ml-3 font-semibold rounded text-indigo-600 hover:bg-indigo-600 hover:text-white">Add</button>
                        </form>
                    }
                    <h5 className='mt-0'>Comments</h5>
                    {
                        comments?.length > 0 ?
                            <>
                                {
                                    comments?.map(comment =>
                                        <p key={comment._id} className="text-sm mt-1">
                                            <span className="text-base font-semibold mr-2">{comment.commentedUserName}</span>{comment.comment}
                                        </p>
                                    )
                                }
                            </>
                            :
                            <p>No comments</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default PostCard;