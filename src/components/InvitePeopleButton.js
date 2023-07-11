import React from "react";
import PostIcon from '../icons/postIcon.svg';

export default function InvitePeopleButton({HandleInvitePeople}){
    return (
        <button className='ml-5 lg:text-base md:text-xs sm:text-xs text-white h-full p-3 border-b-2 border-gray-500 bg-gray-800 hover:bg-gray-700 rounded-md' 
            onClick={() => HandleInvitePeople()}>
            <div className='flex'>
                <div className='lg:w-6 md:w-4 sm:w-4'>
                    <img src={PostIcon} alt=''></img> 
                </div>
                <div className='ml-2'>
                    Invite people
                </div>
            </div>
        </button>
    )
}