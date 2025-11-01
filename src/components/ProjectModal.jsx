import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import CurrencyInput from './CurrencyInput';

const ProjectModal = ({ isOpen, onClose, onSave, project }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
      setBudget(project.budget);
    } else {
      setName('');
      setDescription('');
      setBudget('');
    }
  }, [project]);

  if (!isOpen) return null;

  return (
    <Modal title={project ? 'Edit Project' : 'Add Project'} onClose={onClose}>
      <div className="mb-3">
        <label className="form-label">Project Name</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Budget</label>
        <CurrencyInput value={budget} onChange={(e) => setBudget(e.target.value)} />
      </div>
      <Button onClick={() => onSave({ name, description, budget })}>
        {project ? 'Save Changes' : 'Add Project'}
      </Button>
    </Modal>
  );
};

export default ProjectModal;
