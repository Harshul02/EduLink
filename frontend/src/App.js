import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import CompanyLogin from "./pages/CompanyLogin";
import CompanyRegister from "./pages/CompanyRegister";
import CompanyPage from "./pages/CompanyPage";
import CollegeLogin from "./pages/CollegeLogin";
import CollegeRegister from "./pages/CollegeRegister";
import CollegePage from "./pages/CollegePage";
import { useState } from "react";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
         
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/companyregister" element={<CompanyRegister />} />
        <Route
            exact
            path="/companylogin"
            element={<CompanyLogin/>}
          />
        <Route
            exact
            path="/companypage"
            element={<CompanyPage/>}
          />
        <Route
            exact
            path="/collegelogin"
            element={<CollegeLogin/>}
          />
        <Route
            exact
            path="/collegeregister"
            element={<CollegeRegister/>}
          />
        <Route
            exact
            path="/collegepage"
            element={<CollegePage/>}
          />

        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
