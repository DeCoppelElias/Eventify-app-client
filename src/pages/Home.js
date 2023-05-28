import React from 'react'
import {useNavigate} from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const redirectToEventsPage = () => {
        navigate("/events");
    }
    const redirectToGroupsPage = () => {
        navigate("/groups");
    }

  return (
    <div style={{ backgroundColor: '#b3d3e6', padding: '20px' }}>
      <p>This is the home page</p>
      <button onClick={redirectToEventsPage}>Go to events page</button>
      <button onClick={redirectToGroupsPage}>Go to groups page</button>
    </div>
  )
}