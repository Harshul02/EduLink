const express = require("express");
const router = express.Router();
const Company = require("../models/companyModel");
const bcrypt = require("bcryptjs");
const CompanyDetails = require("../models/companyDetailModel");
const College = require("../models/collegeModel");
const CollegeDetail = require("../models/collegeDetailModel");

router.post("/register", async (req, res) => {
    try {
      const companyExists = await Company.findOne({ email: req.body.email });
      if (companyExists) {
        return res.status(200).json({
          message: "Company already exists",
          success: false,
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
      const newCompany = new Company(req.body);
      await newCompany.save();
      res.status(200).json({
        message: "Registration successful",
        success: true
      });

    } catch (error) {
      console.log(error);
      res.status(500).send({
      message: error.message,
      succes: false,
    });
    }
  });


  router.post("/login", async (req, res) => {
     try {
      const company = await Company.findOne({
        email: req.body.email,
      });
      if (!company) {
        return res.status(200).send({
          message: "Company not found",
          success: false,
        });
      }
      const isMatch = await bcrypt.compare(req.body.password, company.password);
      if (!isMatch) {
        return res.status(200).send({
          message: "Invalid Credentials",
          success: false,
        });
      }
      
      res.status(200).send({
        message: "Login successful",
        success: true,
        data: company._id,
        user: company,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        success: false,
      });
    }
  });

  router.post("/findcompany", async(req,res)=>{
    try{
      const company = await Company.findOne({ _id: req.body.token }).select(
        "-password -_id"
      );
      res.status(200).send({data: company});
  }catch(error)
  {
      return res.status(400).json({error});
  }
  });

  router.post("/savedetails", async(req,res)=>{
    try{
      const companyId = req.body.token;
      
      
      console.log(req.body);
      const companyDetails = new CompanyDetails({
        id: req.body.token,
        about: req.body.about,
        moto: req.body.moto,
        employees: req.body.employees,
        ethics: req.body.ethics,
        domains: req.body.domains,
        location: req.body.location,
      });
      console.log(companyDetails);
      await companyDetails.save();

      await Company.findByIdAndUpdate(
        companyId,
        { $set: { firstLogin: false } },
        { new: true } // Return the updated document
      );

      res.status(200).send({
        message: "Details saved successfully",
        success: true,
      });
    }catch(error){
      res.status(500).send({
        message: error.message,
        success: false,
      });
    }
  });


  router.post("/getcompanydetail", async(req,res)=>{
    try{
      
      const companyDetail = await CompanyDetails.findOne({ id: req.body.token });
      res.status(200).send({data: companyDetail});
  }catch(error)
  {
      return res.status(400).json({error});
  }
  });

  router.post("/getcollegedata", async(req,res)=>{
    try {
      const colleges = await College.find();
      const collegeDetails = await CollegeDetail.find();
      
      const allCollegeData = colleges.map((college) => {
        const collegeDetail = collegeDetails.find(detail => detail.id === college._id.toString());
        
        return {
          _id: college._id,
          collegeName: college.collegeName,
          collegeType: college.collegeType,
          contactPerson: college.contactPerson,
          email: college.email,
          password: college.password,
          phone: college.phone,
          firstLogin: college.firstLogin,
          collegeDetail: collegeDetail
        };
      });
      
      // res.json(allCompanyData);
      res.status(200).send({data: allCollegeData});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  })

  module.exports = router;