import React, { useState, useRef, useEffect } from 'react';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { NavbarLinks } from '../../../data/navbarlinks';
import { FiMenu } from 'react-icons/fi';
import { IoCloseSharp } from 'react-icons/io5';
import ProfileDropDown from './ProfileDropDown';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { fetchPostCategories } from '../../../services/operations/postAPI';
import MobileSidebar from '../../Dashboard/MobileSidebar';
import '../../../App.css'

export default function MobileMenu() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [accordionOpen, setAccordionOpen] = useState(false);
    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const location = useLocation();
    const dispatch = useDispatch();
    const ref = useRef(null);

    useOnClickOutside(ref, () => setMenuOpen(false));

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchPostCategories();
            setSubLinks(categories);
            setLoading(false);
        };
        getCategories();
    }, []);

    const handleMenuToggle = () => {
        setMenuOpen(prev => !prev);
    };

    const handleAccordionToggle = () => {
        setAccordionOpen(prev => !prev);
    };

    return (
        <div>
            <div onClick={handleMenuToggle} className="flex items-center cursor-pointer gap-1">
                {menuOpen ? (
                    <IoCloseSharp className="text-2xl text-white hover:text-caribbeangreen-100" />
                ) : (
                    <FiMenu className="text-2xl text-white hover:text-caribbeangreen-100" />
                )}
            </div>

            <div
                className={`menu-container absolute mt-4 h-screen left-0 w-[50%] z-[1000] border border-richblack-400 bg-richblack-800 flex flex-col overflow-hidden 
                ${menuOpen ? 'open' : ''}`}
                ref={ref}
            >
                {token && (
                    <div className="flex items-center justify-between pr-4 bg-richblack-700">
                        <p className="text-richblack-5 p-3">Welcome {user?.firstName}!</p>
                        <ProfileDropDown />
                    </div>
                )}

                

                <div className="grid">
                   
                    <ul className="flex flex-col">
                       {
                        token && (
                            <li className=" flex py-3"><MobileSidebar/></li>
                        )
                       }
                        {NavbarLinks.map((link, index) => (
                            <li key={index} className="hover:bg-yellow-5 text-richblack-100">
                                {link.title === "Catalog" ? (
                                    <div>
                                        <button
                                            onClick={handleAccordionToggle}
                                            className="flex items-center w-full p-3"
                                        >
                                            <span className='text-richblack-100'>{link.title}</span>
                                            {accordionOpen ? (
                                                <RiArrowUpSLine className="text-lg" />
                                            ) : (
                                                <RiArrowDownSLine className="text-lg" />
                                            )}
                                        </button>
                                        <div
                                            className={`grid overflow-hidden transition-all duration-300 ease-in-out bg-richblack-600 text-richblack-5 text-sm w-full
                                             ${accordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                        >
                                            <div className="overflow-hidden">
                                                <ul className="text-richblack-5">
                                                    
                                                    {loading ? (
                                                        <p className="text-center">Loading...</p>
                                                    ) : subLinks.length > 0 ? (
                                                        subLinks
                                                            .filter((subLink) => subLink?.posts?.length > 0)
                                                            .map((subLink, i) => (
                                                                <Link
                                                                    to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                                                    onClick={() => setMenuOpen(false)}
                                                                    key={i}
                                                                >
                                                                    <p className="text-richblack-25 hover:bg-richblack-5 hover:text-richblack-700 p-2">
                                                                        {subLink.name}
                                                                    </p>
                                                                </Link>
                                                            ))
                                                    ) : (
                                                        <p className="text-center">No Categories Found</p>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link to={link?.path} onClick={() => setMenuOpen(false)}>
                                        <p className="p-1 m-2">{link.title}</p>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                    

                    <div className="flex flex-col gap-2 ml-3">
                        {!token && (
                            <>
                                <Link to="/login" onClick={() => setMenuOpen(false)}>
                                    <button className="border text-sm border-richblack-600 bg-richblack-700 px-2 py-2 text-richblack-100 rounded-md">
                                        Log in
                                    </button>
                                </Link>
                                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                                    <button className="border text-sm border-richblack-600 bg-richblack-700 px-2 py-2 text-richblack-100 rounded-md">
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
