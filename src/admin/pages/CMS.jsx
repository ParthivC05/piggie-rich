import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

const CMS = () => {
  const [privacy, setPrivacy] = useState("");
  const [terms, setTerms] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/cms`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setPrivacy(data.privacy || "");
        setTerms(data.terms || "");
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
  };

  return (
    <AdminLayout>
      <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-6 mb-8 shadow-inner">
        <h1 className="text-3xl font-extrabold text-purple-800">CMS Management</h1>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="font-bold mb-2 text-lg text-gray-700">Privacy Policy</h2>
          <textarea
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            rows={8}
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            placeholder="Write your Privacy Policy here..."
          />
        </div>

        <div>
          <h2 className="font-bold mb-2 text-lg text-gray-700">Terms & Conditions</h2>
          <textarea
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            rows={8}
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            placeholder="Write your Terms & Conditions here..."
          />
        </div>

        <div className="flex justify-end">
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition shadow-md"
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
