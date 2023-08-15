import React, { useState } from 'react';
import CollegeCard from './CollegeCard';
import axios from 'axios';
import { useEffect } from 'react';

const CollegeList = () => {
  // Sample data for the colleges (replace with your actual data)
  // const collegeDataList = [
  //   { id: 1, name: 'College A', details: 'Details about College A' },
  //   { id: 2, name: 'College B', details: 'Details about College B' },
  //   { id: 3, name: 'College C', details: 'Details about College C' },
  //   // Add more college data as needed
  // ];

  const [collegeDataList, setCollegeDataList] = useState([]);

  const getCollegeData = async()=>{
    try{
        const response = await axios.post("/api/company/getcollegedata");
        console.log(response.data.data);
        setCollegeDataList(response.data.data);
    }catch(error){
        console.error(error);
    }
  }

  useEffect(() => {
    getCollegeData();
  }, []);

  const [selectedCollege, setSelectedCollege] = useState(null);

  const handleCardClick = (collegeData) => {
    setSelectedCollege((prevSelected) => (prevSelected === collegeData ? null : collegeData));
  };

  return (
    <div className="container " style={{ width: '80%' }}>
      <div className="row">
        <div className="col-md-6" style={{ overflowY: 'auto', maxHeight: '70vh' }}>
          {collegeDataList.map((collegeData) => (
            <CollegeCard
              key={collegeData.id}
              collegeData={collegeData}
              handleClick={() => handleCardClick(collegeData)}
            />
          ))}
        </div>
        <div className="col-md-6">
          {selectedCollege ? (
            <div className="college-details card mb-3">
              <div className="card-body">
                <h3 className="card-title">{selectedCollege.collegeName}</h3>
                <p className="card-text">{selectedCollege.collegeDetail?.about && selectedCollege.collegeDetail.about.length > 100
      ? selectedCollege.collegeDetail.about.slice(0, 100) + "..."
      : selectedCollege.collegeDetail?.about || "About"}</p>
              </div>
            </div>
          ) : (
            <div className="default-details card mb-3">
              <div className="card-body">
                <p className="card-text">Click on a College to view details.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeList;
