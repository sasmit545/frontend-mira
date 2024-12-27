import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./header";

export default function LeadDetail() {
  const { id } = useParams(); // Get the lead ID from the URL
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeadDetails = async () => {
      try {
        const response = await axios.get(`https://mira-js.onrender.com/api/lists/lead/${id}`);
        setLead(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeadDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <h1 className="heading">Lead Details</h1>
      <h3>{lead.title}</h3>
      <p>Date: {lead.date}</p>
      <p>Name: {lead.name}</p>

      <h4>Lead Data:</h4>
      <table className="table">
        <thead>
          <tr className="table-header">
            <th className="th-td">First Name</th>
            <th className="th-td">Last Name</th>
            <th className="th-td">Email</th>
          </tr>
        </thead>
        <tbody>
          {lead.data.map((entry, index) => (
            <tr key={index}>
              <td className="th-td">{entry.first_name}</td>
              <td className="th-td">{entry.last_name}</td>
              <td className="th-td">{entry.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
