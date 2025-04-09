const express = require('express');
const RoomController = require('../controllers/RoomController'); 

const router = express.Router();

router.get('/', RoomController.getAllRooms);
router.get('/:id', RoomController.getRoomById);
router.post('/', RoomController.createRoom);
router.put('/:id', RoomController.updateRoom);
router.delete('/:id', RoomController.deleteRoom);

module.exports = router;
