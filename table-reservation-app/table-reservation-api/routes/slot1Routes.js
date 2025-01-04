const express = require('express');
const Slot1Controller = require('../controllers/Slot1Controller');
const fetchUser = require('../middleware/fetchUser');

const router = express.Router();

router.get('/', Slot1Controller.getAllSlots);

router.post('/reserve', fetchUser, Slot1Controller.reserveSlot);
router.post('/unreserve', fetchUser, Slot1Controller.unreserveSlot);
router.post('/admin/unreserve', fetchUser, Slot1Controller.adminUnreserveSlot);

router.post('/add', Slot1Controller.addSlot);
router.delete('/delete', Slot1Controller.deleteSlot);

module.exports = router;


