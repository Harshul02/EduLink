import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'

const EditCompanyDetails = ({closeModal,existingData}) => {
    
  const token = localStorage.getItem("companytoken");
  

  const [formData, setFormData] = useState({
   ...existingData,
   domains: existingData.domains || [],
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault(); 
   


  try {
    
    const response = await axios.post("/api/company/updatedetails", {
      token,
      about: formData.about,
      moto: formData.moto,
      employees: formData.employees,
      ethics: formData.ethics,
      domains: formData.domains,
      location: formData.location,
      studentdomain: formData.studentdomain,
      hiringperiod: formData.hiringperiod,
      successstories: formData.successstories,
      industrypartnership: formData.industrypartnership,
      workculture: formData.workculture,
    });

    if (response.data.success) { 
      window.location.reload();
      toast.success(response.data.message);
      setFormData({...response.data.data});
    } else {
      window.location.reload();
      toast.error(response.data.message);
    }
  } catch (error) {
    window.location.reload();
    toast.error("An error occurred while updating the details");
    
  };

}

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
        
        <div className="form-group my-3">
          <label htmlFor="studentdomain">Student Domain:</label>
          <input
            type="text"
            className="form-control"
            id="studentdomain"
            name="studentdomain"
            value={formData.studentdomain}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="hiringperiod">Hiring Period:</label>
          <input
            type="text"
            className="form-control"
            id="hiringperiod"
            name="hiringperiod"
            value={formData.hiringperiod}
            onChange={handleInputChange}
            required
          />
        </div>



        <div className="form-group my-3">
          <label htmlFor="successstories">Success Stories:</label>
          <input
            type="text"
            className="form-control"
            id="successstories"
            name="successstories"
            value={formData.successstories}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="industrypartnership">Industry Partnership:</label>
          <input
            type="text"
            className="form-control"
            id="industrypartnership"
            name="industrypartnership"
            value={formData.industrypartnership}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="workculture">Work Culture:</label>
          <input
            type="text"
            className="form-control"
            id="workculture"
            name="workculture"
            value={formData.workculture}
            onChange={handleInputChange}
            required
          />
        </div>

       <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      
    </div>
  );
};

export default EditCompanyDetails;