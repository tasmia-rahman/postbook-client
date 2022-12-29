import React from 'react';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <div className='bg-zinc-600 text-white mt-32 py-12'>
            <h3 className='text-center'>Postbook</h3>
            <hr />
            <div className="flex lg:flex-row flex-col justify-center items-center mt-3">
                <span className='mx-3'>Contact Us</span>
                <span className='mx-3'>Terms of Service</span>
                <span className='mx-3'>Privacy Policy</span>
                <span className='mx-3'>Privacy Settings</span>
                <span className='mx-3'>Contact Us</span>
            </div>
            <div className="flex lg:flex-row flex-col justify-center items-center mt-4">
                <FaFacebookF className='mx-3'></FaFacebookF>
                <FaTwitter className='mx-3'></FaTwitter>
                <FaInstagram className='mx-3'></FaInstagram>
            </div>
        </div>
    );
};

export default Footer;