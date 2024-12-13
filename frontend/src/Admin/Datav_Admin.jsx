import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Datav_Admin() {
  const { volunteerId } = useParams();  // Ambil volunteerId dari URL
  const [volunteer, setVolunteer] = useState(null);

  useEffect(() => {
    const fetchVolunteer = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/volunteer/${volunteerId}`);
        setVolunteer(response.data); // Set data ke state
      } catch (error) {
        console.error("Error fetching volunteer data:", error);
      }
    };

    fetchVolunteer();
  }, [volunteerId]);  // Menjalankan ulang setiap kali volunteerId berubah

  if (!volunteer) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-8 w-full">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800">Profile Relawan</h1>
        <p className="text-gray-600">{volunteer.email}</p>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600 font-medium">Nama Depan:</label>
              <p className="text-gray-800">{volunteer.first_name}</p>
            </div>
            <div>
              <label className="text-gray-600 font-medium">Nama Belakang:</label>
              <p className="text-gray-800">{volunteer.last_name}</p>
            </div>
          </div>
          <div>
            <label className="text-gray-600 font-medium">Alasan Tertarik Menjadi Relawan:</label>
            <p className="text-gray-800">{volunteer.interest_reason}</p>
          </div>
          <div>
            <label className="text-gray-600 font-medium">Alasan Anda Tepat untuk Pekerjaan Ini:</label>
            <p className="text-gray-800">{volunteer.suitability_reason}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600 font-medium">Bagian Pekerjaan:</label>
              <p className="text-gray-800">{volunteer.job_role}</p>
            </div>
            <div>
              <label className="text-gray-600 font-medium">No HP:</label>
              <p className="text-gray-800">{volunteer.phone_number}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Datav_Admin;
