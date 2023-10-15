import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import TagsInput from 'react-tagsinput'

import 'react-tagsinput/react-tagsinput.css'

const CompanyDetails = (props) => {
    // console.log(props);
  const [formData, setFormData] = useState({
    about: "",
    moto: "",
    employees: "",
    ethics: "",
    domains: [],
    location: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("companytoken");
      const values = { token, ...formData };
      console.log(values);
      props.setModal(false);
      const response = await axios.post("/api/company/savedetails", values);
        // console.log(response.data.message);
      if(response.data.success)
      {
          toast.success(response.data.message);
        props.setModal(false);
      }
      else{
        toast.error(response.data.message);
      }
      
    } catch (error) {
        toast.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTagsChange = (tags) => {
    setFormData((prevData) => ({ ...prevData, domains: tags }));
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="inputField">About Company:</label>
          <textarea
            className="form-control"
            name="about"
            id="inputField"
            cols="30"
            rows="3"
            value={formData.about}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="moto">Company's Moto:</label>
          <textarea
            className="form-control"
            name="moto"
            id="moto"
            cols="30"
            rows="2"
            value={formData.moto}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="employees">Number of Employes:</label>
          <input
            type="number"
            className="form-control"
            id="employees"
            name="employees"
            value={formData.employees}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="ethics">Company Values and Ethics:</label>
          <textarea
            className="form-control"
            name="ethics"
            id="ethics"
            cols="30"
            rows="2"
            value={formData.ethics}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="domains">Tech Domains:</label>

          <TagsInput value={formData.domains} onChange={handleTagsChange} required/>
        </div>
        <div className="form-group my-3">
          <label htmlFor="location">Company's Location:</label>
          <input className="form-control" type="text" name="location" id="location" value={formData.location} onChange={handleInputChange} required/>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      
    </div>
  );
};

export default CompanyDetails;
