const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const collegeRoute = require('./routes/collegeRoute');
const companyRoute = require('./routes/companyRoute');
const chatRoute = require('./routes/chatRoute');
const tieupRoute = require('./routes/tieupRoute');
const ChatMessage = require('./models/ChatMessageModel');
const cloudinary = require("cloudinary");
const connectDb = require('./config/db');



cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,

})

connectDb();


app.use(express.json({ limit: '10mb' }));
const fileUpload = require("express-fileupload")
app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
  }));
app.use('/api/college', collegeRoute);
app.use('/api/company', companyRoute);
app.use('/api/chat', chatRoute);
app.use('/api/tieup', tieupRoute);
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const io = require('socket.io')(server);




const userSockets = {}; 
io.on('connection', async (socket) => {
    console.log('A user connected');

    socket.on('setUser', async (userId) => {
        userSockets[userId] = socket; 

        // Fetch the chat history for the user from the database
        try {
            const chatHistory = await ChatMessage.find({
                $or: [
                    { loggedInUserId: userId },
                    { userId: userId }
                ]
            }).sort({ createdAt: 1 });

            // Send the stored chat history to the connected user
            socket.emit('initialChatHistory', chatHistory);
        } catch (error) {
            console.error(error);
        }
    });

    socket.on('chatMessage', async (data) => {
        const newMessage = new ChatMessage({
            userType: data.userType,
            loggedInUserId: data.loggedInUserId,
            userId: data.userId,
            message: data.message,
        });
        await newMessage.save();

        socket.emit('chatMessage', newMessage); // Emit the new message to the sender's socket

        const recipientSocket = userSockets[data.userId];
        if (recipientSocket) {
            recipientSocket.emit('chatMessage', newMessage); // Emit the new message to the recipient's socket
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        for (const userId in userSockets) {
            if (userSockets[userId] === socket) {
                delete userSockets[userId];
                break;
            }
        }
    });
});
  
  
  