import React, { useEffect, useState } from "react";
import Navbar from "../NavBar/navbar";
import { AxiosInstance } from "../../services/ApiInterceptor";
import { useNavigate } from "react-router-dom";

const Patient = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
    email: "",
    password: "",
    identification_number: "",
    full_name: "",
    date_of_birth: "",
    phone_number: "",
    insurance_provider: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    console.log("start");

    e.preventDefault();
    const errors = validate(patient);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      let res = await AxiosInstance.post("patient", patient);
      console.log(res);
      navigate("/login");
      alert("Your have been registered successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const validate = (user) => {
    const errors = {};
    if (!patient.date_of_birth) {
      errors.date_of_birth = "Date of birth required";
    }
    if (!patient.email) {
      errors.email = "Email required";
    }
    if (!patient.full_name) {
      errors.full_name = "Fullname required";
    }
    if (!patient.identification_number) {
      errors.identification_number = "Identification Number required";
    }
    if (!patient.insurance_provider) {
      errors.insurance_provider = "Insurance Provider required";
    }
    if (!patient.phone_number) {
      errors.phone_number = "Phone Number required";
    }
    if (!patient.password) {
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
        <h1 className="text-center"> Patient</h1>
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
            required
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
            required
          />
          {formErrors.email && (
            <span className="errors"> {formErrors.email} </span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor=" identification_number" className="form-label">
            Identification Number
          </label>
          <input
            type="text"
            className="form-control"
            id=" identification_number"
            name="identification_number"
            aria-describedby=" identification_numberHelp"
            placeholder="e.g PAT123456710"
            onChange={handleChange}
            onFocus={handleFocus}
            required
          />
          {formErrors.identification_number && (
            <span className="errors"> {formErrors.identification_number} </span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor=" date_of_birth" className="form-label">
            Date of Birth
          </label>
          <input
            type="date"
            className="form-control"
            id="date_of_birth"
            name="date_of_birth"
            aria-describedby="date_of_birthHelp"
            onChange={handleChange}
            onFocus={handleFocus}
            required
          />
          {formErrors.date_of_birthe && (
            <span className="errors"> {formErrors.date_of_birth} </span>
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
            required
          />
          {formErrors.phone_number && (
            <span className="errors"> {formErrors.phone_number} </span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="insurance_provider" className="form-label">
            Insurance Provider
          </label>
          <input
            type="text"
            className="form-control"
            id="insurance_provider"
            name="insurance_provider"
            aria-describedby="insurance_providerHelp"
            placeholder="XTZ"
            onChange={handleChange}
            onFocus={handleFocus}
            required
          />
          {formErrors.insurance_provider && (
            <span className="errors"> {formErrors.insurance_provider} </span>
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
            required
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

export default Patient;
