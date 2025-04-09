import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import axios from "axios";

function ExecutiveMembers() {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false); // Controls form visibility
  //const [viewIndex, setViewIndex] = useState(null);


  const [formData, setFormData] = useState({
    flat_no: "",
    name: "",
    position: "",
    contact_no: "",
  });
  const MembersList = () => {
    //const [viewIndex, setViewIndex] = useState(null); // Tracks the index of the selected member
    const handleView = (index) => {
      setFormData(members[index]); // Set the selected member's data
     // setViewIndex(index); // Store the index of the selected member
    };
  }



  const [errors, setErrors] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]); // Store members of selected position
  const [selectedPosition, setSelectedPosition] = useState(null); // Store selected position



  const handleChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    if (name === "contact_no" && !/^[0-9]{10}$/.test(value)) {
      newErrors.contact_no = "Contact must be 10 digits";
    } else {
      delete newErrors.contact_no;
    }

    setErrors(newErrors);
    setFormData({ ...formData, [name]: value });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateDuplicate = () => {
    let newErrors = {};
    if (members.some((m, i) => m.flat_no === formData.flat_no && i !== editIndex)) {
      newErrors.flat_no = "Flat No already exists";
    }
    if (members.some((m, i) => m.name === formData.name && i !== editIndex)) {
      newErrors.name = "Name already exists";
    }
    // if (members.some((m, i) => m.position === formData.position && i !== editIndex)) {
    //   newErrors.position = "Position already taken";
    // }
    if (members.some((m, i) => m.contact_no === formData.contact_no && i !== editIndex)) {
      newErrors.contact_no = "Contact No already exists";
    }
    return newErrors;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Validate duplicates before proceeding
    let duplicateErrors = validateDuplicate();
    if (Object.keys(duplicateErrors).length > 0) {
      setErrors(duplicateErrors);
      return;
    }

    try {
      if (editIndex !== null) {
        // Update member in database
        await axios.put(`http://localhost:5000/executivemember/${members[editIndex].id}`, formData);

        // Fetch updated data from server
        const res = await axios.get("http://localhost:5000/executivemembers");
        setMembers(res.data);

        setEditIndex(null);
      } else {
        // Add new member to database
        await axios.post("http://localhost:5000/executivemember", formData);

        // Fetch updated data
        const res = await axios.get("http://localhost:5000/executivemembers");
        setMembers(res.data);
      }

      // Reset form fields
      setFormData({ flat_no: "", name: "", position: "", contact_no: "" });

    } catch (error) {
      console.error("Error saving data:", error);
    }
  };


  useEffect(() => {
    axios.get("http://localhost:5000/executivemembers") // Adjust URL as per your backend
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
      });
  }, []);

  const handleEdit = (index) => {
    setFormData(members[index]);
    setEditIndex(index);
  };
  const handleView = (index) => {
    const position = members[index].position;
    setSelectedPosition(position); // Store the selected position

    axios.get(`http://localhost:5000/executivemembers/position/${position}`)
      .then((response) => {
        setSelectedMembers(response.data); // Update selected members
      })
      .catch((error) => {
        console.error("Error fetching members by position:", error);
      });
  };

  return (
    <div className="executive-members">
      <h2>Executive Members</h2>
      {/* Add Member Button */}
      <button className="add-member-btn" onClick={() => setShowForm(!showForm)}>
        {!showForm ? "Add Member" : "Close"}
      </button>

      {showForm && (
        <div className="form">
          <input type="text" name="flat_no" placeholder="Flat No" value={formData.flat_no} onChange={handleChange} className="input-box" />
          {errors.flat_no && <p className="error">{errors.flat_no}</p>}

          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="input-box" />
          {errors.name && <p className="error">{errors.name}</p>}

          <select name="position" value={formData.position} onChange={handleChange} className="dropdown">
            <option value="">Select Position</option>
            <option value="President">President</option>
            <option value="VicePresident">Vice President</option>
            <option value="Secretary">Secretary</option>
            <option value="Treasury">Treasury</option>
          </select>
          {errors.position && <p className="error">{errors.position}</p>}

          <input type="text" name="contact_no" placeholder="Contact No." value={formData.contact_no} onChange={handleChange} className="input-box" />
          {errors.contact_no && <p className="error">{errors.contact_no}</p>}

          <div className="button-group">
            <button className="add-button" onClick={handleSave}>{editIndex !== null ? "Update Member" : "Add Member"}</button>
          </div>
        </div>
      )}

      <div className="card-container">
        {members.map((member, index) => (
          <div className="card" key={index}>
            <div className="card-header">
              <h3>Flat No: {member.flat_no}</h3>
            </div>
            <div className="card-body">
              <p><strong>Name:</strong> {member.name}</p>
              <p><strong>Position:</strong> {member.position}</p>
              <p><strong>Contact No:</strong> {member.contact_no}</p>
            </div>
            <div className="card-footer">
              <button className="edit-button" onClick={() =>{handleEdit(index);setShowForm(true);}}>Edit</button>
              <button className="view-button" onClick={() => handleView(index)}>View</button>
            </div>
          </div>
        ))}
      </div>

      {/* <h2>Executive Members</h2> */}
      {/* <table border="2">
        <thead>
          <tr>
            <th>Flat No</th>
            <th>Name</th>
            <th>Position</th>
            <th>Contact No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td>{member.flat_no}</td>
              <td>{member.name}</td>
              <td>{member.position}</td>
              <td>{member.contact_no}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(index)}>Edit</button>
                <button className="View-button" onClick={() => handleView(index)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

<div>
  {selectedPosition && selectedMembers.length > 0 && (
    <div>
      <h3>All {selectedPosition} Members</h3>

      {/* Cards Container */}
      <div className="card-container">
        {selectedMembers.map((member, index) => (
          <div className="member-card" key={index}>
            <h4>{member.name}</h4>
            <p><strong>Flat No:</strong> {member.flat_no}</p>
            <p><strong>Position:</strong> {member.position}</p>
            <p><strong>Contact:</strong> {member.contact_no}</p>
            <p><strong>Date:</strong> {new Intl.DateTimeFormat('en-GB').format(new Date(member.created_at))}</p>
          </div>
        ))}
      </div>

      <button className="close-btn" onClick={() => setSelectedPosition(null)}>
        Close
      </button>
    </div>
  )}
</div>
      
    </div>

  );
}

export default ExecutiveMembers;
