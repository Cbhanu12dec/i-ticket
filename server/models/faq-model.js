const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const faqSchema = new Schema({
  id: String,
  faqNumber: String,
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  isHidden: Boolean,
  assignee: [String],
  files: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [String],
});

module.exports = mongoose.model("Faq", faqSchema);
