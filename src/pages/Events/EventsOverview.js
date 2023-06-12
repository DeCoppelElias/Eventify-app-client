import React, { useEffect, useState, useRef} from 'react'
import EventListPreview from '../../components/EventListPreview'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import EventsSidebar from '../../components/EventsSidebar'
import CreateEventButton from '../../components/CreateEventButton';

export default function EventsOverview() {
    const [publicEventData, setPublicEventData] = useState({'events': undefined});
    const [invitedEventData, setInvitedEventData] = useState({'events': undefined});
    const [yourEventData, setYourEventData] = useState({'events': undefined});
    // const [newEventName, setNewEventName] = useState('');
    // const [newEventLocation, setNewEventLocation] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let payload = {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }

        axios.get('/api/getPublicEvents', payload)
        .then(function (response) {
            if (response.data.events.length > 0){
                setPublicEventData(response.data);
            }
        })
        .catch(function (error) {
            if (error.response) {
              if (error.response.status === 400 || error.response.status === 401){
                navigate('/login');
              }
            }})

        payload = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: { userId : localStorage.getItem('userId')}
        }
        
        axios.get('/api/getInvitedEvents', payload)
        .then(function (response) {
            if (response.data.events.length > 0){
                setInvitedEventData(response.data);
            }
        })
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 401){
                navigate('/login');
                }
            }})
        
        payload = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: { userId : localStorage.getItem('userId')}
        }
        
        axios.get('/api/getYourEvents', payload)
        .then(function (response) {
            if (response.data.events.length > 0){
                setYourEventData(response.data);
            }
        })
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 401){
                navigate('/login');
                }
            }})
    }, [navigate])

    return (
    <div className='flex overflow-x-hide h-full w-full'>
        <EventsSidebar />
        <div className='h-full w-7/8 pt-28 pr-20 pl-10 bg-gray-900'>
            <CreateEventButton></CreateEventButton>
            <div className='overflow-auto h-full '>
                {yourEventData.events !== undefined && 
                    <div className='bg-gray-800 rounded-md mb-10 w-full'>
                        <div className='pt-3 pl-4 pr-4 w-full'>
                            <div className='pb-3'>
                                <a href="/events/yourevents" className='text-2xl text-white'>Your events</a>
                            </div>
                            <EventListPreview events={yourEventData.events}></EventListPreview>
                        </div>
                    </div>
                }
                {invitedEventData.events !== undefined && 
                    <div className='bg-gray-800 rounded-md mb-10 w-full'>
                        <div className='pt-3 pl-4 pr-4 w-full'>
                            <div className='pb-3'>
                                <a href="/events/invitedevents" className='text-2xl text-white'>Invited events</a>
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
    )
}