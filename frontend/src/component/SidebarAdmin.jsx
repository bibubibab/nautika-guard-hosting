import React, { useState } from 'react';
import Home_Page_s from '../Pages/Home_Page_s';
import Home_Page from '../Pages/Home_Page';
import Input_Event from '../Admin/Input_Event';
import Notification_Admin from '../Admin/Notification_Admin';
import Approval_Admin from '../Admin/Approval_Admin';
import Profil_Admin from '../Admin/Profil_Admin';
import Donasi from '../Pages/Donasi';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activePage, setActivePage] = useState('Home Page');

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const navigateTo = (page) => {
        setActivePage(page);
        setIsOpen(false);
        console.log("Navigated to:", page); // Debugging activePage
    };

    return (
        <div className="flex h-screen">
            <div className={`h-full bg-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-18'}`}>
                <div className="flex items-center justify-between w-full p-3">
                    {isOpen && (
                        <img src="/images/logobiru.png" alt="Logo" className="w-23 h-16 transition-transform duration-300 mt-2" />
                    )}
                    <button onClick={toggleSidebar} className="text-gray-600 focus:outline-none">
                        {isOpen ? (
                            <svg className="w-6 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-12 h-12 ml-3 mt-2 pt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        )}
                    </button>
                </div>

                <nav className="mt-4 flex flex-col items-center w-full">
                    <button onClick={() => navigateTo('Home Page')} className={`flex items-center text-lg px-6 py-4 w-full hover:bg-gray-200 ${activePage === 'Home Page' && 'bg-blue-100'}`}>
                        <img src="/images/home-svgrepo-com.svg" alt="Home" className="w-9 h-9" />
                        {isOpen && <span className="ml-3 text-gray-700 font-semibold">Home</span>}
                    </button>
                    <button onClick={() => navigateTo('Event')} className={`flex items-center text-lg px-8 py-5 w-full hover:bg-gray-200 ${activePage === 'Event' && 'bg-blue-100'}`}>
                        <img src="/images/kalender.svg" alt="Event" className="w-6 h-6" />
                        {isOpen && <span className="ml-4 text-gray-700 font-semibold">Event</span>}
                    </button>
                    <button onClick={() => navigateTo('Notifikasi')} className={`flex items-center text-lg px-8 py-5 w-full hover:bg-gray-200 ${activePage === 'Notifikasi' && 'bg-blue-100'}`}>
                        <img src="/images/donasi.svg" alt="Notifikasi" className="w-6 h-6" />
                        {isOpen && <span className="ml-4 text-gray-700 font-semibold">Notifikasi</span>}
                    </button>
                    <button onClick={() => navigateTo('Setting')} className={`flex items-center text-lg px-8 py-5 w-full hover:bg-gray-200 ${activePage === 'Setting' && 'bg-blue-100'}`}>
                        <img src="/images/pengaturan.svg" alt="Setting" className="w-6 h-6" />
                        {isOpen && <span className="ml-4 text-gray-700 font-semibold">Setting</span>}
                    </button>
                </nav>

                <div className="flex flex-col items-center w-full mt-auto mb-4">
                    <button onClick={() => navigateTo('Keluar')} className={`flex items-center text-lg px-8 py-5 w-full hover:bg-gray-200 ${activePage === 'Keluar' && 'bg-blue-100'}`}>
                        <img src="/images/signout.svg" alt="Keluar" className="w-8 h-8" />
                        {isOpen && <span className="ml-3 text-gray-700 font-semibold">Keluar</span>}
                    </button>
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <Home_Page_s/>
                <div className="flex-1 p-4">
                    {activePage === 'Home Page' && <Home_Page/>}
                    {activePage === 'Event' && <div><Input_Event/></div>}
                    {activePage === 'Notifikasi' && <div><Notification_Admin/></div>}
                    {activePage === 'Setting' && <div><Profil_Admin/></div>}
                    {activePage === 'Keluar' && <div><Home_Page/></div>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
