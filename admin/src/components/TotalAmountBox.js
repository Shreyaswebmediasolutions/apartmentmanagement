import React from 'react';
import "../styles/ExpenseTable.css"

const TotalAmountBox = ({ total }) => {
  return (
    <div className="total-expenditure-box">
  <h2>Total Expenditure This Month:</h2>
  <p>₹ {total.toFixed(2)}</p>
</div>

  );
};

export default TotalAmountBox;
