const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentsSchema = new mongoose.Schema({
  id: Number,
  parentId: Number,
  text: String,
  author: String,
  children: [this],
  commentTime: String,
});

const ticketSchema = new mongoose.Schema({
  ticketNumber: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  userCreated: String,
  description: {
    type: String,
    required: false,
  },
  priority: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  assignee: {
    type: String,
    required: false,
  },
  files: [String],
  comments: [commentsSchema],
});

const CommentsModel = mongoose.model("Comments", commentsSchema);
const TicketModel = mongoose.model("Ticket", ticketSchema);

module.exports = { CommentsModel, TicketModel };

// module.exports = mongoose.model("Ticket", ticketSchema);
