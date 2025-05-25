import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Patient from "./Components/Patient/Patient";
import Doctor from "./Components/Doctor/Doctor";
import Appointment from "./Components/Appointment/Appointment";
import Login from "./Components/login/Login";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Patient />}></Route>
        <Route path="/doctor" element={<Doctor />}></Route>
        <Route path="/appointment" element={<Appointment />}></Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
