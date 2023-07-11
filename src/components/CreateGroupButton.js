import React from 'react';
import plusIcon from '../icons/plusIcon.svg';

export default function CreateGroupButton({HandleGroupCreation}){
    return (
        <div className='flex justify-end h-full lg:text-base md:text-xs sm:text-xs text-white'>
            <button className='h-full p-3 border-b-2 border-gray-500 bg-gray-800 hover:bg-gray-700 rounded-md' onClick={HandleGroupCreation}>
                <div className='flex'>
                    <div className='lg:w-6 md:w-4'>
                        <img src={plusIcon} alt=''></img> 
                    </div>
                    <div className='ml-2'>
                        Create group
                    </div>
                </div>
            </button>
        </div>
    )
}