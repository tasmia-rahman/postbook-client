import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import aboutImg from '../../assets/images/undraw_about_me_re_82bv.svg';
import { AuthContext } from './../../contexts/AuthProvider/AuthProvider';

const About = () => {
    const { user } = useContext(AuthContext);

    const [selectedUser, setSelectedUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/users/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setSelectedUser(data);
                setLoading(false);
            })
            .catch(err => console.error(err))
    }, [user?.email]);

    if (loading) {
        return <div className='text-center my-5'>
            <Spinner animation="border" />
        </div>
    }

    return (
        <div className="bg-gray-100 text-gray-800">
            <div className='flex justify-end pt-8 pr-8'>
                <button className="px-8 py-1 text-lg font-semibold rounded bg-indigo-600 hover:bg-indigo-800 hover:text-white text-gray-50 no-underline">Edit</button>
            </div>
            <div className="container flex flex-col p-6 mx-auto py-16 lg:flex-row">
                <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                    <img src={aboutImg} alt="about" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
                </div>
                <div className='m-auto'>
                    <h3>About Me</h3>
                    <p className='text-xl'>Name: {selectedUser.name}</p>
                    <p className='text-xl'>Email: {selectedUser.email}</p>
                    <p className='text-xl'>Institution: {selectedUser.institution}</p>
                    <p className='text-xl'>Address: {selectedUser.address}</p>
                </div>
            </div>
        </div>
    );
};

export default About;