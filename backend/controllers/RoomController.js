const db = require("../config/db");

class RoomController {
  static async getAllRooms(req, res) {
    try {
      const [rooms] = await db.query("SELECT * FROM rooms");
      res.json(rooms);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getRoomById(req, res) {
    try {
      const [room] = await db.query("SELECT * FROM rooms WHERE id = ?", [
        req.params.id,
      ]);
      if (!room.length)
        return res.status(404).json({ message: "Room not found" });

      res.json(room[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createRoom(req, res) {
    try {
      const {
        room_id,
        floor,
        flat_no,
        flat_type,
        flat_details,
        name,
        adhaar_no,
        contact_no,
        optional_no,
        member_list,
        owner_details,
      } = req.body;

      const [result] = await db.query(
        "INSERT INTO rooms (room_id, floor, flat_no, flat_type, flat_details, name, adhaar_no, contact_no, optional_no, member_list, owner_details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          room_id,
          floor,
          flat_no,
          flat_type,
          flat_details,
          name,
          adhaar_no,
          contact_no,
          optional_no,
          member_list,
          owner_details,
        ]
      );

      res
        .status(201)
        .json({ id: result.insertId, message: "Room created successfully" });
    } catch (err) {
      console.error("Database Error:", err);
      res.status(500).json({ error: err.message });
    }
  }

  static async updateRoom(req, res) {
    try {
      const {
        room_id,
        floor,
        flat_no,
        flat_type,
        flat_details,
        name,
        adhaar_no,
        contact_no,
        optional_no,
        member_list,
        owner_details,
      } = req.body;
      const { id } = req.params;

      const [result] = await db.query(
        "UPDATE rooms SET room_id = ?, floor = ?, flat_no = ?, flat_type = ?, flat_details = ?, name = ?, adhaar_no = ?, contact_no = ?, optional_no = ?, member_list = ?, owner_details = ? WHERE id = ?",
        [
          room_id,
          floor,
          flat_no,
          flat_type,
          flat_details,
          name,
          adhaar_no,
          contact_no,
          optional_no,
          member_list,
          owner_details,
          id,
        ]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Room not found" });
      }

      res.json({ message: "Room updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteRoom(req, res) {
    try {
      const [result] = await db.query("DELETE FROM rooms WHERE id = ?", [
        req.params.id,
      ]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Room not found" });
      }

      res.json({ message: "Room deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = RoomController;
