import React, { useEffect, useState, useRef} from 'react';
import EventListPreview from '../../components/EventListPreview';
import axios from 'axios';
import CreateEventPopup from '../../components/CreateEventPopup';
import EventsSidebar from '../../components/EventsSidebar';

export default function EventsOverview() {
    const [publicEventData, setPublicEventData] = useState({'events': undefined});
    const [invitedEventData, setInvitedEventData] = useState({'events': undefined});
    const createEventPopupRef = useRef();

    useEffect(() => {
        axios.get('/api/events/getPublicEvents')
        .then(function (response) {
            if (response?.data.events.length > 0){
                setPublicEventData(response?.data);
            }
        })
        
        axios.get('/api/events/getNotRepliedInvitedEvents')
        .then(function (response) {
            if (response?.data.events.length > 0){
                setInvitedEventData(response?.data);
            }
        })
    }, [])

    return (
    <div className='flex h-full w-full'>
        <CreateEventPopup ref={createEventPopupRef}/>
        <div className='h-full w-full bg-gray-900 pr-20 pl-20'>
            <EventsSidebar state={"EventsOverview"} createEventPopupRef={createEventPopupRef}/>
            <div className='w-full h-full pt-28'>
                <div className='overflow-auto h-full'>
                    {invitedEventData.events !== undefined && 
                        <div className='bg-gray-800 rounded-md mb-10 w-full'>
                            <div className='pt-3 pl-4 pr-4 w-full'>
                                <div className='relative h-full w-full'>
                                    <a href="/events/invitedevents" className='absolute top-0 right-0 bg-gray-800 hover:bg-gray-700 text-lg text-white text-center rounded-lg pl-2 pr-2 pt-1 pb-1'>More...</a>
                                </div>
                                <div className='pb-3'>
                                    <a href="/events/invitedevents" className='text-2xl text-white'>Event Invitations</a>
                                </div>
                                <EventListPreview events={invitedEventData.events}></EventListPreview>
                            </div>
                        </div>
                    }
                    {publicEventData.events !== undefined && 
                        <div className='bg-gray-800 rounded-md mb-10 w-full'>
                            <div className='pt-3 pl-4 pr-4 w-full'>
                                <div className='relative h-full w-full'>
                                    <a href="/events/publicevents" className='absolute top-0 right-0 bg-gray-800 hover:bg-gray-700 text-lg text-white text-center rounded-lg pl-2 pr-2 pt-1 pb-1'>More...</a>
                                </div>
                                <div className='pb-3'>
                                    <a href="/events/publicevents" className='text-2xl text-white'>Public events</a>
                                </div>
                                <EventListPreview events={publicEventData.events}></EventListPreview>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
    )
}