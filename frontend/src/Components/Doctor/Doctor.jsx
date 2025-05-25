import Navbar from "../NavBar/navbar";
import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../services/ApiInterceptor";

const Doctor = () => {
  const [doctor, setDoctor] = useState({
    email: "",
    password: "",
    identification_number: "",
    full_name: "",
    specialization: "",
    phone_number: "",
    availability: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    console.log("start");

    e.preventDefault();
    const errors = validate(doctor);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      let res = await AxiosInstance.post("doctor", doctor);
      console.log(res);
      alert("Your have been registered successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const validate = (user) => {
    const errors = {};
    if (!doctor.specialization) {
      errors.specialization = "Specilization required";
    }
    if (!doctor.email) {
      errors.email = "Email required";
    }
    if (!doctor.full_name) {
      errors.full_name = "Fullname required";
    }
    if (!doctor.identification_number) {
      errors.identification_number = "Identification Number required";
    }
    if (!doctor.availability) {
      errors.insurance_provider = "Insurance Provider required";
    }
    if (!doctor.phone_number) {
      errors.phone_number = "Phone Number required";
    }
    if (!doctor.password) {
      errors.password = "Password required";
    }
    return errors;
  };
  const handleFocus = (e) => {
    const { name } = e.target;
    setFormErrors((prev) => {
      let updatedError = { ...prev };
      delete updatedError[name];
      return updatedError;
    });
  };
  return (
    <>
      <Navbar />

      <form onSubmit={handleSubmit}>
        <h1 className="text-center">Register Doctor</h1>
        <div className="mb-3">
          <label htmlFor="full_name" className="form-label">
            Fullname
          </label>
          <input
            type="text"
            className="form-control"
            id="full_name"
            name="full_name"
            aria-describedby="full_nameHelp"
            placeholder="e.g john doe"
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {formErrors.full_name && (
            <span className="errors"> {formErrors.full_name} </span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="InputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            placeholder="e.g john@email.com"
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {formErrors.email && (
            <span className="errors"> {formErrors.email} </span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="identification_number" className="form-label">
            Identification Number
          </label>
          <input
            type="text"
            className="form-control"
            id=" identification_number"
            name="identification_number"
            aria-describedby=" identification_numberHelp"
            placeholder="DOC123456710"
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {formErrors.identification_number && (
            <span className="errors"> {formErrors.identification_number} </span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="date_of_birth" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phone_number"
            name="phone_number"
            aria-describedby="phone_numberHelp"
            placeholder="e.g +254711111111"
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {formErrors.phone_number && (
            <span className="errors"> {formErrors.phone_number} </span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="specialization" className="form-label">
            Specialization
          </label>
          <input
            type="text"
            className="form-control"
            id="specialization"
            name="specialization"
            aria-describedby="specialization"
            placeholder="e.g Cardiology"
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {formErrors.specialization && (
            <span className="errors"> {formErrors.specialization} </span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="availability" className="form-label">
            Availability
          </label>
          <input
            type="text"
            className="form-control"
            id="availability"
            name="availability"
            aria-describedby="availability Help"
            placeholder="e.g Monday: 09:00 - 17:00"
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {formErrors.availability && (
            <span className="errors"> {formErrors.availability} </span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="InputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="InputPassword1"
            name="password"
            placeholder="please enter your password"
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {formErrors.password && (
            <span className="errors"> {formErrors.password} </span>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Doctor;
