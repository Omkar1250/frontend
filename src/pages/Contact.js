import React from 'react';
import bgBanner from '../assets/images/bghome.svg';
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';


export default function Contact() {
  return (
    <>
    <div className='w-11/12 mx-auto'>
      <div className='flex justify-center items-center flex-col h-screen'>
        <div
          className='w-full h-full bg-cover bg-center bg-richblack-50 flex flex-col justify-center items-center'
          style={{ backgroundImage: `url(${bgBanner})` }}
        >
          {/* Add any content inside the div if needed */}
          <div>
            <p className='text-2xl font-semibold'>Feel free to contact Us!</p>
          </div>
          <div className=' py-3'>
           <p className='text-2xl font-semibold  text-blue-200'>{`CodeSmasher</>`}</p>
           
          </div>
          
          <div className='flex items-center justify-center mt-5 gap-5'>
            <p className='text-4xl hover:text-blue-300'>
                <FaGithub />
            </p>
            <p className='text-4xl hover:text-blue-300'>
                <FaInstagram />
            </p>
            <p className='text-4xl hover:text-blue-300'>
                <FaTwitter />
            </p>
          </div>
        </div>
      </div>
    </div>
    
    </>
  );
}
