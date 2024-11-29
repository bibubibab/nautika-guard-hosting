import React, { useState } from 'react';
import Status_Laporan from './Status_Laporan';

function Report_isu() {
    const [navigate, setNavigate] = useState(false);

    if (navigate) {
        return <Status_Laporan />;
    }

    return (
        <div className="w-100% p-4 bg-gray-100 rounded-lg shadow-md font-Poppins">
            <h1 className="text-xl font-semibold text-gray-800 mb-4">Sampaikan Aduan Anda</h1>

            {/* Image Upload Section */}
            <div className="bg-gray-200 h-40 rounded-lg flex flex-col items-center justify-center mb-4 p-10">
            <input
                type="file"
                accept="image/*"
                className="hidden"
                id="fileInput"
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        console.log("File selected:", file.name); // Tambahkan logika penyimpanan atau pratinjau file di sini
                    }
                }}
            />
            <label
                htmlFor="fileInput"
                className="cursor-pointer px-4 py-2 bg-[#00609B] text-white rounded hover:bg-blue-700"
            >
                Upload Bukti
            </label>
            <p className="text-center text-gray-600 mt-2">Laporkan Pengaduan Anda, Kami Siap Dengar</p>
        </div>


            {/* Form Section */}
            <div className='pt-10'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-sm p-10 rounded-lg">
                    <div>
                        <label className="block text-gray-600 mb-1">Nama Lengkap</label>
                        <input
                            type="text"
                            placeholder="Galih"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-1">No. Hp</label>
                        <input
                            type="text"
                            placeholder="+6285155225048"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-1">Judul Laporan</label>
                        <input
                            type="text"
                            placeholder="Pencemaran Sungai Brantas"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-1">Lokasi</label>
                        <input
                            type="text"
                            placeholder="Sungai Brantas"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-gray-600 mb-1">Deskripsi Laporan</label>
                        <textarea
                            placeholder="Adanya sampah dari pabrik yang membuat air sungai jadi bau..."
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-gray-600 mb-1">Harapan Pelapor</label>
                        <textarea
                            placeholder="Saya memiliki harapan besar agar sungai ini segera ditangani..."
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                        />
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="text-right mt-4">
                <button
                    onClick={() => setNavigate(true)}
                    className="px-6 py-2 bg-[#00609B] text-white rounded-lg hover:bg-blue-700"
                >
                    Kirim Laporan
                </button>
            </div>
        </div>
    );
}

export default Report_isu;
