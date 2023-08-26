import React from 'react'
import emailjs from '@emailjs/browser';

const ContactUs = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const templateParams = {
          from_name: formData.get('from_name'),
          from_email: formData.get('from_email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
        };
    
        emailjs
        .send(
          'service_c5hk5ic',
          'template_ccy6xu8',
          templateParams,
          '1DCiGzYt4VjsAR3JI'
        )
        .then(
          (response) => {
            window.alert('Message sent successfully!', response.status, response.text);
            e.target.reset();
          },
          (error) => {
            window.alert('Unable to send message', error);
          }
        );
      };
  return (
    <div className="container">
    <div className="row">
      <div className="col-12 text-center" data-aos="fade-down" data-aos-delay="150">
        <div className="section-title">
          <h1 className="display-4 text-white fw-semibold">Get in touch</h1>
          <div className="line bg-white"></div>
        </div>
      </div>
    </div>
    <div className="row justify-content-center" data-aos="fade-down" data-aos-delay="250">
      <div className="col-lg-8">
        <form onSubmit={handleSubmit} className="row g-3 p-lg-5 p-4 bg-white theme-shadow">
          <div className="form-group col-lg-6">
            <input
              type="text"
              className="form-control"
              placeholder="Enter first name"
              name="from_name"
            />
          </div>
          <div className="form-group col-lg-6">
            <input
              type="text"
              className="form-control"
              placeholder="Enter last name"
              name="from_last_name"
            />
          </div>
          <div className="form-group col-lg-12">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email address"
              name="from_email"
            />
          </div>
          <div className="form-group col-lg-12">
            <input
              type="text"
              className="form-control"
              placeholder="Enter subject"
              name="subject"
            />
          </div>
          <div className="form-group col-lg-12">
            <textarea
              name="message"
              rows="5"
              className="form-control"
              placeholder="Enter Message"
            ></textarea>
          </div>
          <div className="form-group col-lg-12 d-grid">
            <button type="submit" className="btn btn-brand">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default ContactUs