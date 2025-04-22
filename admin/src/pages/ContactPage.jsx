import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactCard from '../components/ContactCard';
import '../styles/contact.css';

const ContactPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch executive members
    axios.get("http://localhost:5000/executivemembers")
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
      });

    // Fetch users with email included
    axios.get("http://localhost:5000/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Find email based on both name and contact
  const findEmailByNameAndContact = (name, contactNumber) => {
    const user = users.find(
      user =>
        user.name.toLowerCase() === name.toLowerCase() &&
        user.contact === contactNumber
    );
    return user ? user.email : 'Email not available';
  };
  

  const filteredContacts = members
    .map(member => {
      const email = findEmailByNameAndContact(member.name, member.contact_no);
      return { ...member, email };
    })
    .filter(member =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="contactPage">
      <div className="contacts-header">
        <h2>Contacts</h2>
      </div>

      <div className="contact-list">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact, index) => (
            <ContactCard
              key={index}
              name={contact.name}
              position={contact.position}
              contact={contact.contact_no}
              email={contact.email}
              flat_no={contact.flat_no}
            />
          ))
        ) : (
          <p>No contacts found.</p>
        )}
      </div>
    </div>
  );
};

export default ContactPage;