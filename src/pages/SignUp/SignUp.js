import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../../contexts/AuthProvider/AuthProvider';
import universitySvg from '../../assets/images/university-svgrepo-com.svg';
import addressSvg from '../../assets/images/map-pin-svgrepo-com.svg';
import profilePicSvg from '../../assets/images/profile-user-svgrepo-com.svg';
import useToken from './../../hooks/useToken';

const SignUp = () => {
    const { createUser, updateUserInfo, setLoading } = useContext(AuthContext);
    const [error, setError] = useState('');

    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);

    const navigate = useNavigate();
    if (token) {
        navigate('/');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        const form = event.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const institution = form.institution.value;
        const address = form.address.value;
        const password = form.password.value;

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('Registered Successfully.');
                setLoading(false);
                form.reset();

                const profile = { displayName: name, photoURL: photoURL };
                updateUserInfo(profile)
                    .then(() => {
                        saveUserInfo(name, photoURL, email, institution, address);
                    }).catch((error) => {
                        console.log(error);
                    });
            })
            .catch(error => setError(error.message))

    }

    const saveUserInfo = (name, photoURL, email, institution, address) => {
        const user = { name, photoURL, email, institution, address };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email);
            })
            .catch(err => console.log(err));
    }

    return (
        <div class="bg-white">
            <div class="lg:grid lg:min-h-screen lg:grid-cols-5">
                <aside
                    class="relative block lg:order-last lg:col-span-2 h-full xl:col-span-2"
                >
                    <img
                        alt="Pattern"
                        src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        class="absolute inset-0 h-full w-full object-cover"
                    />
                </aside>

                <main
                    aria-label="Main"
                    class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-3 lg:pt-8 lg:px-16 xl:col-span-3"
                >
                    <div class="bg-white dark:bg-gray-900 w-8/12">
                        <h4 className='text-center'>Sign Up</h4>
                        <div class="container flex items-center justify-center px-6 mx-auto">
                            <form class="w-full max-w-md" onSubmit={handleSubmit}>

                                <div class="relative flex items-center mt-8">
                                    <span class="absolute">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </span>

                                    <input required type="text" name='name' class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Name" />
                                </div>

                                <div class="relative flex items-center mt-8">
                                    <span class="absolute">
                                        <img src={profilePicSvg} alt='' class="w-6 h-6 mx-3" />
                                    </span>

                                    <input required type="text" name="photoURL" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="PhotoURL" />
                                </div>

                                <div class="relative flex items-center mt-6">
                                    <span class="absolute">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </span>

                                    <input required type="email" name='email' class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email" />
                                </div>

                                <div class="relative flex items-center mt-8">
                                    <span class="absolute">
                                        <img src={universitySvg} alt='' class="w-5 h-5 mx-3" />
                                    </span>

                                    <input required type="text" name='institution' class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Institution" />
                                </div>

                                <div class="relative flex items-center mt-8">
                                    <span class="absolute">
                                        <img src={addressSvg} alt='' class="w-8 h-8 ml-2 mr-3" />
                                    </span>

                                    <input required type="text" name='address' class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Address" />
                                </div>

                                <div class="relative flex items-center mt-4">
                                    <span class="absolute">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </span>

                                    <input required type="password" name='password' class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
                                </div>

                                {
                                    error && <p className='text-rose-500 mt-2'>{error}</p>
                                }

                                <div class="mt-6">
                                    <button class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                        Sign Up
                                    </button>

                                    <div class="mt-6 text-center ">
                                        <a href="/login" class="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                            Already have an account? Login
                                        </a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SignUp;