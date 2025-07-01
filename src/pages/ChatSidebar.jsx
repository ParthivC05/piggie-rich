import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const ChatSidebar = ({ onClose }) => {
  const [step, setStep] = useState(1); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-[#1da1f2] text-white shadow-lg z-50 flex flex-col justify-between">
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="text-white text-xl">
          <FaTimes />
        </button>
      </div>

      <div className="px-6 pb-4 flex-grow">
        {step === 1 ? (
          <>
            <p className="mb-4 text-lg italic">Hi! How can we help you?</p>
            <div
              className="bg-white text-black p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition"
              onClick={() => setStep(2)}
            >
              <div className="font-semibold">Start Chat</div>
              <div className="text-sm italic text-gray-500">
                We typically reply in a few minutes
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="mb-3 text-sm text-center text-white">
              Please provide your name and email.*
            </p>
            <div className="bg-white text-black p-4 rounded-lg shadow space-y-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full hover:cursor-pointer"
                onClick={() => alert(`Starting chat with ${name}, ${email}`)}
              >
                ➤ Start Chat
              </button>
            </div>
          </>
        )}
      </div>

      <div className="bg-white text-center text-gray-700 text-sm py-2">
        Welcome to Piggie Rich
      </div>
    </div>
  );
};

export default ChatSidebar;
