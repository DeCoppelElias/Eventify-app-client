import React from 'react';
import PrettyButton from './PrettyButton';
import plusIcon from '../icons/plusIcon.svg';

export default function EventsSidebar({state, createEventPopupRef}){
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className='relative w-full top-14'>
            <div className='absolute flex w-full text-sm text-white'>
                <div className='w-6/7 flex'>
                    <div className={classNames(
                        state === "EventsOverview" && "border-red-500",
                        'mr-5 rounded-lg border-b-2 border-gray-500 bg-gray-800 transition duration-150 hover:border-red-500')}>
                        <a href="/events/overview" className='flex items-center h-full'>
                            <p className='lg:pr-8 lg:pl-8 md:pr-4 md:pl-4'>Overview</p>
                        </a>
                    </div>
                    <div className={classNames(
                        state === "PublicEvents" && "border-red-500",
                        'mr-5 rounded-lg border-b-2 border-gray-500 bg-gray-800 transition duration-150 hover:border-red-500')}>
                        <a href="/events/publicevents" className='flex items-center h-full'>
                            <p className='lg:pr-8 lg:pl-8 md:pr-4 md:pl-4'>Public Events</p>
                        </a>
                    </div>
                    <div className={classNames(
                        state === "AnsweredEvents" && "border-red-500",
                        'mr-5 rounded-lg border-b-2 border-gray-500 bg-gray-800 transition duration-150 hover:border-red-500')}>
                        <a href="/events/answeredevents" className='flex items-center h-full'>
                            <p className='lg:pr-8 lg:pl-8 md:pr-4 md:pl-4'>Answered Events</p>
                        </a>
                    </div>
                    <div className={classNames(
                        state === "InvitedEvents" && "border-red-500",
                        'mr-5 rounded-lg border-b-2 border-gray-500 bg-gray-800 hover:border-red-500')}>
                        <a href="/events/invitedevents" className='flex items-center h-full'>
                            <p className='lg:pr-8 lg:pl-8 md:pr-4 md:pl-4'>Event Invitations</p>
                        </a>
                    </div>
                    <div className={classNames(
                        state === "YourEvents" && "border-red-500",
                        'mr-5 rounded-lg border-b-2 border-gray-500 bg-gray-800 transition duration-150 hover:border-red-500')}>
                        <a href="/events/yourevents" className='flex items-center h-full'>
                            <p className='lg:pr-8 lg:pl-8 md:pr-4 md:pl-4'>Your Events</p>
                        </a>
                    </div>
                </div>
                <div className='w-1/7'>
                    <PrettyButton ButtonClickFunction={() => createEventPopupRef.current.HandleEventCreation()} Icon={plusIcon} Text="Create Event"/>
                </div>
            </div>
        </div>
    );
};