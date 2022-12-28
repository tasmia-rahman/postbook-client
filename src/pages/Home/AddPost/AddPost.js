import React, { useRef, useState } from 'react';
import { FiImage } from "react-icons/fi";
import { FiX } from "react-icons/fi";

const AddPost = () => {
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

    return (
        <div id='addpost'>
            {/* <img src={} alt="" /> */}
            <div>
                <input type="text" placeholder="What's happening" />
                <div className="flex justify-around">
                    <div className="flex items-center justify-center px-3 py-2 rounded-xl " style={{ color: "var(--photo)" }}
                        onClick={() => imageRef.current.click()}
                    >
                        <FiImage></FiImage>
                        Photo
                    </div>

                    <button className="button px-5 py-1">Submit</button>
                    <div style={{ display: "none" }}>
                        <input
                            type="file"
                            name="myImage"
                            ref={imageRef}
                            onChange={onImageChange}
                        />
                    </div>
                </div>
                {image && (

                    <div className='relative'>
                        <FiX className='absolute top-1 right-4' onClick={() => setImage(null)} ></FiX>
                        <img className='w-full max-h-5 rounded-lg object-cover' src={image.image} alt="" />
                    </div>

                )}
            </div>
        </div>
    );
};

export default AddPost;