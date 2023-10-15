const mongoose = require("mongoose");

const collegeDetailSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  moto: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  employees: {
    type: Number,
    required: true,
  },
  ethics: {
    type: String,
    required: true,
  },
  domains: {
    type: Array,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  studentsplaced: {
    type: String,
    default: "Details will be available soon",
  },
  naacranking: {
    type: String,
    default: "Details will be available soon",
  },
  maxpackage: {
    type: String,
    default: "Details will be available soon",
  },
  averagepackage: {
    type: String,
    default: "Details will be available soon",
  },
  alumninetwork: {
    type: String,
    default: "Details will be available soon",
  },
  foreigntieups: {
    type: String,
    default: "Details will be available soon",
  },
  researchpapers: {
    type: String,
    default: "Details will be available soon",
  },
  internshipoffered: {
    type: String,
    default: "Details will be available soon",
  },
  companiesvisited: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("collegeDetail", collegeDetailSchema);