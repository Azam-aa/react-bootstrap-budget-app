import React, { useState, useEffect } from 'react';
import ProjectModal from './components/ProjectModal';
import PurchaseModal from './components/PurchaseModal';
import Button from './components/Button';
import DarkModeToggle from './components/DarkModeToggle';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  const [projects, setProjects] = useState([]);
  const [purchases, setPurchases] = useState({});
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    const savedPurchases = JSON.parse(localStorage.getItem('purchases')) || {};
    setProjects(savedProjects);
    setPurchases(savedPurchases);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
    localStorage.setItem('purchases', JSON.stringify(purchases));
  }, [projects, purchases]);

  const handleAddProject = (data) => {
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? { ...p, ...data } : p));
    } else {
      setProjects([...projects, { id: Date.now(), ...data }]);
    }
    setIsProjectModalOpen(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (id) => {
    const newProjects = projects.filter(p => p.id !== id);
    const newPurchases = { ...purchases };
    delete newPurchases[id];
    setProjects(newProjects);
    setPurchases(newPurchases);
  };

  const handleAddPurchase = (data) => {
    const id = currentProject.id;
    const newPurchase = { id: Date.now(), ...data };
    const updated = {
      ...purchases,
      [id]: [...(purchases[id] || []), newPurchase],
    };
    setPurchases(updated);
    setIsPurchaseModalOpen(false);
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value || 0);

  // 🧾 PDF Export Function
  const handleExportPDF = async (project) => {
    const input = document.getElementById(`project-${project.id}`);
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${project.name}_Report.pdf`);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2><b>MD ALUMINIUM</b></h2>
        <div className="d-flex gap-2">
          <DarkModeToggle />
          <Button onClick={() => setIsProjectModalOpen(true)}>+ New Project</Button>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="alert alert-info text-center">No projects yet. Add one!</div>
      ) : (
        <div className="row">
          {projects.map(project => {
            const spent = (purchases[project.id] || []).reduce((a, b) => a + Number(b.amount || 0), 0);
            const remaining = project.budget - spent;
            return (
              <div key={project.id} className="col-md-6 mb-4">
                <div id={`project-${project.id}`} className="card shadow-sm p-3">
                  <div className="card-body">
                    <h5>{project.name}</h5>
                    <p>{project.description}</p>
                    <p><strong>Budget:</strong> {formatCurrency(project.budget)}</p>
                    <p><strong>Spent:</strong> {formatCurrency(spent)}</p>
                    <p><strong>Remaining:</strong> {formatCurrency(remaining)}</p>

                    <div className="d-flex gap-2 mb-2">
                      <Button variant="success" onClick={() => { setCurrentProject(project); setIsPurchaseModalOpen(true); }}>Add Purchase</Button>
                      <Button variant="secondary" onClick={() => { setEditingProject(project); setIsProjectModalOpen(true); }}>Edit</Button>
                      <Button variant="danger" onClick={() => handleDeleteProject(project.id)}>Delete</Button>
                    </div>

                    <Button variant="info" className="mt-1" onClick={() => handleExportPDF(project)}>
                      🧾 Download PDF
                    </Button>

                    <hr />
                    <h6>Purchases:</h6>
                    {(purchases[project.id] || []).length === 0 ? (
                      <p className="text-muted small">No purchases yet.</p>
                    ) : (
                      <ul className="list-group small">
                        {(purchases[project.id] || []).map(p => (
                          <li key={p.id} className="list-group-item d-flex justify-content-between">
                            <span>{p.description}</span>
                            <span>{formatCurrency(p.amount)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isProjectModalOpen && (
        <ProjectModal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          onSave={handleAddProject}
          project={editingProject}
        />
      )}

      {isPurchaseModalOpen && (
        <PurchaseModal
          isOpen={isPurchaseModalOpen}
          onClose={() => setIsPurchaseModalOpen(false)}
          onSave={handleAddPurchase}
        />
      )}

      <footer className="mt-5">Owner: Mateen</footer>
    </div>
  );
}
