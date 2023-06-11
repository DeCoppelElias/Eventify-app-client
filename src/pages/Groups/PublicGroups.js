import React, { useEffect, useState} from 'react'
import GroupList from '../../components/GroupList'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function PublicGroups() {
    const [publicGroupData, setPublicGroupData] = useState({'groups': undefined});
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
    }, [navigate])

    return (
    <div className='flex h-full w-full'>
        <div className='w-full bg-gray-900'>
            <div className='overflow-auto mt-5 ml-10'>
                {publicGroupData.groups !== undefined && 
                    <><p className='text-2xl text-white'>Public groups</p>
                    <GroupList groups={publicGroupData.groups}></GroupList></>
                }
                {publicGroupData.groups === undefined && 
                    <p className='text-white'>There are no public groups yet!</p>
                }
            </div>
        </div>
    </div>
    )
}