import React, { useState, useEffect } from "react";
import axios from "axios";
import Approval_Admin from "./Approval_Admin";

const NotificationItem = ({ notification, onClick }) => (
  <div
    onClick={() => onClick(notification)}
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
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:3001/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification); // Simpan data notifikasi yang dipilih
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Notifikasi</h2>
      {selectedNotification === null ? (
        <div className="space-y-6">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClick={handleNotificationClick}
            />
          ))}
        </div>
      ) : (
        <Approval_Admin notification={selectedNotification} />
      )}
    </div>
  );
};

export default Notification_Admin;
