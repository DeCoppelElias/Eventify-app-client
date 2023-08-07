import React, {useRef, useState, useEffect, useCallback} from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import GroupInfo from '../../components/GroupInfo';
import GroupInfoSidebar from '../../components/GroupInfoSidebar';
import InvitePeoplePopup from '../../components/InvitePeoplePopup';
import CreateEventPopup from '../../components/CreateEventPopup';
import { getUserId } from "../../config/firebase";

export default function Group() {
    const [group, setGroup] = useState();
    const [exists, setExists] = useState(false);
    const [administrator, setAdministrator] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const createEventPopupRef = useRef();
    const invitePeoplePopupRef = useRef();
    const groupInfoRef = useRef();
    let {groupId} = useParams();

    function HandleClickCreatePost(){
        groupInfoRef.current.HandleClickCreatePost();
    }

    function HandleInvitePeople(){
        invitePeoplePopupRef.current.HandleInvitePeople();
    }

    function HandleEventCreation(){
        createEventPopupRef.current.HandleEventCreation();
        createEventPopupRef.current.SetGroup(group);
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
        let payload = {
            params: { groupId : groupId}
        }

        axios.get('/api/groups/getGroup', payload)
        .then(function (response) {
            if(response?.data?.group !== undefined){
                setGroup(response?.data.group);
                setExists(true);

                getUserId()
                .then(function(userId){
                    const index = response?.data.group.administrators.indexOf(userId);
                    if (index > -1){
                        setAdministrator(true);
                    }
                })
            }
        })
    }, [groupId]);
    
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