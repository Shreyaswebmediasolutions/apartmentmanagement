import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PaymentPage.css';

const categories = ['corpus', 'maintenance', 'others'];
const paymentMethods = ['Card', 'Cash', 'UPI'];

const PaymentPage = () => {
  const [paymentData, setPaymentData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [formCategory, setFormCategory] = useState('corpus');
  const [reason, setReason] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formMethod, setFormMethod] = useState('Card');

  useEffect(() => {
    fetchAllCategoryData();
    const now = new Date().toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
    setDateTime(now);
  }, []);

  const fetchAllCategoryData = async () => {
    try {
      const result = {};
      for (const cat of categories) {
        const res = await axios.get(`/api/payment-info?category=${cat}`);
        result[cat] = res.data || { amount: 0, outstanding: 0, history: [] };
      }
      setPaymentData(result);
    } catch (err) {
      console.error('Failed to fetch payment info:', err);
    }
  };

  const handleAdd = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      paymentType: formMethod,
      category: formCategory,
      reason: formCategory === 'others' ? reason : null,
      amount: formAmount,
      dateTime,
    };

    try {
      const response = await axios.post('/api/save-payment', data);

      if (response.status === 200) {
        alert('Payment added successfully!');
        setShowForm(false);
        fetchAllCategoryData();
      }
    } catch (err) {
      console.error('Error saving payment:', err);
      alert('Failed to add payment!');
    }
  };

  return (
    <div className="payment-page">
      <h2 className="page-title">Payment</h2>

      <button className="top-add-button" onClick={handleAdd}>
        + Add Payment
      </button>

      <div className="card-container">
        {categories.map((cat) => (
          <div key={cat} className="payment-card">
            <h3>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h3>
            <p>
              <strong>Amount:</strong> ₹{paymentData[cat]?.amount ?? 0}
            </p>
            <p>
              <strong>Outstanding:</strong> ₹{paymentData[cat]?.outstanding ?? 0}
            </p>
          </div>
        ))}
      </div>

      {showForm && (
        <form className="payment-form" onSubmit={handleSubmit}>
          <h3>Add Payment</h3>

          <label>
            Category:
            <select
              value={formCategory}
              onChange={(e) => setFormCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </label>

          {formCategory === 'others' && (
            <label>
              Reason:
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </label>
          )}

          <label>
            Payment Method:
            <select
              value={formMethod}
              onChange={(e) => setFormMethod(e.target.value)}
            >
              {paymentMethods.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>

          <label>
            Amount:
            <input
              type="number"
              value={formAmount}
              onChange={(e) => setFormAmount(e.target.value)}
              required
            />
          </label>

          <label>
            Date & Time:
            <input type="datetime-local" value={dateTime} readOnly />
          </label>

          <button type="submit" className="submit-button">
            Submit Payment
          </button>
        </form>
      )}
    </div>
  );
};

export default PaymentPage;
