import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getUserId } from "../config/firebase"

const InvitePeoplePopup = forwardRef(({type}, ref) => {
    const [componentVisible, setComponentVisible] = useState(false);
    const [users, SetUsers] = useState([]);
    const [notInvitedUsers, SetNotInvitedUsers] = useState([]);
    const [searchUsers, setSearchUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [invitedUsers, SetInvitedUsers] = useState([]);
    const {eventId} = useParams();
    const {groupId} = useParams();

    const innerRef = useRef(null);

    useEffect(() => {
        let payload = {}
        if (type === "group"){
            payload = {
                params: { 
                    id : groupId,
                    type : type
                }
            }
        }
        if (type === "event"){
            payload = {
                params: { 
                    id : eventId,
                    type : type
                }
            }
        }

        axios.get('/api/getInvitedUsers', payload)
            .then(function (response) {
                if(response?.data?.invitedUsers !== undefined){
                    SetInvitedUsers(response?.data.invitedUsers);
                }
            })
    }, [eventId, groupId, type]);

    useEffect(() => {
        function ResetState(){
            setComponentVisible(false);
            setTimeout(() => {
                setSelectedUsers([]);
                setSearchUsers(notInvitedUsers);
                if(document.getElementById("users") !== null){
                    document.getElementById("users").value = "";
                }
            }, 300);
        }

        const handleClickOutside = (event) => {
            if (innerRef.current && !innerRef.current.contains(event.target)) {
                setComponentVisible(false);
                ResetState();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [notInvitedUsers]);

    useEffect(() => {
        axios.get('/api/getUsers')
        .then(function (response) {
            SetUsers(response?.data.users);
        })
    }, []);

    useEffect(() => {
        function RefreshSearchUsers(users, invitedUsers, userId){
            const legalUsers = [];
            for (const user of users){
                const index = invitedUsers.indexOf(user.id);
                if(index === -1 && user.id !== userId){
                    legalUsers.push(user);
                }
            }
            SetNotInvitedUsers(legalUsers);
            setSearchUsers(legalUsers);
        }
        getUserId()
        .then(function(userId){
            RefreshSearchUsers(users, invitedUsers, userId);
        })
    }, [users, invitedUsers]);

    useImperativeHandle(ref, () => {
        return {
            HandleInvitePeople(){
                setComponentVisible(true);
            }
          };
        });
    
    function HandleSearch(selectedUsers){
        const query = document.getElementById("users").value.split("");

        const legalUsers = [...notInvitedUsers]
        for (const selectedUser of selectedUsers){
            const index = legalUsers.indexOf(selectedUser);
            if (index > -1) {
                legalUsers.splice(index,1);
            }
        }
        
        if (query === undefined){
            setSearchUsers(legalUsers);
            return;
        }
        if (query.length === 0){
            setSearchUsers(legalUsers);
            return;
        }

        const newSearchUsers = legalUsers.filter(el => {
            let count = 0;
            let name = el.firstName + " " + el.lastName;
            name.split('').forEach(letter => {
                if(query[count] !== undefined){
                    if(query[count] === letter || query[count] === letter.toUpperCase() || query[count].toUpperCase() === letter) { count++; }
                    }
                });
            return count === query.length;
        });
        
        setSearchUsers(newSearchUsers);
    }

    function SelectUser(user){
        const newSelectedUsers = [
            ...selectedUsers,
            user
        ];
        setSelectedUsers(newSelectedUsers);

        HandleSearch(newSelectedUsers);
    }

    function DeselectUser(user){
        const newSelectedUsers = [...selectedUsers]
        const index = newSelectedUsers.indexOf(user);
        if (index > -1) {
            newSelectedUsers.splice(index,1);
        }
        setSelectedUsers(newSelectedUsers);

        HandleSearch(newSelectedUsers);
    }

    function HandleInviteUsers(){
        const newInvitedUsers = [];
        const newTotalInvitedUsers = [...invitedUsers]
        for (const user of selectedUsers){
            newInvitedUsers.push(user.id);
            newTotalInvitedUsers.push(user.id);
        }
        SetInvitedUsers(newTotalInvitedUsers);

        if (type === "group"){
            const payload = {
                groupId: groupId,
                invitedUsers: newInvitedUsers
            }
            
            axios.post('/api/inviteToGroup',payload)
        }
        if (type === "event"){
            const payload = {
                eventId: eventId,
                invitedUsers: newInvitedUsers
            }
            
            axios.post('/api/events/inviteToEvent',payload)
        }

        setSelectedUsers([]);
        document.getElementById("users").value = "";
        setComponentVisible(false);
    }

    return (
        <>{componentVisible && 
            <div className={`h-full w-full absolute top-0 left-0 z-30 pointer-events-auto`}>
                <div ref={innerRef} className={`z-20 bg-gray-800 border-2 border-gray-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4/5 w-2/5 rounded-md`}>
                    <div className='w-full h-5/6 p-8'>
                        <div className="h-1/5">
                            <label htmlFor="users" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Invite people</label>
                            <div className=''>
                                <input onChange={() => HandleSearch(selectedUsers)} type="text" maxLength={40} id="users" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                            </div>
                        </div>
                        <div className="overflow-auto h-4/5">
                            <div className="mb-4">
                                {selectedUsers.map((user) => (
                                    <div key={user.id} onClick={() => DeselectUser(user)} className="pt-2">
                                        <input defaultChecked type="checkbox" id={user.id} value="" className="hidden peer" required="" />
                                        <label htmlFor={user.id} className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                            <div className="block">
                                                <p className="w-full">{user.username}</p>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="overflow-auto">
                                {searchUsers.map((user) => (
                                    <div key={user.id} onClick={() => SelectUser(user)} className="pt-2">
                                        <input type="checkbox" id={user.id} value="" className="hidden peer" required="" />
                                        <label htmlFor={user.id} className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                            <div className="block">
                                                <p className="w-full">{user.username}</p>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button className='absolute mr-4 mb-4 right-0 bottom-0 p-2 bg-gray-700 text-white hover:bg-gray-600 rounded-md border-gray-500 border-2' onClick={HandleInviteUsers}>
                        Invite People
                    </button>
                </div>
            </div>
        }</>
    )
})

export default InvitePeoplePopup;