import React, { useState } from 'react';
import Datav_Admin from './Datav_Admin';
import Approval_Admin from './Approval_Admin';

const notifications = [
    {
        id: 1,
        type: 'Volunteer Registration',
        volunteerId: 1, // Tambahkan ID unik untuk tiap notifikasi
        name: 'Galih Raditya',
        email: 'Galihraditya@gmail.com',
        title: 'Pencemaran Sungai Brantas',
        message: 'Saya ingin melaporkan kondisi Sungai Brantas di Gresik ...',
        date: '28 Juni 2024',
        avatar: 'https://via.placeholder.com/80',
    },
    // Notifikasi lainnya...
];

const NotificationItem = ({ notification, onClick }) => (
    <div
        onClick={() => onClick(notification.type, notification.volunteerId)} // Kirim volunteerId saat diklik
        className="flex items-start bg-white p-4 shadow-md rounded-lg mb-4 cursor-pointer"
    >
        <div className="mr-4">
            <span className="block w-4 h-4 bg-red-500 rounded-full mt-2"></span>
        </div>
        <div className="flex-shrink-0">
            <img
                className="w-12 h-12 rounded-full"
                src={notification.avatar}
                alt="Avatar"
            />
        </div>
        <div className="flex-grow pl-4">
            <div className="flex justify-between">
                <div>
                    <h4 className="text-gray-800 font-semibold">{notification.name}</h4>
                    <p className="text-gray-500 text-sm">{notification.email}</p>
                </div>
                <p className="text-gray-400 text-sm">{notification.date}</p>
            </div>
            <h5 className="text-blue-600 font-medium mt-2">{notification.title}</h5>
            <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
        </div>
    </div>
);

const Notification_Admin = () => {
    const [activeComponent, setActiveComponent] = useState(null);
    const [selectedVolunteerId, setSelectedVolunteerId] = useState(null); // Simpan volunteerId yang dipilih

    const handleNotificationClick = (type, volunteerId) => {
        if (type === 'Issue Report') {
            setActiveComponent('Input_Event');
        } else if (type === 'Donation' || type === 'Volunteer Registration') {
            setSelectedVolunteerId(volunteerId); // Set volunteerId yang dipilih
            setActiveComponent('Datav_Admin');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Notifikasi</h2>
            {activeComponent === null ? (
                <div className="space-y-6">
                    {notifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onClick={handleNotificationClick}
                        />
                    ))}
                </div>
            ) : activeComponent === 'Input_Event' ? (
                <Approval_Admin/>
            ) : (
                <Datav_Admin volunteerId={selectedVolunteerId} /> // Kirim volunteerId ke Datav_Admin
            )}
        </div>
    );
};

export default Notification_Admin;
