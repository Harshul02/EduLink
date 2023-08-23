import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CompanyCard from './CompanyCard';

const CompanyList = () => {
  // Sample data for the colleges (replace with your actual data)
//   const collegeDataList = [
//     { id: 1, name: 'Company A', details: 'Details about Company A' },
//     { id: 2, name: 'Company B', details: 'Details about Company B' },
//     { id: 3, name: 'Company C', details: 'Details about Company C' },
//     // Add more college data as needed
//   ];

  const [companyDataList, setCompanyDataList] = useState([]);

  const getCompanyData = async()=>{
    try{
        const response = await axios.post("/api/college/getcompanydata");
        console.log(response.data.data);
        setCompanyDataList(response.data.data);
    }catch(error){
        console.error(error);
    }
  }

  useEffect(() => {
    getCompanyData();
  }, []);

  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleCardClick = (companyData) => {
    setSelectedCompany((prevSelected) => (prevSelected === companyData ? null : companyData));
  };

  return (
    <div className="container " style={{ width: '80%' }}>
      <div className="row">
        <div className="col-md-6" style={{ overflowY: 'auto', maxHeight: '70vh' }}>
          {companyDataList.map((companyData) => (
            <CompanyCard
              key={companyData._id}
              companyData={companyData}
              handleClick={() => handleCardClick(companyData)}
            />
          ))}
        </div>
        <div className="col-md-6">
          {selectedCompany ? (
            <div className="college-details card mb-3">
              <div className="card-body">
                <h3 className="card-title">{selectedCompany.companyName}</h3>
                <p className="card-text">{selectedCompany.companyDetail?.about && selectedCompany.companyDetail.about.length > 100
      ? selectedCompany.companyDetail.about.slice(0, 100) + "..."
      : selectedCompany.companyDetail?.about || "About"}</p>
              </div>
            </div>
          ) : (
            <div className="default-details card mb-3">
              <div className="card-body">
                <p className="card-text">Click on a Company to view details.</p>
              </div>
            </div>
          )}
        </div>

      </div>
      
    </div>
  );
};

export default CompanyList;
