import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Check if college token is stored in local storage
    const isCollegeLoggedIn = localStorage.getItem("collegetoken");
    const isCompanyLoggedIn = localStorage.getItem("companytoken");

    if(isCollegeLoggedIn) {
      localStorage.removeItem("collegetoken");
      navigate("/collegelogin");
     }
      
     if(isCompanyLoggedIn){
      localStorage.removeItem("companytoken");
      navigate("/companylogin");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top bg-blue-200 bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="h3 fw-bolder text-primary">Edu</span>
          <span className="h3 fw-bolder text-success">Link.</span>
        </Link>

        <div className="ml-auto">
          <button className="btn btn-primary" style={{ marginRight: "10px" }}>
            Contact Us
          </button>

          <button
            className="btn btn-outline-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
