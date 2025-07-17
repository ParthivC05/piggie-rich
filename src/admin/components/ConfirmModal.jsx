import React from "react";
import { FaTimes } from "react-icons/fa";

const ConfirmModal = ({
  isOpen,
  onCancel,
  onConfirm,
  message = "Do you want to proceed?",
  confirmLabel = "Confirm",
  type = "delete",
}) => {
  if (!isOpen) return null;

  const confirmBtnClass =
    type === "delete"
      ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700"
      : "bg-gradient-to-r from-yellow-500 to-yellow-400 text-white hover:from-yellow-600 hover:to-yellow-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-60">
      <div className="relative w-[90%] max-w-[430px] bg-white rounded-2xl shadow-xl p-5 my-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Are you sure?</h2>
          <button
            onClick={onCancel}
            className="text-red-500 hover:text-red-700"
          >
            <FaTimes />
          </button>
        </div>

        {/* Message */}
        <p className="text-center text-gray-700 mb-6">{message}</p>

        {/* Buttons */}
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
