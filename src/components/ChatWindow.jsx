import React, { useState, useRef, useEffect } from 'react';
import ChatInput from './ChatInput';
import '../static/style.css'; // Manual CSS styling

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const messagesEndRef = useRef(null);

  const handleNewMessage = (msgObj) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = { ...msgObj, from: 'user', time: timestamp };
    setMessages((prev) => [...prev, newMessage]);
    setHasSentMessage(true);

    if (Math.random() < 0.25) {
      setTimeout(() => {
        setAlertMessage(newMessage.text);
        setTimeout(() => setAlertMessage(null), 4000);
      }, 300);
    }
  };

  const setToxicMessage = (isToxic) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.from === 'user' && !message.isToxic
          ? { ...message, isToxic }
          : message
      )
    );
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-window-wrapper">
      <div className="chat-window-inner">

        {/* Left Side: Chat History */}
        <div className="chat-history-panel">
          <h2 className="chat-history-title">Chat History</h2>
          <div className="chat-history-list">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-history-message ${msg.isToxic ? 'toxic' : ''}`}
              >
                <p className={`chat-history-text ${msg.isToxic ? 'blurred' : ''}`}>{msg.text}</p>  {/* Blurring toxic messages */}
                <span className="chat-history-time">{msg.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Chat Display */}
        <div className="chat-display-panel">
          {!hasSentMessage && (
            <h1 className="chat-title">Osprey Chat Moderation</h1>
          )}

          <div className="chat-message-window">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message-container ${msg.from === 'user' ? 'align-right' : 'align-left'}`}>
                <div className={`message-bubble ${msg.isToxic ? 'toxic' : msg.from === 'user' ? 'user' : 'system'}`}>
                  {msg.text}
                </div>
                <span className="message-time">{msg.time}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Alert Message */}
          {alertMessage && (
            <div className="cosmic-alert">
              <div className="cosmic-alert-box animate-fade-in-out">
                <p className="cosmic-alert-text">🌌 Cosmic Insight: “{alertMessage}”</p>
              </div>
            </div>
          )}

          <div className="chat-input-container">
            <ChatInput onSend={handleNewMessage} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatWindow;
