import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div style={styles.container}>
      <div style={styles.profile}>
        <span style={styles.name}>{user.name || user.email.split('@')[0]}</span>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: '20px',
    right: '20px',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  name: {
    fontWeight: '600',
    color: '#282c3f',
  },
  logoutButton: {
    padding: '8px 15px',
    backgroundColor: 'transparent',
    border: '1px solid #d4d5d9',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s',
  },
  logoutButtonHover: {
    backgroundColor: '#f5f5f6',
  },
};

export default UserProfile;