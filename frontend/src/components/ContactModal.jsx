import React from "react";
import emailjs from '@emailjs/browser';

const ContactModal = () => {
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
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Your Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="from_name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="from_email"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="subject" className="form-label">
          Subject
        </label>
        <input type="text" className="form-control" id="email" name="subject" />
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          Message
        </label>
        <textarea
          className="form-control"
          id="message"
          rows="5"
          name="message"
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Send
      </button>
    </form>
  );
};

export default ContactModal;
