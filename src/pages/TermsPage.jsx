import React, { useEffect, useState } from 'react';

const TermsAndConditions = () => {
  const [terms, setTerms] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_AUTH_API_URL}/cms`)
      .then(res => res.json())
      .then(data => {
        setTerms(data.terms || "");
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load terms and conditions.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-12 text-lg text-gray-600">Loading terms and conditions...</div>;
  if (error) return <div className="text-center py-12 text-lg text-red-600">{error}</div>;

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto text-justify">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>
      {terms ? (
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: terms }} />
      ) : (
        <div className="text-gray-500">No terms and conditions available.</div>
      )}
    </div>
  );
};

export default TermsAndConditions;
