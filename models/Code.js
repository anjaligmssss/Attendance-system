const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  className: { type: String, required: true },
  subject: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 60 } // expires after 1 min
});

module.exports = mongoose.model('Code', codeSchema);
