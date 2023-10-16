import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { About, Tieups,CollegeHistory, CollegeList, Navbar } from '../components/index';
import axios from 'axios';
import CompanyDetails from '../components/CompanyDetails';
import { Toaster } from 'react-hot-toast';


const CompanyPage = () => {
  const [selectedItem, setSelectedItem] = useState('about');
  const [showModal, setShowModal] = useState(false); 
  const [company, setCompany] = useState({});

  const handleNavItemClick = (item) => {
    setSelectedItem(item);
  };

  const findUser = async() =>{
    try{
      const token = localStorage.getItem("companytoken");
      const data = await axios.post("/api/company/findcompany", {token});
      const companyData = data.data.data;
      setCompany(companyData);
      if (companyData.firstLogin) {
        setShowModal(true); 
      }
    }catch(error)
    {
      console.error(error);
    }
  }

  useEffect(() => {
    findUser();
  }, []);

  useEffect(() => {
    console.log(showModal);
    console.log(company);
  }, [showModal]);


  

  return (
    <>
    <Toaster />
    <div className="container-fluid p-0 position-relative">

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

                <CompanyDetails setModal={setShowModal}/>
              </div>
             
            </div>
          </div>
        </div>
      ):(
        <>
            <Navbar />

      {/* cover image */}
      {/* <div className="container"> */}
      <div style={{ height: "50vh" }}>
        <img src="./assets/images/bg1.png" alt="Your Image" className="img-fluid " style={{ width: "100%", height: "100%" }} />
      </div>

            {/* Fixed profile box */}
            <div className="profile-box" style={{ position: "absolute", transform: "translate(250%, -33%)",zIndex:'999', }}>
        <img src="./assets/images/bg1.png" alt="Profile Picture" className="img-fluid" style={{ width: "130px", height: "130px" }} />
        <h3>{company.companyName}</h3>
        {/* <h3>Graphic Era</h3> */}
        
        <p>{company.companyType}</p>
      </div>
     

      {/* horizontal navigation bar */}
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link className="nav-link"  onClick={() => handleNavItemClick('about')}>About</Link>  
          </li>
          <li className="nav-item">
            <Link className="nav-link"  onClick={() => handleNavItemClick('college')}>Browse Colleges</Link>
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
        {selectedItem === 'about' && <About />}
        {selectedItem === 'tieups' && <Tieups loggedInUserId={localStorage.getItem('companytoken')} />}
        {selectedItem === 'history' && <CollegeHistory loggedInUserId={localStorage.getItem('companytoken')} />}
        {selectedItem === 'college' && <CollegeList />}
      </div>
      </>
      )}

    </div>
    
    </>
  );
};

export default CompanyPage;
