const express = require("express");
const router = express.Router();
const College = require("../models/collegeModel");
const bcrypt = require("bcryptjs");
const CollegeDetails = require("../models/collegeDetailModel");
const Company = require("../models/companyModel");
const CompanyDetail = require("../models/companyDetailModel");
const Token = require("../models/token.js");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");


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

    const token = await new Token({
      userId : newCollege._id,
      token : crypto.randomBytes(32).toString("hex")

    }).save();

    const url = `${process.env.BASE_URL}/collegeregister/${newCollege._id}/verify/${token.token}`;
    // const url = `${process.env.BASE_URL}collegeregister/`;

		await sendEmail(newCollege.email, "Verify Email", url);

    
    res.status(201).json({
      message: "Verification Email sent",
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

        // Check if the clg is verified
        if (!college.verified) {
          return res.status(200).send({
            message: "Email not verified. Please verify your email first.",
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
    
    return res.status(200).send({
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
      website: req.body.website,
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

router.get('/:id/verify/:token', async (req, res) => {
	try {
		const user = await College.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });
    console.log("lol");
    console.log(user);
    console.log("User ID:", user._id);
		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });
console.log("hap");
		// await College.updateOne({ _id: user._id, verified: true });
    await College.updateOne({ _id: user._id }, { $set: { verified: true } });
		// await token.remove();
    await Token.deleteOne({ userId: user._id, token: req.params.token });
    console.log("Confirm");

		return res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
    console.error("Error:", error);
		return res.status(500).send({ message: "Intern Server Error" });
	}
});
  module.exports = router;