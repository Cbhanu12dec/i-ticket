const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  id: String,
  ticketNumber: String,
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  priority: String,
  category: {
    type: String,
    required: false,
  },
  assignee: [String],
  files: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [String],
});

module.exports = mongoose.model("Ticket", ticketSchema);
