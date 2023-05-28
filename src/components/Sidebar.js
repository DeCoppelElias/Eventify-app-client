import React, { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const styles = {
    sidebar: {
      width: '200px',
      backgroundColor: '#f2f2f2',
      transition: 'transform 0.3s',
      transform: isOpen ? 'translateX(0)' : 'translateX(-200px)',
      position: 'fixed',
      top: '0',
      left: '0',
      bottom: '0',
      padding: '20px',
    },
    sidebarToggle: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      position: 'absolute',
      top: '10px',
      right: '10px',
    },
    sidebarMenu: {
      listStyle: 'none',
      padding: '0',
      marginTop: '40px',
    },
    sidebarMenuItem: {
      marginBottom: '10px',
    },
    sidebarMenuItemLink: {
      color: '#333',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.sidebar}>
      <button style={styles.sidebarToggle} onClick={toggleSidebar}>
        Toggle
      </button>
      <ul style={styles.sidebarMenu}>
        <li style={styles.sidebarMenuItem}>
          {/* <a style={styles.sidebarMenuItemLink}>
            Home
          </a> */}
        </li>
        <li style={styles.sidebarMenuItem}>
          {/* <a style={styles.sidebarMenuItemLink}>
            About
          </a> */}
        </li>
        <li style={styles.sidebarMenuItem}>
          {/* <a style={styles.sidebarMenuItemLink}>
            Services
          </a> */}
        </li>
        <li style={styles.sidebarMenuItem}>
          {/* <a style={styles.sidebarMenuItemLink}>
            Contact
          </a> */}
        </li>
      </ul>
    </div>
  );
};