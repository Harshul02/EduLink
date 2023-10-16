const mongoose = require("mongoose");

const companyDetailSchema = new mongoose.Schema({
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
  studentdomain: {
    type: Array,
    default: [],
  },
  hiringperiod: {
    type: String,
    default: "Details will be available soon",
  },
  successstories: {
    type: Array,
    default: [],
  },
  industrypartnership: {
    type: Array,
    default: [],
  },
  workculture: {
    type: String,
    default: "Details will be available soon",
  },
});

module.exports = mongoose.model("companyDetail", companyDetailSchema);