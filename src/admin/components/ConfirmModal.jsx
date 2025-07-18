import React from "react";
import { FaTimes } from "react-icons/fa";

const ConfirmModal = ({
  isOpen,
  onCancel,
  onConfirm,
  message = "You want to proceed?",
  confirmLabel = "Confirm",
  type = "delete", // 'delete' or 'logout'
}) => {
  if (!isOpen) return null;

  // Dynamic styles based on type
  const confirmBtnClass =
    type === "delete"
      ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700"
      : "bg-gradient-to-r from-yellow-500 to-yellow-400 text-white hover:from-yellow-600 hover:to-yellow-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Modal box */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-xs p-5 z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Are you sure</h2>
          <button onClick={onCancel}>
            <FaTimes className="text-red-500 text-lg" />
          </button>
        </div>

        {/* Message */}
        <p className="text-center text-base text-gray-700 mb-5">{message}</p>

        {/* Action Buttons */}
        <div className="flex justify-between gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded-lg text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2 rounded-lg shadow text-sm ${confirmBtnClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
