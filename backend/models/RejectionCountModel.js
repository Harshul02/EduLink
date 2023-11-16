const mongoose = require('mongoose');

const rejectionCountSchema = new mongoose.Schema({
    fromId: String,
    toId: String, 
    rejectionCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("RejectionCount", rejectionCountSchema);