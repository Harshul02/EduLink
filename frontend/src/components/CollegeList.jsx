// CollegeList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CollegeCard from './CollegeCard';
import { io } from 'socket.io-client';
import Chat from './Chat';

const CollegeList = () => {
  const [collegeDataList, setCollegeDataList] = useState([]);
  const [socket, setSocket] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null)

  const getCollegeData = async () => {
    try {
      const response = await axios.post('/api/company/getcollegedata');
      setCollegeDataList(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCollegeData();
    const newSocket = io();
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleCardClick = (collegeData) => {
    setSelectedCollege((prevSelected) => (prevSelected === collegeData ? null : collegeData));
  };

  return (
    <div className="container" style={{ width: '80%' }}>
      <div className="row">
        <div className="col-md-6" style={{ overflowY: 'auto', maxHeight: '70vh' }}>
          {collegeDataList.map((collegeData) => (
            <CollegeCard
              key={collegeData._id}
              collegeData={collegeData}
              handleClick={() => handleCardClick(collegeData)}
            />
          ))}
        </div>
        <div className="col-md-6">
        {selectedCollege ? (
            <div className="college-details card mb-3 border-0 shadow rounded" style={{background: "linear-gradient(to right, #b7d8e8, #c7e9f4)" }}>
              <div className="card-body">
                <h3 className="card-title fs-4 mb-3 text-primary">{selectedCollege.collegeName}</h3>
                <p className="card-text fs-6 mb-0 text-primary">
                  {selectedCollege.collegeDetail?.about && selectedCollege.collegeDetail.about.length > 100
                    ? selectedCollege.collegeDetail.about.slice(0, 100) + "..."
                    : selectedCollege.collegeDetail?.about || "About"}
                </p>
              </div>
            </div>
          ) : (
            <div className="default-details card mb-3 border-0 shadow rounded" style={{ background: "#f0f0f0" }}>
              <div className="card-body text-center py-5">
                <i className="fas fa-graduation-cap fs-3 mb-3 text-muted"></i>
                <p className="card-text fs-5 fw-bold mb-0">Click on a College to view details.</p>
              </div>
            </div>
          )}
          {selectedCollege && (
            <Chat userType="company" loggedInUserId={localStorage.getItem('companytoken')} userId={selectedCollege._id} socket={socket} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeList;
