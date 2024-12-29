import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Automation(props) {
  const name = localStorage.getItem("username");
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLead, setSelectedLead] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordHelp, setShowPasswordHelp] = useState(false);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get("https://mira-js.onrender.com/api/lists", {
          params: { name: name },
          headers: { "Content-Type": "application/json" },
        });
        setLeads(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchLeads();
    } else {
      setError("Username not found in local storage. Please Login again");
      setLoading(false);
    }
  }, [name]);

  const handleAutomationStart = async () => {
    if (!selectedLead) {
      alert("Please select a lead to start automation.");
      return;
    }

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post("https://mira-js.onrender.com/api/automation", {
        leadId: selectedLead,
        html: props.html,
        myemail: email,
        emailpassword: password
      });
      alert(response.data.message || "Automation started successfully!");
    } catch (error) {
      alert("Failed to start automation: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="automation-container">
        <div className="automation-loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="automation-container">
      <h1 className="automation-header">Email Automation Dashboard</h1>
      
      {error && <div className="automation-error">Error: {error}</div>}
      
      {!error && leads.length > 0 && (
        <div className="automation-select-group">
          <label htmlFor="leadSelect" className="automation-label">
            Select a Lead List
          </label>
          <select
            id="leadSelect"
            value={selectedLead}
            onChange={(e) => setSelectedLead(e.target.value)}
            className="automation-select"
          >
            <option value="">Choose a lead list...</option>
            {leads.map((lead, index) => (
              <option key={index} value={lead.id}>
                {`${lead.title} (${lead.date})`}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="automation-input-group">
        <label htmlFor="emailInput" className="automation-label">
          Email Address for Gmail Account
        </label>
        <input
          id="emailInput"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="automation-input"
          placeholder="Enter your email"
        />
      </div>

      <div className="automation-input-group">
        <label htmlFor="passwordInput" className="automation-label">
          App Password
          <button 
            className="password-help-button"
            onClick={() => setShowPasswordHelp(!showPasswordHelp)}
            type="button"
          >
            ?
          </button>
        </label>
        <input
          id="passwordInput"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="automation-input"
          placeholder="Enter your app password"
        />
        
        {showPasswordHelp && (
          <div className="password-help-content">
            <h3>How to Get Your App Password (Gmail)</h3>
            <ol>
              <li>
                <strong>Enable 2-Step Verification</strong>
                <p>Go to myaccount.google.com and navigate to Security to enable 2-Step Verification</p>
              </li>
              <li>
                <strong>Generate an App Password</strong>
                <p>After enabling 2-Step Verification:</p>
                <ul>
                  <li>Go to Security - App Passwords</li>
                  <li>Choose the app (Mail) and device</li>
                  <li>Click Generate to get a 16-character password</li>
                </ul>
              </li>
              <li>
                <strong>Use the App Password</strong>
                <p>Copy the generated password and paste it here</p>
              </li>
            </ol>
          </div>
        )}
      </div>

      {!error && leads.length === 0 && (
        <div className="automation-no-leads">
          No leads available. Please add some leads to get started.
        </div>
      )}

      <button
        onClick={handleAutomationStart}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`automation-button ${isHovered ? "automation-button-hover" : ""}`}
      >
        Start Automation
      </button>
    </div>
  );
}
