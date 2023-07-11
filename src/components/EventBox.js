import React from 'react';
import { useNavigate} from 'react-router-dom';
import noImgIcon from '../icons/noImgIcon.svg';
import tagIcon from '../icons/tagIcon.svg';
import locationIcon from '../icons/locationIcon.svg';
import dateIcon from '../icons/dateIcon.svg';

export default function EventBox({ event }) {
    const id = event.id;
    const title = event.title;
    const location = event.location;
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
    
    let tags = ""
    if (event.tags.length > 0){
        tags = String(event.tags[0]);
    }
    for (let i=1;i<event.tags.length;i++){
        tags += " " + String(event.tags[i]);
    }
    const going = event.going.length;
    const maybe = event.maybe.length;
    const navigate = useNavigate();

    const HandleEvent = () => {
        navigate('/events/' + String(id))
    }

    const imageType = event.imageType;
    const imgPath = `http://localhost:5000/Images/events/image-${String(id)}.${String(imageType)}`;
    function addDefaultSrc(ev){
        ev.target.src = noImgIcon;
    };

    return (
        <div className='bg-gray-800 hover:bg-gray-700 w-60 h-60 rounded-3xl border-1 border-gray-500 mr-auto ml-auto cursor-pointer mb-6' onClick={HandleEvent}>
            <div className='h-1/2 w-full'>
                <img className=" object-fill w-full h-full rounded-3xl" alt="" src={imgPath} onError={addDefaultSrc}/>
            </div>
            <div className='ml-3 mr-3 truncate'>
                <p className='text-lg text-white'>{title}</p>
                <div className='flex w-4'>
                    <img alt="" src={dateIcon} className='mr-1'></img>
                    <p className='text-sm text-gray-400'>{currentDate}</p>
                </div>
                <div className='flex w-4'>
                    <img alt="" src={locationIcon} className='mr-1'></img>
                    <p className='text-sm text-gray-400'>{location}</p>
                </div>
                <div className='flex w-4'>
                    <img alt="" src={tagIcon} className='mr-1'></img>
                    <p className=' text-sm text-gray-400'>{tags}</p>
                </div>
                
                <p className=' text-sm text-gray-400'>{going} Going - {maybe} Maybe</p>
            </div>
        </div>
    );
}