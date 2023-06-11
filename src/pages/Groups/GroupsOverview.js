import React, { useEffect, useState} from 'react'
import GroupList from '../../components/GroupList'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function EventsOverview() {
    const [publicGroupData, setPublicGroupData] = useState({'groups': undefined});
    const [invitedGroupData, setInvitedGroupData] = useState({'groups': undefined});
    const [yourGroupData, setYourGroupData] = useState({'groups': undefined});
    const navigate = useNavigate();

    useEffect(() => {
        let payload = {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }

        axios.get('/api/getPublicGroups', payload)
        .then(function (response) {
            if (response.data.groups.length > 0){
                setPublicGroupData(response.data);
            }
        })
        .catch(function (error) {
            if (error.response) {
              if (error.response.status === 400 || error.response.status === 401){
                navigate('/login');
              }
            }})

        payload = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: { userId : localStorage.getItem('userId')}
        }
        
        axios.get('/api/getInvitedGroups', payload)
        .then(function (response) {
            if (response.data.groups.length > 0){
                setInvitedGroupData(response.data);
            }
        })
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 401){
                navigate('/login');
                }
            }})
        
        payload = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: { userId : localStorage.getItem('userId')}
        }
        
        axios.get('/api/getYourGroups', payload)
        .then(function (response) {
            if (response.data.groups.length > 0){
                setYourGroupData(response.data);
            }
        })
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 401){
                navigate('/login');
                }
            }})
    }, [navigate])

    return (
    <div className='flex h-full w-full'>
        <div className='h-full w-full bg-gray-900'>
            <div className='overflow-auto h-full pt-5 pl-10'>
                {yourGroupData.groups !== undefined &&
                    <><p className='text-2xl text-white'>Your groups</p>
                    <GroupList groups={yourGroupData.groups}></GroupList></>
                }
                {invitedGroupData.groups !== undefined && 
                    <><p className='text-2xl text-white'>Invited groups</p>
                    <GroupList groups={invitedGroupData.groups}></GroupList></>
                }
                {publicGroupData.groups !== undefined && 
                    <><p className='text-2xl text-white'>Public groups</p>
                    <GroupList groups={publicGroupData.groups}></GroupList></>
                }
            </div>
        </div>
    </div>
    )
}