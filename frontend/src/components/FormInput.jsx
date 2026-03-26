import React from 'react';

const FormInput = ({ label, name, type = 'text', value, onChange, error, required = false, placeholder, style, readOnly }) => {
  return (
    <div style={{ marginBottom: '16px', ...style }}>
      <label style={{ 
        display: 'block', 
        marginBottom: '6px', 
        fontSize: '0.95rem', 
        fontWeight: '500', 
        color: '#374151' 
      }}>
        {label}
        {required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: '6px',
          border: error ? '1px solid #ef4444' : '1px solid #d1d5db',
          fontSize: '1rem',
          color: '#111827',
          backgroundColor: readOnly ? '#f3f4f6' : '#ffffff',
        }}
      />
      {error && (
        <span style={{ 
          display: 'block', 
          marginTop: '6px', 
          fontSize: '0.85rem', 
          color: '#ef4444' 
        }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default FormInput;