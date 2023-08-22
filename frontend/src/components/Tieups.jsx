import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Request from './Request';

const Tieups = ({ loggedInUserId }) => {
  const [acceptedTieUps, setAcceptedTieUps] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    const fetchAcceptedTieUps = async () => {
      try {
        const response = await axios.get(`/api/tieup/accepted/${loggedInUserId}`);
        if (response.data.success) {
          setAcceptedTieUps(response.data.acceptedTieUps);
        } else {
          console.error('Failed to fetch accepted tie-ups');
        }
      } catch (error) {
        console.error('Error fetching accepted tie-ups:', error);
      }
    };

    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get(`/api/tieup/pending/${loggedInUserId}`);
        if (response.data.success) {
          setPendingRequests(response.data.pendingRequests);
        } else {
          console.error('Failed to fetch pending requests');
        }
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    };

    fetchAcceptedTieUps();
    fetchPendingRequests();
  }, [loggedInUserId]);


  
  const handleAcceptRequest = async (requestId) => {
    try {
      const response = await axios.post('/api/tieup/respond', {
        requestId,
        accepted: true,
      });

      if (response.data.success) {
        console.log('Tie-up request accepted');
        const updatedTieUps = pendingRequests.filter(request => request._id !== requestId);
        setAcceptedTieUps(prevTieUps => [...prevTieUps, response.data.tieUp]);
        setPendingRequests(updatedTieUps);
      } else {
        console.error('Failed to accept tie-up request');
      }
    } catch (error) {
      console.error('Error accepting tie-up request:', error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      const response = await axios.post('/api/tieup/respond', {
        requestId,
        accepted: false,
      });

      if (response.data.success) {
        console.log('Tie-up request rejected');
        const updatedRequests = pendingRequests.filter(request => request._id !== requestId);
        setPendingRequests(updatedRequests);
      } else {
        console.error('Failed to reject tie-up request');
      }
    } catch (error) {
      console.error('Error rejecting tie-up request:', error);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px auto', padding: '20px', backgroundColor: '#f7f7f7', maxWidth: '800px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
      <h2 style={{ fontSize: '32px', textAlign: 'center', marginBottom: '20px', color: '#333' }}>Tie-Ups</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#555' }}>Accepted Tie-Ups:</h3>
          
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {acceptedTieUps.map((tieUp) => (
                <li key={tieUp._id} style={{ fontSize: '18px', marginBottom: '10px', color: '#444' }}>
                  {loggedInUserId === tieUp.senderId
                    ? `Tied up with ${tieUp.receiverName}`
                    : `Tied up with ${tieUp.senderName}`}
                </li>
              ))}
            </ul>
         
          
        </div>
        <div style={{ flex: '1', marginLeft: '20px' }}>
          <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#555' }}>Pending Requests:</h3>
          {pendingRequests.map((request) => (
            <Request
              key={request._id}
              request={request}
              onAccept={handleAcceptRequest}
              onReject={handleRejectRequest}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tieups;
