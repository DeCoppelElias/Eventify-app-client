import React, { useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
// import Group from '../datatypes/Group'
import axios from 'axios'
import GroupList from '../components/GroupList';

export default function Groups() {
    const [groupData, setGroupData] = useState([])

    const navigate = useNavigate();
    const redirectToHomePage = () => {
        navigate("/home");
    }

    useEffect(() => {
        axios.get('/api/getGroups')
        .then(function (response) {
            setGroupData(response.data)
        })
    }, [])
    
    return (
        <div style={{ backgroundColor: '#b3d3e6', padding: '20px' }}>
            <p>This is the groups page</p>
            <button onClick={redirectToHomePage}>Go to home page</button>
            <GroupList groups={groupData.groups}></GroupList>
        </div>
    )
}