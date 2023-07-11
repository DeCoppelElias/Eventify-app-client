import React, {useState, useEffect, useRef} from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import eventsIcon from '../icons/eventsIcon.svg';
import homeIcon from '../icons/homeIcon.svg';
import groupsIcon from '../icons/groupsIcon.svg';
import noImgIcon from '../icons/noImgIcon.svg';
import UserInfoPopup from './UserInfoPopup';

const GlobalSidebar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const userInfoRef = useRef();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const payload = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: { userId : userId}
        }

        axios.get('/api/getUser', payload)
        .then(function (response) {
            setUser(response.data.user)
        }).catch(function (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 401){
                    navigate('/login');
                }
            }})
    }, [navigate]);

    function HandleClickUserInfo(){
        userInfoRef.current.SetComponentVisible();
    }

    return (
        <div className= 'absolute flex top-0 w-full h-11 bg-gray-800 text-center border-b-2 border-gray-700'>
            <UserInfoPopup ref={userInfoRef} user={user}></UserInfoPopup>
            <div className='w-1/4'></div>
            <div className='flex mt-2 justify-center w-1/2'>
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
                    <a href="" className='flex transition duration-150 border-b-2 border-transparent hover:border-white'>
                        <div className='w-7 mb-2 mr-1'>
                            <img alt="" src={groupsIcon}></img> 
                        </div>
                        <div className='m-auto text-white'>
                            Calender
                        </div>
                    </a>
                </div>
            </div>
            {user !== undefined && 
                <div className='w-1/4 mt-auto mb-auto h-full text-white'>
                    <button onClick={HandleClickUserInfo} className='m-auto mr-5 flex w-44 hover:bg-gray-700'>
                        <div className='overflow-clip w-8 h-8 m-1 rounded-full bg-gray-600'>
                            <div className='-translate-x-2 -translate-y-2 w-12 inline-block'>
                                <img alt='' src={noImgIcon}></img>
                            </div>
                        </div>
                        <p className='w-32 mr-2 mt-auto mb-auto truncate'>{user.firstName + " " + user.lastName}</p>
                    </button>
                </div>
            }
        </div>
    );
};

export default GlobalSidebar;