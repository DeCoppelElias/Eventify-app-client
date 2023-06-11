import React, { useEffect, useState} from 'react'
import EventListFull from '../../components/EventListFull'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import EventsSidebar from '../../components/EventsSidebar'
import CreateEventButton from '../../components/CreateEventButton';

export default function PublicEvents() {
    const [publicEventData, setPublicEventData] = useState({'events': undefined});
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
    }, [navigate])

    return (
    <div className='flex h-full w-full'>
        <EventsSidebar />
        <div className='h-full w-7/8 pt-20 pl-10 bg-gray-900'>
            <CreateEventButton/>
            <div className='overflow-auto h-full'>
                {publicEventData.events !== undefined && 
                    <><p className='text-2xl text-white w-2/4'>Public events</p>
                    <EventListFull events={publicEventData.events}></EventListFull></>
                }
                {publicEventData.events === undefined && 
                    <p className='text-white'>There are no public events yet!</p>
                }
            </div>
        </div>
    </div>
    )
}