import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import noImgIcon from '../icons/noImgIcon.svg';
import locationIcon from '../icons/locationIcon.svg';
import tagIcon from '../icons/tagIcon.svg';
import dateIcon from '../icons/dateIcon.svg';
import infoIcon from '../icons/infoIcon.svg';
import PostList from './PostList';

const EventInfo = forwardRef(({event}, ref) => {
    const [eventTime, setEventTime] = useState();
    const [eventTags, setEventTags] = useState();
    const [state, setState] = useState("");
    const [amountGoing, setAmountGoing] = useState(0);
    const [amountMaybe, setAmountMaybe] = useState(0);
    const [maybeColor, setMaybeColor] = useState("#99ccff");
    const [goingColor, setGoingColor] = useState("#99ccff");
    const navigate = useNavigate();
    const postListRef = useRef();

    let {eventId} = useParams();

    useImperativeHandle(ref, () => {
        return {
            HandleClickCreatePost(){
                setTimeout(() => {
                    postListRef.current.CreatePost();
                }, 100);
            }
        };
    }, []);

    useEffect(() => {
        const date = new Date(event.time);
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
        setGoing(event.going.includes(localStorage.getItem('userId')));
        setMaybe(event.maybe.includes(localStorage.getItem('userId')));
        setAmountGoing(event.going.length);
        setAmountMaybe(event.maybe.length);

        let tags = ""
        if (event.tags.length > 0){
            tags = String(event.tags[0]);
        }
        for (let i=1;i<event.tags.length;i++){
            tags += " " + String(event.tags[i]);
        }
        setEventTags(tags);
    }, [event])

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

    function HandleGoing(){
        const header = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }

        const payload = {
            userId: localStorage.getItem('userId'),
            eventId: event.id,
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
            eventId: event.id,
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
            {typeof event === 'undefined' ? (
                <p>Loading...</p>
            ) : (
                <div className='w-full h-full'>
                    <div className='h-[400px] bg-gray-700 rounded-3xl'>
                        <img className=" object-cover w-full h-full m-auto rounded-3xl border-blue-200 border-2" alt="" src={`http://localhost:5000/Images/events/image-${String(event.id)}.${String(event.imageType)}`} onError={addDefaultSrc}/>
                    </div>
                    <div className='h-2/5 pt-4'>
                        <div className='relative pl-20 w-full'>
                            <div className='flex pb-10'>
                                <div className='text-4xl pb-5 pt-2 font-semibold mr-10'>
                                    {event.title}
                                </div>
                                <div className='flex pb-5 mt-2'>
                                    <div className={!going ? 
                                        'flex bg-gray-800 hover:bg-gray-600 h-12 rounded-md pr-4 pl-4 mr-4 border-blue-200 border-2' : 
                                        'flex bg-gray-800 hover:bg-gray-600 h-12 rounded-md pr-4 pl-4 mr-4 border-red-500 border-2'}>
                                        <button className='flex justify-center items-center w-full h-full' onClick={HandleGoing}>
                                            <div className="h-full w-8 mr-1">
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
                                    <div className={!maybe ? 
                                        'flex bg-gray-800 hover:bg-gray-600 h-12 rounded-md pr-4 pl-4 border-blue-200 border-2' : 
                                        'flex bg-gray-800 hover:bg-gray-600 h-12 rounded-md pr-4 pl-4 border-red-500 border-2'}>
                                        <button className='flex justify-center items-center w-full h-full' onClick={HandleMaybe}>
                                            <div className="h-full w-8 mr-1">
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
                                    <div className={!maybe ? 
                                        'flex bg-gray-800 hover:bg-gray-600 h-12 rounded-md pr-4 pl-4 border-blue-200 border-2' : 
                                        'flex bg-gray-800 hover:bg-gray-600 h-12 rounded-md pr-4 pl-4 border-red-500 border-2'}>
                                        <button className='flex justify-center items-center w-full h-full' onClick={HandleMaybe}>
                                            <div className="h-full w-8 mr-1">
                                                <svg className="h-full w-full" viewBox="0 0 24 24" id="date-question" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" >
                                                    <path id="primary" d="M20,21H4a1,1,0,0,1-1-1V9H21V20A1,1,0,0,1,20,21ZM21,5a1,1,0,0,0-1-1H4A1,1,0,0,0,3,5V9H21Z" fill="none" stroke={maybeColor} strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"></path>
                                                    <path id="secondary" d="M16,3V6M8,3V6" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"></path>
                                                    <path id="secondary-2" data-name="secondary" d="M12,15h.5A1.5,1.5,0,0,0,14,13.5h0A1.5,1.5,0,0,0,12.5,12H11" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"></path>
                                                    <line id="secondary-upstroke" x1="11.95" y1="18" x2="12.05" y2="18" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"></line>
                                                </svg>
                                            </div>
                                            <p>Not Going</p>
                                        </button>
                                    </div>
                                </div>
                                <div className='flex pl-16'>
                                    <div className='flex h-12 rounded-lg justify-center p-2 m-2'>
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
                                    <div className='flex h-12 rounded-lg justify-center p-2 m-2'>
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
                                    <p className='text-base text-gray-400'>{event.location}</p>
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
                                    <p className='text-base text-gray-400'>{event.description}</p>
                                </div>
                                <div className='text-sm text-gray-400'>
                                    {event.restricted ? (
                                        <p>This event is private</p>
                                    ) : (
                                        <p>This event is public</p>
                                    )}
                                </div>
                            </div>
                            <div className='pr-20'>
                                <PostList ref={postListRef} objectId={eventId} type={"event"}></PostList>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
})

export default EventInfo;