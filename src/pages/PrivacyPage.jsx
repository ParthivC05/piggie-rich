import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="px-4 py-8 max-w-4xl mx-auto text-justify">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

      <p>
        This Privacy Policy outlines how we collect, use, and protect your personal data.
        By using our website, you agree to the terms in this policy.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc ml-5">
        <li>Full name</li>
        <li>Email address</li>
        <li>Date of birth</li>
        <li>Username and password</li>
        <li>Phone number</li>
        <li>IP address and browser details</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Data</h2>
      <ul className="list-disc ml-5">
        <li>To register and manage your account</li>
        <li>To personalize your experience</li>
        <li>To improve customer service</li>
        <li>To process payments and transactions</li>
        <li>To prevent fraud and abuse</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Sharing Information</h2>
      <p>
        We may share your data with trusted third-party partners who assist in operating our website, conducting
        business, or servicing you. Data is also shared if required by law.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Cookies</h2>
      <p>
        We use cookies to enhance your browsing experience and gather anonymous analytics data. You can disable
        cookies in your browser settings.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <ul className="list-disc ml-5">
        <li>Right to access and correct your data</li>
        <li>Right to delete your data</li>
        <li>Right to withdraw consent</li>
        <li>Right to opt-out of marketing communications</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Data Retention</h2>
      <p>
        We retain your data as long as necessary to fulfill legal, accounting, or reporting requirements.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to Privacy Policy</h2>
      <p>
        We may update this Privacy Policy periodically. Any changes will be posted on this page with a revised
        effective date.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
