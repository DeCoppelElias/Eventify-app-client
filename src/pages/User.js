import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom';

export default function User() {
    const [userData, setUserData] = useState();
    const navigate = useNavigate();

    const styles = {
        container: {
        backgroundColor: '#b3d3e6',
        marginLeft: '150px', // Adjust this value to match the width of your sidebar
        },
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const payload = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: { userId : userId}
        }

        axios.get('/api/getUser', payload)
        .then(function (response) {
            setUserData(response.data)
        }).catch(function (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 401){
                    navigate('/login');
                }
            }})
    }, [navigate]);

    return (
        <div style={styles.container}>
            <p>This is the user page</p>
            {typeof userData === 'undefined' ? (
                <p>Loading...</p>
            ) : (
                <>
                    <p>User information</p>
                    <div>firstName: {userData.user.firstName}</div>
                    <p>lastName: {userData.user.lastName}</p>
                    <p>email: {userData.user.email}</p>
                    <p>username: {userData.user.username}</p>
                </>
            )}
        </div>
    );
}