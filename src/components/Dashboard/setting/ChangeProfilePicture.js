import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateDisplayPicture } from '../../../services/operations/settingAPI'
import IconBtn from '../../../common/IconBtn'
import { FiUpload } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function ChangeProfilePicture() {
    const {token} = useSelector((state)=> state.auth)
    const {user} = useSelector((state)=> state.profile)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)

    const fileInputRef = useRef()

    const handleClick = () => {
        fileInputRef.current.click() 
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]

        if(file){
            setImageFile(file)
            previewFile(file)
        }
    }
    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          setPreviewSource(reader.result)
        }
      }
    

    const handleFileUplod = () => {
        try {
           
            setLoading(true)
            const formData = new FormData()
            formData.append("displayPicture", imageFile)
            dispatch(updateDisplayPicture(token, formData)).then( () => {
                setLoading(false)
            })
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    useEffect( () => {
        if(imageFile) {
            previewFile(imageFile)
        }
    },[imageFile])

  return (
   <>
      <div className="flex items-center justify-center lg:justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
       <div className='lg:flex items-center justify-center  gap-x-4'>
        <img src={previewSource || user?.image}
         alt={`profile-${user?.firstName}`} 
         className='aspect-square w-[140px] lg:w-[78px] rounded-full object-cover'/>
         
         <div className='lg:space-y-2 mt-4 flex items-center justify-center flex-col'>
            <p className='mb-3'>Change Profile Picture</p>
            <div className='  lg:flex flex-row gap-3'>
                <input
                ref={fileInputRef}
                onChange={handleFileChange}
                className='hidden'
                accept='image/png, image/gif, image/jpeg' 
                type="file" />
                <button
                onClick={handleClick}
                disabled={loading}
                className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold'>
                        Select
                </button>
                <IconBtn 
                    text={loading ? "uploading" : "Upload"}
                    onclick={handleFileUplod}
                    
                >
                    {
                        !loading && (
                            <FiUpload className='text-lg text-richblack-900'/>
                        )
                    }

                </IconBtn>


            </div>
         </div>
       </div>

        </div>
   </>
  )
}
