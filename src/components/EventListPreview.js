import React from 'react';
import EventBox from './EventBox';
import leftIcon from '../icons/leftIcon.svg';
import rightIcon from '../icons/rightIcon.svg';

let counter = 0;

export default function EventList({ events }) {
    const amountOfEvents = events.length;
    counter++;
    const containerString = 'eventListContainter ' + String(counter);

    let displayEvents = []
    if (typeof events !== 'undefined'){
        displayEvents = events.slice(0,amountOfEvents);
    }

    function ScrollLeft(){
        const container = document.getElementById(containerString);
        sideScroll(container,'left',3,600,5);
    }

    function ScrollRight(){
        const container = document.getElementById(containerString);
        sideScroll(container,'right',3,600,5);
    }

    function sideScroll(element,direction,speed,distance,step){
        let scrollAmount = 0;
        var slideTimer = setInterval(function(){
            if(direction === 'left'){
                element.scrollLeft -= step;
            } else {
                element.scrollLeft += step;
            }
            scrollAmount += step;
            if(scrollAmount >= distance){
                window.clearInterval(slideTimer);
            }
        }, speed);
    }

    return (
        <div className='relative h-full pt-2 pb-4'>
            {typeof events === 'undefined' ? (
                <p>Loading...</p>
            ) : (
                <div className='h-full w-full'>
                    <button className='absolute top-8 -right-4 w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full' onClick={ScrollRight}>
                        <img alt="" src={rightIcon}></img>
                    </button>
                    <button className='absolute top-8 -left-4 w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full' onClick={ScrollLeft}>
                        <img alt="" src={leftIcon}></img>
                    </button>
                    <div id={containerString} className='flex overflow-hidden'>
                        {displayEvents.map((event, i) => (
                            <div key={i} className='pr-4 pl-4'>
                                <EventBox event={event} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}