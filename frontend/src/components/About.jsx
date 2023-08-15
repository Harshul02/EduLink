import React, { useState, useEffect } from "react";
import axios from "axios";

function About() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const findDetail = async () => {
    try {
      const token = localStorage.getItem("companytoken");
      const response = await axios.post("/api/company/getcompanydetail", {
        token,
      });
      const companyData = response.data.data;
      setData(companyData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    findDetail();
  }, []);

  return (
    <div className="my-4 container">
      <h2>About</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ textAlign: "left" }}>
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
      )}
    </div>
  );
}

export default About;
