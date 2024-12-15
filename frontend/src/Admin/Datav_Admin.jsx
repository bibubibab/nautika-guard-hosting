const Datav_Admin = ({ data }) => (
  <div className="bg-gray-100 min-h-screen flex flex-col items-center p-8 w-full">
    <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-8">
      <h1 className="text-2xl font-semibold text-gray-800">Detail Volunteer</h1>
      <p className="text-gray-600">{data.email}</p>
      <div className="mt-4">
        <p><strong>Nama:</strong> {data.name}</p>
        <p><strong>Job Role:</strong> {data.title}</p>
        <p><strong>Reason:</strong> {data.message}</p>
        <p><strong>Date:</strong> {new Date(data.date).toLocaleString()}</p>
      </div>
    </div>
  </div>
);

export default Datav_Admin;
