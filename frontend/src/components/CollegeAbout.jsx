import React, { useState, useEffect } from "react";
import axios from "axios";

const CollegeAbout = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const findDetail = async () => {
    try {
      const token = localStorage.getItem("collegetoken");
      console.log(token);
      const response = await axios.post("/api/college/getcollegedetail", {
        token,
      });
      console.log(response.data);
      const collegeData = response.data.data;
      setData(collegeData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    findDetail();
  }, []);

  return (
    <div
      className="my-5 container-md text-center"
      style={{ width: "70%", marginTop: "30px" }}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        /*
          <div style={{ textAlign: "left" }}>
            {data.about && (
              <div className="my-3">
                <h4>About College</h4>
                <p className="mx-3">{data.about}</p>
              </div>
            )}
            {data.moto && (
              <div className="my-4">
                <h4>College's Moto</h4>
                <p className="mx-3">{data.moto}</p>
              </div>
            )}
            {data.employees && (
              <div className="my-4">
                <h4>Number of Students (Current)</h4>
                <p className="mx-3">
                  We have around {data.employees} students currently studying.
                </p>
              </div>
            )}
            {data.ethics && (
              <div className="my-4">
                <h4>College Values and Ethics</h4>
                <p className="mx-3">{data.ethics}</p>
              </div>
            )}
            {data.domains && (
              <div className="my-4">
                <h4>Companies Visited</h4>
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
        // <div class="row">

        <div class="row">
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
              {data.about}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeAbout;
