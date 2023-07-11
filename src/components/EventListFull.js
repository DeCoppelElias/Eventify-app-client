import React from 'react';
import EventBox from './EventBox';

export default function EventListFull({ events }) {
    const amountOfEvents = events.length;

    let displayEvents = []
    if (typeof events !== 'undefined'){
        displayEvents = events.slice(0,amountOfEvents);
    }

    return (
        <div className='flex flex-wrap pt-2 pb-4'>
            {typeof events === 'undefined' ? (
                <p>Loading...</p>
            ) : (
                displayEvents.map((event, i) => (
                    <div key={i} className='p-2'>
                        <EventBox event={event} />
                    </div>
                ))
            )}
        </div>
    );
}