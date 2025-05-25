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

## Database Schema

SwiftCare's database schema ensures efficient role-based access control and scheduling.

### **Core Tables**

- **Users**: Stores patient, doctor, and admin details.
- **Appointments**: Manages scheduled appointments, linking patients and doctors.
- **Roles**: Implements role-based access control.

### **Entity-Relationship Diagram**

For a visual representation, refer to the schema documentation:
[Database Schema](https://dbdiagram.io/d/swift-care-6832db08b9f7446da3086a91)

## Installation

To get SwiftCare up and running on your local machine, follow these steps:

### Prerequisites

- Python 3.8+
- Node.js and npm (or yarn)
- Git

### Clone the Repository

- git clone https://github.com/G-Gakii/swift-care.git
- cd swift-care

### Backend Setup (Django)

Navigate into the backend directory using this command `cd backend`. Follow these steps to set up the Django application.

- Create a Virtual Environment: `python -m venv venv`
- Activate virtual environment: `source venv/bin/activate # On Windows: venv\Scripts\activate`
- Install Dependencies: `pip install -r requirements.txt`

#### Database Setup

- **Create a `.env` file:** In your `backend/swiftcare` directory (or wherever your `settings.py` resides), create a new file named `.env`.
- **Add your database credentials:** Populate the `.env` file with your PostgreSQL database details. Replace the placeholder values with your actual database credentials:

  ````DB_NAME=your_database_name
  DB_USER=your_database_user
  DB_PASSWORD=your_database_password
  DB_HOST=localhost # Or your database host
  DB_PORT=5432 # Or your database port
  SECRECT_KEY=secretkey ```

  ````

- Run database migrations: `python manage.py migrate`
- Create a Superuser (Optional, for admin access) : `python manage.py createsuperuser`
- Run the Backend Server: `python manage.py runserver`

The backend API will be running at http://127.0.0.1:8000/.

### Frontend Setup (React)

- Open a new terminal, navigate back to the root of the project, and then into the frontend directory:`cd frontend`
- Install Dependencies: `npm install  `
- Start the Frontend Development Server: `npm start`

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
