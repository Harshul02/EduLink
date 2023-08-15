import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top bg-blue-200 bg-light"   >
      <div className="container">
      <Link className="navbar-brand" to="/">
              <span className="h3 fw-bolder text-primary">Edu</span>
              <span className="h3 fw-bolder text-success">Link.</span>
            </Link>

        <div className="ml-auto" >
        <button className="btn btn-primary" style={{ marginRight: "10px" }}>Contact Us</button>

          <button className="btn btn-outline-danger">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
