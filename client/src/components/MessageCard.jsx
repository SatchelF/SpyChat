import React, { useState } from 'react';
import { Card, Button, Form, Toast, ToastContainer } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlockKeyhole, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import CryptoJS from 'crypto-js';
import './MessageCard.css'; // Import the CSS file

function MessageCard({ message })
{
  const [password, setPassword] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');


  const decryptMessage = () =>
  {
    try
    {
      const bytes = CryptoJS.AES.decrypt(message.message, password);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      if (originalText)
      {
        setDecryptedMessage(originalText);
        setPassword('')
      } else
      {
        setToastMessage('- - INCORRECT KEY! - - ');
        setShowToast(true);
        setDecryptedMessage('');
      }
    } catch (e)
    {
      setToastMessage('DECRYPTION FALIED!');
      setShowToast(true);
      setDecryptedMessage('');
    }
  };

  // Determine message color based on whether it is decrypted
  const messageStyle = {
    color: decryptedMessage ? '#00FF66' : 'red',
  };

  return (
    <Card className="simple-border-card">
      <Card.Body>
        <Card.Title>CODENAME: {message.codename}</Card.Title>
        <Card.Subtitle className="mb-2 time-stamp">TIME: {message.timestamp}</Card.Subtitle>
        <hr />
        <Card.Text style={messageStyle} className='scrollable-message-content'>
          {decryptedMessage || message.message}
        </Card.Text>
        <Form.Control
          size="md"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='password-input'
        />
        <Button variant="outline-warning" className="decrypt-button" onClick={decryptMessage}>
          <FontAwesomeIcon icon={faUnlockKeyhole} />
        </Button>
      </Card.Body>
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide className="custom-toast">
          <Toast.Header className="custom-toast-header" style={{ backgroundColor: 'black' }}>
            <FontAwesomeIcon icon={faSkullCrossbones} size="8x" color="red" style={{ marginLeft: '70px' }} />
          </Toast.Header>
          <Toast.Body className="custom-toast-text" style={{ backgroundColor: 'black', fontSize: '24px' }}>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>


    </Card>
  );
}

export default MessageCard;
