import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion as m } from 'framer-motion';
import { CollegeAbout, Tieups,History, CollegeList,Navbar, CompanyList } from '../components/index';
import axios from 'axios';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import CollegeDetail from '../components/CollegeDetail';

const CompanyPage = () => {
  const [showModal, setShowModal] = useState(false); 
  const [college, setCollege] = useState({});

  const findUser = async() =>{
    try{
      const token = localStorage.getItem("collegetoken");
      // console.log(token);
      const data = await axios.post("/api/college/findcollege", {token});
      const collegeData = data.data.data;
      setCollege(collegeData);
      console.log(collegeData);
      if (collegeData.firstLogin) {
        setShowModal(true); 
      }
      // console.log(showModal);
    }catch(error)
    {
      console.error(error);
    }
  }

  useEffect(() => {
    findUser();
  }, []);

  const [selectedItem, setSelectedItem] = useState('about');

  const handleNavItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
    <Toaster />
    <div className="container-fluid p-0 position-relative">
      {/* cover image */}

      {showModal ? (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Welcome to the EduLink
                </h5>
                
              </div>
              <div className="modal-body">
                {/* <p>Enter Details!</p> */}

                <CollegeDetail setModal={setShowModal}/>
              </div>
              {/* <div className="modal-footer"> */}
                {/* <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button> */}
                {/* You can add more buttons or actions here if needed */}
              {/* </div> */}
            </div>
          </div>
        </div>
      ):(
<>
      <Navbar />
      <div style={{ height: "50vh" }}>
        <img src="./assets/images/bg1.png" alt="Your Image" className="img-fluid " style={{ width: "100%", height: "100%" }} />
      </div>

            {/* Fixed profile box */}
            <div className="profile-box" style={{ position: "absolute", transform: "translate(250%, -33%)",zIndex:'999' }}>
        <img src="./assets/images/bg1.png" alt="Profile Picture" className="img-fluid" style={{ width: "130px", height: "130px" }} />
        <h2>{college.collegeName}</h2>
        <p>{college.collegeType}</p>
      </div>

      {/* horizontal navigation bar */}
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link className="nav-link"  onClick={() => handleNavItemClick('about')}>About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link"  onClick={() => handleNavItemClick('company')}>Browse Companies</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link"  onClick={() => handleNavItemClick('tieups')}>Your Tie-Ups</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link"  onClick={() => handleNavItemClick('history')}>History</Link>
          </li>
          {/* Add more navigation items as needed */}
        </ul>
      </nav>

      {/* Display corresponding component */}
      <div style={{ marginTop: "80px" }}>
        {selectedItem === 'about' && <CollegeAbout />}
        {selectedItem === 'tieups' && <Tieups />}
        {selectedItem === 'history' && <History />}
        {selectedItem === 'company' && <CompanyList />}
      </div>
</>
      )}
    </div>
    </>
  );
};

export default CompanyPage;
