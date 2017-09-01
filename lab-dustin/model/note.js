'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = Schema({
  title: {type: String, required: true},
  content: {type: String},
  created: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.models.note || mongoose.model('note',noteSchema);
