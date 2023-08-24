import React from 'react';

const Request = ({ request, onAccept, onReject }) => {
  return (
    <div className="request" style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <h4 style={{ flex: '1', fontSize: '18px', color: '#333', marginBottom: '0' }}>{request.senderName} wants to tie up with you.</h4>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          onClick={() => onAccept(request._id)}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            marginRight: '10px',
          }}
        >
          Accept
        </button>
        <button
          onClick={() => onReject(request._id)}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default Request;
