import React, { useEffect, useState} from 'react'
import EventListFull from '../../components/EventListFull'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import EventsSidebar from '../../components/EventsSidebar'
import CreateEventButton from '../../components/CreateEventButton';

export default function YourEvents() {
    const [yourEventData, setYourEventData] = useState({'events': undefined});
    const navigate = useNavigate();

    useEffect(() => {
        const payload = {
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
    <div className='flex h-full w-full'>
        <EventsSidebar />
        <div className='h-full w-7/8 pt-20 pl-10 bg-gray-900'>
            <CreateEventButton/>
            <div className='overflow-auto h-full'>
                {yourEventData.events !== undefined && 
                    <><p className='text-2xl text-white'>Public events</p>
                    <EventListFull events={yourEventData.events}></EventListFull></>
                }
                {yourEventData.events === undefined && 
                    <p className='text-white'>You have not created any events yet!</p>
                }
            </div>
        </div>
    </div>
    )
}