import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react'
import axios from 'axios'
import { Event } from "@backend/Event.js";
import { CreatePostI } from './PostList';
import { useParams } from 'react-router-dom';
import PostList from './PostList';
import {
    format,
} from 'date-fns'
import {getUserId} from "../config/firebase"
const noImgIcon = require('../icons/noImgIcon.svg') as string;
const locationIcon = require('../icons/noImgIcon.svg') as string;
const tagIcon = require('../icons/noImgIcon.svg') as string;
const dateIcon = require('../icons/noImgIcon.svg') as string;
const infoIcon = require('../icons/noImgIcon.svg') as string;

// import noImgIcon from '../icons/noImgIcon.svg';
// import locationIcon from '../icons/locationIcon.svg';
// import tagIcon from '../icons/tagIcon.svg';
// import dateIcon from '../icons/dateIcon.svg';
// import infoIcon from '../icons/infoIcon.svg';

interface Props {
    event: Event;
  }

const EventInfo:React.FC<Props> = forwardRef(({event}, ref) => {
    const [eventTime, setEventTime] = useState("");
    const [eventTags, setEventTags] = useState("");
    enum State{
        going = 'going',
        maybe = 'maybe',
        notgoing = 'notgoing',
        nothing = 'nothing'
    }
    const [state, setState] = useState(State.nothing);
    const [amountGoing, setAmountGoing] = useState(0);
    const [amountMaybe, setAmountMaybe] = useState(0);
    const [maybeColor, setMaybeColor] = useState("#99ccff");
    const [goingColor, setGoingColor] = useState("#99ccff");
    const [notGoingColor, setNotGoingColor] = useState("#99ccff");
    const postListRef = useRef<CreatePostI>(null);

    let {eventId} = useParams();

    useImperativeHandle(ref, () => {
        return {
            HandleClickCreatePost(){
                setTimeout(() => {
                    postListRef.current?.createPost();
                }, 100);
            }
        };
    }, []);

    useEffect(() => {
        const startTime = new Date(event.startTime);
        const endTime = new Date(event.endTime);
        let currentDate = '';
        if (startTime !== undefined && endTime !== undefined){
            const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saterday"];
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            const weekday = weekdays[startTime.getDay()];
            const day = startTime.getDate();
            const month = months[startTime.getMonth()];
            const year = startTime.getFullYear();
            currentDate = `${weekday} ${day} ${month} ${year}: ${format(startTime, 'h:mm a')} - ${format(endTime, 'h:mm a')}`;
        }
        setEventTime(currentDate);
        getUserId()
        .then(function(userId){
            if(event.going.includes(userId)){
                setState(State.going);
                setGoingColor("#ff6666");
            }
            if(event.maybe.includes(userId)){
                setState(State.maybe);
                setMaybeColor("#ff6666");
            }
            if(event.notGoing.includes(userId)){
                setState(State.notgoing);
                setNotGoingColor("#ff6666");
            }
        })
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
    }, [event, State.going, State.maybe, State.notgoing])

    function HandleGoing(){
        const payload = {
            eventId: event.id,
            going: state !== State.going,
        }
        
        axios.post('/api/events/setGoing',payload)
        
        if (state === State.maybe){
            setAmountMaybe(amountMaybe-1);
        }

        if (state === State.going){
            setAmountGoing(amountGoing-1);
            setState(State.nothing);
            setGoingColor("#99ccff");
        }
        else{
            setAmountGoing(amountGoing+1);
            setState(State.going);
            setGoingColor("#ff6666");
        }

        setNotGoingColor("#99ccff");
        setMaybeColor("#99ccff");
    }

    function HandleMaybe(){
        const payload = {
            eventId: event.id,
            maybe: state !== State.maybe,
        }
        
        axios.post('/api/events/setMaybe',payload)

        if (state === State.going){
            setAmountGoing(amountGoing-1);
        }

        if (state === State.maybe){
            setAmountMaybe(amountMaybe-1);
            setState(State.nothing);
            setMaybeColor("#99ccff");
        }
        else{
            setAmountMaybe(amountMaybe+1);
            setState(State.maybe);
            setMaybeColor("#ff6666");
        }

        setNotGoingColor("#99ccff");
        setGoingColor("#99ccff");
    }

    function HandleNotGoing(){
        const payload = {
            eventId: event.id,
            notGoing: state !== State.notgoing,
        }
        axios.post('/api/events/setNotGoing',payload)

        if (state === State.going){
            setAmountGoing(amountGoing-1);
        }
        if (state === State.maybe){
            setAmountMaybe(amountMaybe-1);
        }

        if (state === State.notgoing){
            setState(State.nothing);
            setNotGoingColor("#99ccff");
        }
        else{
            setState(State.notgoing);
            setNotGoingColor("#ff6666");
        }

        setMaybeColor("#99ccff");
        setGoingColor("#99ccff");
    }

    function addDefaultSrc(ev: any){
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
                                <div className='flex pb-5 mt-2 text-sm'>
                                    <div className={state !== State.going ? 
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
                                    <div className={state !== State.maybe ? 
                                        'flex bg-gray-800 hover:bg-gray-600 h-12 rounded-md pr-4 pl-4 mr-4 border-blue-200 border-2' : 
                                        'flex bg-gray-800 hover:bg-gray-600 h-12 rounded-md pr-4 pl-4 mr-4 border-red-500 border-2'}>
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
                                    <div className={state !== State.notgoing ? 
                                        'flex bg-gray-800 hover:bg-gray-600 h-12 rounded-md pr-4 pl-4 border-blue-200 border-2' : 
                                        'flex bg-gray-800 hover:bg-gray-600 h-12 rounded-md pr-4 pl-4 border-red-500 border-2'}>
                                        <button className='flex justify-center items-center w-full h-full' onClick={HandleNotGoing}>
                                            <div className="h-full w-8 mr-1">
                                                <svg className="h-full w-full" viewBox="0 0 24 24" id="date-question" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" >
                                                    <path id="primary" d="M20,21H4a1,1,0,0,1-1-1V9H21V20A1,1,0,0,1,20,21ZM21,5a1,1,0,0,0-1-1H4A1,1,0,0,0,3,5V9H21Z" fill="none" stroke={notGoingColor} strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"></path>
                                                    <path id="secondary" d="M16,3V6M8,3V6" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"></path>
                                                    <path id="secondary-2" data-name="secondary" d="M12,15h.5A1.5,1.5,0,0,0,14,13.5h0A1.5,1.5,0,0,0,12.5,12H11" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"></path>
                                                    <line id="secondary-upstroke" x1="11.95" y1="18" x2="12.05" y2="18" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"></line>
                                                </svg>
                                            </div>
                                            <p>Not Going</p>
                                        </button>
                                    </div>
                                </div>
                                <div className='flex ml-4'>
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
                            {eventId !== undefined && 
                                <div className='pr-20'>
                                    <PostList ref={postListRef} objectId={eventId} type={"event"}></PostList>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
})

export default EventInfo;