import React from 'react'
import axios from 'axios';

const CompanyCard = ({ companyData,loggedInUserId,handleClick }) => {

    const aboutText =
    companyData.companyDetail?.about && companyData.companyDetail.about.length > 100
      ? companyData.companyDetail.about.slice(0, 100) + "..."
      : companyData.companyDetail?.about || "About";

      const handleTieUpRequest = async (event) => {
        event.stopPropagation();
        try {
          const response = await axios.post('/api/tieup/request', {
            senderId: loggedInUserId,
            receiverId: companyData._id,
            userType: 'college', // Adjust based on the user type
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
            <h5 className="card-title">{companyData.companyName}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{companyData.companyType}</h6>
            <p className="card-text">{aboutText}</p>
            <button onClick={handleTieUpRequest} style={{
            padding: '10px 20px',
            fontSize: '16px',
             backgroundColor: '#007bff',
             color: '#fff',
             border: 'none',
             borderRadius: '4px',
             cursor: 'pointer',
            transition: 'background-color 0.2s',
  }}>Connect</button>
          </div>
        </div>
      );
    }
    
    export default CompanyCard;
