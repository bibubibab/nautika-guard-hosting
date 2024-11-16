// SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SignUp = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Navigasi ke halaman Login setelah sign-up berhasil
    navigate("/login");
  };

  const isFormValid = fullName && email && password && termsAccepted;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Form Section */}
      <div className="flex flex-col justify-center items-start w-full md:w-1/2 p-8 bg-white shadow-lg">
        <div className="mb-1">
          <img
            src="/images/nautika.png"
            alt="logo"
            className="w-[152px] h-[115px] object-cover rounded-md"
          />
        </div>
        <h2 className="text-2xl font-bold mb-2">Buat Akun Baru</h2>
        <p className="text-gray-600 mb-6">
          Silakan isi detail Anda untuk membuat akun
        </p>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap*
            </label>
            <input
              type="text"
              placeholder="Masukkan nama Anda"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat Email*
            </label>
            <input
              type="email"
              placeholder="Masukkan alamat email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kata Sandi*
            </label>
            <input
              type="password"
              placeholder="Masukkan kata sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Saya setuju dengan syarat & ketentuan
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full h-12 flex items-center justify-center ${
              isFormValid ? "bg-[#00609B] hover:bg-blue-600" : "bg-gray-400"
            } text-white rounded-md transition duration-200 px-4 text-base font-medium shadow-sm`}
          >
            Daftar
          </button>
        </form>

        <div className="mt-4 w-full">
          <p className="text-sm text-gray-600 mb-2 text-center">Atau</p>
          <button className="w-full h-12 flex items-center justify-center bg-black text-white rounded-md hover:bg-gray-800 transition duration-200 px-4 text-base font-medium shadow-sm">
            <img
              src="/images/google.png"
              alt="googleimage"
              className="h-5 w-5 mr-3"
            />
            Daftar dengan Google
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-600">
          Sudah mempunyai akun?{" "}
          <button
            onClick={() => navigate("/login")} // Arahkan ke halaman Login
            className="text-blue-500 hover:underline"
          >
            Masuk
          </button>
        </p>
      </div>

      {/* Image Section */}
      <div className="hidden md:flex w-1/2 bg-white justify-center items-center px-6 py-8 md:p-8 lg:p-12">
        <img
          src="/images/plastik.jpg"
          alt="loginimage"
          className="w-[775px] h-[px] object-cover rounded-md"
        />
      </div>
    </div>
  );
};

export default SignUp;
