import Header from './components/Header';
import MessageModal from './components/MessageModal';
import MessageCard from './components/MessageCard';
import './App.css';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

function ChatApp()
{
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:3000`);
    setSocket(newSocket);

    newSocket.on('load messages', setMessages);
    newSocket.on('update messages', (message) => setMessages((msgs) => [...msgs, message]));

    return () => newSocket.disconnect();
  }, []);

  const sendMessage = () => {
    if (socket && currentMessage.message.trim()) {
      socket.emit('new message', currentMessage);
      setCurrentMessage({ codename: '', password: '', message: '' });
      setShowModal(false);
    }
  };


  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div className="main-container">
        <Header />
        <hr />
        <Button variant="outline-success" onClick={() => setShowModal(true)} className="fixed-chat-button thick-outline">
          <FontAwesomeIcon icon={faMessage} />
        </Button>
        <h1 style={{ color: '#00FF66',paddingLeft: '50px' }}>Messages:</h1>
        <div className='messages-container'>
          {messages.map((message, index) => (
            // Use MessageCard for each message
            <MessageCard key={index} message={message} className="message-card" />
          ))}
        </div>
      </div>
  
      <MessageModal
        showModal={showModal}
        handleCloseModal={() => setShowModal(false)}
        currentMessage={currentMessage}
        setCurrentMessage={setCurrentMessage}
        sendMessage={sendMessage}
      />
    </>
  );
}

export default ChatApp;
