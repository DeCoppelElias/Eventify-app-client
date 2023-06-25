import React, { useRef } from 'react';
import EventPopup from './EventPopup';
import plusIcon from '../icons/plusIcon.svg';

const CreateEventButton = () => {
    const ref = useRef();

    function HandleEventCreation(){
        ref.current.HandleEventCreation();
    }

    return (
        <div className=''>
            <button className='absolute top-14 right-20 bg-gray-800 hover:bg-gray-700 w-36 h-12 rounded-md' onClick={HandleEventCreation}>
                <div className='flex'>
                    <div className='w-7 ml-2'>
                        <img src={plusIcon} alt=''></img> 
                    </div>
                    <div className='m-auto text-white'>
                        Create event
                    </div>
                </div>
            </button>
            <EventPopup ref={ref}></EventPopup>
        </div>
    )
}

export default CreateEventButton;