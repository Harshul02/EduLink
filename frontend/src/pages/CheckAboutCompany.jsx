import React, {useState} from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const CheckAboutCompany = () => {
    const params = useParams();
    // console.log(params);
    const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { companyId } = useParams();
  const [company, setCompany] = useState({});
    const findDetail = async () => {
        try {
          // const token = localStorage.getItem("companytoken");
          const token = params.companyId;
    
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
    // <div>
    //   <div className="container">
    //   <div>
    //     <h4 className='center'>Company About</h4>
    //     <p className="center">{data.about}</p>
    //     </div>
    //   <div>
    //     <h4 className='center'>Company Moto</h4>
    //     <p className="center">{data.moto}</p>
    //     </div>
    //   <div>
    //     <h4 className='center'>Company Ethics</h4>
    //     <p className="center">{data.ethics}</p>
    //     </div>
    //   <div>
    //     <h4 className='center'>Company website</h4>
    //     <p className="center"><a href={`${data.website}`} target='_blank'>{data.website}</a></p>
    //     </div>
    //   <div>
    //     <h4 className='center'>Company Domain</h4>
    //     <p className="center">{data.domains}</p>
    //     </div>
    //   <div>
    //     <h4 className='center'>Company Hiring</h4>
    //     <p className="center">{data.hiringperiod}</p>
    //     </div>
    //   </div>
    // </div>

    
  )
}

export default CheckAboutCompany
