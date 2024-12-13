import React, { useState } from "react";
import axios from "axios";
import Status_Laporan from "./Status_Laporan";

function Report_isu() {
  const [navigate, setNavigate] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    title: "",
    location: "",
    description: "",
    expectation: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // Function to submit the report
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      return alert("Silakan pilih file foto.");
    }

    const data = new FormData();
    data.append("photo", file);
    data.append("full_name", formData.full_name);
    data.append("phone", formData.phone);
    data.append("title", formData.title);
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("expectation", formData.expectation);

    try {
      // Mengirim data ke backend
      const response = await axios.post("http://localhost:3001/report_issue", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert(response.data.message);
        setNavigate(true); // Mengarahkan ke halaman Status Laporan
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat mengirim laporan.");
    }
  };

  if (navigate) {
    return <Status_Laporan />;
  }

  return (
    <div className="w-100% p-4 bg-gray-100 rounded-lg shadow-md font-Poppins">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Sampaikan Aduan Anda</h1>

      {/* Image Upload Section */}
    <div className="bg-gray-200 h-75 rounded-lg flex flex-col items-center justify-center mb-4 p-10">
        <input
        type="file"
        accept="image/*"
        className="hidden"
        id="fileInput"
        onChange={handleFileChange}
        />
        <label
        htmlFor="fileInput"
        className="cursor-pointer px-4 py-2 bg-[#00609B] text-white rounded hover:bg-blue-700"
        >
        Upload Bukti
        </label>

        {/* Display file name or preview */}
        {file && (
            <div className="mt-2 text-center text-gray-700">
            <p>{file.name}</p>
            {/* Tampilkan pratinjau gambar jika file adalah gambar */}
            <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="mt-2 mx-auto"
            style={{
                maxWidth: "100%",   // Menyesuaikan dengan lebar kontainer
                maxHeight: "200px", // Membatasi tinggi gambar agar tidak terlalu besar
                objectFit: "contain"
            }} // Memastikan gambar tetap proporsional
            />
          </div>
        )}

        <p className="text-center text-gray-600 mt-2">Laporkan Pengaduan Anda, Kami Siap Dengar</p>
      </div>

      {/* Form Section */}
      <div className="pt-10">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-sm p-10 rounded-lg">
            <div>
              <label className="block text-gray-600 mb-1">Nama Lengkap</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Galih"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">No. Hp</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+6285155225048"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Judul Laporan</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Pencemaran Sungai Brantas"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Lokasi</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Sungai Brantas"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-600 mb-1">Deskripsi Laporan</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Adanya sampah dari pabrik yang membuat air sungai jadi bau..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-600 mb-1">Harapan Pelapor</label>
              <textarea
                name="expectation"
                value={formData.expectation}
                onChange={handleChange}
                placeholder="Saya memiliki harapan besar agar sungai ini segera ditangani..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-right mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-[#00609B] text-white rounded-lg hover:bg-blue-700"
            >
              Kirim Laporan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Report_isu;
