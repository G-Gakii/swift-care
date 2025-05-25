# SwiftCare

SwiftCare is a modern, secure, and efficient role-based healthcare appointment system designed to streamline the booking process for both patients and healthcare providers. Built with a robust Django backend and a dynamic React frontend, it ensures secure authentication, intelligent availability-based scheduling, and prevents double-booking, offering a seamless user experience.

## Features

- Role-Based Access Control: Differentiates between patients, doctors, and administrators, providing tailored functionalities for each user type.

- Secure Authentication: Implements secure user registration and login mechanisms to protect sensitive health information.

- Availability-Based Scheduling: Allows doctors to set their availability, and patients can book appointments only within those available slots.

- Double-Booking Prevention: Ensures that no two appointments can be scheduled for the same time slot with the same doctor, preventing conflicts.

- Intuitive User Interface: A responsive and user-friendly React frontend for easy navigation and appointment management.

- Robust Backend: Powered by Django, providing a secure and scalable API for data management.

## Technologies Used

### Backend:

- Python
- Django (Web Framework)
- Django REST Framework (for API development)
- PostgreSQL

### Frontend:

- JavaScript
- React
- HTML
- CSS

## Installation

To get SwiftCare up and running on your local machine, follow these steps:

1. Prerequisites

- Python 3.8+
- Node.js and npm (or yarn)
- Git

2. Clone the Repository

- git clone https://github.com/G-Gakii/swift-care.git
- cd swift-care

3. Backend Setup (Django)
   Navigate into the backend directory and set up the Django application.

- cd backend
  a.Create a Virtual Environment:python -m venv venv
- Activate virtual environment: source venv/bin/activate # On Windows: venv\Scripts\activate
  b. Install Dependencies
- pip install -r requirements.txt
  c. Database Setup
- Configure your database settings in swiftcare/settings.py.
- Run database migrations:
- python manage.py migrate
  d. Create a Superuser (Optional, for admin access)
- python manage.py createsuperuser
  e. Run the Backend Server
- python manage.py runserver
  The backend API will be running at http://127.0.0.1:8000/.

1. Frontend Setup (React)

- Open a new terminal, navigate back to the root of the project, and then into the frontend directory.
- cd frontend
  a. Install Dependencies
  npm install  
  b. Start the Frontend Development Server
  npm start # or yarn start
  The React development server will start, usually opening in your browser at http://localhost:3000/.

## Usage

Once both the backend and frontend servers are running:
Access the Application: Open your web browser and go to http://localhost:3000/.

### Register/Login:

- Patients: Can register for new accounts and log in to book appointments.
- Doctors: Can log in (after being registered by an admin or self-registered if allowed) to manage their availability and view appointments.
- Admins: Can log in via the Django admin panel (http://127.0.0.1:8000/admin/) to manage users, doctors, and other system configurations.

### Book Appointments:

- Patients can browse available doctor slots and book appointments.

## Contributing

Contributions are welcome! If you'd like to contribute to SwiftCare, please follow these steps:

- Fork the repository.
- Create a new branch (git checkout -b feature/your-feature-name).
- Make your changes.
- Commit your changes (git commit -m 'feat: Add new feature').
- Push to the branch (git push origin feature/your-feature-name).
- Open a Pull Request.
- Please ensure your code adheres to the existing coding style and includes appropriate tests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
