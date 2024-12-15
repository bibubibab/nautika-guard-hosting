import React, { useState } from 'react';
import axios from 'axios';

const Approval_Admin = ({ notification }) => {
  const {
    id, // Pastikan ID laporan tersedia di data notifikasi
    name,
    email,
    title,
    message,
    date,
    avatar,
  } = notification;

  // Fungsi untuk memperbarui status laporan
  const updateStatus = async (status) => {
    try {
      const response = await axios.put(`http://localhost:3001/issues/${id}/status`, { status });
  
      if (response.status === 200) {
        alert(response.data.message);
      } else {
        alert("Gagal memperbarui status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Terjadi kesalahan saat memperbarui status.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="w-full mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3">
            <h1 className="text-2xl font-semibold mb-4">{title}</h1>
            <img
              src={avatar}
              alt={title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-medium mb-2">Deskripsi</h2>
            <p className="text-gray-700 mb-4">{message}</p>
            <h2 className="text-lg font-medium mb-2">Tanggal</h2>
            <p className="text-gray-700">{date}</p>
          </div>
          <div className="md:w-1/3 md:pl-8 mt-6 md:mt-0">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Profile Pelapor</h3>
              <p className="text-gray-700">
                <strong>Nama:</strong> {name}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {email}
              </p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => updateStatus("Ditolak")}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md"
                >
                  Tolak
                </button>
                <button
                  onClick={() => updateStatus("Disetujui")}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md"
                >
                  Setuju
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Approval_Admin;
