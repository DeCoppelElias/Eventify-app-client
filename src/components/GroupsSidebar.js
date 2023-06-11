import React from 'react';

const GroupsSidebar = () => {
    return (
        <div className=' w-1/6 pt-10 text-center bg-gray-800'>
            <div className='pb-1 pt-1 ml-3 mr-3 mb-10 border-2 border-gray-600 rounded-lg'>
                <a href="/groups/overview" className='lg:text-lg md:text-base sm:text-sm font-light text-white'>
                    Overview
                </a>
            </div>
            <div className='pb-1 pt-1 ml-3 mr-3 mb-10 border-2 border-gray-600 rounded-lg'>
                <a href="/groups/yourgroups" className='lg:text-lg md:text-base sm:text-sm font-light text-white'>
                    Your groups
                </a>
            </div>
            <div className='pb-1 pt-1 ml-3 mr-3 mb-10 border-2 border-gray-600 rounded-lg'>
                <a href="/groups/invitedgroups" className='lg:text-lg md:text-base sm:text-sm font-light text-white'>
                    Invited groups
                </a>
            </div>
            <div className='pb-1 pt-1 ml-3 mr-3 mb-10 border-2 border-gray-600 rounded-lg'>
                <a href="/groups/publicgroups" className='lg:text-lg md:text-base sm:text-sm font-light text-white'>
                    Public groups
                </a>
            </div>
        </div>
    );
};

export default GroupsSidebar;