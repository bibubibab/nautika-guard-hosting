import React, { useState, useEffect } from "react";
import axios from "axios";

const Status_Laporan = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:3001/reports");
      setReports(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Gagal mengambil data laporan:", error);
      setError("Gagal mengambil data laporan. Silakan coba lagi nanti.");
    }
  };

  useEffect(() => {
    fetchReports();

    // Optional: Polling every 10 seconds
    const interval = setInterval(fetchReports, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Status Laporan Anda</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold">{report.title}</h2>
            <p className="text-gray-600">Lokasi: {report.location}</p>
            <p className="text-gray-600">Tanggal: {report.date}</p>
            <p className={`text-sm font-medium mt-2 ${report.status === "Disetujui" ? "text-green-500" : report.status === "Ditolak" ? "text-red-500" : "text-gray-500"}`}>
              Status: {report.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Status_Laporan;
