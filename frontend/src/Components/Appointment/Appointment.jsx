import React, { useState } from "react";
import Navbar from "../NavBar/navbar";
import { AxiosInstanceWithInterceptor } from "../../services/ApiInterceptor";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    doctor: "",
    appointment_time: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(appointment);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      let res = await AxiosInstanceWithInterceptor.post(
        "appointment",
        appointment
      );
      console.log(res);
      alert("Appointment booked successfully");
    } catch (error) {
      console.log(error);

      if (error.response && error.response.status === 401) {
        alert("Kindly login to access");
        navigate("/login");
      } else if (error.response && error.response.status === 403) {
        alert("Only patients or admin can book appointment");
      } else {
        alert(error.response.data);
      }
    } finally {
      setUser({ doctor: "", appointment: "" });
      setFormErrors({});
    }
  };
  const validate = (user) => {
    const errors = {};
    if (!appointment.doctor) {
      errors.doctor = "Doctor id required";
    }
    if (!appointment.appointment_time) {
      errors.appointment_time = "Appointment time required";
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
        <h1 className="text-center">Book Appointment</h1>
        <div className="mb-3">
          <label htmlFor="doctor" className="form-label">
            Doctor Number
          </label>
          <input
            type="text"
            className="form-control"
            id="doctor"
            name="doctor"
            value={appointment.doctor}
            aria-describedby="doctorHelp"
            placeholder="e.g DOC123456710"
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {formErrors.doctor && (
            <span className="errors">{formErrors.doctor}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="appointment_time" className="form-label">
            Appointment Time
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="appointment_time"
            value={appointment.appointment_time}
            aria-describedby="appointment_time"
            name="appointment_time"
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {formErrors.appointment_time && (
            <span className="errors">{formErrors.appointment_time}</span>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Appointment;
