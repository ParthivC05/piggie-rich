import React, { useEffect, useState } from 'react';

const PrivacyPolicy = () => {
  const [privacy, setPrivacy] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_AUTH_API_URL}/cms`)
      .then(res => res.json())
      .then(data => {
        setPrivacy(data.privacy || "");
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load privacy policy.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-12 text-lg text-gray-600">Loading privacy policy...</div>;
  if (error) return <div className="text-center py-12 text-lg text-red-600">{error}</div>;

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto text-justify">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      {privacy ? (
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: privacy }} />
      ) : (
        <div className="text-gray-500">No privacy policy available.</div>
      )}
    </div>
  );
};

export default PrivacyPolicy;
