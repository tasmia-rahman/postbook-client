import React, { useContext, useRef, useState } from 'react';
import { FiImage } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { AuthContext } from './../../../contexts/AuthProvider/AuthProvider';
import './AddPost.css';
import { toast } from 'react-hot-toast';

const AddPost = () => {
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const { user } = useContext(AuthContext);

    const [image, setImage] = useState(null);
    const imageRef = useRef();

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage({
                image: URL.createObjectURL(img),
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const postText = form.postText.value;
        const image = form.image.files[0];
        console.log(image);

        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);

                    const post = {
                        image: imgData.data.url,
                        postText,
                        userName: user.displayName,
                        userEmail: user.email,
                        userPhotoURL: user.photoURL
                    }
                    // save post information to the database
                    fetch('http://localhost:5000/posts', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(post)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            if (result.acknowledged) {
                                toast.success('Post added successfully!');
                                form.reset();
                                setImage(null);
                            }
                        })
                }
            })
    }

    return (
        <div id='addpost' className='bg-white shadow w-7/12 mx-auto my-36 pt-6 pb-3 px-4'>
            <div className='flex'>
                <div>
                    {
                        user?.photoURL && <img src={user?.photoURL} alt='' className='rounded-full h-12 w-12' />
                    }
                </div>
                <div className='w-full ml-3'>
                    <form onSubmit={handleSubmit}>
                        <input required type='text' name='postText' placeholder="What's happening" className='bg-stone-200 w-full rounded px-6 py-3' />
                        <div className='flex justify-between mt-3'>
                            <div className='flex items-center' onClick={() => imageRef.current.click()}>
                                <FiImage className='text-2xl'></FiImage>
                                <p className='ml-1 mb-0 text-lg'>Photo</p>
                            </div>
                            <button type='submit' className="px-6 py-1 text-lg rounded bg-indigo-600 hover:bg-indigo-800 hover:text-white text-gray-50">Submit</button>
                            <div style={{ display: "none" }}>
                                <input
                                    type="file"
                                    name="image"
                                    ref={imageRef}
                                    onChange={onImageChange}
                                    accept="image/png, image/jpg, image/jpeg"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {
                image && (

                    <div className="previewImage">
                        <FiX onClick={() => setImage(null)} ></FiX>
                        <img src={image.image} alt="" />
                    </div>
                )
            }
        </div>

    );
};

export default AddPost;