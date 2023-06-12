import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import noImg from '../noimg.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const innerRef = useRef(null);

    const handleClickOutside = (event) => {
        if (innerRef.current && !innerRef.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return { innerRef, isComponentVisible, setIsComponentVisible };
}


const EventPopup = forwardRef((props, ref) => {
    const [eventId, setEventId] = useState("");
    const { innerRef, isComponentVisible , setIsComponentVisible} = useComponentVisible(false);
    const navigate = useNavigate();

    useImperativeHandle(ref, () => {
        return {
            HandleEventCreation(){
                setIsComponentVisible(true);
            }
          };
        });

    const imgPath = `http://localhost:5000/Images/image-${String(eventId)}.jpg`;
    function addDefaultSrc(ev){
        ev.target.src = noImg;
    };

    function HandleCreateEvent(){
        const event_name = document.getElementById('event_name').value;
        const location = document.getElementById('location').value;
        const time = document.getElementById('time').value;
        const description = document.getElementById('description').value;

        const header = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }

        const payload = {
            userId: localStorage.getItem('userId'),
            title: event_name,
            location: location,
            time: time,
            description: description,
            restricted: false
        }
        
        axios.post('/api/createEvent',payload, header)
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 401){
                    navigate('/login');
                }
        }})
    }

    return (
        <div>
            {isComponentVisible && 
                <div className='absolute w-full h-full top-0 left-0'>
                    <div ref={innerRef}>
                        <div className=' bg-gray-600 absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-2/5 h-4/5'>
                            <div className='w-5/6 h-2/5 m-auto'>
                                <button className='w-10 h-10 absolute top-20 left-1/2 -translate-x-1/2 bg-red-500' />
                                <img className="pt-2 object-fill h-full w-full rounded-3xl" alt="" src={imgPath} onError={addDefaultSrc}/>
                            </div>
                            <div className='w-5/6 h-60 m-auto overflow-auto'>
                                <form className='p-2'>
                                    <div>
                                        <label htmlFor="event_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event name</label>
                                        <input type="text" id="event_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                                        <input type="text" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                                        <input type="text" id="time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                        <input type="text" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                    </div>
                                </form>
                            </div>
                            <button className='absolute mr-4 mb-4 right-0 bottom-0 w-32 h-10 bg-green-300 text-white' onClick={HandleCreateEvent}>Create Event</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
});

export default EventPopup;