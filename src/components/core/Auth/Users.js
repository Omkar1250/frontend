import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../../../services/operations/profileAPI';
import { toast } from 'react-toastify';

export default function Users() {
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const result = await getAllUsers(token);
                if (result) {
                    setAllUsers(result);
                }
            } catch (error) {
                toast.error("Error fetching users");
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [token]);

    return loading ? (
        <div className="grid flex-1 place-items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className='text-richblack-25 lg:w-4/5 '>
        {
            allUsers.length === 0  ? (
                <div className='text-richblack-white text-lg'>
                    No users Found
                </div>
            ) :

            ( 
        
                <div className='grid gap-4 md:grid-cols-2 lg:grid-flow-cols-3 '>
                {
                    allUsers.map((user) => (
                        <div key={user?._id} className='bg-richblack-700 p-4 flex flex-row gap-2 '>
                            <div className=''>
                                    <img src={user?.image} alt={user?.name}  className='w-16 h-16 rounded-full' />
                            </div>
                            <div>
                                <p className='text-caribbeangreen-100'>Name: {user?.firstName} {user?.lastName}</p>
                                <p className='text-caribbeangreen-100'>Email: {user?.email}</p>
                                <p className='font-semibold text-caribbeangreen-100'>AccountType: {user?.accountType}</p>
                            </div>
                        </div>
                    ))
                }

                </div>
            )
        }
        </div>
    );
}
