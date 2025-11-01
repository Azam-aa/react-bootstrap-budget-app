import React from 'react';
import Button from './Button';

const Modal = ({ title, children, onClose }) => (
  <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  </div>
);

export default Modal;
