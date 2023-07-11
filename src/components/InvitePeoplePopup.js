import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const InvitePeoplePopup = forwardRef(({type}, ref) => {
    const [componentVisible, setComponentVisible] = useState(false);
    const [users, SetUsers] = useState([]);
    const [notInvitedUsers, SetNotInvitedUsers] = useState([]);
    const [searchUsers, setSearchUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [invitedUsers, SetInvitedUsers] = useState([]);
    const navigate = useNavigate();
    const {eventId} = useParams();
    const {groupId} = useParams();
    const userId = localStorage.getItem("userId");

    const innerRef = useRef(null);

    useEffect(() => {
        let payload = {}
        if (type == "group"){
            payload = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                params: { 
                    id : groupId,
                    type : type
                }
            }
        }
        if (type == "event"){
            payload = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                params: { 
                    id : eventId,
                    type : type
                }
            }
        }

        axios.get('/api/getInvitedUsers', payload)
            .then(function (response) {
                SetInvitedUsers(response.data.invitedUsers)
            }).catch(function (error) {
                if (error.response) {
                    if (error.response.status === 400 || error.response.status === 401){
                        navigate('/login');
                    }
                }})
    }, []);

    useEffect(() => {
        function ResetState(){
            setComponentVisible(false);
            setTimeout(() => {
                setSelectedUsers([]);
                setSearchUsers(notInvitedUsers);
                if(document.getElementById("users") != undefined){
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
        let payload = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }

        axios.get('/api/getUsers', payload)
        .then(function (response) {
            SetUsers(response.data.users);
        })
    }, []);

    useEffect(() => {
        RefreshSearchUsers(users, invitedUsers);
    }, [users, invitedUsers]);

    function RefreshSearchUsers(users, invitedUsers){
        const legalUsers = [];
        for (const user of users){
            const index = invitedUsers.indexOf(user.id);
            if(index == -1 && user.id != userId){
                legalUsers.push(user);
            }
        }
        SetNotInvitedUsers(legalUsers);
        setSearchUsers(legalUsers);
    }

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
        const header = {
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }

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
            
            axios.post('/api/inviteToGroup',payload, header)
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 400 || error.response.status === 401){
                        navigate('/login');
                    }
            }})
        }
        if (type === "event"){
            const payload = {
                eventId: eventId,
                invitedUsers: newInvitedUsers
            }
            
            axios.post('/api/inviteToEvent',payload, header)
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 400 || error.response.status === 401){
                        navigate('/login');
                    }
            }})
        }

        setComponentVisible(false);
        setTimeout(() => {
            setSelectedUsers([]);
            if (document.getElementById("users") !== undefined){
                document.getElementById("users").value = "";
            }
        }, 300);
    }

    return (
        <div className={`h-full w-full absolute top-0 left-0 overflow-hidden pointer-events-none`}>
            <div className={`h-full w-full absolute top-0 left-0 z-10 ease-in-out duration-300 pointer-events-auto ${componentVisible ? "translate-x-0 " : "translate-x-full"}`}>
                <div ref={innerRef} className={`z-20 bg-gray-800 border-2 border-gray-600 absolute top-0 right-0 w-1/5 h-full rounded-md pointer-events-auto`}>
                    <div className='m-8'>
                        <label htmlFor="users" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Invite people</label>
                        <div className=''>
                            <input onChange={() => HandleSearch(selectedUsers)} type="text" maxLength={40} id="users" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                        </div>
                        <div className="overflow-auto h-full w-full mt-4 mb-4">
                            <div className="h-full mb-4">
                                {selectedUsers.map((user) => (
                                    <div key={user.id} onClick={() => DeselectUser(user)} className="pt-2">
                                        <input defaultChecked type="checkbox" id={user.id} value="" className="hidden peer" required="" />
                                        <label htmlFor={user.id} className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                            <div className="block">
                                                <p className="w-full">{String(user.firstName) + " " + String(user.lastName)}</p>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="h-full">
                                {searchUsers.map((user) => (
                                    <div key={user.id} onClick={() => SelectUser(user)} className="pt-2">
                                        <input type="checkbox" id={user.id} value="" className="hidden peer" required="" />
                                        <label htmlFor={user.id} className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                            <div className="block">
                                                <p className="w-full">{String(user.firstName) + " " + String(user.lastName)}</p>
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
        </div>
    )
})

export default InvitePeoplePopup;