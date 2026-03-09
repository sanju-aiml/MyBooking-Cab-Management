import React, { useEffect, useState } from "react";
// ...existing code...
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const fetchBookings = async () => {
  // Replace with actual API call
  return [
    {
      id: 1,
      type: "Cab",
      date: "2025-08-16",
      time: "10:00",
      location: "Central Park, NY",
      lat: 40.785091,
      lng: -73.968285,
      user: "John Doe",
    },
    {
      id: 2,
      type: "Van",
      date: "2025-08-17",
      time: "14:30",
      location: "Times Square, NY",
      lat: 40.758896,
      lng: -73.985130,
      user: "Jane Smith",
    },
  ];
};

function DriverDashboard() {
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchBookings().then(setBookings);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="driver-dashboard"
      style={{ padding: "2rem", background: "#f6f8fa", minHeight: "100vh" }}
    >
      <motion.h2 layoutId="title" style={{ color: "#2d3748" }}>
        Driver Dashboard
      </motion.h2>
      <motion.div
        className="booking-list"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.2 } },
        }}
        style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
      >
        {bookings.map((b) => (
          <motion.div
            key={b.id}
            whileHover={{ scale: 1.05, boxShadow: "0 4px 20px #0002" }}
            onClick={() => setSelected(b)}
            style={{
              background: "#fff",
              borderRadius: "1rem",
              padding: "1.5rem",
              minWidth: "250px",
              cursor: "pointer",
              boxShadow: "0 2px 8px #0001",
            }}
          >
            <h3 style={{ color: "#3182ce" }}>{b.type} Booking</h3>
            <p><b>User:</b> {b.user}</p>
            <p><b>Date:</b> {b.date}</p>
            <p><b>Time:</b> {b.time}</p>
            <p><b>Location:</b> {b.location}</p>
          </motion.div>
        ))}
      </motion.div>
      {selected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          style={{ marginTop: "2rem" }}
        >
          <h3 style={{ color: "#38a169" }}>Map Location for {selected.location}</h3>
          <MapContainer
            center={[selected.lat, selected.lng]}
            zoom={15}
            style={{ height: "300px", width: "100%", borderRadius: "1rem" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={[selected.lat, selected.lng]}>
              <Popup>
                {selected.type} booked by {selected.user} <br /> {selected.date} {selected.time}
              </Popup>
            </Marker>
          </MapContainer>
        </motion.div>
      )}
    </motion.div>
  );
}

export default DriverDashboard;
