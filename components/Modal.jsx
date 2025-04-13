'use client';
import { useEffect } from 'react';

export default function Modal({ children, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        {children}
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
}