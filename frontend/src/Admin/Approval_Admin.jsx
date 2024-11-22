import React, { useState, } from 'react';

    const Approval_Admin = () => {
    const [report, setReport] = useState({
        title: "Pencemaran Sungai Brantas",
        description: "Saya ingin melaporkan kondisi Sungai Brantas di Gresik yang terlihat mengalami pencemaran. Air sungai tampak keruh, berbau tidak sedap, dan ditemukan sampah yang menumpuk di beberapa titik aliran sungai. Hal ini mengkhawatirkan, karena kondisi ini berdampak pada lingkungan sekitar dan kesehatan warga. Mohon segera ditindaklanjuti agar kualitas air di Sungai Brantas dapat kembali baik.",
        hope: "Harapan saya, laporan ini dapat segera ditindaklanjuti oleh pihak berwenang untuk melakukan pembersihan dan penanganan limbah di Sungai Brantas. Saya berharap ada upaya berkelanjutan untuk menjaga kelestarian lingkungan sungai ini agar dapat kembali bersih dan sehat, serta terhindar dari pencemaran di masa mendatang. Semoga kolaborasi antara pemerintah, masyarakat, dan organisasi terkait bisa terjalin untuk menjaga kualitas air Sungai Brantas demi keberlangsungan ekosistem dan kesehatan warga sekitar.",
        reporter: {
        email: "galihraditya@gmail.com",
        location: "Gresik",
        address: "Jl. Raya Brantas, Pedukuhan, Kebomas, Kec. Kebomas, Kabupaten Gresik, Jawa Timur 61121",
        phone: "+6285155225048"
        }
    });

    return (
        <div className="min-h-screen bg-gray-100 p-5">
        <div className="w-full mx-auto bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3">
                <h1 className="text-2xl font-semibold mb-4">{report.title}</h1>
                <img
                src="images/event5.jpg"
                alt="Sungai Brantas"
                className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h2 className="text-lg font-medium mb-2">Deskripsi</h2>
                <p className="text-gray-700 mb-4">{report.description}</p>
                <h2 className="text-lg font-medium mb-2">Harapan Pelapor</h2>
                <p className="text-gray-700">{report.hope}</p>
            </div>
            <div className="md:w-1/3 md:pl-8 mt-6 md:mt-0">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Profile Pelapor</h3>
                <p className="text-gray-700"><strong>Email:</strong> {report.reporter.email}</p>
                <p className="text-gray-700"><strong>Lokasi:</strong> {report.reporter.location}</p>
                <p className="text-gray-700"><strong>Alamat:</strong> {report.reporter.address}</p>
                <p className="text-gray-700"><strong>Telepon:</strong> {report.reporter.phone}</p>
                <div className="mt-4 flex space-x-2">
                    <button className="bg-[#00609B] text-white px-4 py-2 rounded-lg shadow-md">Tolak</button>
                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md">Setuju</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };

export default Approval_Admin;
