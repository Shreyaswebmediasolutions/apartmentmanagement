import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaWhatsapp, FaPhoneAlt, FaEye, FaEdit } from "react-icons/fa";
import "../styles/flat.css";

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredFloor, setFilteredFloor] = useState(() => {
    return localStorage.getItem("selectedFloor") || "1";
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addRoomModel, setAddRoomModel] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const navigate = useNavigate();

  const initialRoom = {
    room_id: "", floor: "", flat_no: "", flat_type: "", flat_details: "",
    name: "", adhaar_no: "", contact_no: "", optional_no: "", member_list: "", owner_details: ""
  };

  const [newRoom, setNewRoom] = useState(initialRoom);

  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditRoom((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewRoom((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    axios.get("http://147.93.31.45:5001/api/rooms")
      .then((response) => {
        setRooms(response.data);
        setLoading(false);

      })
      .catch(() => {
        setError("Error fetching rooms");
        setLoading(false);
      });
  }, []);

  const handleAddRoomSave = () => {
    axios.post("http://147.93.31.45:5001/api/rooms", newRoom)
      .then(({ data }) => {
        setRooms([...rooms, data]);
        setNewRoom(initialRoom);
        setAddRoomModel(false);
      })
      .catch(() => setError("Error adding new room"));
  };

  const handleUpdateRoom = () => {
    axios.put(`http://147.93.31.45:5001/api/rooms/${editRoom.id}`, editRoom)
      .then(({ data }) => {
        const updatedRooms = rooms.map((room) => room.id === data.id ? data : room);
        setRooms(updatedRooms);
        setEditRoom(null);
      })
      .catch(() => setError("Error updating room"));
  };

  const handleFloorChange = (e) => {
    const selected = e.target.value;
    setFilteredFloor(selected);
    localStorage.setItem("selectedFloor", selected);
  };

  const filteredFloors = filteredFloor === "All" ? ["1", "2", "3", "4"] : [filteredFloor];

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="rooms-container">
      <h1>Flat Management</h1>

      <button onClick={() => {
        setAddRoomModel(!addRoomModel);
        setEditRoom(null);
      }}>
        {addRoomModel ? "Close" : "Add Room"}
      </button>

      <div className="filter-section">
        <label>Filter by Floor:</label>
        <select value={filteredFloor} onChange={handleFloorChange}>
          <option value="All">All</option>
          <option value="1">Floor 1</option>
          <option value="2">Floor 2</option>
          <option value="3">Floor 3</option>
          <option value="4">Floor 4</option>
        </select>
      </div>

      {addRoomModel && (
        <div className="room-form">
          <h3>Add New Room</h3>
          {["room_id", "floor", "flat_no", "flat_type", "name", "adhaar_no", "contact_no", "optional_no", "member_list"].map(field => (
            <input key={field} name={field} placeholder={field.replace("_", " ")} value={newRoom[field]} onChange={handleInputChange} />
          ))}
          <select name="flat_details" value={newRoom.flat_details} onChange={handleInputChange}>
            <option value="">Flat Details</option>
            <option value="owner">Owner</option>
            <option value="tenant">Tenant</option>
            <option value="vacant">Vacant</option>
            <option value="pre-register">Pre Register</option>
          </select>
          <select name="owner_details" value={newRoom.owner_details} onChange={handleInputChange}>
            <option value="">Owner Details</option>
            <option value="owner">Owner</option>
            <option value="past owner">Past Owner</option>
          </select>
          <button onClick={handleAddRoomSave}>Save</button>
        </div>
      )}

      {editRoom && (
        <div className="room-form">
          <h3>Edit Room</h3>
          {["room_id", "floor", "flat_no", "flat_type", "name", "adhaar_no", "contact_no", "optional_no", "member_list"].map(field => (
            <input key={field} name={field} placeholder={field.replace("_", " ")} value={editRoom[field]} onChange={(e) => handleInputChange(e, true)} />
          ))}
          <select name="flat_details" value={editRoom.flat_details} onChange={(e) => handleInputChange(e, true)}>
            <option value="">Flat Details</option>
            <option value="owner">Owner</option>
            <option value="tenant">Tenant</option>
            <option value="vacant">Vacant</option>
            <option value="pre-register">Pre Register</option>
          </select>
          <select name="owner_details" value={editRoom.owner_details} onChange={(e) => handleInputChange(e, true)}>
            <option value="">Owner Details</option>
            <option value="owner">Owner</option>
            <option value="past owner">Past Owner</option>
          </select>
          <button onClick={handleUpdateRoom}>Update</button>
          <button onClick={() => setEditRoom(null)}>Cancel</button>
        </div>
      )}

      {filteredFloors.map((floor) => {
        const roomsForFloor = rooms.filter((room) => room.floor === floor);
        if (roomsForFloor.length === 0) return null;
        return (
          <div key={floor} className="floor-section">
            <h2 className="floor-title">Floor {floor}</h2>
            <div className="rooms-list">
              {roomsForFloor.map((room) => (
                <div key={room.id} className="room-card">
                  <p className="room-id"><strong>{room.room_id}</strong></p>
                  <p><strong>Floor:</strong> {room.floor}</p>
                  <p><strong>Flat No:</strong> {room.flat_no}</p>
                  <p><strong>Flat Type:</strong> {room.flat_type}</p>
                  <p><strong>Flat Details:</strong> {room.flat_details}</p>
                  <p><strong>Name:</strong> {room.name}</p>
                  <p><strong>Adhaar No:</strong> {room.adhaar_no}</p>
                  <p><strong>Contact:</strong> {room.contact_no}</p>
                  <p><strong>Optional No:</strong> {room.optional_no}</p>
                  <p><strong>Member List:</strong> {room.member_list}</p>
                  <p><strong>Owner Details:</strong> {room.owner_details}</p>

                  <div className="room-icons">
                    <FaEnvelope title="Email" />
                    <FaWhatsapp title="WhatsApp" />
                    <FaPhoneAlt title="Call" />
                    <FaEye
                      title="View"
                      onClick={() =>
                        navigate(`/room/${room.id}`, {
                          state: {
                            room_id: room.room_id,
                            floor: room.floor,
                            flat_no: room.flat_no,
                            flat_type: room.flat_type
                          },
                        })
                      }
                    />
                    <FaEdit title="Edit" onClick={() => {
                      setEditRoom(room);
                      setAddRoomModel(false);
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoomsList;
