import React, { useState } from "react";
import Navbar from "../NavBar/navbar";
import { AxiosInstance } from "../../services/ApiInterceptor";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(user);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      let res = await AxiosInstance.post("auth/login/", user);

      localStorage.setItem("token", res.data.token);
      alert("Login successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setUser({ email: "", password: "" });
      setFormErrors({});
    }
  };
  const validate = (user) => {
    const errors = {};

    if (!user.email) {
      errors.email = "Email required";
    }

    if (!user.password) {
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
        <h1>Login</h1>
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
            value={user.email}
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
          <label htmlFor="InputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="InputPassword1"
            name="password"
            placeholder="please enter your password"
            value={user.password}
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

export default Login;
