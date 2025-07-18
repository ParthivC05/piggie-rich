import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

const CMS = () => {
  const [privacy, setPrivacy] = useState("");
  const [terms, setTerms] = useState("");
  const [initialPrivacy, setInitialPrivacy] = useState("");
  const [initialTerms, setInitialTerms] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/cms`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setPrivacy(data.privacy || "");
        setTerms(data.terms || "");
        setInitialPrivacy(data.privacy || "");
        setInitialTerms(data.terms || "");
      });
  }, []);

  const handleSave = async () => {
    await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/cms`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ privacy, terms }),
    });
    alert("Content updated!");
    // update initial values after save
    setInitialPrivacy(privacy);
    setInitialTerms(terms);
  };

  const handleCancel = () => {
    setPrivacy(initialPrivacy);
    setTerms(initialTerms);
  };

  return (
    <AdminLayout>
      <div className="sm:p-6 bg-white rounded-xl shadow-md">
        <div className="mb-6">
          <label className="block font-semibold text-gray-800 mb-2">
            Privacy Policy
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-yellow-400 resize-none"
            rows={8}
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            placeholder="Write your Privacy Policy here..."
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold text-gray-800 mb-2">
            Terms & Conditions
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-yellow-400 resize-none"
            rows={8}
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            placeholder="Write your Terms & Conditions here..."
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-black px-6 py-2 rounded-md"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-md"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CMS;
