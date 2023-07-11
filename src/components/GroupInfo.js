import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import noImgIcon from '../icons/noImgIcon.svg';
import tagIcon from '../icons/tagIcon.svg';
import infoIcon from '../icons/infoIcon.svg';
import PostList from './PostList';
import EventList from './EventListFull';

const GroupInfo = forwardRef(({group}, ref) => {
    const [events, setEvents] = useState();
    const [tags, setTags] = useState();
    const [tabState, setTabState] = useState("posts");
    const navigate = useNavigate();
    const postListRef = useRef();

    useImperativeHandle(ref, () => {
        return {
            HandleClickCreatePost(){
                setTabState("posts");
                
                setTimeout(() => {
                    postListRef.current.CreatePost();
                }, 100);
            }
        };
    }, []);

    useEffect(() => {
        const payload = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: { eventIds : group.events}
        }

        axios.get('/api/getEvents', payload)
        .then(function (response) {
            setEvents(response.data.events);
        }).catch(function (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 401){
                    navigate('/login');
                }
            }
        })

        let tags = ""
        if (group.tags.length > 0){
            tags = String(group.tags[0]);
        }
        for (let i=1;i<group.tags.length;i++){
            tags += " " + String(group.tags[i]);
        }
        setTags(tags);
    }, [navigate, group]);

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
                                <div className='text-4xl pb-5 pt-2 font-semibold mr-10'>
                                    {group.title}
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