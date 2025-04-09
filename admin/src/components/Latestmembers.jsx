import React, { useEffect, useState } from "react";
import axios from "axios";

const LatestMembersByPosition = () => {
  const [latestMembers, setLatestMembers] = useState([]);
  const [viewedMembers, setViewedMembers] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");

  // Fetch the latest member per position
  useEffect(() => {
    axios.get("http://localhost:5000/executivemembers/latest-per-position")
      .then((response) => {
        setLatestMembers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching latest members per position:", error);
      });
  }, []);

  // Function to fetch members by position
  const handleView = (position) => {
    setSelectedPosition(position);
    axios.get(`http://localhost:5000/executivemembers/position/${position}`)
      .then((response) => {
        setViewedMembers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching members by position:", error);
      });
  };

  return (
    <div>
      <h2>Latest Executive Members by Position</h2>
      {latestMembers.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Flat No</th>
              <th>Name</th>
              <th>Position</th>
              <th>Contact No</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {latestMembers.map((member, index) => (
              <tr key={index}>
                <td>{member.flat_no}</td>
                <td>{member.name}</td>
                <td>{member.position}</td>
                <td>{member.contact_no}</td>
                <td>{new Date(member.created_at).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleView(member.position)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No members found.</p>
      )}

      {/* Show all members of the selected position */}
      {viewedMembers.length > 0 && (
        <div>
          <h3>All Members for Position: {selectedPosition}</h3>
          <table border="1">
            <thead>
              <tr>
                <th>Flat No</th>
                <th>Name</th>
                <th>Contact No</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {viewedMembers.map((member, index) => (
                <tr key={index}>
                  <td>{member.flat_no}</td>
                  <td>{member.name}</td>
                  <td>{member.contact_no}</td>
                  <td>{new Date(member.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LatestMembersByPosition;
