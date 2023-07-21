import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { useNavigate } from 'react-router-dom';
import logoutIcon from '../icons/logoutIcon.svg';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const UserInfoPopup = forwardRef(({user}, ref) => {
    const [componentVisible, setComponentVisible] = useState(false);
    const innerRef = useRef(null);
    const navigate = useNavigate();

    useImperativeHandle(ref, () => {
        return {
            SetComponentVisible(){
                setComponentVisible(true);
            }
          };
        });

    useEffect(() => {
        function ResetState(){
            setComponentVisible(false);
        }

        const handleClickOutside = (event) => {
            if (innerRef.current && !innerRef.current.contains(event.target)) {
                setComponentVisible(false);
                ResetState();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth).then(
                function (){
                    if (auth.currentUser === null){
                        navigate("/login")
                    }
                }
            )
        } catch (err){
            console.error(err);
        }
    };

    return (
        <div className={`h-full w-full absolute top-0 left-0 overflow-clip pointer-events-none`}>
            <div className={`h-full w-full absolute top-0 left-0 z-10 ease-in-out duration-300 pointer-events-auto ${componentVisible ? "scale-100" : " scale-0"}`}>
                
            </div>
            <div ref={innerRef} className={`z-20 bg-gray-800 border-2 border-gray-700 border-t-0 border-r-0 absolute top-11 right-0 rounded-b-md ease-in-out duration-100 pointer-events-auto ${componentVisible ? " translate-y-0 scale-100" : " -translate-y-20 scale-0"}`}>
                <div className='mt-2 mb-5 mr-5 ml-5 text-white'>
                    {user !== undefined &&
                        <div>
                            <div className="flex">
                                <p className="text-gray-400">Name: </p>
                                <p className="ml-2">{user.displayName}</p>
                            </div>
                            <div className="flex">
                                <p className="text-gray-400">Email: </p>
                                <p className="ml-2">{user.email}</p>
                            </div>
                            <button onClick={handleLogout} className="hover:bg-gray-700 pt-1 pb-1 mt-5 w-full rounded-md">
                                <div className="w-3/5 m-auto flex">
                                    <img className="w-5 mt-auto mb-auto" src={logoutIcon} alt=""></img>
                                    <p className="mt-auto mb-auto ml-2">Log-out</p>
                                </div>
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
})

export default UserInfoPopup;