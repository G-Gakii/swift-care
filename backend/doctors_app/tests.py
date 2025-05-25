from django.test import TestCase
from doctors_app.models import Doctor
from user_app.models import CustomUser
from django.urls import reverse


class DoctorModelTest(TestCase):
    def setUp(self):
        self.user=CustomUser.objects.create(email="doctor@example.com", password="password", role="doctor")
        self.doctor=Doctor.objects.create(
            user=self.user,
            identification_number="DOC12345",
            full_name="Dr. John Doe",
            specialization="Cardiology",
            phone_number="1234567890",
            availability={"Monday": "9 AM - 5 PM"}
       
            
        )
        self.doctor_list_url = reverse("doctor-list")
        self.doctor_detail_url = reverse("doctor-detail", kwargs={"pk": self.doctor.identification_number})
    def test_doctor_creation(self):
           self.assertEqual(self.doctor.full_name, "Dr. John Doe")
           self.assertEqual(self.doctor.specialization, "Cardiology")
           self.assertEqual(self.doctor.phone_number, "1234567890")
           
    def test_identification_number_uniqueness(self):
        with self.assertRaises(Exception):  # IntegrityError due to UNIQUE constraint
            Doctor.objects.create(
                user=self.user,
                identification_number="DOC12345",  # Duplicate ID
                full_name="Dr. Jane Smith",
                specialization="Dermatology",
                phone_number="0987654321",
                availability={"Tuesday": "10 AM - 3 PM"}
                
            )
            
    def test_get_doctor_list(self):
        response=self.client.get(self.doctor_list_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        
    def test_doctor_detail(self):
        response=self.client.get(self.doctor_detail_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["full_name"], "Dr. John Doe")
        
    def test_create_doctor(self):
        data={
           "email": "newdoctor@example.com",
    "password": "newpassword",
    "identification_number": "DOC56789",
    "full_name": "Dr. Jane Smith",
    "specialization": "Neurology",
    "phone_number": "0987654321",
    "availability": '{"Tuesday": "10 AM - 3 PM"}'
    }
        
        response=self.client.post(self.doctor_list_url,data,format="json")
        self.assertEqual(response.status_code, 201,response.data)
        
        
        