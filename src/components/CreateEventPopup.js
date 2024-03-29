import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import noImgIcon from '../icons/noImgIcon.svg';
import axios from 'axios';
import TagList from './TagList.js'
import SelectGroupList from './SelectGroupList'
import SelectTimeDropdown from './SelectTimeDropdown';

function useComponentVisible(initialIsVisible, ResetState) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const innerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (innerRef.current && !innerRef.current.contains(event.target)) {
                setIsComponentVisible(false);
                ResetState();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [ResetState]);

    return { innerRef, isComponentVisible, setIsComponentVisible };
}


const EventPopup = forwardRef((props, ref) => {
    const [imageFile, SetImageFile] = useState();
    const [imagePreview, SetImagePreview] = useState();
    const [eventNameFilled, setEventNameFilled] = useState(true);
    const [locationFilled, setLocationFilled] = useState(true);
    const [descriptionFilled, setDescriptionFilled] = useState(true);
    const [timeFilled, setTimeFilled] = useState(true);
    const [imageFilled, setImageFilled] = useState(true);
    const [privateCheckbox, setPrivateCheckbox] = useState(false);
    const [privateLocked, setPrivateLocked] = useState(false);
    const { innerRef, isComponentVisible , setIsComponentVisible} = useComponentVisible(false, ResetState);
    const tagListRef = useRef();
    const selectGroupListRef = useRef();
    const selectStartTimeRef = useRef();
    const selectEndTimeRef = useRef();
    const currentDateObject = new Date();
    const nextYearDateObject = new Date();
    nextYearDateObject.setFullYear(nextYearDateObject.getFullYear() + 1);

    function ResetState(){
        setEventNameFilled(true);
        setLocationFilled(true);
        setDescriptionFilled(true);
        setTimeFilled(true);
        setImageFilled(true);
        setPrivateCheckbox(false);
    }

    function GetDateString(dateObj){
        var month = dateObj.getMonth() + 1; //months from 1-12
        if (String(month).length === 1){
            month = "0" + month;
        }
        var day = dateObj.getDate();
        if (String(day).length === 1){
            day = "0" + day;
        }
        var year = dateObj.getFullYear();
        const dateString = year + "-" + month + "-" + day;
        return dateString;
    }

    useImperativeHandle(ref, () => {
        return {
            HandleEventCreation(){
                setIsComponentVisible(true);
            },
            SetGroup(group){
                setPrivateCheckbox(true);
                setPrivateLocked(true);
                setTimeout(() => {
                    selectGroupListRef.current?.SetGroup(group);
                }, 10);
            } 
          };
        });

    function HandleUploadImage(e){
        if (!e.target.files || e.target.files.length === 0) {
            SetImageFile(undefined)
            return
        }

        SetImageFile(e.target.files[0])
    }

    function HandleCreateEvent(){
        const event_name = document.getElementById('event_name').value;
        const location = document.getElementById('location').value;
        const startTime = new Date(document.getElementById('date').value);
        startTime.setHours(selectStartTimeRef.current.getHour());
        startTime.setMinutes(selectStartTimeRef.current.getMinute());
        const endTime = new Date(document.getElementById('date').value)
        endTime.setHours(selectEndTimeRef.current.getHour());
        endTime.setMinutes(selectEndTimeRef.current.getMinute());
        const description = document.getElementById('description').value;
        const restricted = privateCheckbox;
        const tags = tagListRef.current.GetTags();
        let createForGroups = [];
        if(restricted){
            createForGroups = selectGroupListRef.current.GetGroupsIds();
        }

        if (event_name === ""){
            setEventNameFilled(false);
            document.getElementById('event_name').scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        if(imageFile === undefined){
            setImageFilled(false);
            document.getElementById('image').scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        if (location === ""){
            setLocationFilled(false);
            document.getElementById('location').scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        if (description === ""){
            setDescriptionFilled(false);
            document.getElementById('description').scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setIsComponentVisible(false)

        const imageType = imageFile.type.split("/")[1];

        const payload = {
            title: event_name,
            location: location,
            startTime: startTime,
            endTime: endTime,
            description: description,
            restricted: restricted,
            createForGroups: createForGroups,
            tags: tags,
            imageType: imageType
        }
        
        axios.post('/api/events/createEvent',payload)
        .then(res => {
            const imagePayload = new FormData()
            imagePayload.append('eventId', res.data.eventId);
            imagePayload.append('file', imageFile);
            const imageHeader = {
                headers: { 
                    "Content-Type": "multipart/form-data"
                },
            }

            axios.post('/api/uploadEventImage',imagePayload, imageHeader);
        })
    }

    useEffect(() => {
        if (!imageFile) {
            SetImagePreview(undefined)
            return
        }

        // create the preview
        const objectUrl = URL.createObjectURL(imageFile)
        SetImagePreview(objectUrl)
     
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
     }, [imageFile]);

    return (
        <div className=''>
            {isComponentVisible && 
                <div className='absolute h-screen w-screen top-0 left-0 z-10'>
                    <div ref={innerRef}>
                        <div className='bg-gray-800 border-2 border-gray-600 absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[600px] h-4/5 rounded-md'>
                            <div className='overflow-auto h-full w-full pb-20'>
                                <div className='w-5/6 m-auto mt-5'>
                                    <form className={eventNameFilled ? '' : '-m-[2px] animate-jump border-[2px] border-red-500 rounded-lg'}>
                                        <div className=''>
                                            <textarea onClick={() => setEventNameFilled(true)} placeholder="Event Title" type="text" rows={1} maxLength={25} id="event_name" className="overflow-hidden resize-none text-gray-900 text-4xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                        </div>
                                    </form>
                                </div>
                                <div id='image' className={imageFilled ? 'relative w-5/6 h-1/2 m-auto mt-6 border-gray-900 border-2 rounded-3xl' : 'relative w-5/6 h-1/2 m-auto mt-6 border-red-500 border-2 rounded-3xl animate-jump'}>
                                    <label onClick={()=>setImageFilled(true)} className='p-2 absolute bottom-3 right-3 bg-gray-700 text-white hover:bg-gray-600 hover:cursor-pointer rounded-lg border-2 border-gray-500'>
                                        <p>Change Image</p>
                                        <input type='file' accept="image/*" onChange={HandleUploadImage}></input> 
                                    </label>
                                    {imagePreview === undefined ? (
                                        <img className="w-1/4 h-full m-auto" alt="" src={noImgIcon} />
                                    ) : (
                                        <img className="object-fill h-full w-full rounded-3xl" alt="" src={imagePreview} />
                                    )}
                                </div>
                                <div className='relative w-5/6 m-auto'>
                                    <TagList ref={tagListRef}></TagList>
                                    <div className="mb-4 mt-4">
                                        {privateLocked ? 
                                            <div>
                                                <input checked disabled id="privateEvent" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label htmlFor="privateEvent" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Private Event</label>
                                            </div>
                                        :
                                            <div>
                                                <input onClick={() => setPrivateCheckbox(!privateCheckbox)} id="privateEvent" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label htmlFor="privateEvent" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Private Event</label>
                                            </div>
                                        }
                                        </div>
                                    {privateCheckbox && 
                                        <div className='border-l-2 border-gray-500 pl-4 ml-2'>
                                            <SelectGroupList ref={selectGroupListRef}></SelectGroupList>
                                        </div>
                                    }
                                    <div className='pt-5'>
                                        <div className='pb-4'>
                                            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location *</label>
                                            <div className={locationFilled ? '' : '-m-[2px] animate-jump border-[2px] border-red-500 rounded-lg'}>
                                                <input onClick={()=>setLocationFilled(true)} type="text" maxLength={40} id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date *</label>
                                            <div className={timeFilled ? '' : '-m-[2px] animate-jump border-[2px] border-red-500 rounded-lg'}>
                                                <input type="date" onKeyDown={(event) => event.preventDefault()} id="date" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    defaultValue={GetDateString(currentDateObject)}
                                                    min={GetDateString(currentDateObject)} max={GetDateString(nextYearDateObject)}>
                                                </input>
                                            </div>
                                        </div>
                                        <div className="flex items-center px-4 text-white w-full">
                                            <p className='whitespace-nowrap'>Start Time: </p>
                                            <SelectTimeDropdown ref={selectStartTimeRef}/>
                                        </div>
                                        <div className="flex items-center px-4 text-white w-full">
                                            <p className='whitespace-nowrap'>End Time: </p>
                                            <SelectTimeDropdown ref={selectEndTimeRef}/>
                                        </div>
                                        <div className='pb-4'>
                                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description *</label>
                                            <div className={descriptionFilled ? '' : '-m-[2px] animate-jump border-[2px] border-red-500 rounded-lg'}>
                                                <textarea onClick={()=>setDescriptionFilled(true)} id="description" maxLength={1000} rows={7} className="resize-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className='absolute mr-4 mb-4 right-0 bottom-0 p-2 bg-gray-700 text-white hover:bg-gray-600 rounded-md border-gray-500 border-2' onClick={HandleCreateEvent}>
                                    Create Event
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
});

export default EventPopup;