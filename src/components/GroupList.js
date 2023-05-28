import EventList from '../components/EventList'

export default function GroupList({ groups }) {
    const styles = {
        banner: {
            backgroundColor: '#166281', // Dark blue color for the banner
            color: '#fff', // Text color for the banner
            padding: '10px 20px', // Adjust the padding as desired
            marginBottom: '10px', // Add some margin at the bottom
            borderRadius: '5px', // Rounded corners for the banner
            display: 'flex', // Center the content horizontally
            justifyContent: 'center', // Center the content horizontally
            alignItems: 'center', // Center the content vertically
            textAlign: 'center', // Center the text horizontally
        },
        groupTitle: {
          color: '#dddddd', // Light gray color for event title
          fontSize: '30px',
          marginBottom: '10px',
          fontFamily: 'cursive',
          marginTop: '0',
        },
      };

    return (
      <div>
        {typeof groups === 'undefined' ? (
            <p>Loading...</p>
        ) : (
            groups.map((group, i) => (
                <div>
                    <div style={styles.banner}>
                      <div>
                        <p key={i} style={styles.groupTitle}>{group.title}</p>
                        <p key={i}>{group.description}</p>
                      </div>
                    </div>
                    <EventList key={i} events={group.events}/>
                </div>
            ))
        )}
      </div>
    );
  }