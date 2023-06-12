import React, { useEffect, useState} from 'react'
import EventSideBar from '../../components/EventsSidebar';
import EventInfo from '../../components/EventInfo';
import goingIcon from '../../icons/goingIcon.svg';
import maybeIcon from '../../icons/maybeIcon.svg';

export default function Event() {

    return (
        <div className='h-full w-full flex'>
            <EventSideBar></EventSideBar>
            <div className='h-full w-7/8 bg-gray-900 text-white'>
                <div className='w-7/8 h-full pt-28 pr-20 pl-10'>
                    <div className='relative w-full h-full bg-gray-800 rounded-md text-lg'>
                        <EventInfo></EventInfo>
                    </div>
                </div>
            </div>
        </div>
    );
}