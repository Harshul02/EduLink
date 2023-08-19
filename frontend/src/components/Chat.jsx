import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = ({ userType, loggedInUserId, userId, socket }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (!isSending && message.trim() !== '') {
      setIsSending(true);
      socket.emit('chatMessage', {
        userType,
        loggedInUserId,
        userId,
        message,
      });
      setMessage('');
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.emit('setUser', loggedInUserId);

      socket.on('chatMessage', (data) => {
        setChatHistory((prevHistory) => [...prevHistory, data]);
      });

      socket.on('initialChatHistory', (initialHistory) => {
        setChatHistory(initialHistory);
      });

      return () => {
        socket.off('chatMessage');
        socket.off('initialChatHistory');
      };
    }
  }, [socket, loggedInUserId]);

  const filteredChatHistory = chatHistory.filter(
    (message) =>
      (message.loggedInUserId === loggedInUserId && message.userId === userId) ||
      (message.loggedInUserId === userId && message.userId === loggedInUserId)
  );

  const chatContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '15px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    overflowY: 'auto',
  };

  const messageStyle = {
    maxWidth: '70%',
    padding: '10px',
    borderRadius: '10px',
    marginBottom: '10px',
  };

  const senderMessageStyle = {
    ...messageStyle,
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  };

  const recipientMessageStyle = {
    ...messageStyle,
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  };

  return (
    <div className="chat-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={chatContainerStyle} className="chat-history">
        {filteredChatHistory.map((message, index) => (
          <div
            key={index}
            style={message.loggedInUserId === loggedInUserId ? senderMessageStyle : recipientMessageStyle}
          >
            <span>{message.message}</span>
          </div>
        ))}
      </div>
      <div className="input-container" style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginRight: '10px',
          }}
        />
        <button onClick={handleSendMessage} disabled={isSending} style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#00bfa5', color: 'white', border: 'none' }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
