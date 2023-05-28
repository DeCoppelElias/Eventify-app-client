import React, { useEffect, useState} from 'react'
import EventList from '../components/EventList'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import Event from '../datatypes/Event'

export default function Home() {

    const [eventData, setEventData] = useState([])
    const [newEventName, setNewEventName] = useState('')
    const [newEventLocation, setNewEventLocation] = useState("")

    const handleCreateEventButton = async () => {
        const event = new Event(newEventName, newEventLocation, "", "");

        await axios
            .post('/api/createEvent', event)
            .then(() => console.log('Event Created'))
            .catch(err => {
            console.error(err);
            });

        axios.get('/api/getEvents')
        .then(function (response) {
            setEventData(response.data);
        })
    }

    const handleEventNameChange = (eventName) => {
        setNewEventName(eventName);
    }

    const handleEventLocationChange = (eventLocation) => {
        setNewEventLocation(eventLocation);
    }

    const navigate = useNavigate();
    const redirectToHomePage = () => {
        navigate("/home");
    }

    useEffect(() => {
        axios.get('/api/getEvents')
        .then(function (response) {
            setEventData(response.data);
        })
    }, [])

    return (
    <div style={{ backgroundColor: '#b3d3e6', padding: '20px' }}>
        <p>This is the events page</p>
        <button onClick={redirectToHomePage}>Go to home page</button>
        <EventList events={eventData.events}></EventList>
        <textarea value={newEventName} onChange={e => handleEventNameChange(e.target.value)}/>
        <textarea value={newEventLocation} onChange={e => handleEventLocationChange(e.target.value)}/>
        <button onClick={handleCreateEventButton}>Create Event!</button>
    </div>
    )
}