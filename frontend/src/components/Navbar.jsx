import {React,useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import ContactModal from "./ContactModal";
const Navbar = () => {
  const navigate = useNavigate();
  const [showAboutModal, setShowAboutModal] = useState(false);

 

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
  const toggleAboutModal = () => {
    setShowAboutModal(!showAboutModal);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top bg-blue-200 bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="h3 fw-bolder text-primary">Edu</span>
          <span className="h3 fw-bolder text-success">Link.</span>
        </Link>

        <div className="ml-auto">
          <button className="btn btn-primary" onClick={toggleAboutModal} style={{ marginRight: "10px" }}>
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
      {showAboutModal && (
  <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Contact Us</h5>
          <button type="button" className="btn-close" onClick={toggleAboutModal}></button>
        </div>
        <div className="modal-body">
          {/* Render the ContactForm component's content here */}
          <ContactModal />
        </div>
      </div>
    </div>
  </div>
)}

    </nav>
  );
};

export default Navbar;
