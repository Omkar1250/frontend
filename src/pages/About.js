import React from 'react'
import { FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa'
export default function About() {
  return (
  <div>
      <div className='w-11/12 mx-auto text-richblack-25 mt-20 '>
        <div>
            <h1 className='text-3xl font-semibold'>About Us</h1>
            <span className='text-blue-200'>Welcome to CodeSmasher!</span>
        </div>
        <div className='mt-10  text-lg'>
            <p>
            At CodeSmasher, we are 
            passionate about empowering programmers of all levels to smash through their 
            coding challenges and achieve their development goals. Whether you're a beginner taking your
            first steps into the world of programming or an experienced developer seeking advanced tips and
            tricks, our blog is here to support you.
            </p>
            <p className='mt-5'>
            Our mission is to provide high-quality, accessible content that covers a wide range of programming topics, 
            from fundamental concepts to the latest industry trends. We believe that learning to code should be an exciting and
             rewarding journey, and we're dedicated to making it as smooth as possible for you.
            </p>
            <p className='mt-5'>
            Join our community of like-minded coders, and let's smash those code bugs together!
            </p>
            <p>
            Happy coding! 
            </p>
            <p className='text-blue-200 font-semibold  mt-2 animate-bounce'>
            The CodeSmasher Team
            </p>
        </div>
        <div className='flex items-center justify-center font-bold underline text-xl text-blue-300'>
            Follow Us On 
        </div>
        <div className='flex items-center justify-center mt-5 gap-5'>
            <p className='text-4xl hover:text-blue-300'>
                <FaGithub/>
            </p>
            <p className='text-4xl hover:text-blue-300'>
                <FaInstagram/>
            </p>
            <p className='text-4xl hover:text-blue-300'>
                <FaTwitter/>
            </p>
        </div>
      
       
    </div>
   
  </div>
  )
}
