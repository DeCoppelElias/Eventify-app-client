import React, { useEffect, useState} from 'react'
import EventListFull from '../../components/EventListFull'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import EventsSidebar from '../../components/EventsSidebar'
import CreateEventButton from '../../components/CreateEventButton';

export default function YourEvents() {
    const [events, setEvents] = useState();
    const [searchEvents, setSearchEvents] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const payload = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: { userId : localStorage.getItem('userId')}
        }
        
        axios.get('/api/getYourEvents', payload)
        .then(function (response) {
            setEvents(response.data.events);
            setSearchEvents(response.data.events);
        })
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 401){
                navigate('/login');
                }
            }})
    }, [navigate])

    function HandleSearch(){
        const query = document.getElementById('default-search').value.split("");
        if (query.length === 0){
            setSearchEvents(events);
            return;
        }

        const newSearchEvents = events.filter(el => {
            const title = el.title;
            let count = 0;
            title.split('').forEach(letter => {
                if(count < query.length && (query[count] === letter || query[count] === letter.toUpperCase() || query[count].toUpperCase() === letter)) { 
                    count++;
                }
            });
            return count === query.length;
        });

        setSearchEvents(newSearchEvents);
    }

    return (
        <div className='flex overflow-x-hide h-full w-full'>
            <EventsSidebar />
            <div className='h-full w-7/8 pt-28 pr-20 pl-10 bg-gray-900'>
                <CreateEventButton></CreateEventButton>
                <div className='overflow-auto h-full '>
                    {searchEvents !== undefined ? (
                        <div className='bg-gray-800 rounded-md mb-10 w-full'>
                            <div className='pt-3 pl-4 pr-4 w-full'>
                                <div className='flex pb-3'>
                                    <a href="/events/publicevents" className='text-2xl text-white'>Your events</a>
                                    <input onChange={HandleSearch} type="search" id="default-search" className="block w-40 p-1 ml-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required/>
                                </div>
                                <EventListFull events={searchEvents}></EventListFull>
                            </div>
                        </div>
                        ) : (
                            <p className='text-white'>You have not been invited to any events yet!</p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}