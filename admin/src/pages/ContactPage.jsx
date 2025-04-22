// src/components/ContactPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactCard from '../components/ContactCards';
import Header from './Header';
import '../styles/contact.css';

const ContactPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState([]);

  // Fetch members from the backend
  useEffect(() => {
    axios
      .get("http://147.93.31.45:5001/executivemembers") // Make sure your backend is running on this URL
      .then((response) => {
        console.log("Fetched members:", response.data);
        setMembers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
      });
  }, []);

  // Filter members by name
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="contactPage">
      <Header onSearch={setSearchQuery} />
      <div className="contact-list">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member, index) => (
            <ContactCard key={index} {...member} />
          ))
        ) : (
          <p>No contacts found.</p>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
