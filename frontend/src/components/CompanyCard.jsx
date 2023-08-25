import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';

const CompanyCard = ({ companyData,loggedInUserId,handleClick }) => {

  const [acceptedstatuscompany, setAcceptedcompany] = useState("");
  useEffect(() => {
    async function fetchTieUpStatus() {
      try {
        const response = await axios.get(`/api/tieup/statuscheck/${loggedInUserId}/${companyData._id}`);
        
        if (response.data.success===true) {
          const tieUpStatus = response.data.accepted;
          if (tieUpStatus === true) {
            setAcceptedcompany("Accepted");
          } else if (tieUpStatus === false) {
            setAcceptedcompany("Request Sent...");
        } 
        
       }else {
        setAcceptedcompany("Connect");
        }
      } catch (error) {
        console.error('Error fetching tie-up status:', error);
      }
    }

    fetchTieUpStatus();
  }, [loggedInUserId, companyData._id]);
  
  
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
            userType: 'college', 
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
            <p className="card-text fst-italic">"{companyData.companyDetail.moto}"</p>
            <p className="card-text">{aboutText}</p>
            <button onClick={handleTieUpRequest} style={{
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor:
    acceptedstatuscompany === "Request Sent..."
        ? 'yellow' 
        : acceptedstatuscompany === "Accepted"
        ? 'green' 
        : '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  }}>{acceptedstatuscompany}</button>
          </div>
        </div>
      );
    }
    
    export default CompanyCard;
