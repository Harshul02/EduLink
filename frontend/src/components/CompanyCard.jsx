import React from 'react'

const CompanyCard = ({ companyData, handleClick }) => {

    const aboutText =
    companyData.companyDetail?.about && companyData.companyDetail.about.length > 100
      ? companyData.companyDetail.about.slice(0, 100) + "..."
      : companyData.companyDetail?.about || "About";

    return (
        <div
          className="college-card card mb-3"
          onClick={handleClick}
          style={{ width: "80%" }}
        >
          <div className="card-body">
            <h5 className="card-title">{companyData.companyName}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{companyData.companyType}</h6>
            <p className="card-text">{aboutText}</p>
            {/* <a href="#" className="card-link">Card link</a> */}
            {/* <a href="#" className="card-link">Another link</a> */}
          </div>
        </div>
      );
}

export default CompanyCard
