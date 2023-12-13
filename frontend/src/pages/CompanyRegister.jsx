import React from 'react';
import { Link } from 'react-router-dom';
import {motion as m} from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Loader from '../Loader/Loader';
const CompanyRegister = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [avatar , setAvatar] = useState("");

  const registerDataChange = (e)=>{

    if(e.target.name === "avatar"){
        const reader = new FileReader();
        reader.onload = ()=>{
            if(reader.readyState === 2){
                setAvatar(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);

    }
    else{
        setAvatar(e.target.value);
    }

  }

  const companyregisterHandler = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const values = {companyName, companyType, contactPerson, email, password, phone,avatar};
      const response = await axios.post("/api/company/register", values);
      if (response.data.success) {
        toast.success(response.data.message);
        setVerificationSent(true);
        setLoading(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    finally{
      setLoading(false);
    }
    
 };
 
  return (
    
    
    <>
    <Toaster />
    <m.div className="bg-light" initial={{ x: -60, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }} 
    transition={{ duration: 1, ease: 'easeInOut' }}>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form
                className="p-4 bg-white rounded shadow-sm"
                style={{
                  color: '#333', /* Change font color */
                  backgroundColor: '#f9f9f9', /* Change form background color */
                  border: '1px solid #ccc', /* Add a border */
                }}
                onSubmit={companyregisterHandler}

              >
                <h2
                  className="mb-4"
                  style={{
                    fontSize: '2.5rem', 
                    fontWeight: 'bold', 
                    color: '#007bff', 
                    borderBottom: '2px solid #007bff', 
                    paddingBottom: '0.5rem',
                  }}
                >
                  Company Registration
                </h2>

                <div className="form-group mb-4">
                  <input
                    type="text"
                    id="companyName"
                    className="form-control form-control-lg"
                    placeholder="Company Name"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div className="form-group mb-4">
                  <input
                    type="text"
                    id="companyType"
                    placeholder='Company Type'
                    className="form-control form-control-lg"
                    required
                    value={companyType}
                    onChange={(e) => setCompanyType(e.target.value)}
                  >
                   
                  </input>
                </div>

                <div className="form-group mb-4">
                  <input
                    type="text"
                    id="contactPerson"
                    className="form-control form-control-lg"
                    placeholder="Contact Person"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                  />
                </div>

                <div className="form-group mb-4">
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {verificationSent && (
                    <div className="alert alert-success mt-3" role="alert">
                      Verification email has been sent to your email address. Please check your inbox.
                    </div>
                  )}

                <div className="form-group mb-4">
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Create Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div style={{ marginTop: '8px', color: '#007bff', fontWeight: 'bold' }}>
                    <ul style={{ listStyleType: 'none', paddingInlineStart: '0' }}>
                    <li>&#8226; At least 8 characters long</li>
                    <li>&#8226; Include at least one uppercase letter</li>
                    <li>&#8226; Include at least one special character (e.g., !, @, #, $)</li>
                    <li>&#8226; Include at least one number</li>
                   </ul>
                 </div>
                </div>

                <div className="form-group mb-4">
                  <input
                    type="tel"
                    id="phone"
                    className="form-control form-control-lg"
                    placeholder="Phone Number"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group mb-4">
                <img src ="./assets/images/bg1.png"alt = 'avatarPreview'
                style={{ width: '450px', height: '150px', position: 'relative', marginBottom: '20px' }}
                />
                  <input
                    type="file"
                    className="form-control form-control-lg"
                    name = "avatar"
                    accept = "image/*"
                    onChange={registerDataChange}
                  />
                </div>

                {loading ? (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Loader />
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg btn-block"
                      style={{
                        backgroundColor: '#007bff',
                        borderColor: '#007bff',
                      }}
                    >
                      Sign Up
                    </button>
                  )}

                
                
                
                <p className="mt-4">
                  Already have an account?{' '}
                  <Link to="/companylogin" className="text-primary">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </m.div>
    </>
    
  );
};

export default CompanyRegister;
