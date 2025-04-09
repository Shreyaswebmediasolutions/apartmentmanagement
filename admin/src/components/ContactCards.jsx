// src/components/ContactCard.jsx

import React from 'react';

const ContactCard = ({ name, contact_no, position }) => {
  return (
    <div className="contact-card">
      <h3>{name}</h3>
      <p>Positions: {position}</p>
      <p>Phone: {contact_no}</p>
    </div>
  );
};

export default ContactCard;
