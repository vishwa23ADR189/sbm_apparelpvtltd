import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorMessage = ({ message, onRetry }) => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '60vh',
      textAlign: 'center',
      padding: '20px',
    }}>
      <div style={{
        backgroundColor: '#fef2f2',
        border: '1px solid #fee2e2',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '500px',
      }}>
        <h3 style={{ color: '#dc2626', marginTop: 0 }}>Error</h3>
        <p style={{ color: '#57534e', marginBottom: '20px' }}>{message}</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {onRetry && (
            <button
              onClick={onRetry}
              style={{
                padding: '8px 16px',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
          )}
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#e5e7eb',
              color: '#111827',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;