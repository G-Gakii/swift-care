import React, { useEffect, useState } from "react";
import { AxiosInstanceWithInterceptor } from "../../services/ApiInterceptor";
import Navbar from "../NavBar/navbar";

const ShowAppointments = () => {
  const [appointments, setAppointment] = useState([]);
  const fetchAllAppointment = async () => {
    try {
      const res = await AxiosInstanceWithInterceptor.get("appointment");
      console.log(res.data);

      setAppointment(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllAppointment();
  }, []);
  return (
    <>
      <Navbar />
      <h1>Appointments</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Patient_ID</th>
            <th scope="col">Doctor_ID</th>
            <th scope="col">appointment_time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, id) => (
            <tr key={id}>
              <th scope="row">{id + 1}</th>

              <td>{appointment.patient} </td>
              <td>{appointment.doctor}</td>
              <td> {appointment.appointment_time} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ShowAppointments;
