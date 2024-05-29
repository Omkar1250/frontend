import React, { useEffect, useState } from 'react';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { BsChevronDown } from 'react-icons/bs';
import ProfileDropDown from '../components/core/Auth/ProfileDropDown';
import MobileMenu from '../components/core/Auth/MobileMenu';
import { NavbarLinks } from '../data/navbarlinks';

export default function Navbar() {  
    const { token } = useSelector((state) => state.auth);
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSubLinks = async () => {
        setLoading(true);
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSubLinks(result.data.data);
        } catch (error) {
            console.log("Could not fetch the category list");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {  
        fetchSubLinks();
    }, []);

    const matchRoute = (route) => matchPath({ path: route }, location.pathname);

    return (
        <div className='w-full z-[100] fixed top-0 border-b border-richblack-400 bg-richblack-800 shadow-md'>
            <div className='w-full  flex lg:flex-row flex-row-reverse flex-wrap  justify-between mt-0 py-4  '>
                <div className='px-0 lg:pl-4 flex items-center cursor-pointer mx-3'>
                    <p className='text-white font-semibold lg:text-lg text-sm'>{'</>CodeSmashers'}</p>
                </div>
                
                <div className='flex items-center'>
                    <nav className='w-full flex-grow  hidden lg:flex lg:flex-1 lg:content-center lg:w-auto h-0 lg:h-auto  mt-2 lg:mt-0 z-20 transition-all md:hidden'>
                        <ul className="flex gap-x-6 text-richblack-25">
                            {NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {link.title === "Catalog" ? (
                                        <div className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName") ? "text-yellow-25" : "text-richblack-25"}`}>
                                            <p>{link.title}</p>
                                            <BsChevronDown />
                                            <div className="invisible   absolute left-[-50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[1em]
                                            flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900  transition-all duration-150 
                                            group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                                <div className="absolute left-[78%] top-0 bg-richblack-5 -z-10  h-3 w-6 translate-x-[50%] translate-y[-40%] rotate-45
                                                select-none rounded "></div>
                                                {loading ? (
                                                    <p className="text-center">Loading...</p>
                                                ) : subLinks.length > 0 ? (
                                                    subLinks.filter(subLink => subLink?.posts?.length > 0).map((subLink, i) => (
                                                        <Link
                                                            to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                            key={i}
                                                        >
                                                            <p>{subLink.name}</p>
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <p className="text-center">No Categorys Found</p>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>{link.title}</p>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className='lg:hidden pl-3'>
                <MobileMenu/>
                </div>
                            
                <div className='hidden lg:flex items-center gap-x-4 mr-5 justify-center'>
                    {token ? <ProfileDropDown /> : (
                        <>
                            <Link to="/login">
                                <button className='border border-richblack-600 bg-richblack-700 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    Log in
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className='border border-richblack-600 bg-richblack-700 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}
                </div>
                
            </div>  
        </div>
    );
}
