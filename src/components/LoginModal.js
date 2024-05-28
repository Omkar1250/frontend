import React, { Children } from 'react'

export default function LoginModal({isVisible, onClose, children}) {
    if(!isVisible) return null;
    const handeleClose = (e) => {
        if(e.target.id ==='wrapper') onClose();
    }
  return (
    <div className='fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm 
    flex justify-center items-center' id='wrapper' onClick={handeleClose}>
        <div className='w-[480px] p-4 flex flex-col z-[1000]' >
            <button className='text-white font-bold text-xl place-self-end'onClick={()=> onClose()}>x</button>
            <div className='bg-richblack-700 p-6 rounded-md flex flex-col items-center justify-center ' >
            {children}
            </div>

        </div>
    </div>
  )
}
