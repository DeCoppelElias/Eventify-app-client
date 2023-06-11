import React, { useEffect, useState} from 'react'
import GroupList from '../../components/GroupList'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function InvitedEvents() {
    const [invitedGroupData, setInvitedGroupData] = useState({'groups': undefined});
    const navigate = useNavigate();

    useEffect(() => {
        const payload = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: { userId : localStorage.getItem('userId')}
        }
        
        axios.get('/api/getInvitedGroups', payload)
        .then(function (response) {
            if (response.data.groups.length > 0){
                setInvitedGroupData(response.data);
            }
        })
    }, [navigate])

    return (
    <div className='flex h-full  w-full'>
        <div className='w-full bg-gray-900'>
            <div className='overflow-auto mt-5 ml-10'>
                {invitedGroupData.groups !== undefined && 
                    <><p className='text-2xl text-white'>Public groups</p>
                    <GroupList groups={invitedGroupData.groups}></GroupList></>
                }
                {invitedGroupData.groups === undefined && 
                    <p className='text-white'>You have not been invited to groups yet!</p>
                }
            </div>
        </div>
    </div>
    )
}