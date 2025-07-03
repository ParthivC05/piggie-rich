import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

const CMS = () => {
  const [privacy, setPrivacy] = useState("");
  const [terms, setTerms] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/cms`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setPrivacy(data.privacy || "");
        setTerms(data.terms || "");
      });
  }, []);

  const handleSave = async () => {
    await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/cms`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ privacy, terms }),
    });
    alert("Content updated!");
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">CMS</h1>
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Privacy Policy</h2>
        <textarea className="w-full border p-2 mb-4" rows={8} value={privacy} onChange={e => setPrivacy(e.target.value)} />
      </div>
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Terms & Conditions</h2>
        <textarea className="w-full border p-2 mb-4" rows={8} value={terms} onChange={e => setTerms(e.target.value)} />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
    </AdminLayout>
  );
};

export default CMS;