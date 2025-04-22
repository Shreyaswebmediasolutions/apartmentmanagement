// src/components/ContactCard.jsx
import React from 'react';
import PropTypes from 'prop-types'; // for prop validation

const ContactCard = ({ name, position, contact, email, flat_no }) => {
  return (
    <div className="contact-card">
      <h3>{name}</h3>
      <p><strong>Position:</strong> {position}</p>
      <p><strong>Contact:</strong> {contact}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Flat No:</strong> {flat_no}</p>
    </div>
  );
};

ContactCard.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  contact: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  flat_no: PropTypes.string.isRequired
};

export default ContactCard;