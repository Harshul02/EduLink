import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";

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
      setCompany(companyNam);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    findDetail();
  }, []);

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
        /*
          div style={{ textAlign: "left" }}>
          {data.about && (
            <div className="my-3">
              <h4>About Company</h4>
              <p className="mx-3">{data.about}</p>
            </div>
          )}
          {data.moto && (
            <div className="my-4">
              <h4>Company's Moto</h4>
              <p className="mx-3">{data.moto}</p>
            </div>
          )}
          {data.employees && (
            <div className="my-4">
              <h4>Number of Employees</h4>
              <p className="mx-3">
                We have around {data.employees} employees working in our company
              </p>
            </div>
          )}
          {data.ethics && (
            <div className="my-4">
              <h4>Company Values and Ethics</h4>
              <p className="mx-3">{data.ethics}</p>
            </div>
          )}
          {data.domains && (
            <div className="my-4">
              <h4>Tech Domains</h4>
              <p className="mx-3">{data.domains}</p>
            </div>
          )}
          {data.location && (
            <div className="my-4">
              <h4>Location</h4>
              <p className="mx-3">{data.location}</p>
            </div>
          )}
        </div>
        */
       
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
              {data.about}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default About;
