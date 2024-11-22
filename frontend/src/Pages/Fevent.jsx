import React, { useState } from 'react';
import Suksesvol from './Suksesvol';

const Fevent = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    interestReason: '',
    suitabilityReason: '',
    jobRole: '',
    phoneNumber: '',
    email: '',
  });
  const [redirect, setRedirect] = useState(false); // New state for conditional rendering

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation: Check if all fields are filled
    const isFormValid = Object.values(formData).every((field) => field.trim() !== '');

    if (isFormValid) {
      // Set redirect to true to render Suksesvol component
      setRedirect(true);
    } else {
      alert('Please fill in all fields.');
    }
  };

  // Render Suksesvol component if redirect is true
  if (redirect) {
    return <Suksesvol />;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4 mt-3">Daftar Menjadi Pejuang</h2>
      
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kepada:</label>
              <input
                type="text"
                value="Sungai Cimanbo, Bandung, Jawa Barat"
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Depan:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Masukkan Nama Depan"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Belakang:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Masukkan Nama Belakang"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mengapa Anda Tertarik Untuk Menjadi Relawan Pada Aktivitas Ini?</label>
            <textarea
              name="interestReason"
              value={formData.interestReason}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Ceritakan alasan Anda"
              required
            ></textarea>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mengapa Anda Adalah Relawan Yang Tepat Untuk Aktivitas Ini?</label>
            <textarea
              name="suitabilityReason"
              value={formData.suitabilityReason}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Jelaskan keunggulan Anda"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bagian Pekerjaan Apa? (Pembersihan/Sosialisasi?)</label>
              <input
                type="text"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleChange}
                placeholder="Pilih Bagian Pekerjaan"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">No Handphone:</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Masukkan No Handphone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-6 w-1/5 bg-[#00609B] text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Kirim Formulir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Fevent;