import React, { useEffect, useState} from 'react'
import EventListFull from '../../components/EventListFull'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import EventsSidebar from '../../components/EventsSidebar'
import CreateEventButton from '../../components/CreateEventButton';

export default function InvitedEvents() {
    const [invitedEventData, setInvitedEventData] = useState({'events': undefined});
    const navigate = useNavigate();

    useEffect(() => {
        const payload = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: { userId : localStorage.getItem('userId')}
        }
        
        axios.get('/api/getInvitedEvents', payload)
        .then(function (response) {
            if (response.data.events.length > 0){
                setInvitedEventData(response.data);
            }
        })
    }, [navigate])

    return (
    <div className='flex h-full w-full'>
        <EventsSidebar />
        <div className='h-full w-7/8 pt-20 pl-10 bg-gray-900'>
            <CreateEventButton/>
            <div className='overflow-auto h-full'>
                {invitedEventData.events !== undefined && 
                    <><p className='text-2xl text-white'>Public events</p>
                    <EventListFull events={invitedEventData.events}></EventListFull></>
                }
                {invitedEventData.events === undefined && 
                    <p className='text-white'>You have not been invited to events yet!</p>
                }
            </div>
        </div>
    </div>
    )
}