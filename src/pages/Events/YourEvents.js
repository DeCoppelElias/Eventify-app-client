import React, { useEffect, useState} from 'react'
import EventListFull from '../../components/EventListFull'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import EventsSidebar from '../../components/EventsSidebar'
import CreateEventButton from '../../components/CreateEventButton';
import TagListDropdown from '../../components/TagListDropdown';

export default function YourEvents() {
    const [events, setEvents] = useState();
    const [searchEvents, setSearchEvents] = useState();
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [query, setQuery] = useState([]);

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

    function RefreshSearchEvents(query, tags){
        if (query.length === 0 && tags.length === 0){
            setSearchEvents(events);
            return;
        }

        console.log(query)
        console.log(tags)

        const newSearchEvents = events.filter(event => {
            const title = event.title;
            let count = 0;
            title.split('').forEach(letter => {
                if(count < query.length && (query[count] === letter || query[count] === letter.toUpperCase() || query[count].toUpperCase() === letter)) { 
                    count++;
                }
            });

            let tagsValid = true;
            for (const tag of tags){
                const index = event.tags.indexOf(tag);
                if (index === -1){
                    tagsValid = false;
                    break;
                }
            }

            return count === query.length && tagsValid;
        });

        setSearchEvents(newSearchEvents);
    }

    function HandleSearch(){
        const newQuery = document.getElementById('default-search').value.split("")
        setQuery(newQuery);
        RefreshSearchEvents(newQuery, tags)
    }

    function HandleTagChange(newTags){
        setTags(newTags);
        RefreshSearchEvents(query, newTags)
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
                                    <a href="/events/publicevents" className='w-2/5 text-2xl text-white'>Your events</a>
                                    <input onChange={HandleSearch} type="search" id="default-search" className="block w-40 h-8 p-1 ml-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required/>
                                    <div className='ml-5 flex w-full'>
                                        <p className='text-white m-auto mt-0 p-1'>Filter: </p>
                                        <div className='ml-2 w-full'>
                                            <TagListDropdown HandleTagChange={HandleTagChange}/>
                                        </div>
                                    </div>
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