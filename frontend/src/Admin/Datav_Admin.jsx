import React, { useState } from "react";

    function Datav_Admin() {
    // State for form fields
    const [firstName, setFirstName] = useState("Galih");
    const [lastName, setLastName] = useState("Raditya");
    const [email, setEmail] = useState("galihraditya@gmail.com");
    const [phone, setPhone] = useState("+6285155225048");
    const [jobSection, setJobSection] = useState("Pembersihan");
    const [interestReason, setInterestReason] = useState(
        "Karena saya sangat tertarik dengan ekosistem perairan, dan saya ingin ekosistem perairan di Indonesia bebas dari perlimbahan dan dapat digunakan oleh warga sekitar dengan aman"
    );
    const [suitabilityReason, setSuitabilityReason] = useState(
        "Karena saya telah berpengalaman dalam berbagai kegiatan relawan terutama di sektor lingkungan. saya yakin saya akan sangat membantu di kegiatan ini."
    );

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center p-8 w-full">
        {/* Main Form */}
        <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-8">
            {/* Profile Details */}
            <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Profile Relawan</h1>
            <p className="text-gray-600">{email}</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
            {/* Name Section */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="text-gray-600 font-medium">Nama Depan :</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border rounded-md text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                />
                </div>
                <div>
                <label className="text-gray-600 font-medium">Nama Belakang :</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border rounded-md text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                />
                </div>
            </div>

            {/* Reason for Interest */}
            <div>
                <label className="text-gray-600 font-medium">Mengapa Anda tertarik untuk menjadi relawan pada aktivitas ini?</label>
                <textarea
                value={interestReason}
                onChange={(e) => setInterestReason(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-md text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                />
            </div>

            {/* Reason for Suitability */}
            <div>
                <label className="text-gray-600 font-medium">Mengapa anda adalah relawan yang tepat untuk aktivitas ini?</label>
                <textarea
                value={suitabilityReason}
                onChange={(e) => setSuitabilityReason(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-md text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                />
            </div>

            {/* Job Section and Contact Info */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="text-gray-600 font-medium">Bagian Pekerjaan apa :</label>
                <input
                    type="text"
                    value={jobSection}
                    onChange={(e) => setJobSection(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border rounded-md text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                />
                </div>
                <div>
                <label className="text-gray-600 font-medium">No Hp :</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border rounded-md text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                />
                </div>
                <div className="col-span-2">
                <label className="text-gray-600 font-medium">Email :</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border rounded-md text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                />
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    }

export default Datav_Admin;
