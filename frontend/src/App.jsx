import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Patient from "./Components/Patient/Patient";
import Doctor from "./Components/Doctor/Doctor";
import Appointment from "./Components/Appointment/Appointment";
import Login from "./Components/login/Login";
import ShowAppointments from "./Components/ShowAllAppointments/ShowAppointments";
import ShowDoctors from "./Components/showDoctors/showDoctors";
import Home from "./pages/Home";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/patient" element={<Patient />}></Route>
        <Route path="/doctor" element={<Doctor />}></Route>
        <Route path="/book_appointment" element={<Appointment />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/show_appointments" element={<ShowAppointments />} />
        <Route path="/doctors" element={<ShowDoctors />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
