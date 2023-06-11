import React from 'react';
import { useNavigate} from 'react-router-dom';
import eventsIcon from '../icons/eventsIcon.svg';
import homeIcon from '../icons/homeIcon.svg';
import groupsIcon from '../icons/groupsIcon.svg';
import logoutIcon from '../icons/logoutIcon.svg';
import userIcon from '../icons/userIcon.svg';

const GlobalSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem('token', null);
        navigate('/login');
    };

    return (
        <div className= 'absolute top-0 w-full bg-gray-800 text-center'>
            <div className='flex ml-40 mr-40 mt-2 justify-center'>
                <div className='m-auto'>
                    <a href="/home" className='flex transition duration-150 border-b-2 border-transparent hover:border-white'>
                        <div className='w-7 mb-2 mr-1'>
                            <img alt="" src={homeIcon}></img> 
                        </div>
                        <div className='m-auto text-white'>
                            Home
                        </div>
                    </a>
                </div>
                <div className='m-auto'>
                    <a href="/events" className='flex transition duration-150 border-b-2 border-transparent hover:border-white'>
                        <div className='w-7 mb-2 mr-1'>
                            <img alt="" src={eventsIcon}></img> 
                        </div>
                        <div className='m-auto text-white'>
                            Events
                        </div>
                    </a>
                </div>
                <div className='m-auto'>
                    <a href="/groups" className='flex transition duration-150 border-b-2 border-transparent hover:border-white'>
                        <div className='w-7 mb-2 mr-1'>
                            <img alt="" src={groupsIcon}></img> 
                        </div>
                        <div className='m-auto text-white'>
                            Groups
                        </div>
                    </a>
                </div>
                <div className='m-auto'>
                    <a href="/user" className='flex transition duration-150 border-b-2 border-transparent hover:border-white'>
                        <div className='w-7 mb-2 mr-1'>
                            <img alt="" src={userIcon}></img> 
                        </div>
                        <div className='m-auto text-white'>
                            User
                        </div>
                    </a>
                </div>
                <div className='m-auto'>
                    <button className='flex transition duration-150 border-b-2 border-transparent hover:border-white' onClick={handleLogout}>
                        <div className='w-7 mb-2 mr-1'>
                            <img alt="" src={logoutIcon}></img> 
                        </div>
                        <div className='m-auto text-white'>
                            Log-out
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GlobalSidebar;