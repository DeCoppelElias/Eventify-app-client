import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle} from 'react'
import axios from 'axios'
import noImgIcon from '../icons/noImgIcon.svg';
import tagIcon from '../icons/tagIcon.svg';
import infoIcon from '../icons/infoIcon.svg';
import PostList from './PostList';
import EventList from './EventListFull';
import {auth, getUserId} from "../config/firebase"

const GroupInfo = forwardRef(({group, NotifySubscribed}, ref) => {
    const [events, setEvents] = useState();
    const [tags, setTags] = useState();
    const [tabState, setTabState] = useState("posts");
    const subscribedColor = {
        true: "#ff6666",
        false: "#99ccff",
    }
    const [subscribed, setSubscribed] = useState(false);
    const [amountSubscribed, setAmountSubscribed] = useState(group.subscribedUsers.length);
    const postListRef = useRef();

    useImperativeHandle(ref, () => {
        return {
            HandleClickCreatePost(){
                setTabState("posts");
                
                setTimeout(() => {
                    postListRef.current.createPost();
                }, 100);
            },
            HandleSubscribe(){
                const payload = {
                    groupId: group.id
                }
                
                axios.post('/api/subscribeToGroup',payload)
                .then(res => {
                    setSubscribed(true);
                    setAmountSubscribed(a => a+1)
                    NotifySubscribed(true);
                })
            },
            HandleUnSubscribe(){
                const payload = {
                    groupId: group.id
                }
                
                axios.post('/api/unSubscribeFromGroup',payload)
                .then(res => {
                    setSubscribed(false);
                    setAmountSubscribed(a => a-1);
                    NotifySubscribed(false);
                })
            }
        };
    }, [group.id, NotifySubscribed]);

    useEffect(() => {
        const payload = {
            params: { eventIds : group.events}
        }

        axios.get('/api/getEvents', payload)
        .then(function (response) {
            setEvents(response?.data.events);
        })

        let tags = ""
        if (group.tags.length > 0){
            tags = String(group.tags[0]);
        }
        for (let i=1;i<group.tags.length;i++){
            tags += " " + String(group.tags[i]);
        }
        setTags(tags);
    }, [group]);

    useEffect(() => {
        getUserId()
        .then(function(userId){
            const bool = group.subscribedUsers.includes(userId);
            setSubscribed(bool);
            NotifySubscribed(bool);
        })
    }, [NotifySubscribed, group.subscribedUsers]);

    function addDefaultSrc(ev){
        ev.target.src = noImgIcon;
    };

    function HandleTabStateChange(state){
        setTabState(state);

        setTimeout(() => {
            document.getElementById("tabs").scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 400);
    }

    return(
        <div className=' overflow-y-auto overflow-x-hidden w-full h-full pt-3 pl-6 pr-6 pb-4'>
            {typeof group === 'undefined' ? (
                <p>Loading...</p>
            ) : (
                <div className='w-full h-full'>
                    <div className='h-2/3 bg-gray-700 rounded-3xl'>
                        <img className=" object-cover w-full h-full m-auto rounded-3xl border-blue-200 border-2" alt="" src={`http://localhost:5000/Images/groups/image-${String(group.id)}.${String(group.imageType)}`} onError={addDefaultSrc}/>
                    </div>
                    <div className='h-2/5 pt-4'>
                        <div className='relative pl-20 w-full'>
                            <div className='flex pb-10'>
                                <div className='text-4xl pb-5 pt-2 font-semibold mr-10 w-3/4'>
                                    {group.title}
                                </div>
                                <div className='flex h-12 rounded-lg justify-center p-2 m-2'>
                                    <div className="h-full w-8 mr-1 flex ">
                                        <svg className='h-full w-full' fill="#ffffff" viewBox="0 0 24 24" id="date-check" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" >
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                            <g id="SVGRepo_iconCarrier">
                                                <path id="primary" d="M20,21H4a1,1,0,0,1-1-1V9H21V20A1,1,0,0,1,20,21ZM21,5a1,1,0,0,0-1-1H4A1,1,0,0,0,3,5V9H21Z" fill="none" stroke={subscribedColor[subscribed]} strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"/>
                                                <path id="secondary" d="M16,3V6M8,3V6" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"/>
                                                <polyline id="secondary-2" data-name="secondary" points="9 15 11 17 15 13" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <p className='text-lg w-1/3'>{amountSubscribed}</p>
                                </div>
                            </div>
                            <div className='pb-20 w-1/2'>
                                <div className='flex pb-3'>
                                    <img alt="" src={tagIcon} className='mr-2 w-5'></img>
                                    <p className='text-base text-gray-400'>{tags}</p>
                                </div>
                                <div className='flex pb-3 items-start'>
                                    <img alt="" src={infoIcon} className='mr-2 w-5'></img>
                                    <p className='text-base text-gray-400'>{group.description}</p>
                                </div>
                                <div className='text-sm text-gray-400'>
                                    {group.restricted ? (
                                        <p>This group is private</p>
                                    ) : (
                                        <p>This group is public</p>
                                    )}
                                </div>
                            </div>
                            <div className='pr-20'>
                                <div className='w-full border-t-2 border-gray-500'></div>
                                <div id="tabs" className='flex'>
                                    <button onClick={() => HandleTabStateChange("posts")} 
                                    className={tabState !== "posts" ? 
                                    'w-40 pt-1 pb-1 bg-gray-700 hover:bg-gray-600 border-r-2 border-l-2 border-gray-500' :
                                    'w-40 pt-1 pb-1 bg-gray-800 border-r-2 border-l-2 border-gray-500'}>Posts</button>
                                    <button onClick={() => HandleTabStateChange("events")} 
                                    className={tabState !== "events" ? 
                                    'w-40 pt-1 pb-1 bg-gray-700 hover:bg-gray-600 border-r-2 border-gray-500' :
                                    'w-40 pt-1 pb-1 bg-gray-800 border-r-2 border-gray-500'}>Events</button>
                                </div>
                                {tabState === "posts" && 
                                    <PostList ref={postListRef} objectId={group.id} type={"group"}></PostList>
                                }
                                {events !== undefined && tabState === "events" && 
                                    <>
                                        {events.length === 0 ? (
                                            <p className='text-center pt-20 pb-20 text-lg'>There are no events yet!!</p>
                                        ) : (
                                            <EventList events={events}></EventList>
                                        )}
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
})

export default GroupInfo;