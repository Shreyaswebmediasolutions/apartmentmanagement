import React, { useEffect, useState } from "react";
import '../styles/Yearlyspending.css';

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Fetch available years (could be dynamic later)
const fetchAvailableYears = () => {
  return Promise.resolve([2022, 2023, 2024, 2025]);
};

// Fetch monthly spending for the selected year
const fetchSpendingData = async (year) => {
  try {
    const res = await fetch(`http://localhost:5000/api/spending/${year}`);
    if (!res.ok) throw new Error("Failed to fetch data");
    const result = await res.json();

    // Expecting format: [{ month: 1, total: 500 }, { month: 2, total: 800 }, ...]
    const monthlyData = Array(12).fill(0);
    result.forEach((entry) => {
      const index = entry.month - 1; // Month should be 1-based
      if (index >= 0 && index < 12) {
        monthlyData[index] = entry.total;
      }
    });

    return monthlyData;
  } catch (err) {
    console.error("Error fetching spending data:", err);
    return Array(12).fill(0); // Fallback
  }
};

const YearlySpending = () => {
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [spendingData, setSpendingData] = useState(Array(12).fill(0));
  const [loading, setLoading] = useState(true);

  const totalSpending = spendingData.reduce((sum, val) => sum + val, 0);

  useEffect(() => {
    fetchAvailableYears().then((years) => {
      setAvailableYears(years);
      if (!years.includes(selectedYear)) {
        setSelectedYear(years[0]);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedYear) {
      setLoading(true);
      fetchSpendingData(selectedYear).then((data) => {
        setSpendingData(data);
        setLoading(false);
      });
    }
  }, [selectedYear]);

  return (
    <div className="layout">
      <main className="main-content">
        <div className="header">
          <h1>Yearly Spending</h1>
          <div className="year-selector">
            <select
              id="year-dropdown"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <p>Loading spending data...</p>
        ) : (
          <>
            <div className="spending-list">
              {months.map((month, idx) => (
                <div key={month} className="spending-item">
                  <span>{month}</span>
                  <span>₹{spendingData[idx].toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="total">
              <strong>Total:</strong>
              <span>₹{totalSpending.toLocaleString()}</span>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default YearlySpending;