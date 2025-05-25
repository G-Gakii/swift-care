import React from "react";
import { AxiosInstanceWithInterceptor } from "../../services/ApiInterceptor";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../NavBar/navbar";

const ShowDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const fetchDoctors = async () => {
    try {
      const res = await AxiosInstanceWithInterceptor("doctor");
      console.log(res);

      setDoctors(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="text-center">Doctors in one place</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fullname</th>
            <th scope="col">Indentification Number</th>
            <th scope="col"> Phone Number</th>
            <th scope="col">Specialization</th>
            <th scope="col">Availability</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={doctor.identification_number}>
              <th scope="row">{index} </th>
              <td>{doctor.full_name}</td>
              <td>{doctor.identification_number}</td>
              <td>{doctor.phone_number}</td>
              <td>{doctor.specialization}</td>
              <td>
                {" "}
                {Object.entries(doctor.availability).map(([day, time]) => (
                  <div key={day}>
                    {day}: {time}
                  </div>
                ))}{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ShowDoctors;
