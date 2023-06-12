import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import noImg from '../noimg.png';
import locationIcon from '../icons/locationIcon.svg';
import tagIcon from '../icons/tagIcon.svg';
import dateIcon from '../icons/dateIcon.svg';
import infoIcon from '../icons/infoIcon.svg';
import goingIcon from '../icons/goingIcon.svg';
import maybeIcon from '../icons/maybeIcon.svg';

export default function EventInfo() {
    const [eventData, setEventData] = useState();
    const [eventTime, setEventTime] = useState();
    const [eventTags, setEventTags] = useState();
    const [exists, setExists] = useState(true);
    const navigate = useNavigate();

    let {eventId} = useParams();

    useEffect(() => {
        const payload = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: { eventId : eventId}
        }

        axios.get('/api/getEvent', payload)
        .then(function (response) {
            setEventData(response.data);

            const date = new Date(response.data.event.time);
            const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saterday"];
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            const weekday = weekdays[date.getDay()];
            const day = date.getDate();
            const month = months[date.getMonth()];
            const year = date.getFullYear();
            const currentDate = `${weekday} ${day} ${month} ${year}`;
            setEventTime(currentDate);

            let tags = ""
            if (response.data.event.tags.length > 0){
                tags = String(response.data.event.tags[0]);
            }
            for (let i=1;i<response.data.event.tags.length;i++){
                tags += " " + String(response.data.event.tags[i]);
            }
            setEventTags(tags);
        }).catch(function (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 401){
                    navigate('/login');
                }
                if (error.response.status === 404){
                    setExists(false);
                }
            }})
    }, [navigate, eventId]);

    function HandleGoing(){
        const header = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }

        const payload = {
            userId: localStorage.getItem('userId'),
            eventId: eventData.event.id
        }
        
        axios.post('/api/setGoing',payload, header)
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 401){
                    navigate('/login');
                }
        }})
    }

    function HandleMaybe(){
        const header = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }

        const payload = {
            userId: localStorage.getItem('userId'),
            eventId: eventData.event.id
        }
        
        axios.post('/api/setMaybe',payload, header)
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 401){
                    navigate('/login');
                }
        }})
    }

    function addDefaultSrc(ev){
        ev.target.src = noImg;
    };

    return(
        <div className='overflow-auto w-full h-full pt-3 pl-6 pr-6 pb-4'>
            {exists === false ? (
                <p>Event does not exist</p>
            ) : (
                <>{typeof eventData === 'undefined' ? (
                    <p>Loading...</p>
                ) : (
                    <div className='w-full h-full'>
                        <div className='flex absolute -top-14 right-0 bg-gray-800 hover:bg-gray-700 w-32 h-12 rounded-md pr-4 pl-4'>
                            <img alt="" src={goingIcon} className='w-1/3'></img>
                            <button className='w-2/3' onClick={HandleGoing}>Going</button>
                        </div>
                        <div className='flex absolute -top-14 right-40 bg-gray-800 hover:bg-gray-700 w-32 h-12 rounded-md pr-4 pl-4'>
                            <img alt="" src={maybeIcon} className='w-1/3'></img>
                            <button className='w-2/3' onClick={HandleMaybe}>Maybe</button>
                        </div>
                        <div className='h-1/2 bg-gray-700 pt-5 pb-5 rounded-3xl'>
                            <img className="object-fill w-1/2 h-full m-auto min-w-[50%] rounded-3xl border-blue-200 border-2" alt="" src={`http://localhost:5000/Images/image-${String(eventData.event.id)}.jpg`} onError={addDefaultSrc}/>
                        </div>
                        <div className='h-2/5 pt-4'>
                            <div className='relative pl-20 w-full'>
                                <div className='absolute right-0 top-20'>  
                                    <div className=''>
                                        <img className='object-fill' alt=" " src={noImg}></img>
                                        Hier komt een map met de locatie
                                    </div> 
                                </div>
                                <div className='flex pb-10'>
                                    <div className='text-4xl pb-5 pt-2 font-semibold mr-10'>
                                        {eventData.event.title}
                                    </div>
                                    <div className='flex pb-5 mt-2'>
                                        <div className='flex bg-gray-800 hover:bg-gray-600 w-32 h-12 rounded-md pr-4 pl-4 mr-4 border-blue-200 border-2'>
                                            <img alt="" src={goingIcon} className='w-1/3'></img>
                                            <button className='w-2/3' onClick={HandleGoing}>Going</button>
                                        </div>
                                        <div className='flex bg-gray-800 hover:bg-gray-600 w-32 h-12 rounded-md pr-4 pl-4 border-blue-200 border-2'>
                                            <img alt="" src={maybeIcon} className='w-1/3'></img>
                                            <button className='w-2/3' onClick={HandleMaybe}>Maybe</button>
                                        </div>
                                    </div>
                                    <div className='flex pl-4 pr-4'>
                                        <div className='flex w-20 h-12 border-blue-200 border-2 rounded-lg justify-center p-2 m-2'>
                                            <img alt="" src={goingIcon} className='w-2/3'></img>
                                            <p className='text-lg w-1/3'>{eventData.event.going.length}</p>
                                        </div>
                                        <div className='flex w-20 h-12 border-blue-200 border-2 rounded-lg justify-center p-2 m-2'>
                                            <img alt="" src={maybeIcon} className='w-2/3'></img>
                                            <p className='text-lg w-1/3'>{eventData.event.maybe.length}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='pb-20'>
                                    <div className='flex pb-3'>
                                        <img alt="" src={locationIcon} className='mr-2 w-5'></img>
                                        <p className='text-base text-gray-400'>{eventData.event.location}</p>
                                    </div>
                                    <div className='flex pb-3'>
                                        <img alt="" src={dateIcon} className='mr-2 w-5'></img>
                                        <p className='text-base text-gray-400'>{eventTime}</p>
                                    </div>
                                    <div className='flex pb-3'>
                                        <img alt="" src={tagIcon} className='mr-2 w-5'></img>
                                        <p className='text-base text-gray-400'>{eventTags}</p>
                                    </div>
                                    <div className='flex pb-3'>
                                        <img alt="" src={infoIcon} className='mr-2 w-5'></img>
                                        <p className='text-base text-gray-400'>{eventData.event.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}</>
            )}
        </div>
    )
}