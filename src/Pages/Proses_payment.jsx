import React, { useState } from "react";
import Qrpayment from "./Qrpayment"; // Tambahkan import untuk halaman Qrpayment

function Proses_payment({ donationAmount }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [donation, setDonation] = useState(donationAmount); // Memulai dengan nilai donasi yang diterima
    const [redirect, setRedirect] = useState(false);

    // Fungsi submit untuk validasi dan redirect
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email && phone && donation) {
            setRedirect(true);
        }
    };

    // Redirect ke halaman Qrpayment jika form valid
    if (redirect) {
        return <Qrpayment />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-3xl flex">
                <div className="p-8 w-1/2">
                    <h2 className="text-xl font-semibold mb-6">Lengkapi Identitas Anda</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Nama Donatur:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Masukkan nama anda"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email Donatur:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Masukkan email anda"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-" htmlFor="phone">Nomor Telepon:</label>
                            <div className="flex">
                                <select className="px-1 py-2 border border-gray-300 rounded-l-lg bg-gray-100 focus:outline-none">
                                    <option value="+62">+62</option>
                                    {/* Tambahkan opsi lain jika diperlukan */}
                                </select>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Masukkan Nomor Telepon anda"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring focus:ring-blue-200"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="donation">Donasi Anda</label>
                            <input
                                type="text"
                                id="donation"
                                value={donation}
                                onChange={(e) => setDonation(e.target.value)}
                                placeholder="Masukan Nominal"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="hide" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"/>
                            <label htmlFor="hide" className="ml-2 text-gray-700">Sembunyikan</label>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#00609B] text-white font-semibold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
                        >
                            Kontribusi Donasi
                        </button>
                    </form>
                </div>
                <div className="p-8 w-1/2 flex items-center justify-center">
                    <img src="/images/proses.jpg" alt="Donate" className="rounded-lg" />
                </div>
            </div>
        </div>
    );
}

export default Proses_payment;
