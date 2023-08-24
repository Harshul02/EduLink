// CompanyList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompanyCard from './CompanyCard';
import { io } from 'socket.io-client';
import Chat from './Chat';

const CompanyList = () => {
  const [companyDataList, setCompanyDataList] = useState([]);
  const [socket, setSocket] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const getCompanyData = async () => {
    try {
      const response = await axios.post('/api/college/getcompanydata');
      setCompanyDataList(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCompanyData();
    const newSocket = io();
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleCardClick = (companyData) => {
    setSelectedCompany((prevSelected) => (prevSelected === companyData ? null : companyData));
  };

  return (
    <div className="container" style={{ width: '80%' }}>
      <div className="row">
        <div className="col-md-6" style={{ overflowY: 'auto', maxHeight: '70vh' }}>
          {companyDataList.map((companyData) => (
            <CompanyCard
              key={companyData._id}
              companyData={companyData}
              loggedInUserId={localStorage.getItem('collegetoken')}
              handleClick={() => handleCardClick(companyData)}
            />
          ))}
        </div>
        <div className="col-md-6">
        {selectedCompany ? (
  <div className="college-details card mb-3 border-0 shadow rounded" style={{ background: "linear-gradient(to right, #b7d8e8, #c7e9f4)" }}>
    <div className="card-body">
      <h3 className="card-title fs-4 mb-3 text-primary">{selectedCompany.companyName}</h3>
      <p className="card-text fs-6 mb-0 text-muted">
        {selectedCompany.companyDetail?.about && selectedCompany.companyDetail.about.length > 100
          ? selectedCompany.companyDetail.about.slice(0, 100) + "..."
          : selectedCompany.companyDetail?.about || "About"}
      </p>
    </div>
  </div>
) : (
  <div className="default-details card mb-3 border-0 shadow rounded" style={{ background: "#f0f0f0" }}>
    <div className="card-body text-center py-5">
      <i className="fas fa-building fs-3 mb-3 text-muted"></i>
      <p className="card-text fs-5 fw-bold mb-0">Click on a Company to view details.</p>
    </div>
  </div>
)}

          {selectedCompany && (
            <Chat userType="college" loggedInUserId={localStorage.getItem('collegetoken')}  userId={selectedCompany._id} socket={socket} />
          )}
        </div>

      </div>
      
    </div>
  );
};

export default CompanyList;
