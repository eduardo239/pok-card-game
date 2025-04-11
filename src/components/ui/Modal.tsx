// Modal.tsx
import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 ">
      <div
        ref={modalRef}
        className=" text-center text-gray-800 bg-white border border-gray-500 rounded-sm shadow-lg w-full max-w-2xl p-6 relative overflow-y-auto max-h-[80vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl hover:cursor-pointer bg-gray-200 rounded-sm w-8 h-8 flex items-center justify-center"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
