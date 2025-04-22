import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/FlatMaintenance.css';

const monthsList = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const FlatMaintenance = () => {
    const [showForm, setShowForm] = useState(false);
    const [records, setRecords] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [ownerList, setOwnerList] = useState([]);
    const [formData, setFormData] = useState({
        flat_no: '',
        owner_name: '',
        month: '',
        amount: ''
    });

    useEffect(() => {
        // Fetch rooms
        axios.get('http://localhost:5000/api/rooms')
            .then(res => setRoomList(res.data))
            .catch(err => console.error('Room fetch error:', err));

        // Fetch owners
        axios.get('http://localhost:5000/api/owners/owners')
            .then(res => setOwnerList(res.data))
            .catch(err => console.error('Owner fetch error:', err));

        // Fetch and transform maintenance data
        fetchAndTransformRecords();
    }, []);

    const fetchAndTransformRecords = () => {
        axios.get('http://localhost:5000/api/maintenance')
            .then(res => {
                const raw = res.data;

                const grouped = {};

                raw.forEach(entry => {
                    const key = entry.flat_no;
                    if (!grouped[key]) {
                        grouped[key] = {
                            flat_no: entry.flat_no,
                            owner_name: entry.owner_name,
                        };
                        monthsList.forEach(month => {
                            grouped[key][month] = 0;
                        });
                    }
                    grouped[key][entry.month] = Number(entry.amount);
                });

                setRecords(Object.values(grouped));
            })
            .catch(err => console.error('Payments fetch error:', err));
    };

    const toggleForm = () => setShowForm(!showForm);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'flat_no') {
            const ownerMatch = roomList.find(owner => String(owner.flat_no) === String(value));
            setFormData(prev => ({
                ...prev,
                flat_no: value,
                owner_name: ownerMatch ? ownerMatch.name : ''
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = () => {
        const { flat_no, owner_name, month, amount } = formData;
        if (!flat_no || !owner_name || !month || !amount) {
            alert('Please fill all fields');
            return;
        }

        axios.post('http://localhost:5000/api/maintenance', {
            flat_no,
            owner_name,
            month,
            amount
        })
        .then(() => {
            alert('Payment saved!');
            fetchAndTransformRecords();
            setFormData({ flat_no: '', owner_name: '', month: '', amount: '' });
            setShowForm(false);
        })
        .catch(err => {
            console.error('Save error:', err);
            alert('Failed to save payment');
        });
    };

    const getTotal = (record) =>
        monthsList.reduce((sum, month) => sum + (Number(record[month]) || 0), 0);

    const getOutstanding = (record) => 12000 - getTotal(record); // Assuming total yearly amount is 12000

    return (
        <div className="flat-maintenance-container">
            <h2>Flat Wise Maintenance</h2>
            <button className="add-btn" onClick={toggleForm}>
                {showForm ? 'Close' : 'Add'}
            </button>

            {showForm && (
                <div className="form-container">
                    <select name="flat_no" value={formData.flat_no} onChange={handleChange}>
                        <option value="">Select Flat No</option>
                        {roomList.map((room, index) => (
                            <option key={index} value={room.flat_no}>
                                {room.flat_no}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        name="owner_name"
                        value={formData.owner_name || "Unknown"}
                        readOnly
                        placeholder="Owner Name"
                    />

                    <select name="month" value={formData.month} onChange={handleChange}>
                        <option value="">Select Month</option>
                        {monthsList.map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>

                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        placeholder="Amount"
                        onChange={handleChange}
                    />

                    <button className="save-btn" onClick={handleSave}>Save</button>
                </div>
            )}

            <table>
                <thead>
                    <tr>
                        <th>Flat No</th>
                        <th>Owner Name</th>
                        {monthsList.map(m => (
                            <th key={m}>{m.slice(0, 3)}</th>
                        ))}
                        <th>Total</th>
                        <th>Outstanding</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((rec, idx) => (
                        <tr key={idx}>
                            <td>{rec.flat_no}</td>
                            <td>{rec.owner_name}</td>
                            {monthsList.map(month => (
                                <td key={month}>{rec[month] || 0}</td>
                            ))}
                            <td>{getTotal(rec)}</td>
                            <td>{getOutstanding(rec)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FlatMaintenance;
