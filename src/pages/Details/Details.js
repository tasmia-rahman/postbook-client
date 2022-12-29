import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Details = () => {
    const details = useLoaderData();
    console.log(details);

    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/comments/${details._id}`)
            .then(res => res.json())
            .then(data => {
                setComments(data);
                // setLoading(false);
            })
            .catch(err => console.error(err))
    }, [details._id]);

    return (
        <div class="overflow-hidden bg-gray-50 h-screen my-auto">
            <div class="grid grid-col-1 lg:grid-cols-2 w-3/4 mx-auto">
                <div class="p-8 md:p-12 lg:px-16 lg:py-24">
                    <div class="mx-auto max-w-xl">
                        <h2 class="text-2xl font-bold text-gray-900 md:text-3xl">
                            Post: {details.postText}
                        </h2>

                        <p class="md:mt-4 md:block font-semibold">
                            Posted By: {details.userName} ({details.userEmail})
                        </p>

                        <p class="md:mt-4 md:block font-semibold">
                            Loved By: {details.loveCount}
                        </p>

                        <div>
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

                <img
                    alt=""
                    src={details.image}
                    class="h-56 w-full object-contain sm:h-full"
                />
            </div>
        </div>
    );
};

export default Details;