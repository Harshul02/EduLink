
const mongoose = require("mongoose");

const tieUpSchema = new mongoose.Schema({
    senderId: String, // The ID of the sender (company or college)
    receiverId: String, // The ID of the receiver (company or college)
    accepted: { type: Boolean, default: false }, // Status of acceptance
  });
  

module.exports = mongoose.model("TieUp", tieUpSchema);