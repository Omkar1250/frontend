import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sidebarLinks } from '../../data/dashboard-links';
import SidebarLink from './SidebarLink';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

export default function MobileSidebar() {
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const [ setOpen] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, () => setOpen(false));
    const [accordionOpen, setAccordionOpen] = useState(false);

    const handleAccordionToggle = () => {
        setAccordionOpen((prev) => !prev);
    };

    if (profileLoading || authLoading) {
        return (
            <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <button
                className="text-richblack-100 pl-3 hover:bg-yellow-25 w-full py-3 flex items-center gap-1"
                onClick={handleAccordionToggle}
            >
                <span>Dashboard Menu</span>
                {accordionOpen ? (
                    <RiArrowUpSLine className="text-lg" />
                ) : (
                    <RiArrowDownSLine className="text-lg" />
                )}
            </button>
            <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out bg-richblack-700 w-full ${
                    accordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden text-white">
                    <div className="flex flex-col">
                        {sidebarLinks.map((link) => {
                            if (link.type && user?.accountType !== link.type) return null;
                            return <SidebarLink key={link.id} link={link} iconName={link.icon} />;
                        })}
                    </div>
                    <div className="mx-auto h-[1px] bg-richblack-700" />
                    <div className="flex flex-col">
                        <SidebarLink link={{ name: "Settings", path: "/dashboard/settings" }} iconName="VscSettingsGear" />
                    </div>
                </div>
            </div>
        </div>
    );
}
