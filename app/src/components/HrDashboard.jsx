import React, { useState } from "react";
// ...existing code...

const initialDrivers = [
  { id: 1, name: "Charlie Driver", type: "Cab" },
  { id: 2, name: "Dana Driver", type: "Van" },
];

function HrDashboard() {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [form, setForm] = useState({ name: "", type: "Cab" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (form.name && form.type) {
      setDrivers([...drivers, { id: Date.now(), ...form }]);
      setForm({ name: "", type: "Cab" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{ padding: "2rem", background: "#f8fafc", minHeight: "100vh" }}
    >
      <motion.h2 layoutId="hr-title" style={{ color: "#2d3748" }}>
        HR Dashboard
      </motion.h2>
      <motion.form
        onSubmit={handleAdd}
        style={{ marginBottom: "2rem", display: "flex", gap: "1rem", alignItems: "center" }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <input
          type="text"
          name="name"
          placeholder="Driver Name"
          value={form.name}
          onChange={handleChange}
          style={{ padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #ccc" }}
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          style={{ padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #ccc" }}
        >
          <option value="Cab">Cab</option>
          <option value="Van">Van</option>
        </select>
        <motion.button
          whileHover={{ scale: 1.1 }}
          type="submit"
          style={{ padding: "0.7rem 1.2rem", borderRadius: "0.5rem", background: "#38a169", color: "#fff", border: "none" }}
        >
          Add Driver
        </motion.button>
      </motion.form>
      <motion.div
        style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        {drivers.map((driver) => (
          <motion.div
            key={driver.id}
            whileHover={{ scale: 1.05, boxShadow: "0 4px 20px #0002" }}
            style={{
              background: "#fff",
              borderRadius: "1rem",
              padding: "1.5rem",
              minWidth: "220px",
              boxShadow: "0 2px 8px #0001",
            }}
          >
            <h3 style={{ color: "#3182ce" }}>{driver.name}</h3>
            <p><b>Type:</b> {driver.type}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default HrDashboard;
