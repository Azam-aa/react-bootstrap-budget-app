import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import CurrencyInput from './CurrencyInput';

const PurchaseModal = ({ isOpen, onClose, onSave, purchase }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (purchase) {
      setDescription(purchase.description);
      setAmount(purchase.amount);
    } else {
      setDescription('');
      setAmount('');
    }
  }, [purchase]);

  if (!isOpen) return null;

  return (
    <Modal title={purchase ? 'Edit Purchase' : 'Add Purchase'} onClose={onClose}>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Amount</label>
        <CurrencyInput value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <Button onClick={() => onSave({ description, amount })}>
        {purchase ? 'Save Changes' : 'Add Purchase'}
      </Button>
    </Modal>
  );
};

export default PurchaseModal;
