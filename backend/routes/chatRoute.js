// chatRoute.js
const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessageModel');

router.get('/history', async (req, res) => {
  const {userId} = req.query;
  try {
    const chatHistory = await ChatMessage.find({
      userId
    });
    res.status(200).json({
        chatHistory
      });
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
