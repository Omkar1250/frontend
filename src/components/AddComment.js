import React, { useState } from 'react';
import IconBtn from '../common/IconBtn';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createComment } from '../services/operations/postAPI';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoginModal from './LoginModal';
import LoginForm from './core/Auth/LoginForm';

export default function AddComment() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { postId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const onSubmit = async (data) => {
        if (!token) {
            setShowModal(true);
            return;
        }

     

        const formData = new FormData();
        formData.append("postId", postId);
        formData.append("commentDesc", data.commentDesc);
        setLoading(true);

        try {
            const result = await createComment(formData, token);
           
            if (result) {
                toast.success("Comment added successfully");
                reset(); // Clear the form after successful submission
               
            } else {
                toast.error("Failed to add comment");
            }
        } catch (error) {
            toast.error("Error adding comment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-[780px]'>
                <div className='flex flex-col mt-2 '>
                    <label htmlFor="commentDesc" className='text-richblack-25 font-semibold mb-2'>
                        Add Comment <sup className='text-pink-200'>*</sup>
                    </label>
                    <textarea
                        name="commentDesc"
                        id="commentDesc"
                        className=' bg-richblack-800 rounded-md p-2'
                        placeholder='Comment Description'
                        {...register('commentDesc', { required: true })}
                    
                    />
                    {errors.commentDesc && (
                        <span className='text-xs ml-2 tracking-wide text-pink-200'>
                            Comment Description is required
                        </span>
                    )}
                    <div className='mt-4'>
                        <IconBtn
                            text={loading ? 'Adding...' : 'Add Comment'}
                            disabled={loading}
                        />
                    </div>
                </div>
            </form>
            <LoginModal isVisible={showModal} onClose={() => setShowModal(false)}>
                <h2 className='font-semibold text-richblack-5'>Please Login to Add Comment</h2>
                <LoginForm />
            </LoginModal>
        </>
    );
}
