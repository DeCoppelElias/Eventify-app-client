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
                <div className='w-full h-full pt-28 pr-20 pl-10'>
                    <div className='relative w-full h-full bg-gray-800 rounded-md text-lg'>
                        <div className='flex absolute -top-14 right-0 bg-gray-800 hover:bg-gray-700 w-32 h-12 rounded-md pr-4 pl-4'>
                            <img alt="" src={goingIcon} className='w-1/3'></img>
                            <button className='w-2/3'>Going</button>
                        </div>
                        <div className='flex absolute -top-14 right-40 bg-gray-800 hover:bg-gray-700 w-32 h-12 rounded-md pr-4 pl-4'>
                            <img alt="" src={maybeIcon} className='w-1/3'></img>
                            <button className='w-2/3'>Maybe</button>
                        </div>
                        <EventInfo></EventInfo>
                    </div>
                </div>
            </div>
        </div>
    );
}