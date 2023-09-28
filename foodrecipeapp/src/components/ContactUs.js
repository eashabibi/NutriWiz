import React, { Fragment, useState } from "react";
import Nav from "./Nav";

const ContactUs = () => {
  // State variables to store form field values
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can send the form data to your backend or perform any desired action
    // For demonstration purposes, let's just log the data to the console
    console.log(formData);
  };

  return (
    <Fragment>
      <Nav />
      <div className="contact">
        <div className="contact-container">
          <h1>Contact Us</h1>
          <p>
            Hi, I'm Asha, and I'm here to assist you with any questions or
            feedback.<br></br>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Name:&nbsp;</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:&nbsp;</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone:&nbsp;</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit">Submit:&nbsp;</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ContactUs;
