const mongoose = require('mongoose');

const rejectionCountSchema = new mongoose.Schema({
    userId: String, 
    rejectionCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("RejectionCount", rejectionCountSchema);