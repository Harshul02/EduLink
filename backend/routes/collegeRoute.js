const express = require("express");
const router = express.Router();
const College = require("../models/collegeModel");
const bcrypt = require("bcryptjs");
const CollegeDetails = require("../models/collegeDetailModel");
const Company = require("../models/companyModel");
const CompanyDetail = require("../models/companyDetailModel");

router.post("/register", async (req, res) => {
  try {
    const collegeExists = await College.findOne({ email: req.body.email });
    if (collegeExists) {
      return res.status(200).json({
        message: "College already exists",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const newCollege = new College(req.body);
    await newCollege.save();
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
    const college = await College.findOne({
      email: req.body.email,
    });
    if (!college) {
      return res.status(200).send({
        message: "College not found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, college.password);
    if (!isMatch) {
      return res.status(200).send({
        message: "Invalid Credentials",
        success: false,
      });
    }
    
    res.status(200).send({
      message: "Login successful",
      success: true,
      data: college._id,
      user: college,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});


router.post("/findcollege", async(req,res)=>{
  try{
   
    const college = await College.findOne({ _id: req.body.token }).select(
      "-password -_id"
    );
    res.status(200).send({data: college});
}catch(error)
{
    return res.status(400).json({error});
}
});
  

router.post("/savedetails", async(req,res)=>{
  try{
    const collegeId = req.body.token;
    
    
    
    const collegeDetails = new CollegeDetails({
      id: req.body.token,
      about: req.body.about,
      moto: req.body.moto,
      employees: req.body.employees,
      ethics: req.body.ethics,
      domains: req.body.domains,
      location: req.body.location,
    });
    
    await collegeDetails.save();

    await College.findByIdAndUpdate(
      collegeId,
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


router.post("/getcollegedetail", async(req,res)=>{
  try{
    
    const collegeDetail = await CollegeDetails.findOne({ id: req.body.token });
    res.status(200).send({data: collegeDetail});
}catch(error)
{
    return res.status(400).json({error});
}
});

router.post("/getcompanydata", async(req,res)=>{
  try {
    const companies = await Company.find();
    const companyDetails = await CompanyDetail.find();
    
    const allCompanyData = companies.map((company) => {
      const companyDetail = companyDetails.find(detail => detail.id === company._id.toString());
      
      return {
        _id: company._id,
        companyName: company.companyName,
        companyType: company.companyType,
        contactPerson: company.contactPerson,
        email: company.email,
        password: company.password,
        phone: company.phone,
        firstLogin: company.firstLogin,
        companyDetail: companyDetail
      };
    });
    res.status(200).send({data: allCompanyData});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
})


router.post('/updatedetails', async (req, res) => {
  try {
    const collegeId = req.body.token;
    const updatedData = {
      about: req.body.about,
      moto: req.body.moto,
      employees: req.body.employees,
      ethics: req.body.ethics,
      domains: req.body.domains,
      location: req.body.location,
      studentsplaced: req.body.studentsplaced,
      naacranking: req.body.naacranking,
      maxpackage: req.body.maxpackage,
      averagepackage: req.body.averagepackage,
      alumninetwork: req.body.alumninetwork,
      foreigntieups: req.body.foreigntieups,
      researchpapers: req.body.researchpapers,
      internshipoffered: req.body.internshipoffered,
      companiesvisited: req.body.companiesvisited,
    };

    
    const result = await CollegeDetails.findOneAndUpdate(
      { id: collegeId }, 
      updatedData,
      { new: true } 
    );

    if (result) {
      res.status(200).json({
        data: result,
        message: 'College details updated successfully',
        success: true,
      });
    } else {
      res.status(404).json({
        message: 'College not found or details not updated',
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});


  module.exports = router;