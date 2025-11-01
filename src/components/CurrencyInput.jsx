import React from 'react';
import Input from './Input';

const CurrencyInput = ({ value, onChange }) => (
  <div className="input-group">
    <span className="input-group-text">₹</span>
    <Input type="number" value={value} onChange={onChange} placeholder="0.00" />
  </div>
);

export default CurrencyInput;
