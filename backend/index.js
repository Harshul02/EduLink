const express = require('express');
const mongoose = require('mongoose');
const app = express();
var bodyParser = require('body-parser');
require("dotenv").config();
const dbConfig = require("./config/db");
app.use(express.json());
const PORT = process.env.PORT || 5000;

const collegeRoute = require("./routes/collegeRoute");
const companyRoute = require("./routes/companyRoute");


app.use("/api/college", collegeRoute);
app.use("/api/company", companyRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
