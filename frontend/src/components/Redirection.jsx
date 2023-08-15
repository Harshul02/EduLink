import React from "react";
import { Link } from "react-router-dom";

const Redirection = ({ type }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div></div>
      {type === "college" ? (
        <div>
          Not a Company?{" "}
          <Link to="/collegelogin" className="text-primary">
            Login
          </Link>
          {" "}as College
        </div>
      ) : (
        <div>
          Not a College?{" "}
          <Link to="/companylogin" className="text-primary">
            Login
          </Link>
          {" "}as Company
        </div>
      )}
    </div>
  );
};

export default Redirection;
