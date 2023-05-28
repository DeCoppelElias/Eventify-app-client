import React, { useState } from 'react';

function EventBox({ event }) {
  const title = event.title
  const location = event.location
  const time = event.time
  const description = event.description;
  const [isLocationOpen, setLocationOpen] = useState(false);
  const [isTimeOpen, setTimeOpen] = useState(false);
  const [isDescriptionOpen, setDescriptionOpen] = useState(false);

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
    },
    box: {
      width: '250px',
      backgroundColor: '#166281', // Dark blue color for event box
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '20px',
      borderRadius: '10px',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
      color: '#fff', // Text color for event box
    },
    eventTitle: {
      color: '#dddddd', // Light gray color for event title
      fontSize: '30px',
      marginBottom: '10px',
      fontFamily: 'cursive',
      marginTop: '0',
    },
    toggleButton: {
      backgroundColor: 'transparent',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      marginTop: '10px',
    },
    content: {
      color: '#fff',
      fontSize: '16px',
      marginTop: '10px',
    },
  };

  const toggleLocation = () => {
    setLocationOpen(!isLocationOpen);
  };

  const toggleTime = () => {
    setTimeOpen(!isTimeOpen);
  };

  const toggleDescription = () => {
    setDescriptionOpen(!isDescriptionOpen);
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.eventTitle}>{title}</h2>
        <button style={styles.toggleButton} onClick={toggleLocation}>
          <ToggleIcon toggled={isLocationOpen}></ToggleIcon>
          {isLocationOpen ? 'Hide Location' : 'Show Location'}
        </button>
        {isLocationOpen && <p style={styles.content}>{location}</p>}
        <button style={styles.toggleButton} onClick={toggleTime}>
          <ToggleIcon toggled={isTimeOpen}></ToggleIcon>
          {isTimeOpen ? 'Hide Time' : 'Show Time'}
        </button>
        {isTimeOpen && <p style={styles.content}>{time}</p>}
        <button style={styles.toggleButton} onClick={toggleDescription}>
          <ToggleIcon toggled={isDescriptionOpen}></ToggleIcon>
          {isDescriptionOpen ? 'Hide Description' : 'Show Description'}
        </button>
        {isDescriptionOpen && <p style={styles.content}>{description}</p>}
      </div>
    </div>
  );
}

function ToggleIcon({ toggled }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      style={
        {
          marginRight: '8px',
          transform: toggled ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease-in-out',
        }
      }
    >
      <path fill="#fff" d="M2 2l8 4-8 4V2z" />
    </svg>
  )
}

export default function EventList({ events }) {
  return (
    <div>
      {typeof events === 'undefined' ? (
        <p>Loading...</p>
      ) : (
        events.map((event, i) => (
          <EventBox key={i} event={event} />
        ))
      )}
    </div>
  );
}