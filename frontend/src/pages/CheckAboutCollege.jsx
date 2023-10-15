import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const CheckAboutCollege = () => {
    const params = useParams();
    // console.log(params);
    const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
//   const { companyId } = useParams();
  const [college, setCollege] = useState({});
    const findDetail = async () => {
        try {
          // const token = localStorage.getItem("companytoken");
          const token = params.collegeId;
    
          const response = await axios.post("/api/college/getcollegedetail", {
            token,
          });
          const collegeData = response.data.data;
          setData(collegeData);
          console.log(collegeData);
          const data = await axios.post("/api/college/findcollege", { token });
          const collegeNam = data.data.data;
          setCollege(collegeNam);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        findDetail();
      }, []);
  return (
    <div>
      <div className="container">
      <div>
        <h4 className='center'>College About</h4>
        <p className="center">{data.about}</p>
        </div>
      <div>
        <h4 className='center'>College Moto</h4>
        <p className="center">{data.moto}</p>
        </div>
      <div>
        <h4 className='center'>College Ethics</h4>
        <p className="center">{data.ethics}</p>
        </div>
      <div>
        <h4 className='center'>College website</h4>
        <p className="center"><a href={`${data.website}`} target='_blank'>{data.website}</a></p>
        </div>
      <div>
        <h4 className='center'>College Domain</h4>
        <p className="center">{data.domains}</p>
        </div>
      <div>
        <h4 className='center'>College Alumni Network</h4>
        <p className="center">{data.alumninetwork}</p>
        </div>
      </div>
    </div>
  )
}

export default CheckAboutCollege
