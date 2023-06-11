import React, { useEffect, useState} from 'react'
import GroupList from '../../components/GroupList'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function YourGroups() {
    const [yourGroupData, setYourGroupData] = useState({'groups': undefined});
    const navigate = useNavigate();

    useEffect(() => {
        const payload = {
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
        <div className='w-full bg-gray-900'>
            <div className='overflow-auto mt-5 ml-10'>
                {yourGroupData.groups !== undefined && 
                    <><p className='text-2xl text-white'>Public groups</p>
                    <GroupList groups={yourGroupData.groups}></GroupList></>
                }
                {yourGroupData.groups === undefined && 
                    <p className='text-white'>You have not created any groups yet!</p>
                }
            </div>
        </div>
    </div>
    )
}