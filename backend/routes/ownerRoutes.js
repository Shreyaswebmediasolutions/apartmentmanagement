const express = require('express');
const OwnerController = require('../controllers/OwnerController'); // Ensure the path is correct

const router = express.Router();

// Owner Routes
router.get('/owners', OwnerController.getAllowners);
router.get('/owners/:id', OwnerController.getOwnerById);
router.post('/owners', OwnerController.createOwner);
router.put('/owners/:id', OwnerController.updateOwner);
router.delete('/owners/:id', OwnerController.deleteOwner);

// Flat Routes
router.get('/flats', OwnerController.getAllFlats);
router.get('/flats/:id', OwnerController.getFlatById);
router.post('/flats', OwnerController.createFlat);
router.put('/flats/:id', OwnerController.updateFlat);
router.delete('/flats/:id', OwnerController.deleteFlat);

router.get('/staff', OwnerController.getAllStaff);
router.get('/staff/:id', OwnerController.getStaffById);
router.post('/staff', OwnerController.createStaff);
router.put('/staff/:id', OwnerController.updateStaff);
router.delete('/staff/:id', OwnerController.deleteStaff);

module.exports = router;
