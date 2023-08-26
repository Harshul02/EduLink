import React,{useRef} from "react";
import { Link } from "react-router-dom";
import {motion as m} from "framer-motion";
import { useNavigate } from "react-router-dom";
import ContactUs from "./ContactUs";


const Landing = () => {
  const navigate = useNavigate();
  const handleLogout = (event) => {
    event.preventDefault();
    if (localStorage.getItem("collegetoken")) {
      localStorage.removeItem("collegetoken");
      navigate("/collegelogin");
    } else if (localStorage.getItem("companytoken")) {
      localStorage.removeItem("companytoken");
      navigate("/companylogin");
    }
  };
  const handleLogin = () => {
    if (!localStorage.getItem("collegetoken")) {
      navigate("/collegelogin");
    } else if (!localStorage.getItem("companytoken")) {
      navigate("/companylogin");
    }
  };
  const isCollegeLoggedIn = localStorage.getItem("collegetoken");
  const isCompanyLoggedIn = localStorage.getItem("companytoken");

  return (
    <>
      <m.div initial ={{opacity:0}} animate={{opacity:1}} exit ={{opacity:0}}>
      <body data-bs-spy="scroll" data-bs-target=".navbar">
        <nav className="navbar navbar-expand-lg bg-white sticky-top">
          <div className="container">
            <Link className="navbar-brand" to="#">
              {/* <img src="./assets/images/logo-dark.svg" alt=""/> */}
              <span className="h3 fw-bolder text-primary">Edu</span>
              <span className="h3 fw-bolder text-success">Link.</span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#hero">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">
                    About
                  </a>
                </li>

              
                <li className="nav-item">
                  <a className="nav-link" href="#team">
                    Team
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">
                    Contact
                  </a>
                </li>
              </ul>
              
              {localStorage.getItem("collegetoken") || localStorage.getItem("companytoken") ? (
            <button
              className="btn btn-brand ms-lg-3"
              type="button"
              id="dropdownMenuButton1"
              aria-expanded="false"
              onClick={handleLogout}
              style={{ backgroundColor: "red", color: "white" }}
            >
              LOGOUT
            </button>
          ) : (
            <button
              className="btn btn-brand ms-lg-3"
              type="button"
              id="dropdownMenuButton1"
              aria-expanded="false"
              onClick={handleLogin}
            >
              LOGIN
            </button>
          )}
            </div>
          </div>
        </nav>

        <section
          id="hero"
          className="min-vh-100 d-flex align-items-center text-center"
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1
                  data-aos="fade-left"
                  className="text-uppercase text-white fw-semibold display-1"
                >
                  Welcome to EduLink
                </h1>
                <h5 className="text-white mt-3 mb-4" data-aos="fade-right">
                  Where Education Meets Opportunity
                </h5>
                <div data-aos="fade-up" data-aos-delay="50">
              
              {(isCollegeLoggedIn && !isCompanyLoggedIn) ||
          (!isCollegeLoggedIn && !isCompanyLoggedIn) ? (
             <Link to="/collegelogin" className="btn btn-brand me-2">
              {isCollegeLoggedIn ? "Dashboard" : "College Login"}
             </Link>
            ) : (
           
             <Link
             to="/collegelogin"
             className="btn btn-brand me-2 disabled" // Apply "disabled" class
             disabled
           >
             College Login
           </Link>
          )}

          {(isCompanyLoggedIn && !isCollegeLoggedIn) ||
          (!isCollegeLoggedIn && !isCompanyLoggedIn) ? (
             <Link to="/companylogin" className="btn btn-brand me-2">
             {isCompanyLoggedIn ? "Dashboard" : "Company Login"}
           </Link>
           
          ) : (
             <Link
              to="/companylogin"
              className="btn btn-brand me-2 disabled" // Apply "disabled" class
              disabled
            >
              Company Login
            </Link>
           
          )}
                
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section-padding">
          <div className="container">
            <div className="row">
              <div
                className="col-12 text-center"
                data-aos="fade-down"
                data-aos-delay="50"
              >
                <div className="section-title">
                  <h1 className="display-4 fw-semibold">About us</h1>
                  <div className="line"></div>
                  <p>
                    At EduLink, we foster educational excellence by fostering
                    meaningful connections between colleges and
                    companies/startups. Our platform opens doors to brighter
                    futures, enhancing placement opportunities for students and
                    offering companies Link diverse talent pool to recruit from.
                  </p>
                </div>
              </div>
            </div>
            <div className="row justify-content-between align-items-center">
              <div className="col-lg-6" data-aos="fade-down" data-aos-delay="50">
                <img src="./assets/images/bg1.png" alt="" />
              </div>
              <div data-aos="fade-down" data-aos-delay="150" className="col-lg-5">
                <h1>About Edulink</h1>
                <p className="mt-3 mb-4"></p>
                <div className="d-flex pt-4 mb-3">
                  <div className="iconbox me-4">
                    <i className="ri-mail-send-fill"></i>
                  </div>
                  <div>
                    <h5>Bridging Opportunities</h5>
                    <p>
                    Our platform fosters connections between colleges and companies/startups, unlocking placement opportunities for students and diverse hiring choices for businesses
                    </p>
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <div className="iconbox me-4">
                    <i className="ri-user-5-fill"></i>
                  </div>
                  <div>
                    <h5>Empowering Futures</h5>
                    <p>
                    We empower students with excellent placements while providing companies/startups access to a vast pool of talented candidates.
                    </p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="iconbox me-4">
                    <i className="ri-rocket-2-fill"></i>
                  </div>
                  <div>
                    <h5>Cultivating Diversity and Innovation</h5>
                    <p>
                    Embracing diversity, we bridge gaps and foster an inclusive environment that fuels innovation and growth for academia and industry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="counter" className="section-padding">
          <div className="container text-center">
            <div className="row g-4">
              <div
                className="col-lg-3 col-sm-6"
                data-aos="fade-down"
                data-aos-delay="150"
              >
                <h1 className="text-white display-4">10M+</h1>
                <h6 className="text-uppercase mb-0 text-white mt-3">
                  Total Visits
                </h6>
              </div>
              <div
                className="col-lg-3 col-sm-6"
                data-aos="fade-down"
                data-aos-delay="250"
              >
                <h1 className="text-white display-4">50K+</h1>
                <h6 className="text-uppercase mb-0 text-white mt-3">
                   students placed
                </h6>
              </div>
              <div
                className="col-lg-3 col-sm-6"
                data-aos="fade-down"
                data-aos-delay="350"
              >
                <h1 className="text-white display-4">5K+</h1>
                <h6 className="text-uppercase mb-0 text-white mt-3">
                 companies registered
                </h6>
              </div>
              <div
                className="col-lg-3 col-sm-6"
                data-aos="fade-down"
                data-aos-delay="450"
              >
                <h1 className="text-white display-4">3K+</h1>
                <h6 className="text-uppercase mb-0 text-white mt-3">
                   colleges registered
                </h6>
              </div>
            </div>
          </div>
        </section>

        
        <section id="team" className="section-padding">
          <div className="container">
            <div className="row">
              <div
                className="col-12 text-center"
                data-aos="fade-down"
                data-aos-delay="150"
              >
                <div className="section-title">
                  <h1 className="display-4 fw-semibold">Team Members</h1>
                  <div className="line"></div>
               
                </div>
              </div>
            </div>
            <div className="row g-4 text-center ">
              <div className="col-md-4" data-aos="fade-down" data-aos-delay="150">
                <div className="team-member image-zoom">
                  <div className="image-zoom-wrapper">
                    <img src="./assets/images/aayush.jpg" alt="" />
                  </div>
                  <div className="team-member-content">
                    <h4 className="text-white">Aayush Bisht</h4>
                    <p className="mb-0 text-white">Full-Stack Web Developer</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4" data-aos="fade-down" data-aos-delay="250">
                <div className="team-member image-zoom">
                  <div className="image-zoom-wrapper">
                    <img src="./assets/images/about1.jpg" alt="" />
                  </div>
                  <div className="team-member-content">
                    <h4 className="text-white">Shravan Das</h4>
                    <p className="mb-0 text-white">Full-Stack Web Developer</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4" data-aos="fade-down" data-aos-delay="350">
                <div className="team-member image-zoom">
                  <div className="image-zoom-wrapper">
                    <img src="./assets/images/harshul.jpg" alt="" />
                  </div>
                  <div className="team-member-content">
                    <h4 className="text-white">Harshul Jain</h4>
                    <p className="mb-0 text-white">Full-Stack Web Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-light" id="contact">
          <ContactUs />
        </section>

        <footer className="bg-dark">
          <div className="footer-top">
            <div className="container">
              <div className="row gy-5">
                <div className="col-lg-3 col-sm-6">
                   <span className="h3 fw-bolder text-primary">Edu</span>
              <span className="h3 fw-bolder text-success">Link.</span>
                  {/* <div className="line"></div> */}
                  <div class="d-flex justify-content-center">
  <div class="line"></div>
</div>
                  <p>
                  Where Education Meets Opportunity
                  </p>
                  <div className="social-icons">
                    <Link to="#">
                      <i className="ri-twitter-fill"></i>
                    </Link>
                    <Link to="#">
                      <i className="ri-instagram-fill"></i>
                    </Link>
                    <Link to="#">
                      <i className="ri-github-fill"></i>
                    </Link>
                    <Link to="#">
                      <i className="ri-dribbble-fill"></i>
                    </Link>
                  </div>
                </div>
                {/* <div className="col-lg-3 col-sm-6">
                  <h5 className="mb-0 text-white">SERVICES</h5>
                  <div class="d-flex justify-content-center">
  <div class="line"></div>
</div>
                  <ul>
                    <li>
                      <Link to="#">UI Design</Link>
                    </li>
                    <li>
                      <Link to="#">UX Design</Link>
                    </li>
                    <li>
                      <Link to="#">Branding</Link>
                    </li>
                    <li>
                      <Link to="#">Logo Designing</Link>
                    </li>
                  </ul>
                </div> */}
                <div className="col-lg-3 col-sm-6">
                  <h5 className="mb-0 text-white">ABOUT</h5>
                  {/* <div className="line"></div> */}
                  <div class="d-flex justify-content-center">
  <div class="line"></div>
</div>
                  <ul>
                    <li>
                      <Link to="#">Services</Link>
                    </li>
                    <li>
                      <Link to="#">Company</Link>
                    </li>
                    <li>
                      <Link to="#">Career</Link>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <h5 className="mb-0 text-white">CONTACT</h5>
                  {/* <div className="line"></div> */}
                  <div class="d-flex justify-content-center">
  <div class="line"></div>
</div>
                  <ul>
                    <li>Dehradun</li>
                    <li>+91 9999999999</li>
                    <li>www.example.com</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <div className="row g-4 justify-content-between">
                <div className="col-auto">
                  <p className="mb-0">© Copyright EduLink. All Rights Reserved</p>
                </div>
                <div className="col-auto">
                  <p className="mb-0">
                    Designed with 💜 By{" "}
                    Team EduLink
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
      </m.div>
    </>
  );
};

export default Landing;
