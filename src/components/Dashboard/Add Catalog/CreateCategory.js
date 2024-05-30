import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../common/IconBtn'
import toast from 'react-hot-toast'
import { createCategory } from '../../../services/operations/postAPI'
import { useSelector } from 'react-redux'

export default function CreateCategory() {
    const {register, handleSubmit, reset, formState: { errors }  } = useForm()
    const [loading, setLoading] = useState(false)
    const {token } = useSelector((state)=> state.auth)

    const onSubmit = async(data) => {
        const formData = new FormData();
        formData.append("name", data.CategoryName)
        formData.append("description", data.categoryDesc)
        setLoading(true)
        try {
            const result = await createCategory(formData, token);
            if(result){
                toast.success("Category added successfully");
                reset()
            }
        } catch (error) {
            toast.error(error)
        } finally {
            setLoading(false)
        }
    }
  return (
       <div className='mt-2  '>
                <div className='text-xl text-richblack-25 '>
                    Add Category
                </div>
             <form onSubmit={handleSubmit(onSubmit)} className='mt-2'>
        <div className='flex flex-col'>
            <label htmlFor="CategoryName" className='lable-style'> 
            Category Name <sup className='text-pink-200'>*</sup></label>

            <input 
            type="text"
            id='CategoryName' 
            name='CategoryName'
            {...register('CategoryName', {required: true})}
            className='form-style'
            placeholder='Enter Category Name'
            
            />
            {
                errors.CategoryName &&(
                    <span className='text-xs ml-2 tracking-wide text-pink-200'>
                    Category Name is required
                </span>
                )
            }
            
        </div>
        <div className='flex flex-col mt-3'>
            <label htmlFor="categoryDesc" className='lable-style'>
                Category Description <sup className='text-pink-200'>*</sup>
            </label>
            <textarea 
            name="categoryDesc" 
            id="categoryDesc"
            placeholder='Category Description'
            {...register("categoryDesc", {required: true})}
            className='form-style'
            />
            <div className='mt-2'>
                <IconBtn text={ loading ? 'Loading...' : 'Create Category'}
                disabled={loading}   />
            </div>

       
        </div>



    </form>
       </div>
  )
}
