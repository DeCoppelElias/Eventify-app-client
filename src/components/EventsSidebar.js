import React from 'react';

const EventsSidebar = () => {
    return (
        <div className='pt-20 w-1/8 text-center bg-gray-900'>
            <div className='pb-1 pt-1 ml-3 mr-3 mb-10 border-2 border-gray-600 rounded-lg hover:bg-gray-800'>
                <a href="/events/overview" className='lg:text-lg md:text-base sm:text-sm font-light text-white'>
                    Overview
                </a>
            </div>
            <div className='pb-1 pt-1 ml-3 mr-3 mb-10 border-2 border-gray-600 rounded-lg hover:bg-gray-800'>
                <a href="/events/yourevents" className='lg:text-lg md:text-base sm:text-sm font-light text-white'>
                    Your events
                </a>
            </div>
            <div className='pb-1 pt-1 ml-3 mr-3 mb-10 border-2 border-gray-600 rounded-lg hover:bg-gray-800'>
                <a href="/events/invitedevents" className='lg:text-lg md:text-base sm:text-sm font-light text-white'>
                    Invited events
                </a>
            </div>
            <div className='pb-1 pt-1 ml-3 mr-3 mb-10 border-2 border-gray-600 rounded-lg hover:bg-gray-800'>
                <a href="/events/publicevents" className='lg:text-lg md:text-base sm:text-sm font-light text-white'>
                    Public events
                </a>
            </div>
        </div>
    );
};

export default EventsSidebar;