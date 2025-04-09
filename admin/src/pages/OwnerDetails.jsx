import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaFileInvoice } from "react-icons/fa";
import { useParams, useLocation } from "react-router-dom";
import "../styles/flat.css";

const OwnerDetails = () => {
  const [ownerModelOpen, setOwnerModelOpen] = useState(false);
  const [memberModelOpen, setMemberModelOpen] = useState(false);
  const [staffModelOpen, setStaffModelOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("owner");

  const { id } = useParams();
  const location = useLocation();
  const { room_id, floor, flat_no, flat_type } = location.state || {};

  const [ownerData, setOwnerData] = useState(null);
  const [memberData, setMemberData] = useState(null);
  const [staffData, setStaffData] = useState(null);

  const [showMenu, setShowMenu] = useState(false);
  const [error] = useState("");

  const [ownerFormData, setOwnerFormData] = useState({
    flat_area: "",
    parking: "",
    status: "",
  });

  const [memberFormData, setMemberFormData] = useState({
    member_id: "",
    member_no: "",
    email: "",
    name: "",
    status: "",
  });

  const [staffFormData, setStaffFormData] = useState({
    staff_id: "",
    name: "",
    role: "",
    contact: "",
    email: "",
  });

  const handleChange = (setState) => (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const storedOwner = localStorage.getItem(`ownerData_${room_id}`);
    const storedMember = localStorage.getItem(`memberData_${room_id}`);
    const storedStaff = localStorage.getItem(`staffData_${room_id}`);

    if (storedOwner) setOwnerData(JSON.parse(storedOwner));
    if (storedMember) setMemberData(JSON.parse(storedMember));
    if (storedStaff) setStaffData(JSON.parse(storedStaff));
  }, [room_id]);

  return (
    <div className="details-container">
      <h2>Flat Details</h2>

      <div className="room-summary">
        <p><strong>{room_id}</strong></p>

      <div className="invoice-section">
        <div className="right-icons">
          <FaFileInvoice
            className="invoice-icon"
            title="View Pending Invoice"
            onClick={() => alert("Redirecting to Pending Invoices...")}
          />
          <div className="menu-container">
            <FaEllipsisV
              onClick={() => setShowMenu(!showMenu)}
              className="menu-icon"
            />
            {showMenu && (
              <div className="dropdown-menu">
                <div onClick={() => { setShowMenu(false); alert("Edit clicked"); }}>Edit</div>
                <div onClick={() => { setShowMenu(false); alert("Delete clicked"); }}>Delete</div>
              </div>
            )}
          </div>
        </div>
      </div>
            </div>

      {error && <p className="error">{error}</p>}

      {/* Section Selector */}
      <div className="button-group">
        <button onClick={() => setActiveSection("detail")}>Detail</button>
        <button onClick={() => setActiveSection("member")}>Member</button>
        <button onClick={() => setActiveSection("staff")}>Staff</button>
      </div>

      {/* Owner Section */}
      {activeSection === "owner" && (
        <div className="card">
          <h3
            className="card-header"
            onClick={() => {
              setOwnerFormData({ flat_area: "", parking: "", status: "" });
              setOwnerModelOpen(!ownerModelOpen);
            }}
          >
            Add/Update Detail
          </h3>

          {ownerModelOpen && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setOwnerData(ownerFormData);
                localStorage.setItem(`ownerData_${room_id}`, JSON.stringify(ownerFormData));
                setOwnerFormData({ flat_area: "", parking: "", status: "" });
                setOwnerModelOpen(false);
              }}
            >
              {Object.keys(ownerFormData).map((key) =>
                key === "status" ? (
                  <select
                    key={key}
                    name={key}
                    value={ownerFormData[key]}
                    onChange={handleChange(setOwnerFormData)}
                    required
                  >
                    <option value="">Status</option>
                    <option value="Self Occupied">Self Occupied</option>
                    <option value="Rented">Rented</option>
                    <option value="Vacant">Vacant</option>
                  </select>
                ) : (
                  <input
                    key={key}
                    type="text"
                    name={key}
                    placeholder={key}
                    value={ownerFormData[key]}
                    onChange={handleChange(setOwnerFormData)}
                    required
                  />
                )
              )}
              <button type="submit">Submit</button>
            </form>
          )}

          <div className="details">Details</div>
          {ownerData && (
            <div className="owner-card">
                  <p><strong>Floor:</strong> {floor}</p>
        <p><strong>Flat No:</strong> {flat_no}</p>
        <p><strong>Flat Type:</strong> {flat_type}</p>
              <p><strong>Flat Area:</strong> {ownerData.flat_area}</p>
              <p><strong>Parking:</strong> {ownerData.parking}</p>
              <p><strong>Status:</strong> {ownerData.status}</p>
            </div>
          )}
        </div>
      )}

      {/* Member Section */}
      {activeSection === "member" && (
        <div className="card">
          <h3
            className="card-header"
            onClick={() => {
              setMemberFormData({
                member_id: "",
                member_no: "",
                email: "",
                name: "",
                status: "",
              });
              setMemberModelOpen(!memberModelOpen);
            }}
          >
            Add/Update Member
          </h3>

          {memberModelOpen && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setMemberData(memberFormData);
                localStorage.setItem(`memberData_${room_id}`, JSON.stringify(memberFormData));
                setMemberFormData({
                  member_id: "",
                  member_no: "",
                  email: "",
                  name: "",
                  status: "",
                });
                setMemberModelOpen(false);
              }}
            >
              {Object.keys(memberFormData).map((key) => (
                <input
                  key={key}
                  type="text"
                  name={key}
                  placeholder={key}
                  value={memberFormData[key]}
                  onChange={handleChange(setMemberFormData)}
                  required
                />
              ))}
              <button type="submit">Submit</button>
            </form>
          )}

          <div className="details">Details</div>
          {memberData && (
            <div className="owner-card">
              <p><strong>Member ID:</strong> {memberData.member_id}</p>
              <p><strong>Member No:</strong> {memberData.member_no}</p>
              <p><strong>Name:</strong> {memberData.name}</p>
              <p><strong>Email:</strong> {memberData.email}</p>
              <p><strong>Status:</strong> {memberData.status}</p>
            </div>
          )}
        </div>
      )}

      {/* Staff Section */}
      {activeSection === "staff" && (
        <div className="card">
          <h3
            className="card-header"
            onClick={() => {
              setStaffFormData({
                staff_id: "",
                name: "",
                role: "",
                contact: "",
                email: "",
              });
              setStaffModelOpen(!staffModelOpen);
            }}
          >
            Add/Update Staff
          </h3>

          {staffModelOpen && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStaffData(staffFormData);
                localStorage.setItem(`staffData_${room_id}`, JSON.stringify(staffFormData));
                setStaffFormData({
                  staff_id: "",
                  name: "",
                  role: "",
                  contact: "",
                  email: "",
                });
                setStaffModelOpen(false);
              }}
            >
              {Object.keys(staffFormData).map((key) => (
                <input
                  key={key}
                  type="text"
                  name={key}
                  placeholder={key}
                  value={staffFormData[key]}
                  onChange={handleChange(setStaffFormData)}
                  required
                />
              ))}
              <button type="submit">Submit</button>
            </form>
          )}

          <div className="details">Details</div>
          {staffData && (
            <div className="owner-card">
              <p><strong>Staff ID:</strong> {staffData.staff_id}</p>
              <p><strong>Name:</strong> {staffData.name}</p>
              <p><strong>Role:</strong> {staffData.role}</p>
              <p><strong>Contact:</strong> {staffData.contact}</p>
              <p><strong>Email:</strong> {staffData.email}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OwnerDetails;
