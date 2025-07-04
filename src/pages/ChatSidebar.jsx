import React, { useState } from "react";
import { FaTimes, FaComments } from "react-icons/fa";

const ChatSidebar = ({ onClose }) => {
  const [step, setStep] = useState(1); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50 flex flex-col">
      <div className="bg-[#1da1f2] text-white p-3 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FaComments className="text-lg" />
          <span className="font-semibold">Live Chat</span>
        </div>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <FaTimes />
        </button>
      </div>

        <div className="flex-grow p-4 overflow-y-auto">
        {step === 1 ? (
          <>
            <p className="mb-4 text-gray-700 text-sm">Hi! How can we help you?</p>
            <div
              className="bg-gray-50 border border-gray-200 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition"
              onClick={() => setStep(2)}
            >
              <div className="font-semibold text-gray-800">Start Chat</div>
              <div className="text-xs text-gray-500 mt-1">
                We typically reply in a few minutes
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="mb-3 text-sm text-gray-600 text-center">
              Please provide your name and email.*
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <button
                className="bg-[#1da1f2] hover:bg-blue-600 text-white font-medium py-2 px-4 rounded w-full text-sm transition"
                onClick={() => alert(`Starting chat with ${name}, ${email}`)}
              >
                ➤ Start Chat
              </button>
            </div>
          </>
        )}
      </div>

      <div className="bg-gray-50 text-center text-gray-500 text-xs py-2 rounded-b-lg border-t">
        Welcome to Waiwaisweeps
      </div>
    </div>
  );
};

export default ChatSidebar;
