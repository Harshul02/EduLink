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
  employees: {
    type: Number,
    required: true,
  },
  ethics: {
    type: String,
    required: true,
  },
  domains: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("companyDetail", companyDetailSchema);