from datetime import datetime

from django.test import TestCase
from patients_app.models import Patient,Appointment
from user_app.models import CustomUser
from django.urls import reverse
from rest_framework.test import APITestCase
from patients_app.api.serializers import PatientSerializer
from rest_framework.test import APITestCase, APIClient
from django.utils.timezone import now
from datetime import timedelta
from doctors_app.models import Doctor

# Create your tests here.

class PatientModelTest(TestCase):
    def setUp(self):
        self.user=CustomUser.objects.create_user(email="patient@example.com", password="password", role="patient")
        self.patient=Patient.objects.create(
            user=self.user,
           identification_number= "PAT123456710",
    full_name= "John john",
    date_of_birth= "2025-05-10",
    phone_number= "+254712345568",
    insurance_provider="XYZ"
     )
        self.patient_list_url=reverse('patient-list')
        self.patient_detail_url=reverse('patient-detail',kwargs={"pk": self.patient.identification_number})
    def test_patient_creation(self):
        self.assertEqual(self.patient.full_name, "John john")
        self.assertEqual(self.patient.insurance_provider, "XYZ")
        self.assertEqual(self.patient.phone_number, "+254712345568")
    def test_identification_number_uniqueness(self):
        with self.assertRaises(Exception):  # IntegrityError due to UNIQUE constraint
          Patient.objects.create(
                user=self.user,
                identification_number="PAT123456710",  # Duplicate ID
                 full_name= "John john",
                 insurance_provider="XYZ",
                 phone_number= "+254712345568",
                 
                
          )
    def test_get_patient_list(self):
        response = self.client.get(self.patient_list_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        
    def test_get_patient_detail(self):
        response = self.client.get(self.patient_detail_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["full_name"], "John john")
    def test_create_patient(self):
        data = {
            "email": "james@email.com",
    "password": "securepassword123",
    "identification_number": "PAT123456713",
    "full_name": "John john",
   "date_of_birth": "2000-05-10",
    "phone_number": "07111111111",
    "insurance_provider": "XYZ"
        }
        response = self.client.post(self.patient_list_url, data, format="json")
        
        self.assertEqual(response.status_code, 201)
        


class AppointmentListTest(APITestCase):
    def setUp(self):
        # Create patient user
        self.patient_user = CustomUser.objects.create_user(email="patient@email.com", password="password123", role="patient")
        self.patient = Patient.objects.create(user=self.patient_user, identification_number="PAT123", full_name="John Doe", phone_number="0712345678", date_of_birth="2000-01-01", insurance_provider="XYZ")

        # Create doctor user
        self.doctor_user = CustomUser.objects.create_user(email="doctor@email.com", password="password123", role="doctor")
        self.doctor = Doctor.objects.create(user=self.doctor_user, identification_number="DOC456", full_name="Dr. Smith", specialization="Cardiology", phone_number="0723456789", availability={"Monday": "09:00 - 17:00"})

        # Set API client and authenticate as patient
        self.client = APIClient()
        self.client.force_authenticate(user=self.patient_user)

        # Define appointment endpoint
        self.appointment_list_url = reverse("appointment-list")

    def test_patient_can_create_appointment(self):
        appointment_time = datetime.strptime("2025-05-26 10:00", "%Y-%m-%d %H:%M")  # A valid Monday at 10 AM

        data = {
            "doctor": self.doctor.identification_number,
            "appointment_time": appointment_time.strftime("%Y-%m-%dT%H:%M:%S")
        }
        response = self.client.post(self.appointment_list_url, data, format="json")
        print(response.data)

        self.assertEqual(response.status_code, 201)  # Appointment created successfully

    def test_non_patient_cannot_create_appointment(self):
        self.client.force_authenticate(user=self.doctor_user)  # Login as doctor instead of patient
        data = {"doctor": self.doctor.identification_number, "appointment_time": (now() + timedelta(days=1)).strftime("%Y-%m-%dT%H:%M:%S")}

        response = self.client.post(self.appointment_list_url, data, format="json")
        self.assertEqual(response.status_code, 403)  # PermissionDenied

    def test_doctor_unavailable_on_selected_day(self):
        appointment_time = now() + timedelta(days=2, hours=10)  # Doctor availability is only Monday, forcing it to another day
        data = {"doctor": self.doctor.identification_number, "appointment_time": appointment_time.strftime("%Y-%m-%dT%H:%M:%S")}

        response = self.client.post(self.appointment_list_url, data, format="json")
        self.assertEqual(response.status_code, 400)  # Should fail due to availability

    def test_double_booking_prevention(self):
        appointment_time = now() + timedelta(days=1, hours=10)
        Appointment.objects.create(patient=self.patient, doctor=self.doctor, appointment_time=appointment_time, status="scheduled")  # First appointment

        data = {"doctor": self.doctor.identification_number, "appointment_time": appointment_time.strftime("%Y-%m-%dT%H:%M:%S")}
        response = self.client.post(self.appointment_list_url, data, format="json")

        self.assertEqual(response.status_code, 400)  # Should fail due to double booking

    def test_conflicting_appointment_with_buffer_period(self):
        first_appointment_time = now() + timedelta(days=1, hours=10)
        Appointment.objects.create(patient=self.patient, doctor=self.doctor, appointment_time=first_appointment_time, status="scheduled")  # First appointment

        conflicting_appointment_time = first_appointment_time + timedelta(minutes=30)  # Within the buffer period (60 min)

        data = {"doctor": self.doctor.identification_number, "appointment_time": conflicting_appointment_time.strftime("%Y-%m-%dT%H:%M:%S")}
        response = self.client.post(self.appointment_list_url, data, format="json")

        self.assertEqual(response.status_code, 400)  # Should fail due to buffer period conflict

    


