import React from "react";
import ReactDOM from "react-dom";

interface ModalBaseProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const ModalBase: React.FC<ModalBaseProps> = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div
      className="relative z-40 h-full w-full"
      aria-labelledby="dialog"
      onClick={onClose}
    >
      <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center overflow-y-auto rounded-md bg-gray-700/75">
        <div className="rounded-md bg-white p-4 shadow-lg">{children}</div>
      </div>
    </div>,
    document.body,
  );
};
