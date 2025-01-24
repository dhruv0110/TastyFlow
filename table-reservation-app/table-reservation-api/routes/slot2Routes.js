const express = require('express');
const Slot2Controller = require('../controllers/Slot2Controller');
const fetchUser = require('../middleware/fetchUser');

const router = express.Router();

router.get('/', Slot2Controller.getAllSlots);

router.post('/reserve', fetchUser, Slot2Controller.reserveSlot);
router.post('/unreserve', fetchUser, Slot2Controller.unreserveSlot);
router.post('/admin/unreserve', fetchUser, Slot2Controller.adminUnreserveSlot);

router.post('/add', Slot2Controller.addSlot);
router.delete('/delete', Slot2Controller.deleteSlot);

module.exports = router;


