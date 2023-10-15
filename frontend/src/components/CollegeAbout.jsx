import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom"; 
import EditCollegeDetails from "./EditCollegeDetails";


const CollegeAbout = () => {
  const [data, setData] = useState({});
  const { collegeId } = useParams(); 
  const [isLoading, setIsLoading] = useState(true);
  const [college, setCollege] = useState({});
  const navigate = useNavigate(); 
  // console.log(college);

  const findDetail = async () => {
    try {
      const token = collegeId || localStorage.getItem("collegetoken");  
      const response = await axios.post("/api/college/getcollegedetail", {
        token,
      });
      const collegeData = response.data.data;
      setData(collegeData);
      console.log(collegeData);

      const data = await axios.post("/api/college/findcollege", {token});
      const collegeNam = data.data.data;
      setCollege(collegeNam);
      // console.log(collegeNam);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    findDetail();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    console.log("Clicked");
    setShowModal(true);
  };
  const handleCloseModal = () =>{
    setShowModal(false);
  }

  return (
    <div
      className="my-5 container-md text-center"
      style={{ width: "70%", marginTop: "30px" }}
    >
      {isLoading ? (
        <div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>      ) : (
        
        <div class="row">
               
                    {collegeId && <p className=" display-1 font-weight-bold">{college.collegeName}</p>}
                    {collegeId && <p className=" display-6 mb-5" style={{marginTop:"-23px"}}>{college.collegeType}</p>}


          <div class="col-3 ">
            
            <div class="row justify-content-end">
            
              <div class="col-xl-9 col-sm-12 col-12">
              {collegeId && (
            <button
            onClick={() => navigate(-1)} 
            className="btn btn-primary mb-3"
            style={{ position: "absolute", top: 10, left: 10 }}
          >
            Back
          </button>)}
              
                <div class="card">
                  <div class="card-content">
                    <div class="card-body">
                      <div class="media d-flex">
                        <div class="align-self-center">
                          <i class="icon-user warning font-large-2 float-left"></i>
                        </div>
                        <div class="media-body text-right float-end">
                          <h3>{data.employees}</h3>
                          <span>Total Students</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-end ">
              <div class="col-xl-9 col-sm-12 col-12">

                <div class="card">
                  <div class="card-content">
                    <div class="card-body">
                      <div class="media d-flex">
                        <div class="align-self-center">
                          <i class="icon-pointer danger font-large-2 float-left"></i>
                        </div>
                        <div class="media-body text-right">
                          <h6>{data.location}</h6>
                          <span>Location</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-end">
              <div className="col-xl-9 col-sm-12 col-12">
                <button
                  class="btn btn-success"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Courses Offered
                </button>
                <div class="collapse" id="collapseExample">
                  <div class="card card-body">{data.domains}</div>
                </div>
              </div>
            </div>
          </div>
          <div class=" col-9">

            <div
              className=" rounded-5 border-start bg-primary bg-opacity-10 bg-gradient fs-5 py-4 px-5 text-primary-emphasis"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >


<div className="form-group my-3 d-flex justify-content-end">
          <button type="button" className="btn btn-primary" onClick={handleOpenModal}>
            Edit Details
          </button>
        </div>
        {showModal && (
  <div>
    {/* Add the custom modal backdrop with inline CSS */}
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', /* Semi-transparent background color */
        zIndex: 1040, /* Ensure it's above the modal */
      }}
      onClick={handleCloseModal}
    ></div>
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Welcome to the EduLink
            </h5>
            <button type="button" className="close" onClick={handleCloseModal}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {/* <p>Enter Details!</p> */}
            <EditCollegeDetails closeModal={showModal} existingData={data} />
          </div>
        </div>
      </div>
    </div>
  </div>
)}
              





              {data.about}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeAbout;
