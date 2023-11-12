  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import Request from './Request';

  const Tieups = ({ loggedInUserId }) => {
    const [acceptedTieUps, setAcceptedTieUps] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const token = localStorage.getItem("companytoken") || localStorage.getItem("collegetoken");
    const userType = token === localStorage.getItem("companytoken") ? "company" : "college";
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


    useEffect(() => {

      
      
      const fetchPendingRequests = async () => {
        try {
          const response = await axios.get(`/api/tieup/pending/${loggedInUserId}`);
          console.log(response);
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


    
    const handleAcceptRequest = async (requestId,senderid) => {
      try {
        const response = await axios.post('/api/tieup/respond', {
          requestId,
          senderid,
          accepted: true,
          token
        });
        console.log(requestId);

        if (response.data.success) {
          fetchAcceptedTieUps()
          setAcceptedTieUps(prevTieUps => [...prevTieUps, response.data.tieUp]);
          const updatedTieUps = pendingRequests.filter(request => request._id !== requestId);
          setPendingRequests(updatedTieUps);
        } else {
          console.error('Failed to accept tie-up request');
        }
      } catch (error) {
        console.error('Error accepting tie-up request:', error);
      }
    };

    const handleRejectRequest = async (requestId,senderid) => {
      try {
        const response = await axios.post('/api/tieup/respond', {
          requestId,
          senderid,
          accepted: false,
          token
        });

        if (response.data.success) {
          console.log('Tie-up request rejected');
          const updatedRequests = pendingRequests.filter(request => request._id !== requestId);
          console.log(updatedRequests);
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
          <div className='bg-primary bg-opacity-10 bg-gradient rounded-4 py-4' style={{ flex: '1', marginRight: '20px', backgroundColor: '#f7f7f7' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#555' }}>Accepted Tie-Ups:</h3>
            
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {acceptedTieUps.map((tieUp) => (
            <li key={tieUp._id} style={{ fontSize: '18px', marginBottom: '10px', color: '#444',backgroundColor:"#b6d7f0",borderRadius:"4px" }}>
            {loggedInUserId === tieUp.senderId ? (
                <span className="text-capitalize">{tieUp.receiverName}</span>
            ) : (
                <span className="text-capitalize">{tieUp.senderName}</span>
            )}
          </li>
          
                ))}
              </ul>
          
            
          </div>
          <div className='bg-primary bg-opacity-10 bg-gradient rounded-4 py-4' style={{ flex: '1', marginLeft: '20px', backgroundColor: '#f7f7f7' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#555' }}>Pending Requests:</h3>
            {pendingRequests.map((request) => (
              <Request
                key={request._id}
                request={request}
                onAccept={handleAcceptRequest}
                onReject={handleRejectRequest}
                token = {token}
                userType={userType}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default Tieups;
