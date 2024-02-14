import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import "./MessageModal.css"

function MessageModal({ showModal, handleCloseModal, currentMessage, setCurrentMessage, sendMessage })
{
  const handleChange = (key, value) =>
  {
    setCurrentMessage({ ...currentMessage, [key]: value });
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          size="lg"
          type="text"
          value={currentMessage.codename || ''}
          onChange={(e) => handleChange('codename', e.target.value)}
          placeholder="Codename"
          className='press-start-font'
        />
        <Form.Control
          size="lg"
          type="text"
          value={currentMessage.message || ''}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="Type your message here..."
          className='press-start-font'
        />
        <Form.Control
          size="lg"
          type="password"
          value={currentMessage.password || ''}
          onChange={(e) => handleChange('password', e.target.value)}
          placeholder="Passphrase"
          className='press-start-font'
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-warning" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="outline-success neon-green press-start-font" onClick={sendMessage}>
          Send Message
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MessageModal;
