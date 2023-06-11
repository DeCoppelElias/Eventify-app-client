import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

export default function Event() {
    const [eventData, setEventData] = useState();
    const [exists, setExists] = useState(true);
    const navigate = useNavigate();

    let {eventId} = useParams();

    useEffect(() => {
        const payload = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: { eventId : eventId}
        }

        axios.get('/api/getEvent', payload)
        .then(function (response) {
            setEventData(response.data)
        }).catch(function (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 401){
                    navigate('/login');
                }
                if (error.response.status === 404){
                    setExists(false);
                }
            }})
    }, [navigate, eventId]);

    const styles = {
        container: {
        backgroundColor: '#b3d3e6',
        padding: '20px',
        marginLeft: '150px', // Adjust this value to match the width of your sidebar
        },
    };

    return (
        <div style={styles.container}>
            {exists === false ? (
                <p>Event does not exist</p>
            ) : (
                <>
                    <p>This is an event page</p>
                    {typeof eventData === 'undefined' ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <p>Event information</p>
                            <div>Title: {eventData.event.title}</div>
                            <p>location: {eventData.event.location}</p>
                            <p>time: {eventData.event.time}</p>
                            <p>description: {eventData.event.description}</p>
                        </>
                    )}
                </>
            )}
        </div>
    );
}