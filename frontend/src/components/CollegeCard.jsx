import React from 'react';

const CollegeCard = ({ collegeData, handleClick }) => {

  const aboutText =
  collegeData.collegeDetail?.about && collegeData.collegeDetail.about.length > 100
    ? collegeData.collegeDetail.about.slice(0, 100) + "..."
    : collegeData.collegeDetail?.about || "About";

  return (
    <div
      className="college-card card mb-3"
      onClick={handleClick}
      style={{ width: "80%" }}
    >
      <div className="card-body">
        <h5 className="card-title">{collegeData.collegeName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{collegeData.collegeType}</h6>
        <p className="card-text">{aboutText}</p>
      </div>
    </div>
  );
};

export default CollegeCard;
