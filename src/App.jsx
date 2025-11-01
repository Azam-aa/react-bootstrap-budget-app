import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

function App() {
  const [purchases, setPurchases] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [form, setForm] = useState({ item: "", amount: "", category: "" });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...purchases];
      updated[editIndex] = form;
      setPurchases(updated);
      setEditIndex(null);
    } else {
      setPurchases([...purchases, form]);
    }
    setForm({ item: "", amount: "", category: "" });
  };

  const handleEdit = (index) => {
    setForm(purchases[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setPurchases(purchases.filter((_, i) => i !== index));
  };

  const totalSpent = purchases.reduce(
    (acc, p) => acc + Number(p.amount || 0),
    0
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("💰 Budget Tracker Report", 14, 15);
    doc.autoTable({
      head: [["Item", "Category", "Amount"]],
      body: purchases.map((p) => [p.item, p.category, p.amount]),
      startY: 25,
    });
    doc.text(`Total Spent: ₹${totalSpent}`, 14, doc.autoTable.previous.finalY + 10);
    doc.save("Budget_Report.pdf");
  };

  return (
    <div
      className={`min-vh-100 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>💸 Budget Tracker</h1>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                name="item"
                placeholder="Item"
                value={form.item}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="col-md-1">
              <button type="submit" className="btn btn-primary w-100">
                {editIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </form>

        <h4>🧾 Purchase List</h4>
        {purchases.length === 0 ? (
          <p className="text-muted">No purchases added yet.</p>
        ) : (
          <table className="table table-bordered table-striped mt-3">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((p, i) => (
                <tr key={i}>
                  <td>{p.item}</td>
                  <td>{p.category}</td>
                  <td>₹{p.amount}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(i)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(i)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="d-flex justify-content-between align-items-center mt-4">
          <h5>Total Spent: ₹{totalSpent}</h5>
          <button className="btn btn-success" onClick={generatePDF}>
            📄 Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
