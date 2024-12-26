const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: false
  },
  capacity: {
    type: Number,
    required: true,
  },
  slot: {
    type: Number,
    required: true,
  },
  reserved: {
    type: Boolean,
    default: false,
  },
  reservedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  reservationExpiry: {
    type: Date,
    default: null,
  },
});

// Creating a compound index to ensure that the combination of number and slot is unique
tableSchema.index({ number: 1, slot: 1 }, { unique: true });

module.exports = mongoose.model('Table', tableSchema);
