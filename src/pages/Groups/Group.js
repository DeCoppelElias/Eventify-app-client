import React, {useRef, useState, useEffect, useCallback} from 'react';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import GroupInfo from '../../components/GroupInfo';
import GroupInfoSidebar from '../../components/GroupInfoSidebar';
import InvitePeoplePopup from '../../components/InvitePeoplePopup';
import CreateEventPopup from '../../components/CreateEventPopup';

export default function Group() {
    const [group, setGroup] = useState();
    const [exists, setExists] = useState(false);
    const [administrator, setAdministrator] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const createEventPopupRef = useRef();
    const invitePeoplePopupRef = useRef();
    const groupInfoRef = useRef();
    const navigate = useNavigate();
    let {groupId} = useParams();
    const userId = localStorage.getItem("userId");

    function HandleClickCreatePost(){
        groupInfoRef.current.HandleClickCreatePost();
    }

    function HandleInvitePeople(){
        invitePeoplePopupRef.current.HandleInvitePeople();
    }

    function HandleEventCreation(){
        createEventPopupRef.current.HandleEventCreation()
    }

    function HandleSubscribe(){
        if(!subscribed){
            groupInfoRef.current.HandleSubscribe();
        }
        else{
            groupInfoRef.current.HandleUnSubscribe();
        }
    }

    const NotifySubscribed = useCallback((bool) => {
        setSubscribed(bool);
    }, [])

    useEffect(() => {
        const payload = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: { groupId : groupId}
        }

        axios.get('/api/getGroup', payload)
        .then(function (response) {
            setGroup(response.data.group);
            setExists(true);

            const index = response.data.group.administrators.indexOf(userId);
            if (index > -1){
                setAdministrator(true);
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 401){
                    navigate('/login');
                }
            }})
    }, [navigate, groupId, userId]);
    
    return (
        <div className='w-full h-full bg-gray-900 text-white'>
            {exists ? (
                <div className='h-full w-full flex overflow-x-hidden'>
                    <CreateEventPopup ref={createEventPopupRef}/>
                    <InvitePeoplePopup type="group" ref={invitePeoplePopupRef}/>
                    <div className='flex h-full w-full bg-gray-900 text-white'>
                        <div className='w-96'></div>
                        <div className='h-full w-full'>
                            <GroupInfoSidebar 
                                restricted={group.restricted} 
                                administrator={administrator}
                                subscribed={subscribed} 
                                HandleEventCreation={() => HandleEventCreation()} 
                                HandleInvitePeople={() => HandleInvitePeople()} 
                                HandleClickCreatePost={() => HandleClickCreatePost()}
                                HandleSubscribe={() => HandleSubscribe()}/>
                            <div className='w-full h-full pt-28'>
                                <div className='w-full h-full bg-gray-800 rounded-md text-lg'>
                                    <GroupInfo group={group} ref={groupInfoRef} NotifySubscribed={NotifySubscribed}/>
                                </div>
                            </div>
                        </div>
                        <div className='w-96'></div>
                    </div>
                </div>
            ) : (
                <p>Group does not exist</p>
            )}
        </div>
    );
}