import React from 'react';

const LoadingSpinner = ({ small = false, white = false, fullPage = false }) => {
  const spinnerStyle = {
    display: 'inline-block',
    width: small ? '20px' : '40px',
    height: small ? '20px' : '40px',
    border: `3px solid ${white ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'}`,
    borderRadius: '50%',
    borderTopColor: white ? '#fff' : '#22c55e',
    animation: 'spin 1s ease-in-out infinite',
  };

  if (fullPage) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.8)',
        zIndex: 1000,
      }}>
        <div style={spinnerStyle} />
      </div>
    );
  }

  return <div style={spinnerStyle} />;
};

// Add this to your global CSS or in a style tag
// @keyframes spin { to { transform: rotate(360deg); } }

export default LoadingSpinner;