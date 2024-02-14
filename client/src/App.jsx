import Header from './components/Header';
import MessageModal from './components/MessageModal';
import MessageCard from './components/MessageCard';
import './App.css';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CryptoJS from 'crypto-js';

function App()
{
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('load messages', setMessages);
    newSocket.on('update messages', (message) => setMessages((msgs) => [...msgs, message]));

    return () => newSocket.disconnect();
  }, []);

  const sendMessage = () => {
    if (socket && currentMessage.message.trim() && currentMessage.password.trim()) {
      const encryptedMessage = CryptoJS.AES.encrypt(currentMessage.message, currentMessage.password).toString();
  
      const messageToSend = {
        codename: currentMessage.codename,
        message: encryptedMessage,
      };
  
      socket.emit('new message', messageToSend);
      setCurrentMessage({ codename: '', password: '', message: '' });
      setShowModal(false);
    }
  };



  return (
    <>
      <div className="main-container">
        <Header />
      <div className="top-padding">
        <Button variant="outline-success" onClick={() => setShowModal(true)} className="fixed-chat-button thick-outline">
          <FontAwesomeIcon icon={faPlus} size="3x" />
        </Button>
        <h1 style={{ color: '#00FF66',paddingLeft: '50px', fontSize:'60px' }} className='press-start-font'>Messages:</h1>
        <div className='messages-container'>
          {messages.map((message, index) => (
            // Use MessageCard for each message
            <MessageCard key={index} message={message} className="message-card" />
          ))}
        </div>
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

export default App;
