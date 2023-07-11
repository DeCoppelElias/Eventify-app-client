import React, {useRef, useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import EventInfoSidebar from '../../components/EventInfoSidebar';
import EventInfo from '../../components/EventInfo';
import InvitePeoplePopup from '../../components/InvitePeoplePopup';

export default function Event() {
    const [event, setEvent] = useState();
    const [exists, setExists] = useState(false);
    const [administrator, setAdministrator] = useState(false);
    const invitePeoplePopupRef = useRef();
    const eventInfoRef = useRef();
    const navigate = useNavigate();
    let {eventId} = useParams();
    const userId = localStorage.getItem("userId");

    function HandleClickCreatePost(){
        eventInfoRef.current.HandleClickCreatePost();
    }

    function HandleInvitePeople(){
        invitePeoplePopupRef.current.HandleInvitePeople();
    }

    useEffect(() => {
        let payload = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: { eventId : eventId}
        }

        axios.get('/api/getEvent', payload)
        .then(function (response) {
            setEvent(response.data.event);
            setExists(true);

            const index = response.data.event.administrators.indexOf(userId);
            if (index > -1){
                setAdministrator(true);
            }
        })
    }, [navigate, eventId, userId]);

    return (
        <div className='w-full h-full bg-gray-900 text-white'>
            {exists ? (
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
                <p>Event does not exist</p>
            )}
        </div>
    );
}