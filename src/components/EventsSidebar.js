import React from 'react';
import CreateEventButton from './CreateEventButton';

export default function EventsSidebar({createEventPopupRef}){
    return (
        <div className='relative w-full top-14'>
            <div className='absolute flex w-full lg:text-base md:text-xs sm:text-xs text-white'>
                <div className='w-6/7 flex'>
                    <div className='mr-5 rounded-lg border-b-2 border-gray-500 bg-gray-800 hover:bg-gray-700'>
                        <a href="/events/overview" className='flex items-center h-full'>
                            <p className='lg:pr-8 lg:pl-8 md:pr-4 md:pl-4'>Overview</p>
                        </a>
                    </div>
                    <div className='mr-5 rounded-lg border-b-2 border-gray-500 bg-gray-800 hover:bg-gray-700'>
                        <a href="/events/goingevents" className='flex items-center h-full'>
                            <p className='lg:pr-8 lg:pl-8 md:pr-4 md:pl-4'>Going Events</p>
                        </a>
                    </div>
                    <div className='mr-5 rounded-lg border-b-2 border-gray-500 bg-gray-800 hover:bg-gray-700'>
                        <a href="/events/maybeevents" className='flex items-center h-full'>
                            <p className='lg:pr-8 lg:pl-8 md:pr-4 md:pl-4'>Maybe Events</p>
                        </a>
                    </div>
                    <div className='mr-5 rounded-lg border-b-2 border-gray-500 bg-gray-800 hover:bg-gray-700'>
                        <a href="/events/publicevents" className='flex items-center h-full'>
                            <p className='lg:pr-8 lg:pl-8 md:pr-4 md:pl-4'>Public Events</p>
                        </a>
                    </div>
                    <div className='mr-5 rounded-lg border-b-2 border-gray-500 bg-gray-800 hover:bg-gray-700'>
                        <a href="/events/yourevents" className='flex items-center h-full'>
                            <p className='lg:pr-8 lg:pl-8 md:pr-4 md:pl-4'>Your Events</p>
                        </a>
                    </div>
                    <div className='mr-5 rounded-lg border-b-2 border-gray-500 bg-gray-800 hover:bg-gray-700'>
                        <a href="/events/invitedevents" className='flex items-center h-full'>
                            <p className='lg:pr-8 lg:pl-8 md:pr-4 md:pl-4'>Event Invitations</p>
                        </a>
                    </div>
                </div>
                <div className='w-1/7'>
                    <CreateEventButton HandleEventCreation={() => createEventPopupRef.current.HandleEventCreation()}/>
                </div>
            </div>
        </div>
    );
};