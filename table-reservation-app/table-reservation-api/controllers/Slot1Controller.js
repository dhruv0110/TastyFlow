const Slot1 = require('../models/Slot1');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dhruvsheth01102003@gmail.com',
    pass: 'jhhozekydjsadaao'
  }
});

const getAllSlots = async (req, res) => {
  try {
    const slots = await Slot1.find().populate('reservedBy', 'name contact');
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const reserveSlot = async (req, res) => {
  try {
    const { number } = req.body;
    const userId = req.user.id;
    const slot = await Slot1.findOne({ number });

    if (!slot.reserved) {
      slot.reserved = true;
      slot.reservedBy = userId;
      await slot.save();
      const populatedSlot = await Slot1.findById(slot._id).populate('reservedBy');

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const mailOptions = {
        from: 'dhruvsheth01102003@gmail.com',
        to: user.email,
        subject: 'Slot Reserved',
        text: `Thank you for reserving a slot. Your slot number ${number} is reserved successfully.`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Error sending email' });
        } else {
          res.status(200).json({ message: 'Slot reserved and email sent successfully', slot: populatedSlot });
        }
      });
    } else {
      res.status(400).json({ message: 'Slot is already reserved' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unreserveSlot = async (req, res) => {
  try {
    const { number } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;
    const slot = await Slot1.findOne({ number });

    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    if (userRole === 'admin' || (slot.reserved && String(slot.reservedBy) === String(userId))) {
      const reservedByUser = await User.findById(slot.reservedBy);
      slot.reserved = false;
      slot.reservedBy = null;
      await slot.save();

      const mailOptions = {
        from: 'dhruvsheth01102003@gmail.com',
        to: reservedByUser.email,
        subject: 'Slot Unreserved',
        text: `Your reservation for slot number ${number} has been canceled. Please book again if needed.`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Error sending email' });
        } else {
          res.status(200).json({ message: 'Slot unreserved and email sent successfully', slot });
        }
      });
    } else {
      res.status(400).json({ message: 'You do not have permission to unreserve this slot' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const adminUnreserveSlot = async (req, res) => {
  try {
    const { number } = req.body;
    const userRole = req.user.role;

    if (userRole !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const slot = await Slot1.findOne({ number });

    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    const reservedByUser = await User.findById(slot.reservedBy);
    slot.reserved = false;
    slot.reservedBy = null;
    await slot.save();

    const mailOptions = {
      from: 'dhruvsheth01102003@gmail.com',
      to: reservedByUser.email,
      subject: 'Slot Unreserved',
      text: `Your reservation for slot number ${number} has been canceled by the admin. Please book again if needed.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        res.status(200).json({ message: 'Slot unreserved by admin and email sent successfully', slot });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addSlot = async (req, res) => {
  const { number, capacity } = req.body;

  try {
    // Create and save the new slot entry
    const newSlot = new Slot1({ number, capacity });
    await newSlot.save();

    res.status(201).json(newSlot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSlot = async (req, res) => {
  try {
    const { number } = req.body;
    const slot = await Slot1.findOneAndDelete({ number });
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    res.json({ message: 'Slot deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSlots,
  reserveSlot,
  unreserveSlot,
  adminUnreserveSlot,
  addSlot,
  deleteSlot
};
