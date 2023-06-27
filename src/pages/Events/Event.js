import React from 'react'
import EventSideBar from '../../components/EventsSidebar';
import EventInfo from '../../components/EventInfo';

export default function Event() {

    return (
        <div className='h-full w-full flex'>
            <EventSideBar></EventSideBar>
            <div className='h-full w-7/8 bg-gray-900 text-white'>
                <div className='h-full w-full pt-28'>
                    <div className='relative sm:w-full md:w-7/8 lg:w-5/6 xl:w-4/5 h-full bg-gray-800 rounded-md text-lg'>
                        <EventInfo></EventInfo>
                    </div>
                </div>
            </div>
        </div>
    );
}