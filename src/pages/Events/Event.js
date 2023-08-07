import React, {useRef, useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import EventInfoSidebar from '../../components/EventInfoSidebar';
import EventInfo from '../../components/EventInfo';
import InvitePeoplePopup from '../../components/InvitePeoplePopup';
import { getUserId } from "../../config/firebase";

export default function Event() {
    const [exists, setExists] = useState(true);
    const [event, setEvent] = useState();
    const [administrator, setAdministrator] = useState(false);
    const invitePeoplePopupRef = useRef();
    const eventInfoRef = useRef();
    let {eventId} = useParams();

    function HandleClickCreatePost(){
        eventInfoRef.current.HandleClickCreatePost();
    }

    function HandleInvitePeople(){
        invitePeoplePopupRef.current.HandleInvitePeople();
    }

    useEffect(() => {
        let payload = {
            params: { eventId : eventId}
        }

        axios.get('/api/events/getEvent', payload)
        .then(function (response) {
            setEvent(response?.data.event);
            if(response?.data?.event === undefined){
                setExists(false);
            }

            getUserId()
            .then(function(userId){
                const index = response?.data?.event?.administrators.indexOf(userId);
                if (index > -1){
                    setAdministrator(true);
                }
            })
        })
    }, [eventId]);

    return (
        <div className='w-full h-full bg-gray-900 text-white'>
            {event !== undefined ? (
                <div className='h-full w-full flex'>
                    <InvitePeoplePopup type="event" ref={invitePeoplePopupRef}/>
                    <div className='flex h-full w-full'>
                        <div className='w-96'></div>
                        <div className='h-full w-full'>
                            <EventInfoSidebar 
                                HandleInvitePeople={() => HandleInvitePeople()} 
                                HandleClickCreatePost={() => HandleClickCreatePost()}
                                administrator={administrator}
                                restricted={event.restricted}/>
                            <div className='w-full h-full pt-28'>
                                <div className='w-full h-full bg-gray-800 rounded-md text-lg'>
                                    <EventInfo event={event} ref={eventInfoRef}/>
                                </div>
                            </div>
                        </div>
                        <div className='w-96'></div>
                    </div>
                </div>
            ) : (
                <>{!exists && 
                    <p className='pt-28 text-white text-center'>Event does not exist</p>
                }</>
            )}
        </div>
    );
}