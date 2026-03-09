import React, { useState } from "react";
// ...existing code...

const initialHRs = [
  { id: 1, name: "Alice HR", email: "alice.hr@example.com" },
  { id: 2, name: "Bob HR", email: "bob.hr@example.com" },
];

function AdminDashboard() {
  const [hrs, setHrs] = useState(initialHRs);
  const [form, setForm] = useState({ name: "", email: "" });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (form.name && form.email) {
      setHrs([...hrs, { id: Date.now(), ...form }]);
      setForm({ name: "", email: "" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{ padding: "2rem", background: "#f0f4f8", minHeight: "100vh" }}
    >
      <motion.h2 layoutId="admin-title" style={{ color: "#2d3748" }}>
        Admin Dashboard
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
          placeholder="HR Name"
          value={form.name}
          onChange={handleChange}
          style={{ padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #ccc" }}
        />
        <input
          type="email"
          name="email"
          placeholder="HR Email"
          value={form.email}
          onChange={handleChange}
          style={{ padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #ccc" }}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          type="submit"
          style={{ padding: "0.7rem 1.2rem", borderRadius: "0.5rem", background: "#3182ce", color: "#fff", border: "none" }}
        >
          Add HR
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
        {hrs.map((hr) => (
          <motion.div
            key={hr.id}
            whileHover={{ scale: 1.05, boxShadow: "0 4px 20px #0002" }}
            style={{
              background: "#fff",
              borderRadius: "1rem",
              padding: "1.5rem",
              minWidth: "220px",
              boxShadow: "0 2px 8px #0001",
            }}
          >
            <h3 style={{ color: "#38a169" }}>{hr.name}</h3>
            <p><b>Email:</b> {hr.email}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default AdminDashboard;
