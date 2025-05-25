import React from "react";

const Navbar = () => {
  let role = localStorage.getItem("role");
  const logoutfn = () => {
    localStorage.clear();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          SwiftCare
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/doctors">
                Doctors
              </a>
            </li>
            {role === "patient" || role === "admin" ? (
              <>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/patient"
                  >
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/book_appointment">
                    Book Appointment
                  </a>
                </li>
              </>
            ) : null}

            {role === "doctor" || role === "admin" ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/doctor">
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/show_appointments">
                    Appointments
                  </a>
                </li>
              </>
            ) : null}

            <li className="nav-item">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a onClick={logoutfn} className="nav-link" href="/">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
