import React, { useState } from 'react';
import { useEvent } from './EventContext'; // Pastikan path sesuai dengan file EventContext

const Input_Event = () => {
    const { addEvent } = useEvent();

    const [newEvent, setNewEvent] = useState({
        image: '',
        volunteers: 0,
        tags: '',
        date: '',
        title: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedEvent = {
            ...newEvent,
            tags: newEvent.tags.split(',').map((tag) => tag.trim()),
        };
        addEvent(formattedEvent);
        alert('Event berhasil ditambahkan!');
        setNewEvent({
            image: '',
            volunteers: 0,
            tags: '',
            date: '',
            title: '',
            description: '',
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tambah Event</h2>

            <form
                onSubmit={handleSubmit}
                className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8"
            >
                <section className="flex gap-8">
                    {/* Section Foto */}
                    <div className="w-1/2">
                        <div className="flex items-center justify-center bg-gray-200 h-64 rounded-lg mb-4">
                            <input
                                type="text"
                                name="image"
                                value={newEvent.image}
                                onChange={handleChange}
                                placeholder="Masukkan URL Foto"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Deskripsi <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={newEvent.description}
                            onChange={handleChange}
                            placeholder="Masukkan Deskripsi Event"
                            className="w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none"
                            maxLength={100}
                            rows={4}
                        ></textarea>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Kegiatan <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="tags"
                            value={newEvent.tags}
                            onChange={handleChange}
                            placeholder="Masukkan Tag Kegiatan (pisahkan dengan koma)"
                            className="w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none"
                            maxLength={100}
                            rows={4}
                        ></textarea>
                    </div>

                    {/* Section Detail Event */}
                    <div className="w-1/2">
                        <input
                            type="text"
                            name="title"
                            value={newEvent.title}
                            onChange={handleChange}
                            placeholder="Masukkan Judul"
                            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="number"
                            name="volunteers"
                            value={newEvent.volunteers}
                            onChange={handleChange}
                            placeholder="Jumlah Relawan"
                            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="text"
                            name="date"
                            value={newEvent.date}
                            onChange={handleChange}
                            placeholder="Masukkan Tanggal"
                            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                        />

                        <div className="flex justify-end gap-4 mt-8">
                            <button
                                type="reset"
                                className="py-2 px-6 bg-gray-300  hover:bg-gray-400 text-gray-700 rounded-lg font-semibold"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="py-2 px-6 bg-[#00609B] hover:bg-blue-600 text-white rounded-lg font-semibold"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </section>
            </form>
        </div>
    );
};

export default Input_Event;
