/* import React, { useState, useEffect } from 'react';
import { database, auth } from '../firebase';
import { ref, push, onValue } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatRoom() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user] = useAuthState(auth);

  // Listen for new messages
  useEffect(() => {
    const messagesRef = ref(database, 'messages');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = [];
      for (let id in data) {
        loadedMessages.push({ id, ...data[id] });
      }
      loadedMessages.sort((a, b) => a.timestamp - b.timestamp);
      setMessages(loadedMessages);
    });
  }, []);

  // Send a message
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    const messagesRef = ref(database, 'messages');
    push(messagesRef, {
      text: message,
      timestamp: Date.now(),
      user: user ? user.uid : 'anonymous',
    });
    setMessage('');
  };
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-center">Chat Room</h3>
      <div className="border rounded p-3 mb-3" style={{ height: 350, overflowY: 'auto', background: '#f8f9fa' }}>
        {messages.map(msg => (
          <div 
          key={msg.id} className={`mb-2 p-2 rounded ${msg.user === (user ? user.email : 'anonymous') ? 'bg-primary text-white text-end' : 'bg-light text-dark text-start'}`}>
            <small className="d-block fw-bold">{msg.user}</small>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="btn btn-success" type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatRoom; */