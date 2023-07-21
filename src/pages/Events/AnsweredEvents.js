import React, { useEffect, useState, useRef} from 'react';
import EventListPreview from '../../components/EventListPreview';
import axios from 'axios';
import CreateEventPopup from '../../components/CreateEventPopup';
import EventsSidebar from '../../components/EventsSidebar';

export default function EventsOverview() {
    const [goingEvents, setGoingEvents] = useState([]);
    const [maybeEvents, setMaybeEvents] = useState([]);
    const [notGoingEvents, setNotGoingEvents] = useState([]);

    const createEventPopupRef = useRef();

    useEffect(() => {
        axios.get('/api/getGoingEvents')
        .then(function (response) {
            setGoingEvents(response?.data.events);
        })
        
        axios.get('/api/getMaybeEvents')
        .then(function (response) {
            setMaybeEvents(response?.data.events);
        })
        
        axios.get('/api/getNotGoingEvents')
        .then(function (response) {
            setNotGoingEvents(response?.data.events);
        })
    }, [])

    return (
    <div className='flex h-full w-full'>
        <CreateEventPopup ref={createEventPopupRef}/>
        <div className='h-full w-full bg-gray-900 pr-20 pl-20'>
            <EventsSidebar createEventPopupRef={createEventPopupRef}/>
            <div className='w-full h-full pt-28'>
                <div className='overflow-auto h-full'>
                    <div className='bg-gray-800 rounded-md mb-10 w-full'>
                        <div className='pt-3 pl-4 pr-4 w-full'>
                            <div className='relative h-full w-full'>
                                <a href="/events/goingevents" className='absolute top-0 right-0 bg-gray-800 hover:bg-gray-700 text-lg text-white text-center rounded-lg pl-2 pr-2 pt-1 pb-1'>More...</a>
                            </div>
                            <div className='pb-3'>
                                <a href="/events/goingevents" className='text-2xl text-white'>Going Events</a>
                            </div>
                            <EventListPreview events={goingEvents.length === 0 ? (undefined) : (goingEvents)}></EventListPreview>
                        </div>
                    </div>
                    <div className='bg-gray-800 rounded-md mb-10 w-full'>
                        <div className='pt-3 pl-4 pr-4 w-full'>
                            <div className='relative h-full w-full'>
                                <a href="/events/maybeevents" className='absolute top-0 right-0 bg-gray-800 hover:bg-gray-700 text-lg text-white text-center rounded-lg pl-2 pr-2 pt-1 pb-1'>More...</a>
                            </div>
                            <div className='pb-3'>
                                <a href="/events/maybeevents" className='text-2xl text-white'>Maybe Events</a>
                            </div>
                            <EventListPreview events={maybeEvents.length === 0 ? (undefined) : (maybeEvents)}></EventListPreview>
                        </div>
                    </div>
                    <div className='bg-gray-800 rounded-md mb-10 w-full'>
                        <div className='pt-3 pl-4 pr-4 w-full'>
                            <div className='relative h-full w-full'>
                                <a href="/events/notgoingevents" className='absolute top-0 right-0 bg-gray-800 hover:bg-gray-700 text-lg text-white text-center rounded-lg pl-2 pr-2 pt-1 pb-1'>More...</a>
                            </div>
                            <div className='pb-3'>
                                <a href="/events/notgoingevents" className='text-2xl text-white'>Not Going Events</a>
                            </div>
                            <EventListPreview events={notGoingEvents.length === 0 ? (undefined) : (notGoingEvents)}></EventListPreview>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}