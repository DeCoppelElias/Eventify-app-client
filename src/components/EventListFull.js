import React from 'react';
import EventBox from './EventBox';

export default function EventList({ events }) {
    const amountOfEvents = events.length;

    let displayEvents = []
    if (typeof events !== 'undefined'){
        displayEvents = events.slice(0,amountOfEvents);
    }

    return (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 pt-2 pb-4'>
            {typeof events === 'undefined' ? (
                <p>Loading...</p>
            ) : (
                displayEvents.map((event, i) => (
                <EventBox key={i} event={event} />
                ))
            )}
        </div>
    );
}