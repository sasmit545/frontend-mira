import React, { useState } from "react";
import Automation from "./automation";
import Header from "./header";
const Alert = ({ children }) => (
  <div className="alert error">{children}</div>
);

const EmailTemplate = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productOffer: "",
    companyName: "",
    productLink: "",
    companyLogo: "",
    ctaText: "",
    campaignTheme: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedHtml, setGeneratedHtml] = useState(`
    <div style="width: 100%; max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #4CAF50; color: #fff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">Welcome to Our Product {{first_name}} !</h1>
      </div>
      <div style="padding: 20px; background: #fff; border-radius: 0 0 8px 8px;">
        <h2>Hello, {{first_name}} </h2>
        <p>We’re excited to introduce you to our latest product, <strong>[Product Name]</strong>. This innovative solution is designed to make your life easier and more efficient.</p>
        <p>Don’t miss our exclusive offer: <strong>[Product Offer]</strong>.</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="[Product Link]" target="_blank" style="display: inline-block; text-decoration: none; background-color: #4CAF50; color: #fff; padding: 10px 20px; border-radius: 4px;">Learn More</a>
        </div>
      </div>
      <div style="text-align: center; font-size: 12px; color: #666; margin-top: 20px;">
        <p>&copy; [Company Name] 2024. All Rights Reserved.</p>
      </div>
    </div>
  `);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://mira-backend-4io9.onrender.com/api/generate-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate email template");
      }

      const data = await response.json();
      setGeneratedHtml(data.html);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >
      <Header />
    <div className="email-campaign-container">
    {/* Form Section */}
    <div className="email-form-section">
      <h2>Create Your Email Campaign</h2>
      <form onSubmit={handleSubmit} className="email-form">
        {Object.keys(formData).map((field) => (
          <div key={field} className="email-form-group">
            <label htmlFor={field}>
              {field
                .replace(/([A-Z])/g, " $1")
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
              :
            </label>
            {field === "productDescription" ? (
              <textarea
                id={field}
                value={formData[field]}
                onChange={handleChange}
                required
                rows={4}
              />
            ) : (
              <input
                type="text"
                id={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="email-submit-button"
        >
          {loading ? "Generating..." : "Generate Email Template"}
        </button>
      </form>
      {error && <Alert>{error}</Alert>}
    </div>
  
    {/* Preview Section */}
    <div className="email-preview-section">
      <h2>Generated Email Preview</h2>
      {generatedHtml ? (
        <div
          className="email-preview-content"
          dangerouslySetInnerHTML={{
            __html: generatedHtml,
          }}
        />
      ) : (
        <p className="email-placeholder">Generated email will appear here</p>
      )}
    </div>
  
    {/* Automation Component */}
  
  </div>
    <Automation html={generatedHtml} />
  </div>
  );
};

export default EmailTemplate;
