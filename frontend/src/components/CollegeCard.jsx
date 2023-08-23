import React from 'react';
import axios from 'axios';

const CollegeCard = ({ collegeData, loggedInUserId, handleClick }) => {

  const aboutText =
    collegeData.collegeDetail?.about && collegeData.collegeDetail.about.length > 100
      ? collegeData.collegeDetail.about.slice(0, 100) + "..."
      : collegeData.collegeDetail?.about || "About";

  const handleTieUpRequest = async (event) => {
    event.stopPropagation();
    try {
      const response = await axios.post('/api/tieup/request', {
        senderId: loggedInUserId,
        receiverId: collegeData._id,
        userType: 'company',
      });

      if (response.data.success) {
        console.log('Tie-up request sent successfully');
      } else {
        console.error('Failed to send tie-up request');
      }
    } catch (error) {
      console.error('Error sending tie-up request:', error);
    }
  };

  return (
    <div className="college-card card mb-3" onClick={handleClick} style={{ width: "80%" }}>
      <div className="card-body">
        <h5 className="card-title">{collegeData.collegeName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{collegeData.collegeType}</h6>
        <p className="card-text">{aboutText}</p>
        <button
  onClick={handleTieUpRequest}
  style={{
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  }}
>
  Connect
</button>






      </div>
      
    </div>
  );
};

export default CollegeCard;
