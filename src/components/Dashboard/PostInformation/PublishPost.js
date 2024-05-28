import React from 'react'
import { useDispatch } from 'react-redux'

import { setStep } from '../../../slices/postSlice'

export default function PublishPost() {

  const dispatch = useDispatch() 
  const GoBack = () => {
    dispatch(setStep(1))
     

  }
  return (
    <div className='flex items-center justify-center flex-col' >
          <p className=' text-2xl  font-semibold text-yellow-25'>
            Post Uploaded Sucessfully
          </p>
          <button className='bg-yellow-25 p-2 rounded-md mt-3 text-richblack-400' onClick={GoBack} >
            Go Back
          </button>
      
    </div>
  )
}
