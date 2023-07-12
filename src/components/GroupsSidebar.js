import React from 'react';
import PrettyButton from './PrettyButton';
import PlusIcon from '../icons/plusIcon.svg';

export default function GroupsSidebar({createGroupPopupRef}){
    return (
        <div className='relative w-full top-14'>
            <div className='absolute flex w-full lg:text-base md:text-xs sm:text-xs text-white'>
                <div className='w-6/7 flex'>
                    <div className='mr-5 rounded-lg border-b-2 border-gray-500 bg-gray-800 hover:bg-gray-700'>
                        <a href="/groups/overview" className='flex items-center h-full'>
                            <p className='lg:pr-8 lg:pl-8 md:pr-4 md:pl-4'>Overview</p>
                        </a>
                    </div>
                    <div className='mr-5 rounded-lg border-b-2 border-gray-500 bg-gray-800 hover:bg-gray-700'>
                        <a href="/groups/subscribedgroups" className='flex items-center h-full'>
                            <p className='lg:pr-8 lg:pl-8 md:pr-4 md:pl-4'>Subscribed Groups</p>
                        </a>
                    </div>
                    <div className='mr-5 rounded-lg border-b-2 border-gray-500 bg-gray-800 hover:bg-gray-700'>
                        <a href="/groups/publicgroups" className='flex items-center h-full'>
                            <p className='lg:pr-8 lg:pl-8 md:pr-4 md:pl-4'>Public Groups</p>
                        </a>
                    </div>
                    <div className='mr-5 rounded-lg border-b-2 border-gray-500 bg-gray-800 hover:bg-gray-700'>
                        <a href="/groups/invitedgroups" className='flex items-center h-full'>
                            <p className='lg:pr-8 lg:pl-8 md:pr-4 md:pl-4'>Group Invitations</p>
                        </a>
                    </div>
                    <div className='mr-5 rounded-lg border-b-2 border-gray-500 bg-gray-800 hover:bg-gray-700'>
                        <a href="/groups/yourgroups" className='flex items-center h-full'>
                            <p className='lg:pr-8 lg:pl-8 md:pr-4 md:pl-4'>Your Groups</p>
                        </a>
                    </div>
                </div>
                <div className='w-1/7'>
                    <PrettyButton ButtonClickFunction={() => createGroupPopupRef.current.HandleGroupCreation()} Icon={PlusIcon} Text="Create Group"/>
                </div>
            </div>
        </div>
    );
};