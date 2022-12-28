import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import aboutImg from '../../../assets/images/undraw_about_me_re_82bv.svg';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import UserModal from '../UserModal/UserModal';

const About = () => {
    const { user } = useContext(AuthContext);

    // const [loading, setLoading] = useState(true);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { data: selectedUser = [], refetch } = useQuery({
        queryKey: ['selectedUser', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    return (
        <div className="bg-gray-100 text-gray-800">
            <div className='flex justify-end pt-8 pr-8'>
                <button onClick={handleShow} className="px-8 py-1 text-lg font-semibold rounded bg-indigo-600 hover:bg-indigo-800 hover:text-white text-gray-50 no-underline">Edit</button>
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
            <UserModal selectedUser={selectedUser} refetch={refetch} show={show} handleClose={handleClose}></UserModal>
        </div>
    );
};

export default About;