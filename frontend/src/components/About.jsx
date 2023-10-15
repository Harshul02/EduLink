import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";
import EditCompanyDetails from "./EditCompanyDetails";

function About() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { companyId } = useParams();
  const [company, setCompany] = useState({});

  const findDetail = async () => {
    try {
      // const token = localStorage.getItem("companytoken");
      const token = companyId || localStorage.getItem("companytoken");

      const response = await axios.post("/api/company/getcompanydetail", {
        token,
      });
      const companyData = response.data.data;
      setData(companyData);
      console.log(companyData);
      const data = await axios.post("/api/company/findcompany", { token });
      const companyNam = data.data.data;
      console.log(data)
      setCompany(companyNam);
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
    // <div className="my-4 container">
    <div
      className="my-5 container-md text-center"
      style={{ width: "70%", marginTop: "30px" }}
    >
      {isLoading ? (
        <div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>      ) : (
        
        <div class="row">
               {companyId && (
        <Link
          to="/companypage"
          className="btn btn-primary mb-3"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          Back
        </Link>)}
          {companyId && (
            <p className=" display-1 font-weight-bold text-capitalize">
              {company.companyName}
            </p>
          )}
          {companyId && (
            <p
              className=" display-6 mb-5 text-capitalize"
              style={{ marginTop: "-23px" }}
            >
              {company.companyType} <hr />
            </p>
          )}
          <div class="col-3 ">
            <div class="row justify-content-end">
              <div class="col-xl-9 col-sm-12 col-12">
                <div class="card">
                  <div class="card-content">
                    <div class="card-body">
                      <div class="media d-flex">
                        <div class="align-self-center">
                          <i class="icon-user warning font-large-2 float-left"></i>
                        </div>
                        <div class="media-body text-right float-end">
                          <h3>{data.employees}</h3>
                          <span>Total Employees</span>
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
                  Tech Domains
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
            <EditCompanyDetails closeModal={showModal} existingData={data} />
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
}

export default About;
