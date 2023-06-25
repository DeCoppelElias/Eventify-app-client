import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import noImgIcon from '../icons/noImgIcon.svg';
import locationIcon from '../icons/locationIcon.svg';
import tagIcon from '../icons/tagIcon.svg';
import dateIcon from '../icons/dateIcon.svg';
import infoIcon from '../icons/infoIcon.svg';
import PostList from './PostList';

export default function EventInfo() {
    const [eventData, setEventData] = useState();
    const [eventTime, setEventTime] = useState();
    const [eventTags, setEventTags] = useState();
    const [exists, setExists] = useState(true);
    const [going, setGoingValue] = useState(false);
    const [maybe, setMaybeValue] = useState(false);
    const [amountGoing, setAmountGoing] = useState(0);
    const [amountMaybe, setAmountMaybe] = useState(0);
    const [maybeColor, setMaybeColor] = useState("#99ccff");
    const [goingColor, setGoingColor] = useState("#99ccff");
    const navigate = useNavigate();

    let {eventId} = useParams();

    function setMaybe(bool){
        if (bool){
            setMaybeColor("#ff0066");
        }
        else{
            setMaybeColor("#99ccff");
        }

        setMaybeValue(bool);
    }

    function setGoing(bool){
        if (bool){
            setGoingColor("#ff0066");
        }
        else{
            setGoingColor("#99ccff");
        }

        setGoingValue(bool);
    }

    useEffect(() => {
        const payload = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: { eventId : eventId}
        }

        axios.get('/api/getEvent', payload)
        .then(function (response) {
            setEventData(response.data);

            const date = new Date(response.data.event.time);
            let currentDate = '';
            if (!isNaN(date)){
                const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saterday"];
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                const weekday = weekdays[date.getDay()];
                const day = date.getDate();
                const month = months[date.getMonth()];
                const year = date.getFullYear();
                currentDate = `${weekday} ${day} ${month} ${year}`;
            }
            setEventTime(currentDate);
            setGoing(response.data.event.going.includes(localStorage.getItem('userId')));
            setMaybe(response.data.event.maybe.includes(localStorage.getItem('userId')));
            setAmountGoing(response.data.event.going.length);
            setAmountMaybe(response.data.event.maybe.length);

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
            eventId: eventData.event.id,
            going: !going
        }
        
        axios.post('/api/setGoing',payload, header)
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 401){
                    navigate('/login');
                }
        }});

        setGoing(!going);

        if (!going){
            setAmountGoing(amountGoing+1);
        }
        else{
            setAmountGoing(amountGoing-1);
        }
        
        if (maybe){
            setMaybe(false);
            setAmountMaybe(amountMaybe-1);
        }
    }

    function HandleMaybe(){
        const header = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }

        const payload = {
            userId: localStorage.getItem('userId'),
            eventId: eventData.event.id,
            maybe: !maybe
        }
        
        axios.post('/api/setMaybe',payload, header)
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 401){
                    navigate('/login');
                }
        }});

        setMaybe(!maybe);

        if (!maybe){
            setAmountMaybe(amountMaybe+1);
        }
        else{
            setAmountMaybe(amountMaybe-1);
        }

        if (going){
            setGoing(false);
            setAmountGoing(amountGoing-1);
        }
    }

    function addDefaultSrc(ev){
        ev.target.src = noImgIcon;
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
                        <div className={!maybe ? 'absolute -top-14 right-0 bg-gray-800 hover:bg-gray-700 w-32 h-12 rounded-md pr-4 pl-4 border-2 border-gray-800' : 'absolute -top-14 right-0 bg-gray-800 hover:bg-gray-700 w-32 h-12 rounded-md pr-4 pl-4 border-2 border-red-500'}>
                            <button className='flex items-center align-middle w-full h-full' onClick={HandleMaybe}>
                                <div className="h-full w-8 mr-1 flex ">
                                    <svg className="h-full w-full" viewBox="0 0 24 24" id="date-question" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" >
                                        <path id="primary" d="M20,21H4a1,1,0,0,1-1-1V9H21V20A1,1,0,0,1,20,21ZM21,5a1,1,0,0,0-1-1H4A1,1,0,0,0,3,5V9H21Z" fill="none" stroke={maybeColor} strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"></path>
                                        <path id="secondary" d="M16,3V6M8,3V6" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"></path>
                                        <path id="secondary-2" data-name="secondary" d="M12,15h.5A1.5,1.5,0,0,0,14,13.5h0A1.5,1.5,0,0,0,12.5,12H11" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"></path>
                                        <line id="secondary-upstroke" x1="11.95" y1="18" x2="12.05" y2="18" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"></line>
                                    </svg>
                                </div>
                                <p>Maybe</p>
                            </button>
                        </div>
                        <div className={!going ? 'absolute -top-14 right-40 bg-gray-800 hover:bg-gray-700 w-32 h-12 rounded-md pr-4 pl-4 border-2 border-gray-800' : 'absolute -top-14 right-40 bg-gray-800 hover:bg-gray-700 w-32 h-12 rounded-md pr-4 pl-4 border-2 border-red-500'}>
                            <button className='flex items-center align-middle w-full h-full' onClick={HandleGoing}>
                                <div className="h-full w-8 mr-1 flex ">
                                    <svg className='h-full w-full' fill="#ffffff" viewBox="0 0 24 24" id="date-check" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" >
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                        <g id="SVGRepo_iconCarrier">
                                            <path id="primary" d="M20,21H4a1,1,0,0,1-1-1V9H21V20A1,1,0,0,1,20,21ZM21,5a1,1,0,0,0-1-1H4A1,1,0,0,0,3,5V9H21Z" fill="none" stroke={goingColor} strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"/>
                                            <path id="secondary" d="M16,3V6M8,3V6" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"/>
                                            <polyline id="secondary-2" data-name="secondary" points="9 15 11 17 15 13" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"/>
                                        </g>
                                    </svg>
                                </div>
                                <p>Going</p>
                            </button>
                        </div>
                        <div className='h-1/2 bg-gray-700 pt-5 pb-5 rounded-3xl'>
                            <img className="object-fill w-1/2 h-full m-auto min-w-[50%] rounded-3xl border-blue-200 border-2" alt="" src={`http://localhost:5000/Images/image-${String(eventData.event.id)}.${String(eventData.event.imageType)}`} onError={addDefaultSrc}/>
                        </div>
                        <div className='h-2/5 pt-4'>
                            <div className='relative pl-20 w-full'>
                                {/* <div className='absolute right-0 top-20'>  
                                    <div className=''>
                                        <img className='object-fill' alt=" " src={noImg}></img>
                                        Hier komt een map met de locatie
                                    </div> 
                                </div> */}
                                <div className='flex pb-10'>
                                    <div className='text-4xl pb-5 pt-2 font-semibold mr-10'>
                                        {eventData.event.title}
                                    </div>
                                    <div className='flex pb-5 mt-2'>
                                        <div className={!going ? 'relative flex bg-gray-800 hover:bg-gray-600 w-32 h-12 rounded-md pr-4 pl-4 mr-4 border-blue-200 border-2' : 'relative flex bg-gray-800 hover:bg-gray-600 w-32 h-12 rounded-md pr-4 pl-4 mr-4 border-red-500 border-2'}>
                                            <button className='flex justify-center items-center w-full h-full' onClick={HandleGoing}>
                                                <div className="h-full w-8 mr-1 flex ">
                                                    <svg className='h-full w-full' fill="#ffffff" viewBox="0 0 24 24" id="date-check" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" >
                                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <g id="SVGRepo_iconCarrier">
                                                            <path id="primary" d="M20,21H4a1,1,0,0,1-1-1V9H21V20A1,1,0,0,1,20,21ZM21,5a1,1,0,0,0-1-1H4A1,1,0,0,0,3,5V9H21Z" fill="none" stroke={goingColor} strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"/>
                                                            <path id="secondary" d="M16,3V6M8,3V6" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"/>
                                                            <polyline id="secondary-2" data-name="secondary" points="9 15 11 17 15 13" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"/>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <p>Going</p>
                                            </button>
                                        </div>
                                        <div className={!maybe ? 'relative flex bg-gray-800 hover:bg-gray-600 w-32 h-12 rounded-md pr-4 pl-4 border-blue-200 border-2' : 'relative flex bg-gray-800 hover:bg-gray-600 w-32 h-12 rounded-md pr-4 pl-4 border-red-500 border-2'}>
                                            <button className='flex justify-center items-center w-full h-full' onClick={HandleMaybe}>
                                                <div className="h-full w-8 mr-1 flex ">
                                                    <svg className="h-full w-full" viewBox="0 0 24 24" id="date-question" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" >
                                                        <path id="primary" d="M20,21H4a1,1,0,0,1-1-1V9H21V20A1,1,0,0,1,20,21ZM21,5a1,1,0,0,0-1-1H4A1,1,0,0,0,3,5V9H21Z" fill="none" stroke={maybeColor} strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"></path>
                                                        <path id="secondary" d="M16,3V6M8,3V6" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"></path>
                                                        <path id="secondary-2" data-name="secondary" d="M12,15h.5A1.5,1.5,0,0,0,14,13.5h0A1.5,1.5,0,0,0,12.5,12H11" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"></path>
                                                        <line id="secondary-upstroke" x1="11.95" y1="18" x2="12.05" y2="18" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"></line>
                                                    </svg>
                                                </div>
                                                <p>Maybe</p>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='flex pl-16 pr-4'>
                                        <div className='flex w-20 h-12 rounded-lg justify-center p-2 m-2'>
                                            <div className="h-full w-8 mr-1 flex ">
                                                <svg className='h-full w-full' fill="#ffffff" viewBox="0 0 24 24" id="date-check" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" >
                                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <g id="SVGRepo_iconCarrier">
                                                        <path id="primary" d="M20,21H4a1,1,0,0,1-1-1V9H21V20A1,1,0,0,1,20,21ZM21,5a1,1,0,0,0-1-1H4A1,1,0,0,0,3,5V9H21Z" fill="none" stroke={goingColor} strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"/>
                                                        <path id="secondary" d="M16,3V6M8,3V6" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"/>
                                                        <polyline id="secondary-2" data-name="secondary" points="9 15 11 17 15 13" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"/>
                                                    </g>
                                                </svg>
                                            </div>
                                            <p className='text-lg w-1/3'>{amountGoing}</p>
                                        </div>
                                        <div className='flex w-20 h-12 rounded-lg justify-center p-2 m-2'>
                                            <div className="h-full w-8 mr-1 flex ">
                                                <svg className="h-full w-full" viewBox="0 0 24 24" id="date-question" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" >
                                                    <path id="primary" d="M20,21H4a1,1,0,0,1-1-1V9H21V20A1,1,0,0,1,20,21ZM21,5a1,1,0,0,0-1-1H4A1,1,0,0,0,3,5V9H21Z" fill="none" stroke={maybeColor} strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"></path>
                                                    <path id="secondary" d="M16,3V6M8,3V6" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"></path>
                                                    <path id="secondary-2" data-name="secondary" d="M12,15h.5A1.5,1.5,0,0,0,14,13.5h0A1.5,1.5,0,0,0,12.5,12H11" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"></path>
                                                    <line id="secondary-upstroke" x1="11.95" y1="18" x2="12.05" y2="18" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"></line>
                                                </svg>
                                            </div>
                                            <p className='text-lg w-1/3'>{amountMaybe}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='pb-20 w-1/2'>
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
                                    <div className='flex pb-3 items-start'>
                                        <img alt="" src={infoIcon} className='mr-2 w-5'></img>
                                        <p className='text-base text-gray-400'>{eventData.event.description}</p>
                                    </div>
                                </div>
                                <div className='pr-20'>
                                    <PostList eventId={eventId}></PostList>
                                </div>
                            </div>
                        </div>
                    </div>
                )}</>
            )}
        </div>
    )
}