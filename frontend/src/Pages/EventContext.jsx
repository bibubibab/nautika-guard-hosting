import React, { createContext, useContext, useState } from 'react';

// Membuat konteks baru
const EventContext = createContext();

// Membuat provider untuk membungkus komponen aplikasi
export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);

    // Fungsi untuk menambahkan event baru
    const addEvent = (event) => {
        setEvents((prevEvents) => [...prevEvents, event]);
    };

    // Nilai yang dibagikan melalui context
    const value = {
        events,
        addEvent,
    };

    return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

// Custom hook untuk menggunakan EventContext
export const useEvent = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEvent harus digunakan dalam EventProvider');
    }
    return context;
};
