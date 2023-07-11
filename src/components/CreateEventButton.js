import React from 'react';
import plusIcon from '../icons/plusIcon.svg';

const CreateEventButton = ({HandleEventCreation}) => {
    return (
        <button className='ml-5 lg:text-base md:text-xs sm:text-xs text-white h-full p-3 border-b-2 border-gray-500 bg-gray-800 hover:bg-gray-700 rounded-md' onClick={HandleEventCreation}>
            <div className='flex'>
                <div className='lg:w-6 md:w-4 sm:w-4'>
                    <img src={plusIcon} alt=''></img> 
                </div>
                <div className='ml-2'>
                    Create event
                </div>
            </div>
        </button>
    )
}

export default CreateEventButton;