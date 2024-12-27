import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import CsvUploader from "./upload";
import axios from "axios";
import Header from "./header";
export default function List() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const name = localStorage.getItem("username");

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

    fetchLeads();
  }, [name]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <h1>Leads List</h1>
      <CsvUploader />
      <div className="lead-list">
        {leads.length > 0 ? (
          leads.map((lead) => (
            <div key={lead.id} className="lead-item">
              <Link to={`/lead/${lead.id}`} style={{ textDecoration: "none" }}>
                <h3>{lead.title}</h3>
                <h4>Date: {lead.date}</h4>
                <p >Open ....</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No leads found</p>
        )}
      </div>
    </div>
  );
}
