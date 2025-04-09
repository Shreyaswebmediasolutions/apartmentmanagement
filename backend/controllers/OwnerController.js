const db = require('../config/db');

class OwnerController {
  // owners Table CRUD Operations

  static async getAllowners(req, res) {
    try {
      const [owners] = await db.query('SELECT * FROM owners');
      res.json(owners);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getOwnerById(req, res) {
    try {
    console.log("req.params.id",req.params.id)
      const [owners] = await db.query('SELECT * FROM owners WHERE id = ?', [req.params.id]);
      if (!owners.length) return res.status(404).json({ message: 'Owner not found' });
      res.json(owners[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createOwner(req, res) {
    try {
      const { flat_area, parking, status  } = req.body;
      const [result] = await db.query(
        'INSERT INTO owners (flat_area, parking, status ) VALUES (?, ?, ?)',
        [flat_area, parking, status  ]
      );

      res.status(201).json({ id: result.insertId, message: "Owner created successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateOwner(req, res) {
    try {
      const { flat_area, parking, status   } = req.body;
      const { id } = req.params;

      const [result] = await db.query(
        'UPDATE owners SET flat_area = ?,  parking = ?, status = ? WHERE id = ?',
        [flat_area, parking, status  ]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Owner not found' });
      }

      res.json({ message: 'Owner updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteOwner(req, res) {
    try {
      const [result] = await db.query('DELETE FROM owners WHERE id = ?', [req.params.id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Owner not found' });
      }

      res.json({ message: 'Owner deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Flats Table CRUD Operations

  static async getAllFlats(req, res) {
    try {
      const [flats] = await db.query('SELECT * FROM Flats');
      res.json(flats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getFlatById(req, res) {
    try {
      const [flats] = await db.query('SELECT * FROM Flats WHERE id = ?', [req.params.id]);
      if (!flats.length) return res.status(404).json({ message: 'Flat not found' });
      res.json(flats[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createFlat(req, res) {
    try {
      const { member_id, member_no, email, name, status } = req.body;
      const [result] = await db.query(
        'INSERT INTO Flats (member_id, member_no, email, name, status) VALUES (?, ?, ?, ?, ?)',
        [member_id, member_no, email, name, status]
      );

      res.status(201).json({ id: result.insertId, message: "Flat created successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateFlat(req, res) {
    try {
      const { member_id, member_no, email, name, status } = req.body;
      const { id } = req.params;

      const [result] = await db.query(
        'UPDATE Flats SET member_id = ?, member_no = ?, email = ?, name = ?, status = ? WHERE id = ?',
        [member_id, member_no, email, name, status, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Flat not found' });
      }

      res.json({ message: 'Flat updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteFlat(req, res) {
    try {
      const [result] = await db.query('DELETE FROM Flats WHERE id = ?', [req.params.id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Flat not found' });
      }

      res.json({ message: 'Flat deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Staff Table CRUD Operations

  static async getAllStaff(req, res) {
    try {
      const [staff] = await db.query('SELECT * FROM Staff');
      res.json(staff);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getStaffById(req, res) {
    try {
      const [staff] = await db.query('SELECT * FROM Staff WHERE id = ?', [req.params.id]);
      if (!staff.length) return res.status(404).json({ message: 'Staff member not found' });
      res.json(staff[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createStaff(req, res) {
    try {
      const { staff_id, name, role, contact, email } = req.body;
      const [result] = await db.query(
        'INSERT INTO Staff (staff_id, name, role, contact, email) VALUES (?, ?, ?, ?, ?)',
        [staff_id, name, role, contact, email]
      );

      res.status(201).json({ id: result.insertId, message: "Staff member created successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateStaff(req, res) {
    try {
      const { staff_id, name, role, contact, email } = req.body;
      const { id } = req.params;
  
      const [result] = await db.query(
        'UPDATE Staff SET staff_id = ?, name = ?, role = ?, contact = ?, email = ? WHERE id = ?',
        [staff_id, name, role, contact, email, id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Staff member not found' });
      }
  
      res.json({ message: 'Staff member updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  

  static async deleteStaff(req, res) {
    try {
      const [result] = await db.query('DELETE FROM Staff WHERE id = ?', [req.params.id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Staff member not found' });
      }

      res.json({ message: 'Staff member deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = OwnerController;
