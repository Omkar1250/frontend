import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/Homepage/HighlightText';
import CTAButton from '../components/core/Homepage/Button'
import CodeBlock from '../components/core/Homepage/CodeBlock';
import { TypeAnimation } from 'react-type-animation';
import banner from '../assets/images/banner.avif'
import Contact from './Contact';

export default function Home() {
  return (
    <div>
   <div className='lg:flex mx-auto items-center w-11/12 mt-20 '>
  <div className='lg:w-1/2 text-center'>
    <h2 className='text-3xl font-semibold text-white md:text-4xl'>
      Welcome to <span><HighlightText text={"CodeSmashers"} /></span>   
    </h2>      
    <h4 className='flex mt-5 items-center justify-center text-white mb-2 font-semibold'>
      <TypeAnimation
        sequence={[
          'Learn AWS',
          1000,
          'Learn Web Development',
          1000,
          'Learn Java Programming',
          1000,
          'Learn Python',
          1000
        ]}
        wrapper="span"
        speed={50}
        style={{ fontSize: '1em', display: 'inline-block' }}
        repeat={Infinity}
      />
    </h4>
    <div className=" text-center text-sm font-bold text-richblack-300 sm:mb-3">
    At CodeSmasher, we are passionate about empowering programmers of all levels to smash through their coding challenges and achieve their development goals.
    </div>
  </div>
  <div className='lg:w-1/2 lg:text-center '>
    <img className='mx-auto lg:mx-0 object-cover' style={{ clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)' }}  src={banner} alt="" />
  </div>
</div>


      {/* section 1  */}
      <div className='relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white'>
        {/* Login and signup button  */}
        <Link to={"/allposts"}>
            <div className='group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold
                            text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-none'>
                <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg:richblack-900'>
                  <p>Explore Blogs</p>
                  <FaArrowRight />


                </div>

            </div>
        </Link>
          {/* Heading */}
          <div className="text-center text-4xl font-semibold">
          Programming Essentials
          <HighlightText text={"Your Guide to Core Concepts"} />
        </div>

        {/* Sub Heading */}
        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
        Our mission is to provide high-quality, accessible content that covers a wide range of programming topics, from fundamental concepts 
        to the latest industry trends. We believe that learning to code should be an exciting and rewarding journey, and we're dedicated to making it as smooth as possible for you.
        </div>

         {/* CTA BUTTONS  */}
        <div className='mt-8 flex flex-row gap-7'>
          <CTAButton active={true} linkto={"/about"}>
              About Us
          </CTAButton>
          <CTAButton active={false} linkto={"/contact"}>
              Contact Us
          </CTAButton>

        </div>

        {/* code section 1  */}
        <div>
          <CodeBlock
          position={"lg:flex-row"}
          heading={
              <div className='text-4xl font-semibold'>
                Unlock your
                <HighlightText text={"coding potential "} /> with CodeSmashers.

              </div>
          }
          subheading={"Join our community of like-minded coders, and let's smash those code bugs together!"}
          ctabtn1 = {{
            btnText: "SignUp",
            link: "/login",
            active: true,
          }}
          ctabtn2={{
            btnText: "Login",
            link:"/login",
            active:false,
          }}
          codeColor={"text-yellow-25"}
          codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
          backgroundGradient={ <div className='codeblock1 absolute'></div>}
          >


          </CodeBlock>
        </div>
          <Contact/>

      </div>
        
  
    </div>
  )
}
