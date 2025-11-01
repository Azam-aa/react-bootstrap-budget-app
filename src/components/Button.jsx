import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '' }) => (
  <button onClick={onClick} className={`btn btn-${variant} ${className}`}>
    {children}
  </button>
);

export default Button;
