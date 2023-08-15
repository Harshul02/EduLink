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
      <div className="my-4 container">
        <h2>About</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
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
        )}
      </div>
    );
  }


export default CollegeAbout
