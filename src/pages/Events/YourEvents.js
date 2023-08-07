import React, { useEffect, useState, useRef} from 'react';
import EventListFull from '../../components/EventListFull';
import axios from 'axios';
import SearchWithTagsBar from '../../components/SearchWithTagsBar';
import CreateEventPopup from '../../components/CreateEventPopup';
import EventsSidebar from '../../components/EventsSidebar';

export default function YourEvents() {
    const [events, setEvents] = useState([]);
    const [searchEvents, setSearchEvents] = useState([]);

    const createEventPopupRef = useRef();

    useEffect(() => {
        axios.get('/api/events/getYourEvents')
        .then(function (response) {
            setEvents(response?.data.events);
            setSearchEvents(response?.data.events);
        })
    }, [])

    function RefreshSearchEvents(query, tags){
        if (query.length === 0 && tags.length === 0){
            setSearchEvents(events);
            return;
        }

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

    return (
        <div className='flex h-full w-full'>
            <CreateEventPopup ref={createEventPopupRef}/>
            <div className='h-full w-full bg-gray-900 pr-20 pl-20'>
                <EventsSidebar state={"YourEvents"} createEventPopupRef={createEventPopupRef}/>
                <div className='w-full h-full pt-28'>
                    <div className='overflow-auto h-full'>
                        <div className='bg-gray-800 rounded-md mb-10 w-full'>
                            <div className='pt-3 pl-4 pr-4 w-full'>
                                <div className='flex pb-3'>
                                    <p className='sm:w-1/8 md:w-1/7 lg:w-1/6 xl:w-1/4 text-2xl text-white'>Your Events</p>
                                    <SearchWithTagsBar RefreshSearch={RefreshSearchEvents}/>
                                </div>
                                {searchEvents.length !== 0 ? (
                                    <EventListFull events={searchEvents}/>
                                ) : (
                                    <p className='text-white pb-5 pt-5'>We did not find any events, sorry!</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}