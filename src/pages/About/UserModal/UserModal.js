import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-hot-toast';

const UserModal = ({ show, handleClose, selectedUser, refetch }) => {
    const { _id, name, email, institution, address } = selectedUser;

    const handleEditUserInfo = (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const institution = form.institution.value;
        const address = form.address.value;

        const user = { name, email, institution, address };

        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Updated Successfully!');
                    refetch();
                    handleClose();
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleEditUserInfo} className='grid grid-cols-1 gap-3 my-3'>
                    <div className='flex items-center px-6'>
                        <span className='w-24'>Name: </span>
                        <input type="text" name="name" defaultValue={name} class="ml-3 w-full px-6 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>
                    <div className='flex items-center px-6'>
                        <span className='w-24'>Email: </span>
                        <input type="email" name="email" defaultValue={email} class="ml-3 w-full px-6 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>
                    <div className='flex items-center px-6'>
                        <span>Institution: </span>
                        <input type="text" name="institution" defaultValue={institution} class="ml-3 w-full px-6 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>
                    <div className='flex items-center px-6 mb-3'>
                        <span className='w-24'>Address: </span>
                        <input type="text" name="address" defaultValue={address} class="ml-3 w-full px-6 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>
                    <input className='rounded mx-6 px-6 py-2 font-medium capitalize text-white bg-indigo-600 hover:bg-indigo-800' type="submit" value="Submit" />
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default UserModal;