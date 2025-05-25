import React from "react";
import Navbar from "../Components/NavBar/navbar";
import Patient from "../Components/Patient/Patient";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="text-center m-5">
        <h1>Are you patient or doctor</h1>
        <button
          onClick={() => {
            localStorage.setItem("role", "patient");
            navigate("/patient");
          }}
          className="btn btn-secondary  px-5 py-3 m-2"
        >
          Patient
        </button>
        <button
          onClick={() => {
            localStorage.setItem("role", "doctor");
            navigate("/doctor");
          }}
          className="btn btn-secondary px-5 py-3 m-2"
        >
          Doctor
        </button>
      </div>
    </>
  );
};

export default Home;
